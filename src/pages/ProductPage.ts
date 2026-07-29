import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Page Object que representa la página de detalle de un producto
export class ProductPage extends BasePage {
  // Selectores de la página de producto
  private readonly productTitle = 'h1';
  private readonly addToCartButton = '#button-cart';
  private readonly quantityInput = '#input-quantity';
  private readonly cartSuccessAlert = '.alert-success';

  constructor(page: Page) {
    super(page);
  }

  // Retorna el nombre del producto desde el encabezado h1
  async getName(): Promise<string> {
    return (await this.page.locator(this.productTitle).first().textContent()) ?? '';
  }

  // Establece la cantidad deseada del producto antes de agregarlo al carrito
  async setQuantity(quantity: number): Promise<void> {
    await this.page.locator(this.quantityInput).clear();
    await this.page.locator(this.quantityInput).fill(String(quantity));
  }

  // Hace clic en el botón "Add to Cart" y espera la confirmación del servidor
  async addToCart(): Promise<void> {
    await this.page.locator(this.addToCartButton).click();
    // Se espera el alert de éxito para asegurar que el servidor procesó la adición antes de continuar
    await this.page.waitForSelector(this.cartSuccessAlert, { state: 'visible', timeout: 10000 });
  }

  // Verifica si el mensaje de éxito al agregar al carrito está visible
  async isSuccessAlertVisible(): Promise<boolean> {
    await this.page.waitForSelector(this.cartSuccessAlert, { state: 'visible', timeout: 5000 });
    return this.isVisible(this.cartSuccessAlert);
  }

  // Retorna el texto del mensaje de éxito al agregar al carrito
  async getSuccessAlertText(): Promise<string> {
    return this.getText(this.cartSuccessAlert);
  }
}
