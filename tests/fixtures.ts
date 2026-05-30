import { test as base } from '@playwright/test';
import { LoginPage }     from '../pages/LoginPage';
import { DashboardPage } from '../pages/DashboardPage';

// 1. Define the shape of your custom fixtures
type MyFixtures = {
    loginPage:     LoginPage;
    dashboardPage: DashboardPage;
};

// 2. Extend the base test with your fixtures
export const test = base.extend<MyFixtures>({

    // loginPage fixture — created fresh for every test
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await loginPage.goto();         // runs before the test
        await use(loginPage);           // hands it to the test
        // anything after use() runs after the test (cleanup)
    },

    // dashboardPage fixture
    dashboardPage: async ({ page }, use) => {
        const dashboardPage = new DashboardPage(page);
        await use(dashboardPage);
    },

});

// 3. Re-export expect so tests only need one import
export { expect } from '@playwright/test';