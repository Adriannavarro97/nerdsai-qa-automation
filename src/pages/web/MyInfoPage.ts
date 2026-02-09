import { expect, Locator, Page } from '@playwright/test';

export class MyInfoPage {
  readonly page: Page;
  readonly titlePersonalDetails: Locator;

  // 👇 NUEVO locator
  readonly firstNameInput: Locator;
  readonly middleNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly employeeIdInput: Locator;
  readonly otherIdInput: Locator;
  readonly driversLicenseInput: Locator;
  readonly licenseExpiryDateInput: Locator;
  readonly nationalityDropdown: Locator;
  readonly maritalStatusDropdown: Locator;
  readonly maritalStatusOptionByName: (option: string) => Locator;
  readonly dateOfBirthInput: Locator;
  readonly genderMaleRadio: Locator;
  readonly genderFemaleRadio: Locator;
  readonly personalDetailsSaveButton: Locator;


  constructor(page: Page) {
    this.page = page;
    this.titlePersonalDetails = page.getByRole('heading', { name: 'Personal Details' });

    // 👇 inicialización del locator
    this.firstNameInput = page.locator('input[name="firstName"]');
    this.middleNameInput = page.locator('input[name="middleName"]');
    this.lastNameInput = page.locator('input[name="lastName"]');
    this.employeeIdInput = page.locator(
      'label:has-text("Employee Id") >> xpath=../..//input'
    );
    this.otherIdInput = page.locator(
      'label:has-text("Other Id")'
    ).locator('xpath=following::input[contains(@class,"oxd-input")][1]');
    this.driversLicenseInput = page
      .locator('form .oxd-input.oxd-input--active')
      .nth(5);
    this.licenseExpiryDateInput = page.locator('input[placeholder="yyyy-dd-mm"]').first();
    this.nationalityDropdown = page
      .locator('label:has-text("Nationality")')
      .locator('xpath=following::div[contains(@class,"oxd-select-text")][1]');

    this.maritalStatusDropdown = page
      .locator('label:has-text("Marital Status")')
      .locator('xpath=following::div[contains(@class,"oxd-select-text-input")][1]');
    this.maritalStatusOptionByName = (option: string) =>
      page.locator('.oxd-select-dropdown [role="option"]', { hasText: option });
    this.dateOfBirthInput = page.locator(
        'label:has-text("Date of Birth")'
      ).locator(
        'xpath=following::input[contains(@class,"oxd-input")][1]'
      );
    this.genderMaleRadio = page.locator('label:has-text("Male")');
    this.genderFemaleRadio = page.locator('label:has-text("Female")');
    this.personalDetailsSaveButton = page.locator(
      'form.oxd-form'
    ).first().getByRole('button', { name: 'Save' });
    
    
  }

  async assertPersonalDetailsVisible(): Promise<void> {
    await expect(this.titlePersonalDetails).toBeVisible();
  }

  // 👇 NUEVO método (SOLO click + fill)
  async fillFirstNameOnly(name: string): Promise<void> {
    await this.firstNameInput.click();
    await this.firstNameInput.fill(name);
    
  }
  async fillMiddleNameOnly(name: string): Promise<void> {
    await this.middleNameInput.click();
    await this.middleNameInput.fill(name);
  }
  async fillLastNameOnly(lastName: string): Promise<void> {
    await this.lastNameInput.click();
    await this.lastNameInput.fill(lastName);
  }
  async fillEmployeeIdOnly(value: string): Promise<void> {
    await this.employeeIdInput.click();
    await this.employeeIdInput.fill(value);
  }
  async fillOtherIdOnly(value: string): Promise<void> {
    await this.otherIdInput.click();
    await this.otherIdInput.fill(value);
  }
  async fillDriversLicenseOnly(value: string): Promise<void> {
    await this.driversLicenseInput.click();
    await this.driversLicenseInput.fill(value);
  }
  async fillLicenseExpiryDateOnly(date: string): Promise<void> {
    await this.licenseExpiryDateInput.click();
    await this.licenseExpiryDateInput.fill(date);
  }
  async selectNationalityOnly(optionText: string): Promise<void> {
    await this.nationalityDropdown.click();
  
    const option = this.page
      .locator('div[role="listbox"] div[role="option"]', { hasText: optionText })
      .first();
  
    await option.click();
  }
  async selectMaritalStatus(status: string): Promise<void> {
    await this.maritalStatusDropdown.click();
    await this.maritalStatusOptionByName(status).click();
  }
  async fillDateOfBirth(date: string): Promise<void> {
    await this.dateOfBirthInput.click();
    await this.dateOfBirthInput.fill(date);
  }
  async selectGender(gender: 'Male' | 'Female'): Promise<void> {
    const radio = gender === 'Male' ? this.genderMaleRadio : this.genderFemaleRadio;
    await radio.scrollIntoViewIfNeeded();
    await radio.click();
  }
  async clickPersonalDetailsSave(): Promise<void> {
    await this.personalDetailsSaveButton.click();
  }
  
  
  
}
