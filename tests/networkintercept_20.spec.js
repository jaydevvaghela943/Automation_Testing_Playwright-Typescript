const {test, expect,request} = require('@playwright/test');
const {ApiUtils} = require("./utils/ApiUtils");

//Network Intercept : Dynamic APi/Web response revert or set fake response

const loginPayload = {userEmail:"netstaffle@gmail.com",userPassword:"Iamking@000"};
const orderPayload = {orders:[{country:"India",productOrderedId:"6960eac0c941646b7a8b3e68"}]};
const fakeOrderPayloads = {data:[],message:"No Orders"};

let response;
test.beforeAll(async()=>{
    const apiContext = await request.newContext();
    const apiUtils = new ApiUtils(apiContext,loginPayload);
    response =  await apiUtils.createOrder(orderPayload);
});


//Normal Action
test("Playwright API test check",async({page})=>{
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },response.token);

    //Refrest page
    await page.goto("https://rahulshettyacademy.com/client");

    //  Set Fake response before click on myorder : Network Intercept
    //  Intercepting Response => API Response => Set Playwright Fake Response => Browser => Render Data
    // ID make a dynamic or set "*"
    await page.route("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a21617f17ee3e78babad4a4",
    async route=>{
    
        //fetch request
       const response =await page.request.fetch(route.request());
       let body = JSON.stringify(fakeOrderPayloads);

        // pass data into browser
       route.fulfill({
        response,
        body,
       }); 
    })

    await page.locator("button[routerlink*='myorders']").click();
    //Wait to Intercept Request
    await page.waitForResponse("https://rahulshettyacademy.com/api/ecom/order/get-orders-for-customer/6a21617f17ee3e78babad4a4");
    //verify no data found response
    console.log(await page.locator(".mt-4").textContent());

    //Wait page
    //await page.waitForTimeout(5000);
});