const {test, expect} = require('@playwright/test');

//Debug : npx playwright test "yxz.spec.js" --debug

// Debug: Run code and screen One-By-One debug on screen
// Generate run time locator Xpath from Debug screen
test("Playwright calendar element validation check",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
});