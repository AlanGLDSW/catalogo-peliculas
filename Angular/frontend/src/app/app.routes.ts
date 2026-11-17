import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Movies } from './movies/movies';
import { Movie } from './movie/movie';
import { MovieAdd } from './movie-add/movie-add';
import { MovieEdit } from './movie-edit/movie-edit';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'movies', component: Movies },
  { path: 'movies/add', component: MovieAdd },
  { path: 'movie/:id/edit', component: MovieEdit },
  { path: 'movie/:id', component: Movie },
  { path: '**', redirectTo: '' },
];
