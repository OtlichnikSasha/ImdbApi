import { describe, expect, it } from 'vitest';

import { mapTmdbDetailsToMovieDetails, mapTmdbMovieToMovie } from './tmdb-mapper';

describe('tmdb mapper', () => {
  it('maps TMDB list item to Movie domain model', () => {
    const movie = mapTmdbMovieToMovie({
      genre_ids: [878, 18],
      id: 335984,
      overview: 'A sci-fi movie.',
      poster_path: '/poster.jpg',
      release_date: '2024-03-01',
      title: 'Example Movie',
      vote_average: 8.2,
      vote_count: 1245,
    });

    expect(movie).toEqual({
      genres: ['Sci-Fi', 'Drama'],
      id: '335984',
      isFavorite: false,
      posterUrl: 'https://image.tmdb.org/t/p/w500/poster.jpg',
      rating: 8.2,
      title: 'Example Movie',
      voteCount: 1245,
      year: 2024,
    });
  });

  it('extracts director and top cast from TMDB details', () => {
    const movie = mapTmdbDetailsToMovieDetails({
      credits: {
        cast: [
          {
            character: 'Hero One',
            id: 10,
            known_for_department: 'Acting',
            name: 'Actor One',
            profile_path: '/actor-one.jpg',
          },
          {
            character: 'Hero Two',
            id: 20,
            name: 'Actor Two',
          },
        ],
        crew: [{ job: 'Director', name: 'Director One' }],
      },
      genres: [{ id: 18, name: 'Drama' }],
      id: 1,
      overview: 'Details.',
      poster_path: null,
      release_date: '2020-01-01',
      runtime: 120,
      title: 'Details Movie',
      vote_average: 7.1,
      vote_count: 321,
    });

    expect(movie.director).toBe('Director One');
    expect(movie.cast).toEqual([
      {
        actorName: 'Actor One',
        characterName: 'Hero One',
        department: 'Acting',
        id: '10',
        profileUrl: 'https://image.tmdb.org/t/p/w500/actor-one.jpg',
        tmdbUrl: 'https://www.themoviedb.org/person/10',
      },
      {
        actorName: 'Actor Two',
        characterName: 'Hero Two',
        department: undefined,
        id: '20',
        profileUrl: undefined,
        tmdbUrl: 'https://www.themoviedb.org/person/20',
      },
    ]);
    expect(movie.genres).toEqual(['Drama']);
  });
});
