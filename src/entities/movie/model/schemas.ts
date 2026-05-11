import { z } from 'zod';

export const movieSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  year: z.number().int().positive(),
  posterUrl: z.string().url(),
  rating: z.number().min(0).max(10),
  voteCount: z.number().int().nonnegative(),
  genres: z.array(z.string().min(1)),
  isFavorite: z.boolean(),
});

export const movieActorSchema = z.object({
  actorName: z.string().min(1),
  characterName: z.string().min(1),
  department: z.string().optional(),
  id: z.string().min(1),
  profileUrl: z.string().url().optional(),
  tmdbUrl: z.string().url(),
});

export const movieDetailsSchema = movieSchema.extend({
  runtime: z.number().int().positive(),
  director: z.string().min(1),
  overview: z.string().min(1),
  cast: z.array(movieActorSchema),
});

export const movieListResponseSchema = z.object({
  items: z.array(movieSchema),
});

export type Movie = z.infer<typeof movieSchema>;
export type MovieActor = z.infer<typeof movieActorSchema>;
export type MovieDetails = z.infer<typeof movieDetailsSchema>;

export const tmdbMovieSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  release_date: z.string(),
  poster_path: z.string().nullable(),
  vote_average: z.number().min(0).max(10),
  vote_count: z.number().int().nonnegative(),
  genre_ids: z.array(z.number().int()),
  overview: z.string(),
});

export const tmdbGenreSchema = z.object({
  id: z.number().int(),
  name: z.string().min(1),
});

export const tmdbCreditsSchema = z.object({
  cast: z.array(
    z.object({
      character: z.string().optional(),
      id: z.number().int().positive(),
      known_for_department: z.string().optional(),
      name: z.string().min(1).optional(),
      original_name: z.string().min(1).optional(),
      profile_path: z.string().nullable().optional(),
    }),
  ),
  crew: z.array(
    z.object({
      name: z.string().min(1),
      job: z.string().min(1),
    }),
  ),
});

export const tmdbMovieDetailsSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  release_date: z.string(),
  poster_path: z.string().nullable(),
  vote_average: z.number().min(0).max(10),
  vote_count: z.number().int().nonnegative(),
  genres: z.array(tmdbGenreSchema),
  overview: z.string(),
  runtime: z.number().int().positive().nullable(),
  credits: tmdbCreditsSchema.optional(),
});

export const tmdbMovieListResponseSchema = z.object({
  page: z.number().int().positive(),
  results: z.array(tmdbMovieSchema),
  total_pages: z.number().int().nonnegative(),
  total_results: z.number().int().nonnegative(),
});
