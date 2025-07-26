import { test, expect } from '@playwright/test';
import { getValidRefreshToken } from './utils/tokenManager.js';


const tradingPairs = [
  'ETH_USD', 'BTC_USD', 'TON_USD', 'XRP_USD', 'SOL_USD',
  'LINK_USD', 'AVAX_USD', 'ADA_USD', 'DOGE_USD', 'BNB_USD'
];
const directions = ['Short', 'Long'];

// Логгер
function logStep(msg) {
  console.log(`[${new Date().toISOString()}] ${msg}`);
}

// Основной тест-кейс поочередно, без describe
for (const pair of tradingPairs) {
  for (const direction of directions) {
    test(`🔁 ${pair}: ${direction} позиция: открыть, изменить маржу и закрыть (anti-flap v2)`, async ({ page }) => {
      test.setTimeout(120000);
      const username = 'nibel123';
      logStep('🗃️ Используем сохранённый refreshToken из кеша');
      const refreshToken = await getValidRefreshToken(username);

      // 1. Логинимся
      logStep('Открываю debug-страницу');
      await page.goto(`https://app.upscale.stormtrade.dev/debug/${refreshToken}`, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await expect(page).toHaveURL(/\/accounts/, { timeout: 15000 });

      // 2. Торговля
      logStep('Перехожу на страницу торговли');
      await page.goto(`https://app.upscale.stormtrade.dev/trade/${pair}?collateral=USD&tab=positions`, { waitUntil: 'domcontentloaded', timeout: 60000 });

      // 3. Перезагрузка для очистки
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForTimeout(1200);

      // 4. Позиция - очистка
      const ticker = pair.split('_')[0];
      const posRow = page.locator('tr', { hasText: ticker }).first();
      if (direction === 'Long') {
        logStep('Жду, что позиция исчезла перед Long');
        try {
          await expect(posRow).not.toBeVisible({ timeout: 8000 });
        } catch {
          logStep('Позиция видна, делаю reload');
          await page.reload({ waitUntil: 'domcontentloaded' });
        }
      }

      // 5. Открытие позиции
      logStep(`Кликаю по вкладке направления: ${direction}`);
      const directionTab = page.locator('div', { hasText: new RegExp(`^${direction}$`, 'i') }).first();
      await directionTab.click();
      await page.waitForTimeout(600); // подождём анимацию

      logStep('Ввожу amount');
      const amountInput = page.locator('[data-testid="order-creation-card-asset-amount-input"]');
      await expect(amountInput).toBeVisible({ timeout: 7000 });
      await amountInput.fill('1');

      logStep('Ввожу плечо');
      const leverageInput = page.locator('input[name="leverage"]:not([type="hidden"])');
      await expect(leverageInput).toBeVisible({ timeout: 7000 });
      await leverageInput.fill('3');

      logStep('Жду появления и кликаю кнопку открытия позиции');
      const openBtn = page.locator('[data-testid="open-position-button"]');
      await expect(openBtn).toBeEnabled({ timeout: 10000 });
      await openBtn.click();

      // 6. Ожидаем появления строки позиции (retry)
      let appeared = false;
      for (let attempt = 1; attempt <= 2; attempt++) {
        logStep(`Ожидаю появление строки позиции (попытка ${attempt})`);
        try {
          await expect(posRow).toBeVisible({ timeout: 12000 });
          appeared = true;
          break;
        } catch (e) {
          logStep('Не появилась, делаю reload');
          await page.reload({ waitUntil: 'domcontentloaded' });
        }
      }
      if (!appeared) throw new Error('Строка позиции не появилась');

      // 7. Делаем паузу, чтобы позиция точно прогрузилась
      await page.waitForTimeout(1000);

      // 8. Работаем с модалкой позиции
      logStep('Кликаю по строке позиции');
      await posRow.click();
      await page.waitForTimeout(500);

      logStep('Жду открытия модального окна позиции');
      const positionInfoWindow = page.locator('section.chakra-modal__content');
      await expect(positionInfoWindow).toBeVisible({ timeout: 10000 });

      // --- Add/Remove Margin ---
      const valueBeforeLocator = positionInfoWindow
        .locator('p.chakra-text.css-14es400', { hasText: 'Маржа' })
        .locator('..')
        .locator('p.chakra-text.css-1ngrxjw').first();

      const valueBefore = parseFloat((await valueBeforeLocator.textContent()).replace(/[^\d.]/g, ''));
      logStep(`Маржа до добавления: ${valueBefore}`);

      logStep('Кликаю "ДОБАВИТЬ"');
      await positionInfoWindow.locator('button:has-text("ДОБАВИТЬ")').click();
      await page.waitForTimeout(300);

      logStep('Жду input для добавления маржи');
      const inputAmount = positionInfoWindow.locator('input[name="value"]:visible').first();
      await expect(inputAmount).toBeVisible({ timeout: 7000 });
      await inputAmount.fill('1');

      logStep('Кликаю "Добавить маржу"');
      await positionInfoWindow.locator('button', { hasText: 'Добавить маржу' }).click();
      await page.waitForTimeout(300);

      logStep('Проверяю, что маржа увеличилась');
      await expect.poll(async () => {
        const txt = await valueBeforeLocator.textContent();
        return parseFloat(txt.replace(/[^\d.]/g, ''));
      }, { timeout: 10000 }).toBeCloseTo(valueBefore + 1, 2);

      logStep('Кликаю "УМЕНЬШИТЬ"');
      await positionInfoWindow.locator('button:has-text("УМЕНЬШИТЬ")').click();
      await page.waitForTimeout(300);

      logStep('Жду input для уменьшения маржи');
      const removeInput = positionInfoWindow.locator('input[name="amount"]:visible').first();
      await expect(removeInput).toBeVisible({ timeout: 7000 });
      await removeInput.fill('1');

      logStep('Кликаю "Уменьшить маржу"');
      await positionInfoWindow.locator('button', { hasText: 'Уменьшить маржу' }).click();
      await page.waitForTimeout(300);

      logStep('Проверяю, что маржа вернулась');
      await expect.poll(async () => {
        const txt = await valueBeforeLocator.textContent();
        return parseFloat(txt.replace(/[^\d.]/g, ''));
      }, { timeout: 10000 }).toBeCloseTo(valueBefore, 2);

      // --- Закрытие позиции ---
      logStep('Ищу и кликаю серую кнопку "ЗАКРЫТЬ ПОЗИЦИЮ"');
      const grayCloseBtn = positionInfoWindow.locator('button', { hasText: 'ЗАКРЫТЬ ПОЗИЦИЮ', class: /gray|grey/i }).first();
      if (await grayCloseBtn.count() && await grayCloseBtn.isEnabled()) {
        await grayCloseBtn.click();
        logStep('Жду появления и кликаю красную кнопку "ЗАКРЫТЬ ПОЗИЦИЮ"');
        const redCloseBtn = page.locator('[data-testid="close-position-modal-close-button"]');
        await expect(redCloseBtn).toBeVisible({ timeout: 8000 });
        await redCloseBtn.click();
      } else {
        // Если серой нет — ищем сразу красную
        logStep('Серой кнопки "Закрыть" не найдено, кликаю красную');
        const redCloseBtn = page.locator('[data-testid="close-position-modal-close-button"]');
        await expect(redCloseBtn).toBeVisible({ timeout: 8000 });
        await redCloseBtn.click();
      }

      // --- Проверка исчезновения позиции ---
      let disappeared = false;
      for (let attempt = 1; attempt <= 2; attempt++) {
        logStep(`Ожидаю исчезновение строки позиции (попытка ${attempt})`);
        try {
          await expect(posRow).not.toBeVisible({ timeout: 12000 });
          disappeared = true;
          break;
        } catch (err) {
          logStep('Позиция всё ещё на месте, делаю reload');
          await page.reload({ waitUntil: 'domcontentloaded' });
        }
      }
      if (!disappeared) throw new Error('Строка позиции не исчезла!');

      logStep(`✅ Позиция по паре ${pair} успешно закрыта (${direction})`);
      await page.waitForTimeout(800);
    });
  }
}
