import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Page Object que representa la página de registro de usuario
export class RegisterPage extends BasePage {
  // Selectores del formulario de registro
  private readonly firstNameInput = '#input-firstname';
  private readonly lastNameInput = '#input-lastname';
  private readonly emailInput = '#input-email';
  private readonly phoneInput = '#input-telephone';
  private readonly passwordInput = '#input-password';
  private readonly passwordConfirmInput = '#input-confirm';
  private readonly newsletterYesRadio = 'input[name="newsletter"][value="1"]';
  private readonly newsletterNoRadio = 'input[name="newsletter"][value="0"]';
  private readonly privacyPolicyCheckbox = 'input[name="agree"]';
  private readonly submitButton = 'input[type="submit"]';
  private readonly successContent = '#content p';
  private readonly errorAlert = '.alert-danger';
  private readonly fieldError = '.text-danger';

  constructor(page: Page) {
    super(page);
  }

  // Completa el campo de nombre
  async fillFirstName(firstName: string): Promise<void> {
    await this.page.locator(this.firstNameInput).fill(firstName);
  }

  // Completa el campo de apellido
  async fillLastName(lastName: string): Promise<void> {
    await this.page.locator(this.lastNameInput).fill(lastName);
  }

  // Completa el campo de correo electrónico
  async fillEmail(email: string): Promise<void> {
    await this.page.locator(this.emailInput).fill(email);
  }

  // Completa el campo de teléfono
  async fillPhone(phone: string): Promise<void> {
    await this.page.locator(this.phoneInput).fill(phone);
  }

  // Completa el campo de contraseña
  async fillPassword(password: string): Promise<void> {
    await this.page.locator(this.passwordInput).fill(password);
  }

  // Completa el campo de confirmación de contraseña
  async fillPasswordConfirm(password: string): Promise<void> {
    await this.page.locator(this.passwordConfirmInput).fill(password);
  }

  // Acepta la política de privacidad marcando el checkbox
  async acceptPrivacyPolicy(): Promise<void> {
    await this.page.locator(this.privacyPolicyCheckbox).check();
  }

  // Hace clic en el botón para enviar el formulario de registro
  async submitForm(): Promise<void> {
    await this.page.locator(this.submitButton).click();
  }

  // Rellena todos los campos del formulario de registro con los datos proporcionados
  async fillRegistrationForm(data: {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
  }): Promise<void> {
    await this.fillFirstName(data.firstName);
    await this.fillLastName(data.lastName);
    await this.fillEmail(data.email);
    await this.fillPhone(data.phone);
    await this.fillPassword(data.password);
    await this.fillPasswordConfirm(data.password);
  }

  // Verifica si el registro fue exitoso revisando el texto de confirmación en el contenido
  async isRegistrationSuccessful(): Promise<boolean> {
    // Tras el registro exitoso, la URL cambia a account/success y aparece texto de congratulations
    await this.page.waitForURL(/route=account\/success/, { timeout: 10000 });
    const content = await this.page.locator(this.successContent).first().textContent();
    return (content ?? '').toLowerCase().includes('congratulations');
  }

  // Verifica si hay un mensaje de error visible: puede ser alert-danger (privacidad) o text-danger (campos)
  async hasError(): Promise<boolean> {
    const hasAlertDanger = await this.page.locator(this.errorAlert).isVisible().catch(() => false);
    const hasFieldError = await this.page.locator(this.fieldError).isVisible().catch(() => false);
    return hasAlertDanger || hasFieldError;
  }

  // Retorna el texto del mensaje de error (alert o campo)
  async getErrorText(): Promise<string> {
    const alertVisible = await this.page.locator(this.errorAlert).isVisible().catch(() => false);
    if (alertVisible) return this.getText(this.errorAlert);
    return this.getText(this.fieldError);
  }
}
