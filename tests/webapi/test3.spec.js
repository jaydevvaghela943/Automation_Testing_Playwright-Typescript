const {test, expect,request} = require('@playwright/test');

//Storestate : store cookies, session 
let webContext;
test.beforeAll("Intial load scripts",async({browser})=>{
    const context   = await browser.newContext(); // add cookies, session at browser level
    const page      = await context.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.locator("#userEmail").fill("anshika@gmail.com");
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();
    await page.waitForLoadState('networkidle');

    //store cookies or session at browser state
    await context.storageState({path:'state.json'});

    //Inject existing data
    //Add session file into new browser : apply on new page
    webContext = await browser.newContext({storageState:'state.json'})
});

test("Client Login test 1",async()=>{
    const page = await webContext.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.waitForLoadState("networkidle");

    const product1 = await page.locator(".card-body");
    const count = await product1.count();
    console.log("count 1: " + count);
});


test("Client Login test 2",async()=>{
    const page = await webContext.newPage();

    await page.goto('https://rahulshettyacademy.com/client/');
    await page.waitForLoadState("networkidle");
    const product1 = await page.locator(".card-body");
    const count = await product1.count();
    console.log("count 2: " + count);
});

