import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { Pelicula } from '../models/pelicula';
import { MovieService } from '../services/movie.service';
import { idDeYoutube } from '../utils/youtube';

@Component({
  selector: 'app-movie',
  imports: [RouterLink],
  templateUrl: './movie.html',
  styleUrl: './movie.css'
})
export class Movie implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);
  private readonly sanitizer = inject(DomSanitizer);

  pelicula = signal<Pelicula | null>(null);
  cargando = signal(true);
  error = signal('');
  confirmando = signal(false);
  eliminando = signal(false);

  /** Identificador del video de YouTube de la película (o null si no tiene trailer). */
  idTrailer = computed(() => idDeYoutube(this.pelicula()?.trailer));

  /**
   * Dirección del reproductor incrustado de YouTube. Solo se construye a partir de un
   * identificador validado de 11 caracteres, por eso es seguro marcarla como confiable.
   */
  trailerEmbed = computed<SafeResourceUrl | null>(() => {
    const id = this.idTrailer();
    return id
      ? this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube-nocookie.com/embed/${id}`)
      : null;
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovie(id).subscribe({
      next: (datos) => {
        this.pelicula.set(datos);
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la película. Revisa que exista y que Laravel esté encendido.');
        this.cargando.set(false);
      }
    });
  }

  pedirConfirmacion(): void {
    this.confirmando.set(true);
  }

  cancelar(): void {
    this.confirmando.set(false);
  }

  eliminar(): void {
    const datos = this.pelicula();
    if (!datos) {
      return;
    }

    this.eliminando.set(true);
    this.error.set('');

    this.movieService.deleteMovie(datos.id).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.error.set('No se pudo eliminar la película. Revisa que Laravel esté encendido.');
        this.eliminando.set(false);
        this.confirmando.set(false);
      }
    });
  }
}
