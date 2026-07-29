# Walmart Chile – Automatización de Pruebas Funcionales

![Tests](https://github.com/sebastian-matus/walmart-qa-sebastian-matus/actions/workflows/tests.yml/badge.svg)


Proyecto de automatización de pruebas funcionales sobre la plataforma [OpenCart Demo](https://opencart.abstracta.us/), desarrollado como parte del desafío técnico para el rol de Automatizador QA en Walmart Chile.

## Consideración Importante para la revisión del desafío.
El código fuente y los escenarios de prueba están creados en idioma inglés, norma general de programación, sin embargo, se dejaron intencionalmente comentarios y este archivo `README.md` en español para la comprensión y rápida revisión. 


---

## Tecnologías utilizadas

| Herramienta | Versión | Propósito |
|---|---|---|
| [Node.js](https://nodejs.org/) | ≥ 18.x | Entorno de ejecución |
| [TypeScript](https://www.typescriptlang.org/) | ^5.4 | Lenguaje de programación |
| [Playwright](https://playwright.dev/) | ^1.44 | Motor de automatización de navegadores |
| [Cucumber.js](https://cucumber.io/) | ^10.8 | Framework BDD con sintaxis Gherkin |
| [ts-node](https://typestrong.org/ts-node/) | ^10.9 | Ejecución directa de TypeScript sin compilación previa |

---

## Justificación de los casos de prueba seleccionados

Se seleccionaron tres flujos funcionales que representan los pilares del ciclo de vida de un usuario en una tienda de comercio electrónico:

### 1. Búsqueda de productos (`product-search.feature`)

La búsqueda es el punto de entrada principal para la mayoría de los usuarios. Un motor de búsqueda defectuoso impacta directamente la conversión y la experiencia del cliente. Los escenarios cubren:
- Búsqueda con resultados positivos (término válido).
- Búsqueda sin resultados (término inexistente), verificando el mensaje informativo.
- Relevancia de los resultados: el primer resultado debe corresponder al término buscado.

### 2. Registro de usuario (`user-registration.feature`)

El registro es la puerta de entrada a funcionalidades críticas como el historial de pedidos, listas de deseos y el proceso de compra autenticado. Los escenarios cubren:
- Registro exitoso con datos válidos y únicos (email generado dinámicamente).
- Validación del formulario ante campos vacíos.
- Validación de contraseñas que no coinciden.

### 3. Agregar productos al carrito (`add-to-cart.feature`)

El carrito de compras es el núcleo transaccional de cualquier e-commerce. Un fallo en este flujo equivale a pérdida directa de ventas. Los escenarios cubren:
- Agregar un producto al carrito y verificar el mensaje de éxito.
- Agregar múltiples unidades de un producto.
- Verificar que el producto agregado aparezca correctamente en la página del carrito.

---

## Arquitectura del proyecto

El proyecto implementa el patrón **Page Object Model (POM)** para desacoplar la lógica de interacción con la UI de la lógica de los tests, lo que facilita el mantenimiento ante cambios en la interfaz.

```
walmart-qa-challenge/
├── features/                        # Escenarios en lenguaje Gherkin
│   ├── product-search.feature
│   ├── user-registration.feature
│   └── add-to-cart.feature
├── src/
│   ├── pages/                       # Page Objects (POM)
│   │   ├── BasePage.ts              # Clase base con métodos comunes
│   │   ├── HomePage.ts
│   │   ├── SearchResultsPage.ts
│   │   ├── ProductPage.ts
│   │   ├── RegisterPage.ts
│   │   └── CartPage.ts
│   ├── steps/                       # Definiciones de pasos Cucumber
│   │   ├── common.steps.ts
│   │   ├── search.steps.ts
│   │   ├── registration.steps.ts
│   │   └── cart.steps.ts
│   ├── support/                     # Configuración del mundo y hooks
│   │   ├── world.ts                 # CustomWorld con contexto compartido
│   │   └── hooks.ts                 # Before/After (navegador, screenshots)
│   └── utils/
│       └── helpers.ts               # Funciones auxiliares (emails únicos, etc.)
├── reports/                         # Generados automáticamente al ejecutar
├── cucumber.json                    # Configuración de Cucumber
├── tsconfig.json                    # Configuración de TypeScript
└── package.json
```

---

## Requisitos previos

- **Node.js** versión 18 o superior. Verificar con:
  ```bash
  node --version
  ```
- **npm** versión 9 o superior (incluido con Node.js):
  ```bash
  npm --version
  ```

---

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/sebasmatus/walmart-qa-sebastian-matus
   cd walmart-qa-challenge
   ```

2. Instalar las dependencias del proyecto (incluyendo Playwright y los navegadores):
   ```bash
   npm install
   ```
   > El script `postinstall` ejecuta automáticamente `playwright install` para descargar los binarios de los navegadores requeridos.

3. Si los navegadores no se instalaron automáticamente, ejecutar:
   ```bash
   npx playwright install
   ```

---

## Ejecución de los tests

### Ejecutar todos los tests (modo headless)

```bash
npm test
```

### Ejecutar con el navegador visible (modo headed)

```bash
npm run test:headed
```

### Ejecutar y generar reporte HTML

```bash
npm run test:report
```

El reporte queda disponible en: `reports/cucumber-report.html`

### Ejecutar solo pruebas de humo (smoke tests)

```bash
npx cucumber-js --tags "@smoke"
```

### Ejecutar un feature específico

```bash
# Solo búsqueda de productos
npx cucumber-js features/product-search.feature

# Únicamente registro de usuarios
npx cucumber-js features/user-registration.feature

# Flujo carrito de compras
npx cucumber-js features/add-to-cart.feature
```

### Ejecutar un tag específico

```bash
# Tests de búsqueda
npx cucumber-js --tags "@search"

# Tests de registro
npx cucumber-js --tags "@registration"

# Tests de carrito
npx cucumber-js --tags "@cart"
```

---

## Reportes

Tras la ejecución se generan dos archivos en la carpeta `reports/`:

| Archivo | Formato | Descripción |
|---|---|---|
| `cucumber-report.html` | HTML | Reporte visual con detalles de cada escenario y screenshots de fallos |
| `cucumber-report.json` | JSON | Reporte en formato estructurado, útil para integración con CI/CD |

> Los screenshots de escenarios fallidos se adjuntan automáticamente al reporte HTML.

---

## Variables de entorno

| Variable | Valores por defecto | Descripción |
|---|---|---|
| `BASE_URL` | https://opencart.abstracta.us | Ambiente de ejecución |
| `BROWSER` | chromium | Navegadores: `chromium`, `firefox` o `webkit` | 
| `HEADED` | `false` | Establecer en `true` para ejecutar con el navegador visible |

Ejemplo para PowerShell:
```powershell
$env:HEADED="true"; npm test
```

Ejemplo para Bash/macOS/Linux:
```bash
HEADED=true npm test
```

---

## Prácticas aplicadas

- **Page Object Model**: separación estricta entre lógica de UI e implementación de tests.
- **Datos dinámicos**: los emails de registro se generan con timestamp para garantizar unicidad en cada ejecución.
- **Contexto aislado**: cada escenario se ejecuta en un contexto de navegador limpio e independiente.
- **Screenshots automáticos**: al fallar un escenario, se captura y adjunta al reporte para facilitar el diagnóstico.
- **Tags de Cucumber**: los tests están etiquetados (`@smoke`, `@search`, `@registration`, `@cart`) para permitir ejecuciones selectivas.
- **Selectores manuales**: todos los selectores de la página fueron identificados manualmente inspeccionando el DOM de la aplicación.

## Opcionales y/o Adiciones
- **Navegación entre Steps**: Para una mayor confortabilidad de uso y navegación entre los casos de prueba (feature) y los escenarios (steps) se pueden navegar desde los archivos .feature, manteniendo presionada la tecla `Ctrl` (o `Cmd` en MAC) y haciendo click sobre cualquier texto de un paso (por ejemplo: Given the user is on the home page). 

```
walmart-qa-challenge/
├── .vscode/              
│   ├── settings.json
```

- Agregar la siguiente configuración al archivo `settings.json`, guardar, y posteriormente reiniciar IDE para aplicar los cambios.

```json
{
  "cucumber.glue": [
    "src/steps/**/*.steps.ts",
    "support/**/*.ts"
  ],
  "cucumber.features": [
    "features/**/*.feature"
  ]
}
```

*Creado por **Sebastián Matus** para Walmart Chile - Desafío QA Automation III - Julio 2026*