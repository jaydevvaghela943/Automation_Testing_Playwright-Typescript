const {Given, When, Then }  = require('@cucumber/cucumber');
const {expect}              = require('@playwright/test');
const playwright            = require('@playwright/test');
const {POManager}           = require('../../pageobjects/POManager');

//intialise the variable So (this.test) we can use in any method or function
Given('a login to ecommerce application with {string} and {string}',{timeout:100*1000}, async function(username,password) {
    //Browser Setup
    /*const browser   = await playwright.chromium.launch({
        headless:false
    });
    const context   = await browser.newContext();
    const page      = await context.newPage();
    this.poManager  = new POManager(page);
    */
    //const poManager = new POManager(page);
    
    const loginPage = this.poManager.getLoginPage();
    await loginPage.goTo();
    await loginPage.validLogin(username,password);
});

When('Add {string} to cart', async function(product) {
    //const dashboardPage = this.poManager.getDashboardPage();
    this.dashboardPage = this.poManager.getDashboardPage();
    await this.dashboardPage.searchProductAddCart(product);
    await this.dashboardPage.navigateToCart();
});

Then('Verify {string} is displayed in the cart',{timeout:100*1000},async function(product) {
    const cartPage = this.poManager.getCartPage();
     // pause 5 seconds

    await cartPage.VerifyProductIsDisplayed(product);
    await cartPage.Checkout();
});

When('Enter valid details and place the order',async function() {
    const ordersReviewPage = this.poManager.getOrdersReviewPage();
    await ordersReviewPage.searchCountryAndSelect("ind","India");
    this.orderId = await ordersReviewPage.SubmitAndGetOrderId();
});

Then('verify order is present in the orderHistory',async function() {
    await this.dashboardPage.navigateToOrders();
    const ordersHistoryPage = this.poManager.getOrdersHistoryPage();
    await ordersHistoryPage.searchOrderAndSelect(this.orderId);
    expect(this.orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
});


//Cucumber Hooks: Different Senario 
Given('a login to ecommerce2 application with {string} and {string}',{timeout:100*1000}, async function(username,password) {
    await this.page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await this.page.locator('#username').fill(username);
    await this.page.locator('#password').fill(password);
    await this.page.locator('#signInBtn').click();
});

//Cucumber Hooks: Different Senario
Then('Verify Errow message is displayed',async function() {
      //Display block access (Toggle) Handle login failure message and verify it contains 'Incorrect'
  console.log(await this.page.locator("[style*='block']").textContent());
  await expect(this.page.locator("[style*='block']")).toContainText('Incorrect');
});