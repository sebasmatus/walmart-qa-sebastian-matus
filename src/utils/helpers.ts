// Genera un correo electrónico único basado en timestamp para evitar duplicados en los tests
export function generateUniqueEmail(prefix: string = 'testuser'): string {
  const timestamp = Date.now();
  return `${prefix}_${timestamp}@test.com`;
}

// Genera un número de teléfono aleatorio de 9 dígitos
export function generatePhone(): string {
  const number = Math.floor(100000000 + Math.random() * 900000000);
  return String(number);
}

// Pausa la ejecución por la cantidad de milisegundos indicada
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Formatea una fecha como string legible para usar en datos de prueba
export function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}
