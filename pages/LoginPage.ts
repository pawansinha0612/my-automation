import { Page, Locator } from '@playwright/test';

export class LoginPage {
    // 1. Store the page instance
    readonly page: Page;

    // 2. Declare locators as class properties
    readonly usernameInput: Locator;
    readonly passwordInput: Locator;
    readonly submitButton: Locator;
    readonly errorMessage: Locator;

    // 3. Constructor receives the page and initialises everything
    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.getByLabel('Username');
        this.passwordInput = page.getByLabel('Password');
        this.submitButton  = page.getByRole('button', { name: 'Submit' });
        this.errorMessage  = page.locator('#error');
    }

    // 4. Actions as methods — describe WHAT the user does, not HOW
    async goto() {
        await this.page.goto('/practice-test-login/');
    }

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async loginWithInvalidCredentials(username: string, password: string) {
        await this.login(username, password);
    }
}