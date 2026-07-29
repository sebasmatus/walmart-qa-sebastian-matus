import { When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { SearchResultsPage } from '../pages/SearchResultsPage';

// Paso: el usuario ingresa un término de búsqueda y presiona el botón de búsqueda
When('the user searches for {string}', async function (this: CustomWorld, searchTerm: string) {
  await this.homePage.searchProduct(searchTerm);
  this.searchResultsPage = new SearchResultsPage(this.page);
  // Guarda el término buscado para poder verificarlo en pasos posteriores
  this.lastSearchTerm = searchTerm;
});

// Paso: verifica que la página de resultados de búsqueda esté visible
Then('the search results page should be displayed', async function (this: CustomWorld) {
  const heading = await this.searchResultsPage.getHeadingText();
  // El encabezado debe contener "Search" para confirmar que estamos en los resultados
  expect(heading).toContain('Search');
});

// Paso: verifica que la cantidad de resultados sea mayor o igual al número indicado
Then('the results should contain at least {int} product', async function (this: CustomWorld, count: number) {
  const resultsCount = await this.searchResultsPage.getResultsCount();
  // Confirma que hay suficientes productos en los resultados
  expect(resultsCount).toBeGreaterThanOrEqual(count);
});

// Paso: verifica que no se muestren productos de la búsqueda
Then('no products should be displayed', async function (this: CustomWorld) {
  const hasNoResults = await this.searchResultsPage.hasNoResultsMessage();
  // Confirma que el mensaje de sin resultados está presente
  expect(hasNoResults).toBe(true);
});

// Paso: verifica que el nombre del primer producto contenga el término buscado
Then('the first product name should contain {string}', async function (this: CustomWorld, term: string) {
  const firstName = await this.searchResultsPage.getFirstProductName();
  // Confirma que el primer resultado es relevante al término buscado
  expect(firstName.toLowerCase()).toContain(term.toLowerCase());
});
