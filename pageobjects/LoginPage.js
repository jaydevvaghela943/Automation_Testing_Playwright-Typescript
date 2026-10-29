class LoginPage{
    
    //Constructor Generate Variable at run time : Store locator in variable
    constructor(page){
        this.page           = page;
        this.signInButton   = page.locator('[value="Login"]');
        this.userName       = page.locator("#userEmail");
        this.password       = page.locator("#userPassword");
    }

    //Go to Page
    async goTo(){
        await this.page.goto("https://rahulshettyacademy.com/client/");
    }

    //Validate Login
    async validLogin(username,password){
        await this.userName.fill(username);
        await this.password.fill(password);
        await this.signInButton.click();
    }

}

module.exports = { LoginPage };