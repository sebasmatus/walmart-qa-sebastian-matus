import { Page } from '@playwright/test';
import { BasePage } from './BasePage';

// Page Object que representa la página de resultados de búsqueda
export class SearchResultsPage extends BasePage {
  // Selectores de la página de resultados
  private readonly resultItems = '#content .product-layout';
  private readonly resultHeading = '#content h1';
  private readonly productName = '.caption h4 a';

  constructor(page: Page) {
    super(page);
  }

  // Retorna la cantidad de productos encontrados en los resultados
  async getResultsCount(): Promise<number> {
    return this.page.locator(this.resultItems).count();
  }

  // Verifica si no hay productos en los resultados (count === 0 tras ejecutar la búsqueda)
  async hasNoResultsMessage(): Promise<boolean> {
    // OpenCart no muestra un mensaje explícito de "no results"; la ausencia de productos confirma el resultado vacío
    await this.page.waitForTimeout(500);
    const count = await this.page.locator(this.resultItems).count();
    return count === 0;
  }

  // Retorna el texto del encabezado de la página de resultados
  async getHeadingText(): Promise<string> {
    return this.getText(this.resultHeading);
  }

  // Retorna el nombre del primer producto en los resultados
  async getFirstProductName(): Promise<string> {
    return (await this.page.locator(this.productName).first().textContent()) ?? '';
  }

  // Hace clic en el primer producto de los resultados de búsqueda
  async clickFirstProduct(): Promise<void> {
    await this.page.locator(this.productName).first().click();
  }

  // Verifica que la lista de resultados sea visible
  async areResultsVisible(): Promise<boolean> {
    return this.isVisible(this.resultItems);
  }
}
