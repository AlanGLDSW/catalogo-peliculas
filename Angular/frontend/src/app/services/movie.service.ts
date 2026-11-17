import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { Pelicula, PeliculaDatos } from '../models/pelicula';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private readonly http = inject(HttpClient);

  // La URL base cambia según el entorno: local (environment.ts) o Railway (environment.prod.ts).
  private readonly apiUrl = `${environment.apiUrl}/movies`;

  getMovies(): Observable<Pelicula[]> {
    return this.http.get<Pelicula[]>(this.apiUrl);
  }

  getMovie(id: number): Observable<Pelicula> {
    return this.http.get<Pelicula>(`${this.apiUrl}/${id}`);
  }

  createMovie(datos: PeliculaDatos): Observable<Pelicula> {
    return this.http.post<Pelicula>(this.apiUrl, datos);
  }

  updateMovie(id: number, datos: PeliculaDatos): Observable<Pelicula> {
    return this.http.put<Pelicula>(`${this.apiUrl}/${id}`, datos);
  }

  deleteMovie(id: number): Observable<unknown> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
