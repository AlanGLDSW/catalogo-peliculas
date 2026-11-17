# Catálogo de películas

Aplicación web dinámica para consultar y administrar un catálogo de películas.

- **Backend:** API REST en Laravel 13 (PHP 8.4) — carpeta `Laravel/catalogo`
- **Frontend:** Angular 22 + Bootstrap 5 (interfaz responsiva) — carpeta `Angular/frontend`
- **Base de datos:** MySQL
- **Medios en la nube:** trailers incrustados desde **YouTube** y portadas cargadas desde enlaces externos
- **Despliegue:** Railway

**Universidad de Guadalajara · UDG Virtual**
Licenciatura en desarrollo de sistemas web · Conceptualización de servicios en la nube
Asesora: Rocío Belén Rubio Treviño · Estudiante: Alan Arturo González Corona (225385381)

---

## Estructura en Railway

Un proyecto con **tres servicios**, todos desde este mismo repositorio:

| Servicio | Origen | Root Directory |
|---|---|---|
| **MySQL** | Base de datos de Railway | — |
| **backend** | Este repositorio | `/Laravel/catalogo` |
| **frontend** | Este repositorio | `/Angular/frontend` |

```
Navegador ──► frontend (Angular) ──► backend (Laravel /api) ──► MySQL
                    │
                    └──► YouTube (trailers) / imágenes externas (portadas)
```

---

## Paso 1. Subir el proyecto a GitHub

> El archivo `.gitignore` ya evita que se suban `.env`, `vendor/` y `node_modules/`.
> **No uses "Upload files" de la página de GitHub**: tiene un límite de 100 archivos por subida y el proyecto tiene más.

1. En GitHub, crea un repositorio nuevo **vacío** (sin README ni .gitignore), por ejemplo `catalogo-peliculas`.
2. Abre una terminal **en la carpeta `producto_integrador`** (donde está este README) y ejecuta:

```bash
git init
git add .
git commit -m "Catálogo de películas listo para Railway"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/catalogo-peliculas.git
git push -u origin main
```

3. Revisa en GitHub que **no** aparezca ningún archivo `.env`. Solo debe estar `.env.example`.

---

## Paso 2. Crear el proyecto y la base de datos en Railway

1. Entra a <https://railway.com> e inicia sesión con tu cuenta de GitHub.
2. **New Project → Deploy from GitHub repo** y elige tu repositorio. Si no aparece, da clic en *Configure GitHub App* y dale permiso a Railway.
3. Se crea un servicio. Ábrelo y en **Settings**:
   - **Source → Root Directory:** `/Laravel/catalogo`
   - Cambia el nombre del servicio a `backend` (opcional, pero ayuda).
4. En el lienzo del proyecto: **+ Create → Database → MySQL**.

## Paso 3. Configurar el backend (Laravel)

En el servicio **backend → Variables → Raw Editor**, pega esto:

```env
APP_NAME="Catalogo de peliculas"
APP_ENV=production
APP_DEBUG=false
APP_KEY=base64:PEGA_AQUI_TU_LLAVE
APP_URL=https://${{RAILWAY_PUBLIC_DOMAIN}}
LOG_CHANNEL=stderr
DB_CONNECTION=mysql
DB_URL=${{MySQL.MYSQL_URL}}
SESSION_DRIVER=database
CACHE_STORE=database
```

- **APP_KEY:** copia el valor de `APP_KEY` de tu archivo `.env` local. También puedes generar una nueva con `php artisan key:generate --show`.
- `${{MySQL.MYSQL_URL}}` toma automáticamente usuario, contraseña, host y nombre de la base del servicio MySQL. Si tu servicio de MySQL tiene otro nombre, cambia `MySQL` por ese nombre.

Después, en **backend → Settings**:

- **Deploy → Pre-deploy Command:**
  ```bash
  php artisan migrate --force && php artisan db:seed --force
  ```
  Esto crea las tablas y carga las 10 películas de ejemplo con sus trailers. El seeder solo inserta datos si la tabla está vacía, así que no duplica nada en cada despliegue.
- **Networking → Generate Domain.** Si te pide un puerto, usa el que Railway sugiera (normalmente `8080`).

Al terminar el despliegue, prueba en el navegador `https://TU-BACKEND.up.railway.app/api/movies`. Debe mostrar las películas en formato JSON.

## Paso 4. Configurar el frontend (Angular)

1. En el lienzo: **+ Create → GitHub Repo** y elige **el mismo repositorio**.
2. En **Settings → Source → Root Directory:** `/Angular/frontend`. Cambia su nombre a `frontend`.
3. En **Variables**, agrega la URL del backend (con `/api` al final y sin `/` después):
   ```env
   API_URL=https://TU-BACKEND.up.railway.app/api
   ```
4. **Settings → Networking → Generate Domain.**

> Con `npm run build` se ejecuta `scripts/set-env.mjs`, que escribe `API_URL` dentro de la app compilada.
> Si algún día cambias `API_URL`, vuelve a desplegar el frontend (**Deployments → Redeploy**).

## Paso 5. Conectar el backend con el frontend (CORS)

En **backend → Variables**, agrega el dominio del frontend (sin `/` al final):

```env
FRONTEND_URL=https://TU-FRONTEND.up.railway.app
```

Railway vuelve a desplegar el backend. Abre `https://TU-FRONTEND.up.railway.app`: esa es **la URL que compartes en la "Sala de exhibición"**.

---

## Lista de verificación para la entrega

- [ ] `/movies` muestra las películas (la **base de datos** funciona en la nube).
- [ ] Puedes **agregar, editar y eliminar** una película.
- [ ] Al abrir una película se ve su **trailer de YouTube** y su portada (**medios en la nube**).
- [ ] La página se ve bien en el celular y al hacer la ventana angosta (**interfaz responsiva**).
- [ ] Recargar la página en `/movies` o `/movie/1` no da error 404.

## Si algo falla

| Síntoma | Qué revisar |
|---|---|
| El backend no compila | Que el *Root Directory* sea `/Laravel/catalogo`. El proyecto requiere PHP 8.4 (ya viene indicado en `composer.json`). |
| `SQLSTATE` / error de conexión | Que `DB_URL=${{MySQL.MYSQL_URL}}` use el nombre exacto del servicio MySQL. |
| Error 500 en `/api/movies` | Que `APP_KEY` esté definida y que el *Pre-deploy Command* se haya ejecutado (revisa **Deploy Logs**). |
| El frontend dice "No se pudo cargar…" | Que `API_URL` sea correcta y termine en `/api`. Después de cambiarla hay que hacer **Redeploy** del frontend. |
| Error de CORS en la consola del navegador | Que `FRONTEND_URL` del backend coincida exactamente con el dominio del frontend (con `https://` y sin `/` final). |
| Un trailer no se reproduce | Algunos videos no permiten verse incrustados. Edita la película y usa otro enlace de YouTube. |

---

## Trabajar en tu computadora

**Backend**
```bash
cd Laravel/catalogo
composer install
php artisan migrate          # agrega la nueva columna "trailer"
php artisan serve            # http://127.0.0.1:8000
```
Si tu base local ya tiene películas, el seeder no las toca. Puedes agregar los trailers desde el formulario de edición, o reiniciar la base con `php artisan migrate:fresh --seed` (esto **borra** los datos locales).

**Frontend**
```bash
cd Angular/frontend
npm install
npm run dev                  # http://localhost:4200  (antes era "npm start")
```
`npm start` ahora sirve la versión compilada; es el comando que usa Railway.

## Endpoints de la API

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/api/movies` | Lista todas las películas |
| GET | `/api/movies/{id}` | Muestra una película |
| POST | `/api/movies` | Crea una película |
| PUT | `/api/movies/{id}` | Actualiza una película |
| DELETE | `/api/movies/{id}` | Elimina una película |

Campos: `title`, `year`, `synopsis`, `cover` (URL de la imagen) y `trailer` (URL de YouTube, opcional).
