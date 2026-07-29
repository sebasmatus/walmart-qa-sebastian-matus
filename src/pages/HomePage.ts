import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Page Object que representa la página principal de la tienda
export class HomePage extends BasePage {
  // Selectores de la página principal
  private readonly searchInput = 'input[name="search"]';
  private readonly searchButton = '#search button';
  private readonly navbarLinks = '#menu .nav > li > a';
  private readonly featuredProducts = '#content .product-layout';
  private readonly cartButton = '#cart > button';
  private readonly accountMenu = 'a[title="My Account"]';

  constructor(page: Page) {
    super(page);
  }

  // Navega a la página principal de OpenCart
  async open(): Promise<void> {
    await this.navigate('https://opencart.abstracta.us/');
  }

  // Ingresa el texto en el campo de búsqueda y presiona el botón buscar
  async searchProduct(productName: string): Promise<void> {
    await this.page.locator(this.searchInput).fill(productName);
    await this.page.locator(this.searchButton).click();
  }

  // Verifica que el campo de búsqueda esté visible
  async isSearchBarVisible(): Promise<boolean> {
    return this.isVisible(this.searchInput);
  }

  // Retorna el número de productos destacados en la página principal
  async getFeaturedProductsCount(): Promise<number> {
    return this.page.locator(this.featuredProducts).count();
  }

  // Abre el menú de la cuenta de usuario
  async openAccountMenu(): Promise<void> {
    await this.page.locator(this.accountMenu).click();
  }

  // Hace clic en la opción "Register" dentro del menú de cuenta
  async clickRegister(): Promise<void> {
    await this.openAccountMenu();
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  // Hace clic en la opción "Login" dentro del menú de cuenta
  async clickLogin(): Promise<void> {
    await this.openAccountMenu();
    await this.page.getByRole('link', { name: 'Login' }).click();
  }
}
