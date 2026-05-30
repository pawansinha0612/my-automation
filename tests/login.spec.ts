import { test, expect } from './fixtures';

test.describe('Login page', () => {

    // Override storageState — fresh unauthenticated session
    test.describe('invalid credentials', () => {
        test.use({ storageState: { cookies: [], origins: [] } });

        test('wrong password shows error', async ({ loginPage }) => {
            await loginPage.login('student', 'wrongpassword');
            await expect(loginPage.errorMessage).toHaveText('WRONG TEXT HERE');
        });

        test('wrong username shows error', async ({ loginPage }) => {
            await loginPage.login('wronguser', 'Password123');
            await expect(loginPage.errorMessage).toBeVisible();
        });

    });

    test.describe('valid credentials', () => {

        test.beforeEach(async ({ page }) => {
            await page.goto('/logged-in-successfully/');
        });

        test('redirects to dashboard', async ({ dashboardPage }) => {
            await expect(dashboardPage.body).toContainText('Congratulations');
        });

        test('shows logged in heading', async ({ dashboardPage }) => {
            await expect(dashboardPage.heading).toContainText('Logged In Successfully');
        });

    });

});