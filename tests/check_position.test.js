import { test, expect } from '@playwright/test';
import { getValidRefreshToken } from './utils/tokenManager.js';


const tradingPairs = ['ETH_USD'];
const directions = ['Short', 'Long'];


test.describe('🚀 Проверка add/remove  margin (по всем парам)', () => {
  for (const pair of tradingPairs) {
    for (const direction of directions) {
      test(`🔁 ${pair}: ${direction} позиция: открыть, изменить маржу и закрыть`, async ({ page }) => {
        test.setTimeout(120000);

        const username = 'nibel123';
        const refreshToken = await getValidRefreshToken(username);

        const debugUrl = `https://app.upscale.stormtrade.dev/debug/${refreshToken}`;
        await page.goto(debugUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await expect(page).toHaveURL(/\/accounts/, { timeout: 15000 });

        const tradeUrl = `https://app.upscale.stormtrade.dev/trade/${pair}?collateral=USD&tab=positions`;
        await page.goto(tradeUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });

        // Ожидание очистки позиции перед открытием (если не первая)
        const ticker = pair.split('_')[0];
        const positionRow = page.locator('tr', { hasText: ticker }).first();
        if (direction === 'Long') {
          await expect(positionRow).not.toBeVisible({ timeout: 30000 });
          await page.reload({ waitUntil: 'domcontentloaded' });
        }

        const amountInput = page.locator('[data-testid="order-creation-card-asset-amount-input"]');
        await expect(amountInput).toBeVisible({ timeout: 10000 });
        await amountInput.fill('10');

        const leverageInput = page.locator('input[name="leverage"]:not([type="hidden"])');
        await expect(leverageInput).toBeVisible({ timeout: 10000 });
        await leverageInput.click();
        await leverageInput.fill('3');

        const directionTab = page.locator('div', { hasText: new RegExp(`^${direction}$`, 'i') }).last();
        if (await directionTab.count() > 0 && await directionTab.isVisible()) {
          await directionTab.click();
        }

        const openButton = page.locator('[data-testid="open-position-button"]');
        await expect(openButton).toBeEnabled({ timeout: 20000 });
        await openButton.click();

        // ====== АНТИФЛАП: retry появления позиции ======
        let appeared = false;
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            await expect(positionRow).toBeVisible({ timeout: 20000 });
            appeared = true;
            break;
          } catch (err) {
            await page.screenshot({ path: `fail_position_row_${pair}_${direction}_try${attempt}.png` });
            const tableHTML = await page.locator('table').innerHTML().catch(() => '');
            console.log(`‼️ [${direction}] Таблица после попытки ${attempt}:\n${tableHTML}`);
            if (attempt === 1) {
              await page.reload({ waitUntil: 'domcontentloaded' });
            }
          }
        }
        if (!appeared) {
          throw new Error(`Позиция не появилась после открытия (${direction})!`);
        }

        await positionRow.click();

        const positionInfoWindow = page.locator('section.chakra-modal__content');
        await expect(positionInfoWindow).toBeVisible({ timeout: 20000 });

        const valueBeforeLocator = positionInfoWindow
          .locator('p.chakra-text.css-14es400', { hasText: 'Маржа' })
          .locator('..')
          .locator('p.chakra-text.css-1ngrxjw')
          .first();

        const valueBefore = parseFloat((await valueBeforeLocator.textContent()).replace(/[^\d.]/g, ''));

        // ADD MARGIN
        const addBtn = positionInfoWindow.locator('button:has-text("ДОБАВИТЬ")').first();
        await addBtn.click();
        const inputAmount = positionInfoWindow.locator('input[name="value"]:visible').first();
        await expect(inputAmount).toBeVisible({ timeout: 10000 });
        await inputAmount.fill('1');
        await positionInfoWindow.locator('button:has-text("Добавить маржу")').click();

        await expect.poll(async () => {
          const txt = await valueBeforeLocator.textContent();
          return parseFloat(txt.replace(/[^\d.]/g, ''));
        }, { timeout: 10000 }).toBeCloseTo(valueBefore + 1, 2);

        // REMOVE MARGIN
        const removeBtn = positionInfoWindow.locator('button:has-text("УМЕНЬШИТЬ")').first();
        await removeBtn.click();
        const removeInput = positionInfoWindow.locator('input[name="amount"]:visible').first();
        await expect(removeInput).toBeVisible({ timeout: 10000 });
        await removeInput.fill('1');
        await positionInfoWindow.locator('button:has-text("Уменьшить маржу")').click();

        await expect.poll(async () => {
          const txt = await valueBeforeLocator.textContent();
          return parseFloat(txt.replace(/[^\d.]/g, ''));
        }, { timeout: 10000 }).toBeCloseTo(valueBefore, 2);

        // CLOSE POSITION
        const closePositionBtn = positionInfoWindow.locator('button', { hasText: 'ЗАКРЫТЬ ПОЗИЦИЮ' }).first();
        await expect(closePositionBtn).toBeVisible({ timeout: 10000 });
        await closePositionBtn.scrollIntoViewIfNeeded();
        await closePositionBtn.click({ force: true });

        // === ГИБКОЕ ЗАКРЫТИЕ МОДАЛКИ (КРЕСТИК, ESC, fallback) ===
        let modalClosed = false;
        try {
          // 1. Стандартная кнопка-крестик
          const closeModalBtn = page.locator('button[data-testid="close-position-modal-close-button"]');
          if (await closeModalBtn.isVisible({ timeout: 5000 })) {
            await closeModalBtn.click();
            modalClosed = true;
          }
        } catch { /* ignore */ }

        if (!modalClosed) {
          // 2. Любой видимый крестик или кнопка "Закрыть" внутри окна
          const crossBtn = positionInfoWindow.locator('button[aria-label="Close"], button:has-text("Закрыть")');
          if (await crossBtn.isVisible({ timeout: 3000 })) {
            await crossBtn.click();
            modalClosed = true;
          }
        }

        if (!modalClosed) {
          // 3. Попробовать закрыть клавишей Escape
          await page.keyboard.press('Escape');
          await page.waitForTimeout(500);
          if (!(await positionInfoWindow.isVisible())) modalClosed = true;
        }

        if (!modalClosed && await positionInfoWindow.isVisible()) {
          await page.screenshot({ path: `error_close_modal_${pair}_${direction}.png`, fullPage: true });
          console.error(`❌ Не удалось закрыть модалку позиции ${pair} (${direction})!`);
          throw new Error(`Модалка позиции не закрылась: ${pair} (${direction})`);
        }

        // ======= ОЖИДАНИЕ ИСЧЕЗНОВЕНИЯ СТРОКИ ПОЗИЦИИ (с retry) =======
        let disappeared = false;
        for (let attempt = 1; attempt <= 2; attempt++) {
          try {
            await expect(positionRow).not.toBeVisible({ timeout: 20000 });
            disappeared = true;
            break;
          } catch (err) {
            await page.screenshot({ path: `fail_positionrow_disappear_${pair}_${direction}_try${attempt}.png` });
            if (attempt === 1) await page.reload({ waitUntil: 'domcontentloaded' });
          }
        }
        if (!disappeared) {
          const tableHTML = await page.locator('table').innerHTML().catch(() => '');
          console.error(`‼️ [${direction}] Строка не исчезла после закрытия!\n${tableHTML}`);
          throw new Error('Строка позиции не исчезла из таблицы!');
        }

        console.log(`✅ Позиция по паре ${pair} успешно закрыта (${direction})`);
        await page.waitForTimeout(500); // микропаузa для стабилизации
      });
    }
  }
});

