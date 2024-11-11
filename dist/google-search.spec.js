"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const test_1 = require("@playwright/test");
(0, test_1.test)('Google search functionality', async ({ page }) => {
    // 1. Переходим на google.com
    await page.goto('https://www.google.com');
    // 2. Вводим в поле поиска "Автотесты"
    const searchInput = await page.locator('.gLFyf');
    await searchInput.click();
    //await searchInput.waitFor({ state: 'visible', timeout: 60000 });
    await searchInput.type('autotests');
    // 3. Нажимаем кнопку "Поиск в Google"
    const searchButton = await page.locator('.gNO89b').first();
    //await searchButton.waitFor({ state: 'visible', timeout: 60000 });
    await searchButton.click();
    // 4. Проверяем переход на страницу с результатами поиска
    await (0, test_1.expect)(page).toHaveURL(/search/);
    // 5. Проверяем наличие логотипа на странице результатов
    const logo = page.locator('.logo');
    await (0, test_1.expect)(logo).toBeVisible();
    // // 6. Проверяем количество результатов поиска на первой странице (блоки результатов)
    // const results = page.locator('.g');
    // const resultsCount = await results.count();
    // expect(resultsCount).toBeGreaterThan(0);
    // 7. Проверяем, что есть несколько страниц результатов
    const pagination = page.locator('#pnnext');
    await (0, test_1.expect)(pagination).toBeVisible();
    // 8. Проверяем наличие кнопки "Очистить" (кнопка очищения в строке поиска)
    const clearButton = page.locator("M2vV3.vOY7J"); // Исправленный селектор
    await (0, test_1.expect)(clearButton).toBeVisible();
    // 9. Нажимаем кнопку "Очистить" и проверяем, что строка поиска пуста
    await clearButton.click();
    const searchInputValue = await searchInput.inputValue(); // Получаем текущее значение поля
    (0, test_1.expect)(searchInputValue).toBe(''); // Проверяем, что оно пустое
});
