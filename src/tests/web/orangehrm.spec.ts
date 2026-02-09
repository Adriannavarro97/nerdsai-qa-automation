import { test, expect } from '@playwright/test';
import { orangehrm } from '../../utils/testData';
import { LoginPage } from '../../pages/web/LoginPage';
import { DashboardPage } from '../../pages/web/DashboardPage';
import { MyInfoPage } from '../../pages/web/MyInfoPage';

test.describe('OrangeHRM - Web', () => {
  test('Caso 1: Login inválido: no debe entrar al dashboard', async ({ page }) => {
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

  test('Caso 2: Login válido: debe entrar al dashboard', async ({ page }) => {
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

  test('Caso 3: Acceder a My Info y validar menú y Personal Details', async ({ page }) => {
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
  test('Caso 4: Llenar y guardar información de Personal Details', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const myInfo = new MyInfoPage(page);
  
    await login.goto(orangehrm.baseURL);
    await login.login(
      orangehrm.credentials.username,
      orangehrm.credentials.password
    );
  
    await dashboard.assertOnDashboard();
    await dashboard.goToMyInfo();
    await myInfo.fillFirstNameOnly('Guillermo');
    await myInfo.fillMiddleNameOnly('Adrian');
    await myInfo.fillLastNameOnly('Navarro');
    await myInfo.fillEmployeeIdOnly('EMP-001');
    await myInfo.fillOtherIdOnly('4957589');
    await myInfo.fillDriversLicenseOnly('DL-00001');
    await myInfo.fillLicenseExpiryDateOnly('2030-12-31');
    await myInfo.selectNationalityOnly('Albanian');
    await myInfo.selectMaritalStatus('Single');
    await myInfo.fillDateOfBirth('1997-09-03');
    await myInfo.selectGender('Female');
    await myInfo.clickPersonalDetailsSave();

    // Pausa para ver en pantalla
    await page.waitForTimeout(3000);
  });
  
  test('Caso 5: Custom Fields – llenar y guardar información', async ({ page }) => {
    const login = new LoginPage(page);
    const dashboard = new DashboardPage(page);
    const myInfo = new MyInfoPage(page);
  
    await login.goto(orangehrm.baseURL);
    await login.login(orangehrm.credentials.username, orangehrm.credentials.password);
    await dashboard.assertOnDashboard();
    await dashboard.goToMyInfo();
    await myInfo.assertPersonalDetailsVisible();
    await myInfo.selectBloodTypeOnly('A+');
    await myInfo.fillTestField('111');
    await myInfo.saveCustomFields();

    // Pausa opcional para ver en pantalla
    await page.waitForTimeout(3000);
  });
  

});
