const playwright    = require('@playwright/test');
const {POManager}   = require('../../pageobjects/POManager');
const { Before, After } = require('@cucumber/cucumber');

/*
 2 parameter here : 1: step title 2: function
Used to call in each senario it work like Playwright hooks like beforeALl, BeforeEach etc..

Methods
===============
Before, After, AfterAll, BeforeAll

In above method we can use name and tag in senario 
Example : BeforeStep({tags: "@foo" | "@foo and @xxx" | "@foo or @xxx"} or BeforeStep({name: "foo"}
*/
Before(async function () {
    const browser   = await playwright.chromium.launch({headless:false});
    const context   = await browser.newContext();
    //const page      = await context.newPage();
    this.page      = await context.newPage();
    this.poManager  = new POManager(this.page);
});


// Asynchronous Promise
After(function () {
    // Assuming this.driver is a selenium webdriver
    console.log("After Hook");
});