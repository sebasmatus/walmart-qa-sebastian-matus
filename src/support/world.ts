import { setWorldConstructor, World, IWorldOptions, setDefaultTimeout } from '@cucumber/cucumber';
import { Browser, BrowserContext, Page, chromium } from '@playwright/test';
import { HomePage } from '../pages/HomePage';
import { SearchResultsPage } from '../pages/SearchResultsPage';
import { ProductPage } from '../pages/ProductPage';
import { RegisterPage } from '../pages/RegisterPage';
import { CartPage } from '../pages/CartPage';

// Interfaz que extiende el mundo de Cucumber con las propiedades del proyecto
export interface CustomWorld extends World {
  browser: Browser;
  context: BrowserContext;
  page: Page;
  // Páginas disponibles en el mundo de pruebas
  homePage: HomePage;
  searchResultsPage: SearchResultsPage;
  productPage: ProductPage;
  registerPage: RegisterPage;
  cartPage: CartPage;
  // Variables de estado compartidas entre pasos
  lastSearchTerm: string;
  lastProductName: string;
}

// Clase que implementa el mundo personalizado para todos los escenarios
class CustomWorldImpl extends World implements CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
  homePage!: HomePage;
  searchResultsPage!: SearchResultsPage;
  productPage!: ProductPage;
  registerPage!: RegisterPage;
  cartPage!: CartPage;
  lastSearchTerm!: string;
  lastProductName!: string;

  constructor(options: IWorldOptions) {
    super(options);
  }
}

// Registra el constructor del mundo personalizado en Cucumber
setWorldConstructor(CustomWorldImpl);

// Establece el timeout global por defecto para todos los pasos (60 segundos)
setDefaultTimeout(60 * 1000);
