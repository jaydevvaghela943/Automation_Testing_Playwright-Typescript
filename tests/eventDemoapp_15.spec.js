const {test, expect} = require('@playwright/test');

test("Playwright calendar element validation check",async({page})=>{
    const username = "student@example.com";
    const password = "secret123";
    const signIn   = await page.locator("#login-btn");
    const eventname = "World Tech Summit";
    const name_rand = Math.random(100);

    await page.goto("https://eventhub.rahulshettyacademy.com/login");
    await page.waitForLoadState('networkidle');

    //Login check
    await page.getByPlaceholder('you@email.com').fill(username);
    await page.getByPlaceholder('••••••').fill(password);
    await signIn.click();

    //Load after login
    await page.waitForLoadState('networkidle');

    //Navigate to event page
    await page.locator("//button[normalize-space()='Admin']").click();
    await page.locator("nav a[href*='/admin/events']").click();

    //Fill event form
    await page.locator("#event-title-input").fill("This is demo data"+name_rand);
    await page.getByPlaceholder("Describe the event…").fill("This is demo data");
    await page.locator("#category").selectOption("Sports");
    await page.locator("#city").fill("Ahmedabad");
    await page.locator("#venue").fill("Ahmedabad, Gujarat, India");
    await page.locator("//input[@id='price-($)']").fill('500');

    await page.getByRole('textbox', { name: 'Event Date & Time*' }).fill('2026-06-17T00:00');
    await page.locator("#city").click();

    await page.locator("#total-seats").fill('25');
    await page.locator("//input[@id='image-url-(optional)']").fill("https://www.udemy.com/staticx/udemy/images/v7/logo-udemy-inverted.svg");

    await page.waitForTimeout(3000);
    
    await page.getByRole("button",{name:"+ Add Event"}).click();

    //List event page
    await page.locator("#nav-events").click();
    await page.waitForTimeout(2000);

    const events = await page.locator("//article[@id='event-card']");
    const eventCount = await events.count();

    for(let i=0; i<eventCount; i++){
        const eventSection = await events.nth(i).locator("a h3").textContent();
        if(eventSection === eventname){
            await events.nth(i).locator("a h3").click();
            break;
        }
    }

    //await page.locator(".card-body").filter({hasText:"ZARA COAT 3"}).getByRole("button",{name:"Add To Cart"}).click();

    await page.waitForLoadState('networkidle');

    await expect(page.locator("h1")).toHaveText(eventname);

    await page.locator("#customerName").fill("Jay Vaghela");
    await page.locator("#customer-email").fill("test@gmail.com");
    await page.locator("#phone").fill("+91 8690214744");

    await page.getByRole("button",{name:"Confirm Booking"}).click();
    await page.waitForLoadState('networkidle');

    await page.locator("//h3[contains(text(),'Booking Confirmed!')]").waitFor();
    await expect(page.locator("//h3[contains(text(),'Booking Confirmed!')]")).toContainText("Booking Confirmed");

    await page.locator("//button[normalize-space()='View My Bookings']").click();
    await page.waitForLoadState('networkidle');
    await page.waitForTimeout(2000);
    
    const bookingList  = await page.locator("#booking-card h3");
    const bookingCount = await bookingList.count();

    let bookConfirm = false;
    for(let i=0; i<bookingCount; i++){
        const bookSection = await bookingList.nth(i).textContent();
        console.log("bookSection==",bookSection);
        if(bookSection === eventname){
            bookConfirm = true;
            break;
        }
    }

    console.log("bookConfirm===",bookConfirm);
    await page.waitForTimeout(2000);

    await expect(bookConfirm).toBeTruthy();

    await page.waitForTimeout(5000);
});