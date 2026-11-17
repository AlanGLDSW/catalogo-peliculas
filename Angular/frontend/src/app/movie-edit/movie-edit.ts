import { Component, OnInit, inject, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { PeliculaDatos } from '../models/pelicula';
import { MovieService } from '../services/movie.service';
import { ENLACE_YOUTUBE } from '../utils/youtube';

@Component({
  selector: 'app-movie-edit',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './movie-edit.html',
  styleUrl: './movie-edit.css'
})
export class MovieEdit implements OnInit {
  private readonly movieService = inject(MovieService);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  private id = 0;

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

  cargando = signal(true);
  guardando = signal(false);
  error = signal('');

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    this.movieService.getMovie(this.id).subscribe({
      next: (pelicula) => {
        this.formulario.patchValue({
          title: pelicula.title,
          year: pelicula.year,
          synopsis: pelicula.synopsis,
          cover: pelicula.cover,
          trailer: pelicula.trailer ?? ''
        });
        this.cargando.set(false);
      },
      error: () => {
        this.error.set('No se pudo cargar la película. Revisa que exista y que Laravel esté encendido.');
        this.cargando.set(false);
      }
    });
  }

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

    this.movieService.updateMovie(this.id, datos).subscribe({
      next: () => {
        this.router.navigate(['/movies']);
      },
      error: () => {
        this.error.set('No se pudieron guardar los cambios. Revisa los datos y que Laravel esté encendido.');
        this.guardando.set(false);
      }
    });
  }
}
