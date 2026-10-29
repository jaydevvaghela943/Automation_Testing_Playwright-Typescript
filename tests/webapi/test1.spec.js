const {test, expect,request} = require('@playwright/test');

//API Testing :
//jasascript object use
const loginPayload = {userEmail:"netstaffle@gmail.com",userPassword:"Iamking@000"};
let token;
test.beforeAll("API Testing",async()=>{
    const apiContext =await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {data:loginPayload}
    );
    
    //console.log("loginResponse==",loginResponse);

    //Check if status return : 200,201,203 : validate
    expect((await loginResponse).ok).toBeTruthy();

    //Get Response : 
    //const response_data = (await loginResponse).json(); // response_data will be a Promise, not the actual JSON object.
    const response_data = await (await loginResponse).json();

    //console.log("response_data==",response_data);

    //Store response in variable
    token = response_data.token;

    //console.log("token==",token);
});

test("Playwright API test check",async({page})=>{

    //Add Javascript code here to store login or token in cookies
    //here value = token which pass on function last
    // Direct login in system by API and Token will be used in all test cases
    await page.addInitScript(value=>{
        window.localStorage.setItem('token',value)
    },token);

    //refrest page
    await page.goto("https://rahulshettyacademy.com/client");

    //wait for the product titles (For single element only) to be visible on the page
    const product1 = await page.locator(".card-body");
    let product_name = 'ZARA COAT 3';

    const count = await product1.count();
    console.log("count: " + count);

    await page.waitForTimeout(5000);    
});