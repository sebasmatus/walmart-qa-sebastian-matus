import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { RegisterPage } from '../pages/RegisterPage';
import { generateUniqueEmail, generatePhone } from '../utils/helpers';

// Paso: navega a la página de registro desde el menú de cuenta
When('the user navigates to the registration page', async function (this: CustomWorld) {
  await this.homePage.clickRegister();
  this.registerPage = new RegisterPage(this.page);
});

// Paso: rellena el formulario de registro con datos válidos y únicos generados dinámicamente
When('the user fills in the registration form with valid data', async function (this: CustomWorld) {
  const uniqueEmail = generateUniqueEmail('qa_user');
  await this.registerPage.fillRegistrationForm({
    firstName: 'John',
    lastName: 'Doe',
    email: uniqueEmail,
    phone: generatePhone(),
    password: 'Test@1234',
  });
});

// Paso: acepta la política de privacidad marcando el checkbox correspondiente
When('the user accepts the privacy policy', async function (this: CustomWorld) {
  await this.registerPage.acceptPrivacyPolicy();
});

// Paso: hace clic en el botón de envío del formulario de registro
When('the user submits the registration form', async function (this: CustomWorld) {
  await this.registerPage.submitForm();
});

// Paso: envía el formulario de registro vacío sin completar ningún campo
When('the user submits the registration form without filling any fields', async function (this: CustomWorld) {
  // No se rellenan campos, se envía el formulario directamente para validar errores
  await this.registerPage.submitForm();
});

// Paso: rellena el formulario con contraseñas que no coinciden para validar la validación del campo
When('the user fills in the registration form with mismatched passwords', async function (this: CustomWorld) {
  const uniqueEmail = generateUniqueEmail('qa_mismatch');
  await this.registerPage.fillFirstName('Jane');
  await this.registerPage.fillLastName('Smith');
  await this.registerPage.fillEmail(uniqueEmail);
  await this.registerPage.fillPhone(generatePhone());
  // Se ingresan contraseñas diferentes para disparar el error de confirmación
  await this.registerPage.fillPassword('Test@1234');
  await this.registerPage.fillPasswordConfirm('Different@9999');
});

// Paso: verifica que la página de éxito de creación de cuenta sea la que está visible
Then('the account creation success page should be displayed', async function (this: CustomWorld) {
  const isSuccessful = await this.registerPage.isRegistrationSuccessful();
  // La cuenta debe haberse creado correctamente
  expect(isSuccessful).toBe(true);
});

// Paso: verifica que se muestre al menos un mensaje de error en el formulario
Then('an error message should be displayed on the registration page', async function (this: CustomWorld) {
  const hasError = await this.registerPage.hasError();
  // Debe existir un mensaje de error visible cuando los datos son inválidos
  expect(hasError).toBe(true);
});
