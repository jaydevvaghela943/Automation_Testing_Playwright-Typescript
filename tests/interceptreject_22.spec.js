const {test, expect,request} = require('@playwright/test');

// interceptreject_22.spec.js
// Intercept Reject Request : Means Server Down : 501,404 error
// Block : We can also block the call using playwright (.css)
// For Intercept : page.route : method is required
// Example block css : page.route("**/*.css",route=>route.abort());

test("Platwright Intercept : Test reject/block css/js request",async({browser})=>{
    const context = await browser.newContext();
    const page    =  await context.newPage();

    //Block CSS or Images
    //await page.route("**/*.css",route=>route.abort());
    //await page.route("**/*.{jpeg,png,jpg}",route=>route.abort());

    //capture every request and response : here receive any api status 400,404,501 etc means api is fail
    await page.on('request',request=>console.log(request.url()));
    await page.on('response',response=>console.log(response.url(),response.status()));

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    //fill username and password
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator('#password').fill('Learning@830$3mK2');
    await page.locator('#signInBtn').click();

    await page.waitForLoadState('networkidle');
});

