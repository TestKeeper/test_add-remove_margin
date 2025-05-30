import { test, expect } from '@playwright/test';
import { getValidRefreshToken } from './utils/tokenManager.js';

const tradingPairs = [
  '1000SHIBUSD', 'AAVEUSD', 'ADAUSD', 'AEROUSD', 'AI16ZUSD', 'ALGOUSD', 'ARBUSD', 'ATOMUSD',
  'AXSUSD', 'BCHUSD', 'BERAUSD', 'BGBUSD', 'BRETTUSD', 'BSVUSD', 'CAKEUSD', 'CHZUSD',
  'CROUSD', 'CRVUSD', 'DASHUSD', 'DEEPUSD', 'DEXEUSD', 'DOTUSD', 'EIGENUSD', 'ENAUSD',
  'ENSUSD', 'ETCUSD', 'FARTCOINUSD', 'FETUSD', 'FILUSD', 'FLOKIUSD', 'FLOWUSD', 'GALAUSD',
  'GRASSUSD', 'GRTUSD', 'HBARUSD', 'ICPUSD', 'IMXUSD', 'INJUSD', 'IOTAUSD', 'IPUSD',
  'JASMYUSD', 'JTOUSD', 'JUPUSD', 'KAIAUSD', 'KASUSD', 'LDOUSD', 'MANAUSD', 'MKRUSD',
  'MNTUSD', 'MOVEUSD', 'NEARUSD', 'OPUSD', 'PENDLEUSD', 'POLUSD', 'POPCATUSD', 'PYTHUSD',
  'RAYUSD', 'RENDERUSD', 'RUNEUSD', 'SUSD', 'SANDUSD', 'SEIUSD', 'STRKUSD', 'TAOUSD',
  'TIAUSD', 'TURBOUSD', 'UNIUSD', 'VETUSD', 'VIRTUALUSD', 'WALUSD', 'XLMUSD', 'XMRUSD',
  'XTZUSD', 'ZECUSD'
];

const directions = ['Long'];

test.describe('🚀 Тесты открытия и закрытия позиций (по всем парам)', () => {
  for (const pair of tradingPairs) {
    for (const direction of directions) {
      test(`🔁 ${pair}: ${direction} позиция: открыть и закрыть`, async ({ page }) => {
        const username = 'mrcheck_1';
        const refreshToken = await getValidRefreshToken(username);
        console.log('🗃️ Используем сохранённый refreshToken из кеша');

        const debugUrl = `https://app.upscale.stormtrade.dev/debug/${refreshToken}`;
        await page.goto(debugUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
        await expect(page).toHaveURL(/\/accounts/, { timeout: 10000 });
        console.log('🪜 ✅ Авторизация прошла');

        const tradeUrl = `https://app.upscale.stormtrade.dev/trade/${pair}?collateral=USD&tab=positions`;
        await page.goto(tradeUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
        console.log(`🪜 ✅ Перешли на страницу ${pair} для ${direction}`);

        const amountInput = page.locator('[data-testid="order-creation-card-asset-amount-input"]');
        await amountInput.fill('10');
        console.log('🪜 🟢 Введена сумма 10');

        const leverageInput = page.locator('input[name="leverage"]:not([type="hidden"])');
        await leverageInput.click();
        await leverageInput.press('Control+A');
        await leverageInput.press('Backspace');
        await leverageInput.type('3');
        console.log('🪜 🟢 Введено плечо 3');

        const directionTab = page.locator('div.css-1i4hgyt', { hasText: direction });
        await directionTab.click();
        console.log(`🪜 🟢 Клик по вкладке ${direction}`);

        const openButton = page.locator('[data-testid="open-position-button"]');
        await expect(openButton).toBeEnabled();
        await openButton.click();
        console.log(`🪜 🟢 Открытие позиции ${direction}`);

        const positionCell = page.locator('td.css-1h2uzaz').first();
        await positionCell.click();

        const closeModal = page.locator('section.chakra-modal__content', { hasText: 'Position info' });

        const valueBeforeLocator = closeModal
          .locator('p.chakra-text.css-14es400', { hasText: 'Margin' })
          .locator('..')
          .locator('p.chakra-text.css-1ngrxjw')
          .first();

        await expect(valueBeforeLocator).toBeVisible({ timeout: 5000 });
        const valueBeforeText = await valueBeforeLocator.textContent();
        const valueBefore = parseFloat(valueBeforeText.replace(/[^\d.]/g, ''));
        console.log(`🪜 📌 Значение ДО Add margin: ${valueBefore}`);

        const addBtn = page.locator('button.chakra-button.css-1nv6kk2', { hasText: 'Add' });
        await addBtn.click();

        const modals = page.locator('section.chakra-modal__content');
        const modalCount = await modals.count();
        const addMarginModal = modals.nth(modalCount - 1);
        await expect(addMarginModal).toBeVisible({ timeout: 10000 });

        const inputAmount = addMarginModal.locator('input[name="value"]');
        await inputAmount.fill('1');
        console.log('🪜 ✅ Введено значение "1" в поле Amount');

        const addMarginBtn = addMarginModal.locator('button:has-text("Add margin")');
        await addMarginBtn.click();
        console.log('🪜 ✅ Клик по кнопке Add margin');

        await expect(addMarginModal).toHaveCount(0, { timeout: 10000 });

        const marginAfterAddText = await valueBeforeLocator.textContent();
        const marginAfterAdd = parseFloat(marginAfterAddText.replace(/[^\d.]/g, ''));
        console.log(`🪜 ✅ Значение маржи после Add margin: ${marginAfterAdd}`);

        const removeBtn = closeModal.locator('button:has-text("Remove")');
        await removeBtn.click();

        const removeModal = modals.nth(await modals.count() - 1);
        await expect(removeModal).toBeVisible({ timeout: 10000 });

        const removeInput = removeModal.locator('input[name="amount"]');
        await removeInput.fill('1');
        console.log('🪜 ✅ Введено значение "1" в Remove margin');

        const removeMarginBtn = removeModal.locator('button:has-text("Remove margin")');
        await removeMarginBtn.click();
        console.log('🪜 ✅ Клик по кнопке Remove margin');

        await expect(removeModal).toHaveCount(0, { timeout: 10000 });

        const marginFinalText = await valueBeforeLocator.textContent();
        const marginFinal = parseFloat(marginFinalText.replace(/[^\d.]/g, ''));
        console.log(`🪜 ✅ Значение маржи после Remove margin: ${marginFinal}`);

        if (marginAfterAdd - marginFinal < 0.9) {
          throw new Error(`❌ Значение маржи не уменьшилось: до=${marginAfterAdd}, после=${marginFinal}`);
        }

        console.log('✅ Проверка Add и Remove margin прошла успешно');
      });
    }
  }
});
