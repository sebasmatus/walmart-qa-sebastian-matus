export const browserNames = ['chromium', 'firefox', 'webkit'] as const; 
export type BrowserName = (typeof browserNames)[number];
const browser = (process.env.BROWSER ?? 'chromium').toLowerCase();

// Validación que corrobora los navegadores funcionales
if (!browserNames.includes(browser as BrowserName)) {
    throw new Error(
        `Unsupported browser "${browser}". Use: ${browserNames.join(', ')}.`
    );
}

// Se parametriza la URL base y el modo headless por defecto
export const config = { 
    baseUrl: process.env.BASE_URL ?? 'https://opencart.abstracta.us/',
    browser: browser as BrowserName,
    headless: process.env.HEADED !== 'true',
};
