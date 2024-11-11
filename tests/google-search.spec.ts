import { test, expect } from '@playwright/test';

test('Google search functionality', async ({ page }) => {
    // 1. Переходим на google.com
    await page.goto('https://www.google.com');
    await page.waitForTimeout(1500);

    // 2. Вводим в поле поиска "Автотесты"
    const searchInput = await page.locator('textarea.gLFyf');
    await searchInput.click();
    await page.waitForTimeout(1500);

    await searchInput.fill('Автотесты');
    await page.waitForTimeout(1500);

    // 3. Нажимаем кнопку "Поиск в Google"
    const searchButton = await page.locator('.gNO89b').first();
    await searchButton.click();
    await page.waitForTimeout(1500);

    // 4. Проверяем переход на страницу с результатами поиска
    await expect(page).toHaveURL(/search/);
    await page.waitForTimeout(1500);

    // 5. Проверяем наличие логотипа на странице результатов
    const logo = page.locator('.logo');
    await expect(logo).toBeVisible();
    await page.waitForTimeout(1500);

    // Проверка, что на странице есть результаты поиска
    const results = page.locator('.N54PNb.BToiNc');
    const resultsCount = await results.count();
    console.log(`Количество результатов на первой странице: ${resultsCount}`);
    expect(resultsCount).toBeGreaterThan(0);


    // 6. Проверяем, что есть несколько страниц результатов
    const pagination = page.locator('#pnnext');
    await expect(pagination).toBeVisible();
    await page.waitForTimeout(1500);

    // 7. Проверяем наличие кнопки "Очистить" (кнопка очищения в строке поиска)
    const clearButton = page.locator('[jsname="pkjasb"]');
    await expect(clearButton).toBeVisible();
    await page.waitForTimeout(1500);

    // 8. Нажимаем кнопку "Очистить" и проверяем, что строка поиска пуста
    await clearButton.click();
    await page.waitForTimeout(1500);

    // Проверка, что поле поиска пустое
    const searchInputValue = await searchInput.inputValue();
    expect(searchInputValue).toBe('');
});