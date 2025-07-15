import { test, expect } from '@playwright/test';
import { getValidRefreshToken } from './utils/tokenManager.js';

const tradingPairs = [
  'BTC_USD', 'ETH_USD', 'KAITO_USD', 'TON_USD', 'TRUMP_USD', 'XRP_USD', '1000BONK_USD',
  '1000PEPE_USD', '1000SHIB_USD', 'AAVE_USD', 'ADA_USD', 'AERO_USD', 'AI16Z_USD',
  'ALGO_USD', 'APT_USD', 'ARB_USD', 'ATOM_USD', 'AVAX_USD', 'AXS_USD', 'BCH_USD',
  'BERA_USD', 'BGB_USD', 'BNB_USD', 'BRETT_USD', 'BSV_USD', 'CAKE_USD', 'CHZ_USD',
  'CRO_USD', 'CRV_USD', 'DASH_USD', 'DEEP_USD', 'DEXE_USD', 'DOGE_USD', 'DOT_USD',
  'DYDX_USD', 'EIGEN_USD', 'ENA_USD', 'ENS_USD', 'ETC_USD', 'FARTCOIN_USD', 'FET_USD',
  'FIL_USD', 'FLOKI_USD', 'FLOW_USD', 'GALA_USD', 'GRASS_USD', 'GRT_USD', 'HBAR_USD',
  'ICP_USD', 'IMX_USD', 'INJ_USD', 'IOTA_USD', 'IP_USD', 'JASMY_USD', 'JTO_USD',
  'JUP_USD', 'KAIA_USD', 'KAS_USD', 'LDO_USD', 'LINK_USD', 'LTC_USD', 'MANA_USD',
  'MKR_USD', 'MNT_USD', 'MOVE_USD', 'NEAR_USD', 'ONDO_USD', 'OP_USD', 'ORDI_USD',
  'PENDLE_USD', 'PENGU_USD', 'PNUT_USD', 'POL_USD', 'POPCAT_USD', 'PYTH_USD',
  'RAY_USD', 'RENDER_USD', 'RUNE_USD', 'S_USD', 'SAND_USD', 'SEI_USD', 'SOL_USD',
  'STRK_USD', 'SUI_USD', 'TAO_USD', 'TIA_USD', 'TRX_USD', 'TURBO_USD', 'UNI_USD',
  'VET_USD', 'VIRTUAL_USD', 'WAL_USD', 'WIF_USD', 'WLD_USD', 'XLM_USD', 'XMR_USD',
  'XTZ_USD', 'ZEC_USD', 'ZRO_USD'
];


const directions = ['Short'];

test.describe('🚀 Проверка add/remove  margin (по всем парам)', () => {
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

        // ✅ Получаем значение маржи ДО Add margin
        const valueBeforeLocator = closeModal
          .locator('p.chakra-text.css-14es400', { hasText: 'Margin' })
          .locator('..')
          .locator('p.chakra-text.css-1ngrxjw')
          .first();

        await expect(valueBeforeLocator).toBeVisible({ timeout: 5000 });
        const valueBeforeText = await valueBeforeLocator.textContent();
        const valueBefore = parseFloat(valueBeforeText.replace(/[^\d.]/g, ''));
        console.log(`🪜 📌 Значение ДО Add margin: ${valueBefore}`);

        // Add margin
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

        // Remove margin
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
