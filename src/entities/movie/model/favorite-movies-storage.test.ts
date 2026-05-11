import { beforeEach, describe, expect, it } from 'vitest';

import {
  addFavoriteMovie,
  getFavoriteMovies,
  isFavoriteMovie,
  removeFavoriteMovie,
  setFavoriteMovies,
} from './favorite-movies-storage';
import type { Movie } from './schemas';

const movie: Movie = {
  genres: ['Drama'],
  id: '1',
  isFavorite: false,
  posterUrl: 'https://example.com/poster.jpg',
  rating: 7,
  title: 'Movie',
  voteCount: 100,
  year: 2024,
};

describe('favorite movies storage', () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it('stores movies under favorite_movies and marks them as favorite', () => {
    addFavoriteMovie(movie);

    expect(getFavoriteMovies()).toEqual([{ ...movie, isFavorite: true }]);
    expect(isFavoriteMovie(movie.id)).toBe(true);
  });

  it('removes movies by id', () => {
    setFavoriteMovies([movie]);
    removeFavoriteMovie(movie.id);

    expect(getFavoriteMovies()).toEqual([]);
    expect(isFavoriteMovie(movie.id)).toBe(false);
  });
});
