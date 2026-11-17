<?php

namespace App\Http\Controllers;

use App\Models\Movie;
use Illuminate\Http\Request;

class MovieController extends Controller
{
    /**
     * Enlaces de YouTube aceptados para el trailer:
     * youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID y youtube.com/shorts/ID.
     */
    private const YOUTUBE = '/^https:\/\/(www\.|m\.)?(youtube\.com\/(watch\?v=|embed\/|shorts\/)|youtu\.be\/)[A-Za-z0-9_-]{11}/';

    public function index()
    {
        $movies = Movie::orderBy('id')->get();
        return response()->json($movies);
    }

    public function show($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }

        return response()->json($movie);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string',
            'synopsis' => 'required|string',
            'year' => 'required|integer',
            'cover' => 'required|url|max:255',
            'trailer' => ['nullable', 'url', 'max:255', 'regex:'.self::YOUTUBE],
        ], [
            'trailer.regex' => 'El trailer debe ser un enlace de YouTube.',
        ]);

        $movie = Movie::create($validated);

        return response()->json($movie, 201);
    }

    public function update(Request $request, $id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }

        $validated = $request->validate([
            'title' => 'required|string',
            'synopsis' => 'required|string',
            'year' => 'required|integer',
            'cover' => 'required|url|max:255',
            'trailer' => ['nullable', 'url', 'max:255', 'regex:'.self::YOUTUBE],
        ], [
            'trailer.regex' => 'El trailer debe ser un enlace de YouTube.',
        ]);

        $movie->update($validated);

        return response()->json($movie, 200);
    }

    public function destroy($id)
    {
        $movie = Movie::find($id);

        if (!$movie) {
            return response()->json(['message' => 'Película no encontrada'], 404);
        }

        $movie->delete();

        return response()->json(['message' => 'Película eliminada correctamente'], 200);
    }
}