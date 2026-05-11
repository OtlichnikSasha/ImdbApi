import { z } from 'zod';

import { createLocalStorageStore } from '@shared/lib/local-storage';

import { movieSchema } from './schemas';
import type { Movie } from './schemas';

const favoriteMoviesStorageKey = 'favorite_movies';
const favoriteMoviesSchema = z.array(movieSchema);
const favoriteMoviesStore = createLocalStorageStore<Movie[]>(
  favoriteMoviesStorageKey,
  [],
  (value) => favoriteMoviesSchema.parse(value),
);

const listeners = new Set<() => void>();

const emitChange = (): void => {
  listeners.forEach((listener) => listener());
};

const uniqueFavoriteMovies = (movies: Movie[]): Movie[] => {
  const movieById = new Map<string, Movie>();

  movies.forEach((movie) => {
    movieById.set(movie.id, { ...movie, isFavorite: true });
  });

  return Array.from(movieById.values());
};

export const getFavoriteMovies = (): Movie[] => favoriteMoviesStore.read();

export const setFavoriteMovies = (movies: Movie[]): Movie[] => {
  const nextMovies = uniqueFavoriteMovies(movies);

  favoriteMoviesStore.write(nextMovies);
  emitChange();

  return nextMovies;
};

export const addFavoriteMovie = (movie: Movie): Movie[] =>
  setFavoriteMovies([...getFavoriteMovies().filter((favoriteMovie) => favoriteMovie.id !== movie.id), movie]);

export const removeFavoriteMovie = (movieId: string): Movie[] =>
  setFavoriteMovies(getFavoriteMovies().filter((movie) => movie.id !== movieId));

export const isFavoriteMovie = (movieId: string): boolean =>
  getFavoriteMovies().some((movie) => movie.id === movieId);

export const subscribeFavoriteMovies = (listener: () => void): (() => void) => {
  listeners.add(listener);

  return () => {
    listeners.delete(listener);
  };
};

export const markMovieFavoriteState = <TMovie extends Movie>(movie: TMovie): TMovie => ({
  ...movie,
  isFavorite: isFavoriteMovie(movie.id),
});
