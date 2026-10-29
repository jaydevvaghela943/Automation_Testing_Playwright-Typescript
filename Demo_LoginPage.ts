import { Page } from '@playwright/test';
import { LoginLocators } from '../locators/loginLocators';
import { ENV } from '../config/env';


export class LoginPage {

    constructor(private page: Page) {}

    async navigate(): Promise<void> {
        await this.page.goto(ENV.BASE_URL!);
    }

    async login(username: string, password: string): Promise<void> {

        await this.page.locator(LoginLocators.loginLink).click();

        await this.page.locator(LoginLocators.usernameInput)
            .fill(username);

        await this.page.locator(LoginLocators.passwordInput)
            .fill(password);

        await this.page.locator(LoginLocators.loginButton)
            .click();
    }
}