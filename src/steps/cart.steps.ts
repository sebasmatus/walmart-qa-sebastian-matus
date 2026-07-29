import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { CartPage } from '../pages/CartPage';

// Paso: hace clic en el primer producto de los resultados de búsqueda
When('the user clicks on the first product in the search results', async function (this: CustomWorld) {
  this.searchResultsPage = new SearchResultsPage(this.page);
  // Guarda el nombre del producto antes de entrar al detalle para validarlo más tarde
  this.lastProductName = await this.searchResultsPage.getFirstProductName();
  await this.searchResultsPage.clickFirstProduct();
  this.productPage = new ProductPage(this.page);
});

// Paso: agrega el producto actual al carrito de compras
When('the user adds the product to the cart', async function (this: CustomWorld) {
  await this.productPage.addToCart();
});

// Paso: establece la cantidad deseada del producto antes de agregar al carrito
When('the user sets the quantity to {int}', async function (this: CustomWorld, quantity: number) {
  // Se ajusta la cantidad para probar la compra de múltiples unidades
  await this.productPage.setQuantity(quantity);
});

// Paso: navega directamente a la página del carrito de compras
When('the user navigates to the shopping cart', async function (this: CustomWorld) {
  this.cartPage = new CartPage(this.page);
  await this.cartPage.open();
});

// Paso: verifica que el mensaje de éxito al agregar al carrito esté visible
Then('a success notification should be displayed', async function (this: CustomWorld) {
  const isVisible = await this.productPage.isSuccessAlertVisible();
  // El mensaje de confirmación debe aparecer tras agregar el producto
  expect(isVisible).toBe(true);
});

// Paso: verifica la cantidad de items en el carrito a través del botón del carrito en el navbar
Then('the cart should contain {int} item', async function (this: CustomWorld, expectedCount: number) {
  // Se valida que el contador del carrito refleje la cantidad esperada
  const cartText = await this.page.locator('#cart > button').textContent();
  const itemCount = cartText?.match(/(\d+)\s+item\(s\)/)?.[1];
  expect(itemCount).toBe(String(expectedCount));
});

// Paso: verifica que el carrito no esté vacío después de agregar un producto
Then('the shopping cart should not be empty', async function (this: CustomWorld) {
  const isEmpty = await this.cartPage.isCartEmpty();
  // El carrito debe tener al menos un producto
  expect(isEmpty).toBe(false);
});

// Paso: verifica que el producto agregado aparezca correctamente en el carrito
Then('the cart should display the product that was added', async function (this: CustomWorld) {
  const productInCart = await this.cartPage.getFirstProductName();
  // El nombre del producto en el carrito debe coincidir con el producto seleccionado
  const normalizeText = (value: string ) =>
    value.replace(/\s+/g, '').trim().toLowerCase();
  expect(normalizeText(productInCart)).toBe(
    normalizeText(this.lastProductName)
  );
});

// Paso: verifica la cantidad del producto 
Then('the first product in the cart should have quantity {int}', async function (
  this: CustomWorld, expectedQuantity: number
) {
  const actualQuantity = await this.cartPage.getFirstProductQuantity();
  expect(actualQuantity).toBe(expectedQuantity);
});
