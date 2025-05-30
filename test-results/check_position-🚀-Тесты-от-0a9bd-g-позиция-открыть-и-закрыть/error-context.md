# Test info

- Name: 🚀 Тесты открытия и закрытия позиций (по всем парам) >> 🔁 ADAUSD: Long позиция: открыть и закрыть
- Location: D:\Javascript\ad_removemargin_test\tests\check_position.test.js:22:7

# Error details

```
Error: expect(locator).toHaveURL(expected)

Locator: locator(':root')
Expected pattern: /\/accounts/
Received string:  "https://app.upscale.stormtrade.dev/debug/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZmRjNzI4NS05MDVjLTQzNTAtYWQ5MS03YzkwODEwMDRmODEiLCJwdXJwb3NlIjoicmVmcmVzaCIsImlhdCI6MTc0NzgyMDAyMiwiZXhwIjoxNzUwNDEyMDIyfQ.T3OWUvkASwBwk8Vn6QFF9ghfHUsS4qyh-yfBAljglzz32VH7ZgJE3DmrCF3TUDPopSxNMOHKRXBEMWXMj_li4brlQQIUkiT9FOlb9qmPLss6mZcR7cLxhRwKPTZBnLUHqyww22sqhOhn9UQ4dFjNG1D0qlS4V61xrdDoAMof7kFv9feZI_mvWNo-X2QBjUAHkDklid2KfKts1pl5_NcMgcT61QtwNWeg4S1xSfWRk8rUuNlcoN9XcriDlPULUpvSF7kC3NissdGYCMGNawRiGliBkloDrjTq1xJP8nHXsyytPjVky_u1TUEevKzVrKl7qY0mTmdHw_b_KnIjwDap-dWeMz_onM-y0Z03sG261NVvO3w5JFJbo1UXSWp4Dkei9Rm_qj1aVybCFG0hkXvIOIh9HfORskU8350ZhtYQnOUBsKjFxpTCckpsY1IJjaaO0uZwLTHNdrWfoiENv2VQw9ZeW0Ty1Xofc9EbKRIVvgbS9z1k_dGyUToNRvAUJ_Xg2ednN5SWBRziAxfid3cg3YholsdDkMbkwZ17E0yA-9q6LUvxlmuFtDxeReuonLBjN9FEzaaZadxHBkXr2CQq7pWbMyhG-1c8-6BaLLOytILJr9bEeNJunkOWGuzBsFwm166G0O9D_LEaKYAaI7XtYATzenK_8vckpHCAA6l5n8Y"
Call log:
  - expect.toHaveURL with timeout 10000ms
  - waiting for locator(':root')
    4 × locator resolved to <html lang="en">…</html>
      - unexpected value "https://app.upscale.stormtrade.dev/debug/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZmRjNzI4NS05MDVjLTQzNTAtYWQ5MS03YzkwODEwMDRmODEiLCJwdXJwb3NlIjoicmVmcmVzaCIsImlhdCI6MTc0NzgyMDAyMiwiZXhwIjoxNzUwNDEyMDIyfQ.T3OWUvkASwBwk8Vn6QFF9ghfHUsS4qyh-yfBAljglzz32VH7ZgJE3DmrCF3TUDPopSxNMOHKRXBEMWXMj_li4brlQQIUkiT9FOlb9qmPLss6mZcR7cLxhRwKPTZBnLUHqyww22sqhOhn9UQ4dFjNG1D0qlS4V61xrdDoAMof7kFv9feZI_mvWNo-X2QBjUAHkDklid2KfKts1pl5_NcMgcT61QtwNWeg4S1xSfWRk8rUuNlcoN9XcriDlPULUpvSF7kC3NissdGYCMGNawRiGliBkloDrjTq1xJP8nHXsyytPjVky_u1TUEevKzVrKl7qY0mTmdHw_b_KnIjwDap-dWeMz_onM-y0Z03sG261NVvO3w5JFJbo1UXSWp4Dkei9Rm_qj1aVybCFG0hkXvIOIh9HfORskU8350ZhtYQnOUBsKjFxpTCckpsY1IJjaaO0uZwLTHNdrWfoiENv2VQw9ZeW0Ty1Xofc9EbKRIVvgbS9z1k_dGyUToNRvAUJ_Xg2ednN5SWBRziAxfid3cg3YholsdDkMbkwZ17E0yA-9q6LUvxlmuFtDxeReuonLBjN9FEzaaZadxHBkXr2CQq7pWbMyhG-1c8-6BaLLOytILJr9bEeNJunkOWGuzBsFwm166G0O9D_LEaKYAaI7XtYATzenK_8vckpHCAA6l5n8Y"
    2 × locator resolved to <html lang="en" data-theme="light">…</html>
      - unexpected value "https://app.upscale.stormtrade.dev/debug/eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI0ZmRjNzI4NS05MDVjLTQzNTAtYWQ5MS03YzkwODEwMDRmODEiLCJwdXJwb3NlIjoicmVmcmVzaCIsImlhdCI6MTc0NzgyMDAyMiwiZXhwIjoxNzUwNDEyMDIyfQ.T3OWUvkASwBwk8Vn6QFF9ghfHUsS4qyh-yfBAljglzz32VH7ZgJE3DmrCF3TUDPopSxNMOHKRXBEMWXMj_li4brlQQIUkiT9FOlb9qmPLss6mZcR7cLxhRwKPTZBnLUHqyww22sqhOhn9UQ4dFjNG1D0qlS4V61xrdDoAMof7kFv9feZI_mvWNo-X2QBjUAHkDklid2KfKts1pl5_NcMgcT61QtwNWeg4S1xSfWRk8rUuNlcoN9XcriDlPULUpvSF7kC3NissdGYCMGNawRiGliBkloDrjTq1xJP8nHXsyytPjVky_u1TUEevKzVrKl7qY0mTmdHw_b_KnIjwDap-dWeMz_onM-y0Z03sG261NVvO3w5JFJbo1UXSWp4Dkei9Rm_qj1aVybCFG0hkXvIOIh9HfORskU8350ZhtYQnOUBsKjFxpTCckpsY1IJjaaO0uZwLTHNdrWfoiENv2VQw9ZeW0Ty1Xofc9EbKRIVvgbS9z1k_dGyUToNRvAUJ_Xg2ednN5SWBRziAxfid3cg3YholsdDkMbkwZ17E0yA-9q6LUvxlmuFtDxeReuonLBjN9FEzaaZadxHBkXr2CQq7pWbMyhG-1c8-6BaLLOytILJr9bEeNJunkOWGuzBsFwm166G0O9D_LEaKYAaI7XtYATzenK_8vckpHCAA6l5n8Y"

    at D:\Javascript\ad_removemargin_test\tests\check_position.test.js:29:28
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 | import { getValidRefreshToken } from './utils/tokenManager.js';
   3 |
   4 | const tradingPairs = [
   5 |   '1000SHIBUSD', 'AAVEUSD', 'ADAUSD', 'AEROUSD', 'AI16ZUSD', 'ALGOUSD', 'ARBUSD', 'ATOMUSD',
   6 |   'AXSUSD', 'BCHUSD', 'BERAUSD', 'BGBUSD', 'BRETTUSD', 'BSVUSD', 'CAKEUSD', 'CHZUSD',
   7 |   'CROUSD', 'CRVUSD', 'DASHUSD', 'DEEPUSD', 'DEXEUSD', 'DOTUSD', 'EIGENUSD', 'ENAUSD',
   8 |   'ENSUSD', 'ETCUSD', 'FARTCOINUSD', 'FETUSD', 'FILUSD', 'FLOKIUSD', 'FLOWUSD', 'GALAUSD',
   9 |   'GRASSUSD', 'GRTUSD', 'HBARUSD', 'ICPUSD', 'IMXUSD', 'INJUSD', 'IOTAUSD', 'IPUSD',
   10 |   'JASMYUSD', 'JTOUSD', 'JUPUSD', 'KAIAUSD', 'KASUSD', 'LDOUSD', 'MANAUSD', 'MKRUSD',
   11 |   'MNTUSD', 'MOVEUSD', 'NEARUSD', 'OPUSD', 'PENDLEUSD', 'POLUSD', 'POPCATUSD', 'PYTHUSD',
   12 |   'RAYUSD', 'RENDERUSD', 'RUNEUSD', 'SUSD', 'SANDUSD', 'SEIUSD', 'STRKUSD', 'TAOUSD',
   13 |   'TIAUSD', 'TURBOUSD', 'UNIUSD', 'VETUSD', 'VIRTUALUSD', 'WALUSD', 'XLMUSD', 'XMRUSD',
   14 |   'XTZUSD', 'ZECUSD'
   15 | ];
   16 |
   17 | const directions = ['Long'];
   18 |
   19 | test.describe('🚀 Тесты открытия и закрытия позиций (по всем парам)', () => {
   20 |   for (const pair of tradingPairs) {
   21 |     for (const direction of directions) {
   22 |       test(`🔁 ${pair}: ${direction} позиция: открыть и закрыть`, async ({ page }) => {
   23 |         const username = 'mrcheck_1';
   24 |         const refreshToken = await getValidRefreshToken(username);
   25 |         console.log('🗃️ Используем сохранённый refreshToken из кеша');
   26 |
   27 |         const debugUrl = `https://app.upscale.stormtrade.dev/debug/${refreshToken}`;
   28 |         await page.goto(debugUrl, { waitUntil: 'domcontentloaded', timeout: 60000 });
>  29 |         await expect(page).toHaveURL(/\/accounts/, { timeout: 10000 });
      |                            ^ Error: expect(locator).toHaveURL(expected)
   30 |         console.log('🪜 ✅ Авторизация прошла');
   31 |
   32 |         const tradeUrl = `https://app.upscale.stormtrade.dev/trade/${pair}?collateral=USD&tab=positions`;
   33 |         await page.goto(tradeUrl, { waitUntil: 'domcontentloaded', timeout: 30000 });
   34 |         console.log(`🪜 ✅ Перешли на страницу ${pair} для ${direction}`);
   35 |
   36 |         const amountInput = page.locator('[data-testid="order-creation-card-asset-amount-input"]');
   37 |         await amountInput.fill('10');
   38 |         console.log('🪜 🟢 Введена сумма 10');
   39 |
   40 |         const leverageInput = page.locator('input[name="leverage"]:not([type="hidden"])');
   41 |         await leverageInput.click();
   42 |         await leverageInput.press('Control+A');
   43 |         await leverageInput.press('Backspace');
   44 |         await leverageInput.type('3');
   45 |         console.log('🪜 🟢 Введено плечо 3');
   46 |
   47 |         const directionTab = page.locator('div.css-1i4hgyt', { hasText: direction });
   48 |         await directionTab.click();
   49 |         console.log(`🪜 🟢 Клик по вкладке ${direction}`);
   50 |
   51 |         const openButton = page.locator('[data-testid="open-position-button"]');
   52 |         await expect(openButton).toBeEnabled();
   53 |         await openButton.click();
   54 |         console.log(`🪜 🟢 Открытие позиции ${direction}`);
   55 |
   56 |         const positionCell = page.locator('td.css-1h2uzaz').first();
   57 |         await positionCell.click();
   58 |
   59 |         const closeModal = page.locator('section.chakra-modal__content', { hasText: 'Position info' });
   60 |
   61 |         const valueBeforeLocator = closeModal
   62 |           .locator('p.chakra-text.css-14es400', { hasText: 'Margin' })
   63 |           .locator('..')
   64 |           .locator('p.chakra-text.css-1ngrxjw')
   65 |           .first();
   66 |
   67 |         await expect(valueBeforeLocator).toBeVisible({ timeout: 5000 });
   68 |         const valueBeforeText = await valueBeforeLocator.textContent();
   69 |         const valueBefore = parseFloat(valueBeforeText.replace(/[^\d.]/g, ''));
   70 |         console.log(`🪜 📌 Значение ДО Add margin: ${valueBefore}`);
   71 |
   72 |         const addBtn = page.locator('button.chakra-button.css-1nv6kk2', { hasText: 'Add' });
   73 |         await addBtn.click();
   74 |
   75 |         const modals = page.locator('section.chakra-modal__content');
   76 |         const modalCount = await modals.count();
   77 |         const addMarginModal = modals.nth(modalCount - 1);
   78 |         await expect(addMarginModal).toBeVisible({ timeout: 10000 });
   79 |
   80 |         const inputAmount = addMarginModal.locator('input[name="value"]');
   81 |         await inputAmount.fill('1');
   82 |         console.log('🪜 ✅ Введено значение "1" в поле Amount');
   83 |
   84 |         const addMarginBtn = addMarginModal.locator('button:has-text("Add margin")');
   85 |         await addMarginBtn.click();
   86 |         console.log('🪜 ✅ Клик по кнопке Add margin');
   87 |
   88 |         await expect(addMarginModal).toHaveCount(0, { timeout: 10000 });
   89 |
   90 |         const marginAfterAddText = await valueBeforeLocator.textContent();
   91 |         const marginAfterAdd = parseFloat(marginAfterAddText.replace(/[^\d.]/g, ''));
   92 |         console.log(`🪜 ✅ Значение маржи после Add margin: ${marginAfterAdd}`);
   93 |
   94 |         const removeBtn = closeModal.locator('button:has-text("Remove")');
   95 |         await removeBtn.click();
   96 |
   97 |         const removeModal = modals.nth(await modals.count() - 1);
   98 |         await expect(removeModal).toBeVisible({ timeout: 10000 });
   99 |
  100 |         const removeInput = removeModal.locator('input[name="amount"]');
  101 |         await removeInput.fill('1');
  102 |         console.log('🪜 ✅ Введено значение "1" в Remove margin');
  103 |
  104 |         const removeMarginBtn = removeModal.locator('button:has-text("Remove margin")');
  105 |         await removeMarginBtn.click();
  106 |         console.log('🪜 ✅ Клик по кнопке Remove margin');
  107 |
  108 |         await expect(removeModal).toHaveCount(0, { timeout: 10000 });
  109 |
  110 |         const marginFinalText = await valueBeforeLocator.textContent();
  111 |         const marginFinal = parseFloat(marginFinalText.replace(/[^\d.]/g, ''));
  112 |         console.log(`🪜 ✅ Значение маржи после Remove margin: ${marginFinal}`);
  113 |
  114 |         if (marginAfterAdd - marginFinal < 0.9) {
  115 |           throw new Error(`❌ Значение маржи не уменьшилось: до=${marginAfterAdd}, после=${marginFinal}`);
  116 |         }
  117 |
  118 |         console.log('✅ Проверка Add и Remove margin прошла успешно');
  119 |       });
  120 |     }
  121 |   }
  122 | });
  123 |
```