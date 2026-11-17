/**
 * Enlaces de YouTube aceptados para el trailer:
 * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID y youtube.com/shorts/ID.
 */
export const ENLACE_YOUTUBE =
  /^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[A-Za-z0-9_-]{11}/;

/** Obtiene el identificador de 11 caracteres del video, o null si el enlace no es de YouTube. */
export function idDeYoutube(enlace: string | null | undefined): string | null {
  if (!enlace || !ENLACE_YOUTUBE.test(enlace)) {
    return null;
  }

  const url = new URL(enlace);
  const id = url.hostname === 'youtu.be'
    ? url.pathname.slice(1, 12)
    : url.searchParams.get('v') ?? url.pathname.split('/')[2];

  return /^[A-Za-z0-9_-]{11}$/.test(id ?? '') ? id : null;
}
