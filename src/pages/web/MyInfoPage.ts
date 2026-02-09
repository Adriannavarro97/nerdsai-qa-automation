import { expect, Locator, Page } from '@playwright/test';

export class MyInfoPage {
  readonly page: Page;
  readonly titlePersonalDetails: Locator;

  constructor(page: Page) {
    this.page = page;
    this.titlePersonalDetails = page.getByRole('heading', { name: 'Personal Details' });
  }

  async assertPersonalDetailsVisible(): Promise<void> {
    await expect(this.titlePersonalDetails).toBeVisible();
  }
}
