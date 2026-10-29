const {test, expect,request} = require('@playwright/test');
const {ApiUtils} = require("../utils/ApiUtils");
//API Testing :
//jasascript object use : run time convert javascript object to JSON
const loginPayload = {userEmail:"netstaffle@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]}


let response;
test.beforeAll("API Testing",async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    response =  await apiUtils.createOrder(orderPayload);
});


//Normal Action
test("Playwright API test check",async({page})=>{
    // Add Javascript code here to store login or token in cookies
    // here value = token which pass on function last
    // Direct login in system by API and Token will be used in all test cases
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },response.token);

    console.log("response.token===",response.token);

    //Refrest page
    await page.goto("https://rahulshettyacademy.com/client");

    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();

    //every method await is required
    const rows = await page.locator("tbody tr");
    for(let i=0;i<await rows.count(); i++){
        const rowOrderId =await rows.nth(i).locator("th").textContent();
        if (response.orderId.includes(rowOrderId))
        {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }

    const orderIdDetails =await page.locator("div.col-text").textContent();
    console.log("response.orderId===",response.orderId)
    await expect(response.orderId.includes(orderIdDetails.trim())).toBeTruthy();

    //Wait page
    await page.waitForTimeout(5000);
});
