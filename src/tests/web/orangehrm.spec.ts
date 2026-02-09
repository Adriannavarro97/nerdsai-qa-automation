import { test, expect } from '@playwright/test';
import { orangehrm } from '../../utils/testData';
import { LoginPage } from '../../pages/web/LoginPage';
import { DashboardPage } from '../../pages/web/DashboardPage';
import { MyInfoPage } from '../../pages/web/MyInfoPage';

test.describe('OrangeHRM - Web', () => {
  test('Login inválido: no debe entrar al dashboard', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto(orangehrm.baseURL);
    await login.login(
      orangehrm.invalidCredentials.username,
      orangehrm.invalidCredentials.password
    );

    await login.assertInvalidLogin();
    await expect(page).toHaveURL(/auth\/login/);

    await page.waitForTimeout(5000);
  });

  test('Login válido: debe entrar al dashboard', async ({ page }) => {
    const login = new LoginPage(page);

    await login.goto(orangehrm.baseURL);
    await login.login(
      orangehrm.credentials.username,
      orangehrm.credentials.password
    );

    await expect(page).toHaveURL(/dashboard/);
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    await page.waitForTimeout(4000);
  });

  test('Caso 3: Acceder a My Info y validar "Personal Details"', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const myInfo = new MyInfoPage(page);
  
    await login.goto(orangehrm.baseURL);
    await login.login(orangehrm.credentials.username, orangehrm.credentials.password);
  
    await dashboard.assertOnDashboard();
    await dashboard.assertLeftMenuHasMyInfo();
  
    await dashboard.goToMyInfo();
  
    await myInfo.assertPersonalDetailsVisible();
    const personalDetailsText = await myInfo.titlePersonalDetails.textContent();
  
    expect(personalDetailsText?.trim()).toBe('Personal Details');
  
    if (!page.context().browser()?.isConnected()) {
    }
    if (!process.env.CI) {
      await page.waitForTimeout(4000);
    }
  });
});
