const {test, expect} = require('@playwright/test');

//npx playwright test --Ui  : run ui mode

//also we can check and uncheck by lable click
test("Playwright GetByLabel Test",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByLabel("Check me out if you Love IceCreams!").click();

    await page.getByLabel("Employed").click();

    await page.getByLabel("Gender").selectOption("Female"); // If select tag than it work


    await page.waitForTimeout(3000);
});
