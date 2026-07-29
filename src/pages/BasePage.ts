import { Page } from '@playwright/test';

// Clase base que provee métodos de utilidad comunes para todas las páginas
export class BasePage {
  protected page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  // Navega a la URL indicada y espera que el DOM esté listo
  async navigate(url: string): Promise<void> {
    await this.page.goto(url, { waitUntil: 'domcontentloaded', timeout: 30000 });
  }

  // Retorna el título de la página actual
  getTitle(): Promise<string> {
    return this.page.title();
  }

  // Espera que un selector sea visible en la pantalla
  async waitForSelector(selector: string): Promise<void> {
    await this.page.waitForSelector(selector, { state: 'visible' });
  }

  // Verifica si un elemento es visible en la pantalla
  isVisible(selector: string): Promise<boolean> {
    return this.page.locator(selector).isVisible();
  }

  // Obtiene el texto de un elemento
  async getText(selector: string): Promise<string> {
    return (await this.page.locator(selector).textContent()) ?? '';
  }
}
