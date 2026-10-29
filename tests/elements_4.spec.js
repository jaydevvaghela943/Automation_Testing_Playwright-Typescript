const {test, expect} = require('@playwright/test');

//Test case : Web Elements
// Dropdown,Radio,checkbox


test("Web Elements test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await expect(page.locator('.termsText')).toHaveText(' I Agree to the terms and conditions');

    //Define locators
    const signIn = page.locator('#signInBtn');
    const username = page.locator('#username');
    const password = page.locator('#password');

    //fill username and password
    await username.fill('rahulshettyacademy');
    await password.fill('Learning@830$3mK2');

    //Select dropdown value : Options to select dropdown value
    await page.locator("select").selectOption("consult"); //value
    //await page.locator("select").selectText('Consultant'); // text
    //await page.locator("select").selectOption({label: "Consultant"}); //text label

    //checkbox and verify checkbox is checked
    await page.locator("#terms").check();
    await expect(page.locator("#terms")).toBeChecked();

    //uncheck and verify checkbox is unchecked
    await page.locator("#terms").uncheck();
    //await expect(page.locator("#terms")).not.toBeChecked();
    //await expect(page.locator("#terms")).toBeUnchecked();
    await expect(await page.locator("#terms").isChecked()).toBeFalsy(); //checked false

    //Radio button
    await page.locator("span.radiotextsty").last().check();
    await page.locator("#okayBtn").click();

    //verify radio button is checked
    console.log("Radio===",await page.locator("span.radiotextsty").last().isChecked());
    await expect(page.locator("span.radiotextsty").last()).toBeChecked();

    await signIn.click();

    //playwright inspector : Debugging tool
    //await page.pause();

    await page.waitForTimeout(5000);


});