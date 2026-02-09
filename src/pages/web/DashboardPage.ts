import { expect, Locator, Page } from '@playwright/test';

export class DashboardPage {
  readonly page: Page;
  readonly menuMyInfo: Locator;
  readonly headingDashboard: Locator;

  constructor(page: Page) {
    this.page = page;

    this.menuMyInfo = page.getByRole('link', { name: 'My Info' });
    this.headingDashboard = page.getByRole('heading', { name: 'Dashboard' });
  }

  async assertOnDashboard(): Promise<void> {
    await expect(this.page).toHaveURL(/dashboard/);
    await expect(this.headingDashboard).toBeVisible();
  }

  async assertLeftMenuHasMyInfo(): Promise<void> {
    await expect(this.menuMyInfo).toBeVisible();
  }

  async goToMyInfo(): Promise<void> {
    await this.assertLeftMenuHasMyInfo();
    await this.menuMyInfo.click();
  }
}
