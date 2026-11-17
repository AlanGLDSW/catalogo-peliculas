// Genera src/environments/environment.prod.ts con la URL de la API.
// En Railway se define la variable API_URL, por ejemplo:
//   API_URL=https://catalogo-backend.up.railway.app/api
import { writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const apiUrl = (process.env.API_URL || 'http://127.0.0.1:8000/api').replace(/\/+$/, '');

if (!process.env.API_URL) {
  console.warn('[set-env] API_URL no está definida; se usará ' + apiUrl);
}

const contenido = `// Este archivo se genera automáticamente con scripts/set-env.mjs al ejecutar "npm run build".
// En Railway toma el valor de la variable API_URL del servicio del frontend.
export const environment = {
  production: true,
  apiUrl: ${JSON.stringify(apiUrl)},
};
`;

const destino = fileURLToPath(new URL('../src/environments/environment.prod.ts', import.meta.url));
writeFileSync(destino, contenido);
console.log('[set-env] API_URL = ' + apiUrl);
