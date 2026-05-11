import type { z } from 'zod';

import type { Movie, MovieDetails, tmdbMovieDetailsSchema, tmdbMovieSchema } from './schemas';

type TmdbMovie = z.infer<typeof tmdbMovieSchema>;
type TmdbMovieDetails = z.infer<typeof tmdbMovieDetailsSchema>;

const imageBaseUrl = 'https://image.tmdb.org/t/p/w500';
const tmdbPersonBaseUrl = 'https://www.themoviedb.org/person';
const fallbackPosterUrl =
  'https://placehold.co/500x750/0f172a/f8fafc?text=No+Poster&font=montserrat';

const movieGenreById: Record<number, string> = {
  28: 'Action',
  12: 'Adventure',
  16: 'Animation',
  35: 'Comedy',
  80: 'Crime',
  99: 'Documentary',
  18: 'Drama',
  10751: 'Family',
  14: 'Fantasy',
  36: 'History',
  27: 'Horror',
  10402: 'Music',
  9648: 'Mystery',
  10749: 'Romance',
  878: 'Sci-Fi',
  10770: 'TV Movie',
  53: 'Thriller',
  10752: 'War',
  37: 'Western',
};

const getPosterUrl = (posterPath: string | null): string =>
  posterPath ? `${imageBaseUrl}${posterPath}` : fallbackPosterUrl;

const getProfileUrl = (profilePath?: string | null): string | undefined =>
  profilePath ? `${imageBaseUrl}${profilePath}` : undefined;

const getYear = (releaseDate: string): number => {
  const year = Number.parseInt(releaseDate.slice(0, 4), 10);

  return Number.isNaN(year) ? new Date().getFullYear() : year;
};

export const mapTmdbMovieToMovie = (movie: TmdbMovie): Movie => ({
  genres: movie.genre_ids.map((genreId) => movieGenreById[genreId] ?? 'Movie'),
  id: String(movie.id),
  isFavorite: false,
  posterUrl: getPosterUrl(movie.poster_path),
  rating: movie.vote_average,
  title: movie.title,
  voteCount: movie.vote_count,
  year: getYear(movie.release_date),
});

export const mapTmdbDetailsToMovieDetails = (movie: TmdbMovieDetails): MovieDetails => {
  const director = movie.credits?.crew.find((crewMember) => crewMember.job === 'Director')?.name;

  return {
    cast:
      movie.credits?.cast.slice(0, 8).map((castMember) => ({
        actorName: castMember.name ?? castMember.original_name ?? 'Unknown actor',
        characterName: castMember.character || 'Unknown role',
        department: castMember.known_for_department,
        id: String(castMember.id),
        profileUrl: getProfileUrl(castMember.profile_path),
        tmdbUrl: `${tmdbPersonBaseUrl}/${castMember.id}`,
      })) ?? [],
    director: director ?? 'Unknown director',
    genres: movie.genres.map((genre) => genre.name),
    id: String(movie.id),
    isFavorite: false,
    overview: movie.overview || 'No overview available.',
    posterUrl: getPosterUrl(movie.poster_path),
    rating: movie.vote_average,
    runtime: movie.runtime ?? 1,
    title: movie.title,
    voteCount: movie.vote_count,
    year: getYear(movie.release_date),
  };
};
