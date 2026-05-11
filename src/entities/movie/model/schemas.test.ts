import { describe, expect, it } from 'vitest';

import { movieDetailsSchema, movieListResponseSchema } from './schemas';

describe('movie schemas', () => {
  it('validates movie list response from API', () => {
    const result = movieListResponseSchema.parse({
      items: [
        {
          id: 'arrival',
          title: 'Arrival',
          year: 2016,
          posterUrl: 'https://example.com/poster.jpg',
          rating: 7.9,
          voteCount: 100,
          genres: ['Sci-Fi'],
          isFavorite: false,
        },
      ],
    });

    expect(result.items[0]?.title).toBe('Arrival');
  });

  it('rejects invalid ratings', () => {
    expect(() =>
      movieDetailsSchema.parse({
        id: 'bad-movie',
        title: 'Bad Movie',
        year: 2024,
        posterUrl: 'https://example.com/poster.jpg',
        rating: 12,
        voteCount: 100,
        genres: ['Drama'],
        isFavorite: false,
        runtime: 100,
        director: 'Someone',
        overview: 'Overview',
        cast: [
          {
            actorName: 'Actor',
            characterName: 'Role',
            id: '1',
            tmdbUrl: 'https://www.themoviedb.org/person/1',
          },
        ],
      }),
    ).toThrow();
  });
});
