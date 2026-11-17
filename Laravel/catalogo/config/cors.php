<?php

/*
|--------------------------------------------------------------------------
| CORS (Cross-Origin Resource Sharing)
|--------------------------------------------------------------------------
|
| El frontend de Angular vive en otro dominio de Railway, así que el
| navegador necesita permiso para consultar la API. En producción define
| FRONTEND_URL con la dirección pública del frontend (sin "/" al final).
| Si no se define, se permite cualquier origen.
|
*/

return [

    'paths' => ['api/*'],

    'allowed_methods' => ['*'],

    'allowed_origins' => array_map('trim', explode(',', env('FRONTEND_URL', '*'))),

    'allowed_origins_patterns' => [],

    'allowed_headers' => ['*'],

    'exposed_headers' => [],

    'max_age' => 0,

    'supports_credentials' => false,

];
