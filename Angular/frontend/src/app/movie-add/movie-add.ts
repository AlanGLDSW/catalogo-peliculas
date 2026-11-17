import { Component, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

import { PeliculaDatos } from '../models/pelicula';
import { MovieService } from '../services/movie.service';
import { ENLACE_YOUTUBE } from '../utils/youtube';

@Component({
  selector: 'app-movie-add',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-add.html',
  styleUrl: './movie-add.css'
})
export class MovieAdd {
  private readonly movieService = inject(MovieService);
  private readonly router = inject(Router);

  formulario = new FormGroup({
    title: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required, Validators.maxLength(255)]
    }),
    year: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1888),
      Validators.max(2100)
    ]),
    synopsis: new FormControl('', { nonNullable: true, validators: [Validators.required] }),
    cover: new FormControl('', { nonNullable: true, validators: [Validators.required, Validators.pattern(/^https?:\/\/.+/)] }),
    trailer: new FormControl('', { nonNullable: true, validators: [Validators.pattern(ENLACE_YOUTUBE)] })
  });

  guardando = signal(false);
  error = signal('');

  guardar(): void {
    if (this.formulario.invalid) {
      this.formulario.markAllAsTouched();
      return;
    }

    const valores = this.formulario.getRawValue();
    const datos: PeliculaDatos = {
      title: valores.title,
      year: Number(valores.year),
      synopsis: valores.synopsis,
      cover: valores.cover,
      trailer: valores.trailer.trim() || null
    };

    this.guardando.set(true);
    this.error.set('');

    this.movieService.createMovie(datos).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.error.set('No se pudo guardar la película. Revisa los datos y que Laravel esté encendido.');
        this.guardando.set(false);
      }
    });
  }
}
