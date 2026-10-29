class LoginPagePractise {
    constructor(page){
        this.page = page;
        this.username = page.locator('#username');
        this.password = page.locator('#password');
        this.signInButton = page.locator('#signInBtn');
        this.terms = page.locator('#terms');
    }

    async goTo(){
        await this.page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    }

    async fillCredentials(username, password){
        await this.username.fill(username);
        await this.password.fill(password);
    }

    async acceptTerms(){
        await this.terms.check();
    }

    async clickSignIn(){
        await this.signInButton.click();
    }
}

module.exports = { LoginPagePractise };
