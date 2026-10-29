const {test, expect} = require('@playwright/test');

//Login Fail
test.only('Login Test', async({browser})=> {

  //Create a new browser context and page
  const context = await browser.newContext();
  const page = await context.newPage();

  await page.goto('https://rahulshettyacademy.com/loginpagePractise/');

  await expect(page.locator('.termsText')).toHaveText(' I Agree to the terms and conditions');

  //Define locators
  const signIn = page.locator('#signInBtn');
  const username = page.locator('#username');
  const password = page.locator('#password');
  const terms = page.locator('#terms');
  const productLinks = page.locator(".card-body a");

  // Fail login with incorrect password
  await username.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mKx');
  await terms.check();
  await signIn.click();
  
  //Display block access (Toggle) Handle login failure message and verify it contains 'Incorrect'
  console.log(await page.locator("[style*='block']").textContent());
  await expect(page.locator("[style*='block']")).toContainText('Incorrect');
  
  //If fail login than retry with correct password
  await username.fill('rahulshettyacademy');
  await password.fill('Learning@830$3mK2');
  await signIn.click();

  console.log(await productLinks.first().textContent());
  console.log(await productLinks.nth(1).textContent());

  //Get all the product links and click on the second one
  console.log(await productLinks.allInnerTexts());
  console.log("==================");
  console.log(await productLinks.allTextContents());

  //await productLinks.nth(1).click();

  await page.waitForTimeout(5000);
 
});