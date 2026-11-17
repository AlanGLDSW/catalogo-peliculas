import { Component, OnInit, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';

import { Pelicula } from '../models/pelicula';
import { MovieService } from '../services/movie.service';

@Component({
  selector: 'app-movies',
  imports: [RouterLink],
  templateUrl: './movies.html',
  styleUrl: './movies.css'
})
export class Movies implements OnInit {
  private readonly movieService = inject(MovieService);

  peliculas = signal<Pelicula[]>([]);
  cargando = signal(true);
  error = signal('');

  ngOnInit(): void {
    this.movieService.getMovies().subscribe({
      next: (datos) => {
        this.peliculas.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar el catálogo. Revisa que Laravel esté encendido.');
        this.cargando.set(false);
      }
    });
  }
}