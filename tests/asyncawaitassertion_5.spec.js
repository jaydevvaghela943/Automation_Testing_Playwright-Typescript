const {test, expect} = require('@playwright/test');

//Async Await Assertion and Text blinking

test("Async Await Assertion test", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    await page.waitForLoadState('networkidle'); //wait for network idle state
    
    //Assertion with text blinking
    const documentlink= page.locator("[href*='documents-request']");
    await expect(documentlink).toHaveAttribute("class","blinkingText");

    //Assertion with async await
    //If action perform outside than await is outside 
    await expect(page.locator("#terms")).toBeChecked();

    //if action perform inside than await is inside
    expect(await page.locator("#terms").isChecked()).toBeTruthy();


});