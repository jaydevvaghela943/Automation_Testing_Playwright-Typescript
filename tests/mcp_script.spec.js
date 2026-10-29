const { test, expect } = require('@playwright/test');
const { LoginPagePractise } = require('../pageobjects/LoginPagePractise');

test('Login to practise page and verify iphone X on shop', async ({ page }) => {
    const login = new LoginPagePractise(page);

    await login.goTo();
    await login.fillCredentials('rahulshettyacademy', 'Learning@830$3mK2');
    await login.acceptTerms();
    await login.clickSignIn();

    // Wait until navigated to shop page
    await page.waitForURL('https://rahulshettyacademy.com/angularpractice/shop', { timeout: 10000 });

    // Verify product "iphone X" is visible on the page
    const iphoneLocator = page.locator("text=iphone X");
    await expect(iphoneLocator).toBeVisible();
});
