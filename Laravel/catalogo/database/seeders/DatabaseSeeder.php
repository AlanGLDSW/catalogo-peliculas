<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * No se usan factories ni Faker porque en Railway las dependencias de
     * desarrollo no se instalan (composer install --no-dev).
     */
    public function run(): void
    {
        $this->call(MovieSeeder::class);
    }
}
