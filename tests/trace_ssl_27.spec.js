const {test, expect} = require('@playwright/test');

//Run test in sequance (one by one : ordered)
  //allure generate ./allure-results --clean : clean old result with new one
  //reporter: [['html',{open:'always',title:'Playwright Report'}],['line'],['allure-playwright']],
  //open report : allure open ./allure-report


//package.json : run or configure many test script based on requirement
 /*
 Example : 

 "scripts": {
    "regression":"npx playwright test",
    "webTests":"npx playwright test --grep @web",
    "ApiTest":"npx playwright test --grep @API",
    "SafariWebTest":"npx playwright test --config playwright-config.js --project=safari"
  },

simple : npm run webTests
*/

test.describe.configure({mode:'serial'});

test("copilot test",async({page})=>{
    await page.goto("https://copilot.microsoft.com/");
})

test("microsoft test",async({page})=>{
    await page.goto("https://microsoft.com/");
})

test("Google test",async({page})=>{
    await page.goto("https://google.com/");
})