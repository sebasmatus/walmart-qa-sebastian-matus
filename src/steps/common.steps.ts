import { Given } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import { HomePage } from '../pages/HomePage';

// Paso re-utilizable (Génerico): navega a la página principal de la tienda
Given('the user is on the home page', async function (this: CustomWorld) {
  this.homePage = new HomePage(this.page);
  await this.homePage.open();
});
