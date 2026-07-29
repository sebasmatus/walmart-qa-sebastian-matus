import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Page Object que representa la página del carrito de compras
export class CartPage extends BasePage {
  // Selectores del carrito de compras (verificados contra el DOM real de OpenCart)
  private readonly cartRows = '#content .table-responsive tbody tr';
  private readonly productNameInCart = '#content .table-responsive tbody tr td:nth-child(2) a';
  private readonly removeButton = '#content .table-responsive tbody tr td button.btn-danger';
  private readonly checkoutButton = 'a[href*="checkout/checkout"]';
  private readonly emptyCartHeading = '#content h2';

  constructor(page: Page) {
    super(page);
  }

  // Navega directamente a la página del carrito
  async open(): Promise<void> {
    await this.navigate('https://opencart.abstracta.us/index.php?route=checkout/cart');
  }

  // Retorna la cantidad de filas (productos) en el carrito
  async getCartItemsCount(): Promise<number> {
    return this.page.locator(this.cartRows).count();
  }

  // Retorna el nombre del primer producto en el carrito
  async getFirstProductName(): Promise<string> {
    return (await this.page.locator(this.productNameInCart).first().textContent()) ?? '';
  }

  // Verifica si el carrito está vacío comprobando que no haya filas de productos
  async isCartEmpty(): Promise<boolean> {
    // Un carrito vacío no tiene filas en la tabla; se confirma con count === 0
    const count = await this.page.locator(this.cartRows).count();
    return count === 0;
  }

  // Elimina el primer producto del carrito
  async removeFirstProduct(): Promise<void> {
    await this.page.locator(this.removeButton).first().click();
    await this.page.waitForTimeout(1000);
  }

  // Hace clic en el botón de ir al checkout
  async proceedToCheckout(): Promise<void> {
    await this.page.locator(this.checkoutButton).first().click();
  }

  // Verifica si el botón de checkout está visible
  async isCheckoutButtonVisible(): Promise<boolean> {
    return this.isVisible(this.checkoutButton);
  }
}
