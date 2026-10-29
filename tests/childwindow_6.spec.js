const {test, expect} = require('@playwright/test');

//Child or new tab Window handling
test("Child Window handling test", async ({browser}) => {
    //Create a new browser context and page
    const context = await browser.newContext();
    const page = await context.newPage();

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Document Link
    const documentlink= page.locator("[href*='documents-request']");

    //Wait for the new page to open and click on the document link
    const [newPage] = await Promise.all([
         //Wait for the new page to open : page status pending,resolved,rejected
        context.waitForEvent('page'),
        documentlink.click() // new page will open
    ]);
    
    //Get the title of the new page
    const title = await newPage.title();
    await expect(title).toBe("RS Academy");

    //Get the title of the parent page
    console.log("Parent page==>",await page.title());

    await newPage.waitForTimeout(5000);
}); 

//Different between TextContent and valueInput
test.only("TextContent vs valueInput test", async ({page}) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const userName = page.locator("#username");

    //Get the value of the input field using valueInput : dynamic value get
    const valueInput = await userName.inputValue();
    console.log("Value Input==>",valueInput);

    //Get the text content of the input field using textContent which is static value get
    const textContent = await userName.textContent();
    console.log("Text Content==>",textContent);
}); 