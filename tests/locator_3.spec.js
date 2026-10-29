const {test, expect} = require('@playwright/test');

test("Playwright context validation login test", async ({page}) => {
    await page.goto('https://rahulshettyacademy.com/client/');

    //Verify the login page title
    await expect(page.locator('.login-title')).toHaveText('Log in');

    //Login with valid credentials
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();

    //Wait untill all network calls are finished and page is loaded
    await page.waitForLoadState('networkidle');
    
    //Wait for the product titles (For single element only) to be visible on the page
    //await page.locator(".card-body b").first().waitFor();

    const titles = await page.locator(".card-body b").allTextContents();
    console.log(titles);

    //waitForLoadState('networkidle') : wait for the page to load completely before proceeding with the next steps


});