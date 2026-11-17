<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Agrega la columna del trailer (enlace de YouTube) a las películas.
     */
    public function up(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->string('trailer')->nullable()->after('cover');
        });
    }

    /**
     * Elimina la columna del trailer.
     */
    public function down(): void
    {
        Schema::table('movies', function (Blueprint $table) {
            $table->dropColumn('trailer');
        });
    }
};
