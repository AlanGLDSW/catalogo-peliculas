<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{
    /**
     * Carga las películas iniciales del catálogo.
     *
     * Solo se ejecuta si la tabla está vacía, así no se duplican ni se
     * sobrescriben las películas cada vez que Railway vuelve a desplegar.
     */
    public function run(): void
    {
        if (Movie::query()->exists()) {
            return;
        }

        $peliculas = [
            [
                'title' => 'Interstellar',
                'synopsis' => 'Un grupo de astronautas viaja a través de un agujero de gusano para buscar un nuevo hogar para la humanidad.',
                'year' => 2014,
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSkUqb-86cLqozgook0Yj9QkHHAiSEqNGoHe3CgZYIrjuH8fOVC0kcKexd&s=10',
                'trailer' => 'https://www.youtube.com/watch?v=zSWdZVtXT7E',
            ],
            [
                'title' => 'El Padrino',
                'synopsis' => 'La historia de una familia de la mafia italiana en Nueva York y del hijo que termina heredando el mando.',
                'year' => 1972,
                'cover' => 'https://m.media-amazon.com/images/S/pv-target-images/65370eea3a57eee0d17af1e4817824010109f8c61039342591b1263dd141a885.jpg',
                'trailer' => 'https://www.youtube.com/watch?v=Ew9ngL1GZvs',
            ],
            [
                'title' => 'Matrix',
                'synopsis' => 'Un programador descubre que el mundo en el que vive es una simulación controlada por máquinas.',
                'year' => 1999,
                'cover' => 'https://m.media-amazon.com/images/M/MV5BN2NmN2VhMTQtMDNiOS00NDlhLTliMjgtODE2ZTY0ODQyNDRhXkEyXkFqcGc@._V1_.jpg',
                'trailer' => 'https://www.youtube.com/watch?v=vKQi3bBA1y8',
            ],
            [
                'title' => 'Origen',
                'synopsis' => 'Un ladrón especializado en robar ideas desde los sueños recibe la misión de plantar una en la mente de alguien.',
                'year' => 2010,
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9DSl6hgm9XKcJXPJmEdJDYzAPQq5BH7VebiDB4VzDssXSOZhHH7xSYEI&s=10',
                'trailer' => 'https://www.youtube.com/watch?v=YoHD9XEInc0',
            ],
            [
                'title' => 'Gladiador',
                'synopsis' => 'Un general romano traicionado se convierte en gladiador y busca vengarse del emperador.',
                'year' => 2000,
                'cover' => 'https://www.aceprensa.com/wp-content/uploads/2000/05/Gladiator.jpg',
                'trailer' => 'https://www.youtube.com/watch?v=P5ieIbInFpg',
            ],
            [
                'title' => 'Forrest Gump',
                'synopsis' => 'Un hombre de gran corazón vive, sin proponérselo, algunos de los momentos más importantes de la historia de su país.',
                'year' => 1994,
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS00wc4DqnYo9VDnEmQIGdHAyR3AIuFvhX1Qv2V-A7VBnSpCX4FAXhwVyQ&s=10',
                'trailer' => 'https://www.youtube.com/watch?v=E4JMfZNswzY',
            ],
            [
                'title' => 'Parque Jurásico',
                'synopsis' => 'Un parque temático con dinosaurios clonados se sale de control durante la visita de un grupo de expertos.',
                'year' => 1993,
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9WNVVF0qD6v1Bp8zp67EVkJBM-A5dqJBUqSkf81LNGJ_5k97XM0iUa0rM&s=10',
                'trailer' => 'https://www.youtube.com/watch?v=QWBKEmWWL38',
            ],
            [
                'title' => 'El Rey León',
                'synopsis' => 'Un joven león debe regresar a su tierra para enfrentar a su tío y recuperar el trono que le corresponde.',
                'year' => 1994,
                'cover' => 'https://m.media-amazon.com/images/M/MV5BNjExYTQwY2EtMDRkYi00ZWIzLTkwZDUtYjVmODYxMDUwNDI5XkEyXkFqcGc@._V1_.jpg',
                'trailer' => 'https://www.youtube.com/watch?v=lFzVJEksoDY',
            ],
            [
                'title' => 'Pulp Fiction',
                'synopsis' => 'Las vidas de dos sicarios, un boxeador y la esposa de un gánster se cruzan en Los Ángeles.',
                'year' => 1994,
                'cover' => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTxygT7eRMvDsnnj-2VPYrl5s7bxtzB7Zpwu_HlgOFtMA&s=10',
                'trailer' => 'https://www.youtube.com/watch?v=tGpTpVyI_OQ',
            ],
            [
                'title' => 'Avatar',
                'synopsis' => 'En el año 2154, un exmarine parapléjico es enviado a la exuberante luna Pandora en una misión corporativa, pero al infiltrarse entre los nativos Na\'vi mediante un cuerpo híbrido controlado mentalmente.',
                'year' => 2009,
                'cover' => 'https://m.media-amazon.com/images/M/MV5BM2RiNGMzM2QtMzkyNi00OGYyLWE5MTctNDRkOTRkZmI5ZGJlXkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg',
                'trailer' => 'https://www.youtube.com/watch?v=Qu4PdEaiXKg',
            ],
        ];

        foreach ($peliculas as $pelicula) {
            Movie::create($pelicula);
        }
    }
}
