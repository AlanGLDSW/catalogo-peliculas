export interface Pelicula {
  id: number;
  title: string;
  year: number;
  synopsis: string;
  cover: string;
  trailer: string | null;
}

export interface PeliculaDatos {
  title: string;
  year: number;
  synopsis: string;
  cover: string;
  trailer: string | null;
}
