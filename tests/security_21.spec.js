const {test, expect,request} = require('@playwright/test');

//Intercept : Call/Request
//Intercept : response

// Security Test Request Code
test("Platwright Security Test request Intercept",async({page})=>{
    //login and reach orders page
    await page.goto("https://rahulshettyacademy.com/client");
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("[value='Login']").click();
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();

    //wait for the product titles (For single element only) to be visible on the page
    await page.locator("button[routerlink*='myorders']").click();

    // * means any Id : check Un-Authorized id
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=*",
        route=>{
            route.continue({url:"https://rahulshettyacademy.com/api/ecom/order/get-orders-details?id=6a27c26817ee3e78bac9919d"})
    });

    await page.locator("button:has-text('View')").first().click();
    await expect(page.locator("p").last()).toHaveText("You are not authorize to view this order");

})