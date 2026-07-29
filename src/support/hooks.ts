import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { Browser, BrowserType, chromium, firefox, webkit } from '@playwright/test';
import { config, BrowserName } from './config';
import { CustomWorld } from './world';

// Variable global para almacenar la instancia del navegador compartida entre escenarios
let browser: Browser;

const browsers: Record<BrowserName, BrowserType> = {
  chromium, firefox, webkit,
};

// Hook que se ejecuta una sola vez antes de todos los escenarios: lanza el navegador
BeforeAll(async function () {
  // Se inicia Chromium en modo headless por defecto; usar HEADED=true para verlo en pantalla
  browser = await browsers[config.browser].launch({
    headless: config.headless,
  });
});

// Hook que se ejecuta una sola vez después de todos los escenarios: cierra el navegador
AfterAll(async function () {
  // Cierra el navegador al finalizar la suite completa de pruebas
  await browser.close();
});

// Hook que se ejecuta antes de cada escenario: crea un contexto y una página frescos
Before(async function (this: CustomWorld) {
  // Cada escenario tiene su propio contexto aislado para evitar contaminación entre pruebas
  this.context = await browser.newContext({
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  });
  this.page = await this.context.newPage();
  this.browser = browser;
});

// Hook que se ejecuta después de cada escenario: captura screenshot si falla y cierra el contexto
After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    // Si el escenario falla, se toma un screenshot para facilitar el diagnóstico
    const screenshot = await this.page.screenshot({ fullPage: true });
    this.attach(screenshot, 'image/png');
  }
  // Cierra el contexto del navegador al terminar cada escenario
  await this.context.close();
});
