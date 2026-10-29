const {test, expect} = require('@playwright/test');

test("Playwright popup validation",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("#hide-textbox").click();
    await expect(page.locator("#displayed-text")).toBeHidden();

    //Confirm Popup
    
     page.on('dialog', (dialog) =>{ 
        console.log("Dialog type==",dialog.type())
        dialog.dismiss();   // cancel
        //dialog.accept();    //Accept
        //dialog.dismiss();   // cancel
    });

    await page.locator("#confirmbtn").click();
    await page.locator("#mousehover").scrollIntoViewIfNeeded();
    await page.locator("#mousehover").hover();

    await page.locator(".mouse-hover-content a").first().click();


    await page.waitForTimeout(3000);
});

