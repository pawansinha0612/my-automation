import { Page, Locator } from '@playwright/test';

export class DashboardPage {
    readonly page: Page;
    readonly heading: Locator;
    readonly logoutButton: Locator;
    readonly body: Locator;
    constructor(page: Page) {
        this.page = page;
        this.heading       = page.getByRole('heading', { level: 1 });
        this.logoutButton  = page.getByRole('link', { name: 'Log out' });
        this.body = page.getByText('Congratulations');
    }

    async logout() {
        await this.logoutButton.click();
    }
}