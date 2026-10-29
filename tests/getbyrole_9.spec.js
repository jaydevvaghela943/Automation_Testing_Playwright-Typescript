const {test, expect} = require('@playwright/test');

//getbyrole_9.spec.js

// GetByRole , GetByPlaceholder , GetByText 
test('Playwright Special locators', async ({ page }) => {
  
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams!").click();
    await page.getByLabel("Employed").check();
    await page.getByLabel("Gender").selectOption("Female");
    await page.getByPlaceholder("Password").fill("abc123");
    await page.getByRole("button", {name: 'Submit'}).click();
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();
    await page.getByRole("link",{name : "Shop"}).click();
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
 
    //locator(css)
});
 
test.only("Playwright GetByRole,GetByPlaceholder and GetByText",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/angularpractice/");

    await page.getByPlaceholder("Password").fill("Demo@123");
    await page.getByRole("button",{name:"Submit"}).click();

    await page.getByText("Success! The Form has been submitted successfully!.").isVisible();

    await page.getByRole("link",{name:"Shop"}).click();
    
    //Filter Tag data
    await page.locator("app-card").filter({hasText:"Samsung Note 8"}).getByRole("button").click();

    //Locator(css) : is the best way

    await page.waitForTimeout(5000);
})