import { expect, Page } from '@playwright/test';

export class LoginPage {
  constructor(private page: Page) {}

  private usernameInput = this.page.locator('input[name="username"]');
  private passwordInput = this.page.locator('input[name="password"]');
  private loginButton = this.page.getByRole('button', { name: 'Login' });

  async goto(url: string) {
    await this.page.goto(url);
    await expect(this.loginButton).toBeVisible();
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
  }

  async assertInvalidLogin() {
    // OrangeHRM demo muestra "Invalid credentials"
    await expect(this.page.getByText('Invalid credentials')).toBeVisible();
  }
}
