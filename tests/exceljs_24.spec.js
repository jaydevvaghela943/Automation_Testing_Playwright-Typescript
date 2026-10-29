const {test, expect} = require('@playwright/test');
//npm i exceljs

test("exceljs Npm pacakge features Check",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/offers");
});