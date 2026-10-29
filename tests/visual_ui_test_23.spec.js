const {test, expect,request} = require('@playwright/test');


// TAKE a Screenshot | UI or Visual Comparizon
test("Screenshot & Visual Comparision",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    await page.waitForLoadState('networkidle');

    await expect(page.locator("#displayed-text")).toBeVisible();
    //screenshot locator level
    await page.locator("#displayed-text").screenshot({path:"partial_screenshot.png"});

    await page.waitForTimeout(2000);

    await page.locator("#hide-textbox").click();
    
    //screenshot full
    //await page.screenshot({path:'screenshot/screenshot.png'})

    await expect(page.locator("#displayed-text")).toBeHidden();
});

// Visual(UI) Testing : Means Day to Day take a page screenshop and compare current image with previous one if any change than it Fails
// Changes in Design | Elements | Lable or anythings
// Screenshot : store => screenshot => Compare => Result

test.only("UI/Visual Testing",async({page})=>{

    await page.goto("https://csddev.formidium.com/login");

    expect(await page.screenshot()).toMatchSnapshot('landing.png')
})
