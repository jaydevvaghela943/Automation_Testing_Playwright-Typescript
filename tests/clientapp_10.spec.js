const {test, expect} = require('@playwright/test');

// Short method : getByText, getByRole
test("Client app login",async({page})=>{

    await page.goto("https://rahulshettyacademy.com/client");
    
    const email = "netstaffle@gmail.com";
    const password= "Iamking@000";

    //login with valid credentials
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill(password);
    await page.getByRole("button",{name:'login'}).click();

    await page.waitForLoadState('networkidle');

    //shortcut instead of loop
    await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();
    await page.getByRole("listitem").getByRole("button",{name:"Cart"}).click();

    //checkout page
    await page.locator("div li").first().waitFor();
    await expect(page.getByText("ZARA COAT 3")).toBeVisible();
    await page.getByRole("button",{name:"Checkout"}).click();

    //Payment page
    await page.getByPlaceholder("Select Country").pressSequentially("Ind");
    await page.getByRole("button",{name:"India"}).nth(1).click();
    await page.getByText("PLACE ORDER").click();

    await page.getByText("Thankyou for the order.");
    await expect(page.getByText("Thankyou for the order.")).toBeVisible();


    await page.waitForTimeout(5000);

})