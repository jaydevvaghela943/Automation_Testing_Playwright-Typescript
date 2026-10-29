 const {test, expect}   = require('@playwright/test');
 const {POManager}      = require('../pageobjects/POManager');
 const  jsonData         = JSON.parse(JSON.stringify(require('../test-data/placeorder_TestData.json')));
 const {customtest}     =  require("../utils/test-base");

 //For Multiple Product Check
 for(let dataSet of jsonData){

    test(`Client App login for ${dataSet.productName}`, async ({page})=>{
        const poManager = new POManager(page);

        //js file- Login js, DashboardPage
        const products = page.locator(".card-body");
        
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(dataSet.username,dataSet.password);
        await page.waitForLoadState('networkidle');

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(dataSet.productName);
        await page.waitForLoadState('networkidle');

        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(dataSet.productName);
        await page.waitForTimeout(3000);

        await cartPage.Checkout();
        await page.waitForLoadState('networkidle');

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await page.waitForTimeout(3000);
        await ordersReviewPage.searchCountryAndSelect("ind","India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });
}
    //custom fixture
    customtest.only('Client App login ==>', async ({page,testDataForOrder})=>{
        const poManager = new POManager(page);

        //js file- Login js, DashboardPage
        const products = page.locator(".card-body");
        
        const loginPage = poManager.getLoginPage();
        await loginPage.goTo();
        await loginPage.validLogin(testDataForOrder.username,testDataForOrder.password);
        await page.waitForLoadState('networkidle');

        const dashboardPage = poManager.getDashboardPage();
        await dashboardPage.searchProductAddCart(testDataForOrder.productName);
        await page.waitForLoadState('networkidle');

        await dashboardPage.navigateToCart();

        const cartPage = poManager.getCartPage();
        await cartPage.VerifyProductIsDisplayed(testDataForOrder.productName);
        await page.waitForTimeout(3000);

        await cartPage.Checkout();
        await page.waitForLoadState('networkidle');

        const ordersReviewPage = poManager.getOrdersReviewPage();
        await page.waitForTimeout(3000);
        await ordersReviewPage.searchCountryAndSelect("ind","India");
        const orderId = await ordersReviewPage.SubmitAndGetOrderId();
        console.log(orderId);
        
        await dashboardPage.navigateToOrders();
        const ordersHistoryPage = poManager.getOrdersHistoryPage();
        await ordersHistoryPage.searchOrderAndSelect(orderId);
        expect(orderId.includes(await ordersHistoryPage.getOrderId())).toBeTruthy();
    });