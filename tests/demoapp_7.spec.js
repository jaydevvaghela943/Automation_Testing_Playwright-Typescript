const {test, expect} = require('@playwright/test');

//demoapp_7.spec.js
//E2E test case for demo application : https://rahulshettyacademy.com/client/

//Dropdown handling in Playwright : autosuggest dropdown, static dropdown, dynamic dropdown

// login ==> homepage => select product => add to cart => cart page
// checkout => fill detail => place order => thank you page
// click on order history => my order => view order => finish

test('Demo Application and Test Scenario Automation', async ({page}) => {

    const email = "anshika@gmail.com";
    //register => Login = > Add to Cart => Checkout => Logout
    await page.goto('https://rahulshettyacademy.com/client/');
    //Verify the login page title
    await expect(page.locator('.login-title')).toHaveText('Log in');

    //login with valid credentials
    await page.locator("#userEmail").fill(email);
    await page.locator("#userPassword").fill("Iamking@000");
    await page.locator("#login").click();

    //Wait untill all network calls are finished and page is loaded
    await page.waitForLoadState('networkidle');
    

    //wait for the product titles (For single element only) to be visible on the page
    await page.locator(".card-body").first().waitFor();
    const product1 = await page.locator(".card-body");
    let product_name = 'ZARA COAT 3';

    const count = await product1.count();
    console.log("count: " + count);

    //click on add to cart button for the product with name "ZARA COAT 3"
    for(let i=0; i<count; i++){
        const product_title = await product1.nth(i).locator("b").textContent();
        console.log("product_name: " + product_name);
        if(product_name === product_title){
            await product1.nth(i).locator("text= Add To Cart").click();
            //await product1.nth(i).locator("button.w-10").click();
            break;
        }
    }
    console.log("product_name: " + product_name);
    await page.locator("[routerlink*='cart']").click();

    await page.locator("div li").first().waitFor();
    
    //validate if the product is added to cart
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    //validate if the product is added to cart using text locator
    await expect(page.locator(".cartSection h3")).toHaveText(product_name);
    
    //await page.locator("text=Checkout").click()
    await page.locator("//button[normalize-space()='Checkout']").click()
    
    await page.waitForTimeout(2000);
    //section 1
    await page.locator('.payment__cc input[type="text"]').nth(1).fill("11112");
    await page.locator('.payment__cc input[type="text"]').nth(2).fill('Test Value');

    //date picker handling
    await page.locator('select.ddl').nth(0).selectOption("10");
    await page.locator('select.ddl').nth(1).selectOption("25");

    //Section 2
    //validate the email field is pre-filled with the email used for login
    await expect(page.locator(".user__name [type=text]").first()).toHaveText(email);

    //Dropdown handling : autosuggest dropdown
    await page.locator("//input[@placeholder='Select Country']").pressSequentially("India", {delay: 100});
    await page.waitForTimeout(2000);
    const dropdown =  await page.locator(".ta-results");
    dropdown.waitFor();
    const optionsCount = await dropdown.locator("button").count();
    for(let i=0; i<optionsCount; i++){
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text.trim() === "India"){
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    //Place order and validate the order confirmation message
    
    await page.locator("a.action__submit").click();
    await page.locator(".hero-primary").waitFor();
    await expect(page.locator(".hero-primary")).toHaveText("Thankyou for the order.");

    let orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    orderId = orderId.replaceAll("|","").trim();
    console.log("orderId===>"+orderId);

    //[routerlink*='myorders']
    
    //check product name in order confirmation page
    await expect(page.locator("div.title").first()).toHaveText(product_name);
    
    //order history page
    await page.locator("label[routerlink*='myorders']").click();
    await page.waitForTimeout(2000);

    const orderlist = await page.locator("tr.ng-star-inserted");
    const orderCount = await orderlist.count();

    console.log("orderCount===",orderCount);

    //Goto Order details page
    //orderID.includes(order)
    for(let i=0; i<orderCount; i++){
        const orderVal = await orderlist.locator('th').nth(i).innerText();
        console.log("for loop===",orderVal,"===========",orderId)
        if(orderVal===orderId){
            await orderlist.locator("button:has-text('View')").nth(i).click();
            break; 
        }
    }

    await page.waitForTimeout(2000);

    //validate order id
    await expect(page.locator(".-main")).toHaveText(orderId);

    await page.waitForTimeout(3000);
});