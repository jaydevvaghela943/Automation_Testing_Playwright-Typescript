const {test, expect} = require('@playwright/test');

//Iframe : child frame access
// page.framelocator : fpage
test("Playwright popup validation",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");

    const framePage = await page.frameLocator("#courses-iframe");
    await framePage.locator("li a[href*='lifetime-access']:visible").click();

    await page.waitForTimeout(3000);
});