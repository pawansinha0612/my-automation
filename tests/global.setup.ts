import { chromium } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';

// This runs ONCE before all tests
async function globalSetup() {
    // Launch a browser just for setup
    const browser = await chromium.launch();
    const page    = await browser.newPage();

    // Set the baseURL manually since config isn't loaded yet
    await page.goto('https://practicetestautomation.com/practice-test-login/');

    // Login once
    const loginPage = new LoginPage(page);
    await loginPage.login('student', 'Password123');

    // Wait until we're on the dashboard
    await page.waitForURL('**/logged-in-successfully/');

    // Save the session to a file
    await page.context().storageState({ path: 'auth.json' });

    console.log('✅ Auth state saved to auth.json');

    await browser.close();
}

export default globalSetup;