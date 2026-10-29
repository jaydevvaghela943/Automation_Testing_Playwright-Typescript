const {test, expect} = require('@playwright/test');

//By Context page on
test('First Playwright test', async({browser})=> {
  //In Javascript : all the steps are executed in a asynchronous way.
    //step 1 - Open Browser
    //step 2 - Enter username and password
    //sep 3 - Click on login button 

    //create fresh browser context
    const context = await browser.newContext();
    
    //create a new page in the context
    const page = await context.newPage();

  await page.goto('https://www.google.com/');
})



//Only this test will be executed and rest of the tests will be ignored
test.only('First Playwright test 2', async({page})=> {
  await page.goto('https://www.google.com/');

  //validate the title of the page
  await expect(page).toHaveTitle('Google');

});


