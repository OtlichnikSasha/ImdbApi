import clsx from 'clsx';
import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

import { formatVoteCount } from '../model/format-vote-count';
import type { Movie } from '../model/schemas';

interface MovieCardProps {
  action?: ReactNode;
  index?: number;
  movie: Movie;
}

const getRatingClassName = (rating: number): string => {
  if (rating < 5) {
    return 'bg-rose-100 text-rose-700';
  }

  if (rating < 7) {
    return 'bg-amber-100 text-amber-700';
  }

  if (rating >= 8) {
    return 'bg-emerald-100 text-emerald-700';
  }

  return 'bg-sky-100 text-sky-700';
};

export const MovieCard = ({ action, index = 0, movie }: MovieCardProps) => {
  const visibleGenres = movie.genres.slice(0, 4);
  const hiddenGenreCount = Math.max(movie.genres.length - visibleGenres.length, 0);
  const formattedVoteCount = formatVoteCount(movie.voteCount);

  return (
    <article
      aria-label={`${movie.title}, ${movie.year}`}
      className="group relative animate-[movie-card-in_420ms_ease-out_both] cursor-pointer overflow-hidden rounded-3xl border border-border bg-surface shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-soft"
      style={{ animationDelay: `${Math.min(index % 20, 12) * 35}ms` }}
    >
      <Link
        aria-label={`Open details for ${movie.title}`}
        className="absolute inset-0 z-10 rounded-3xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
        to={`/movies/${movie.id}`}
      />
      <div className="relative overflow-hidden">
        <img
          alt={`${movie.title} poster`}
          className="aspect-[2/3] w-full bg-surface-muted object-cover transition duration-300 group-hover:scale-[1.03]"
          loading="lazy"
          src={movie.posterUrl}
        />
        {action && <div className="absolute right-3 top-3 z-20">{action}</div>}
      </div>
      <div className="pointer-events-none relative z-[1] flex min-h-44 flex-col p-4 pb-3">
        <div className="min-h-14">
          <h2 className="line-clamp-2 text-base font-bold leading-7 text-text transition group-hover:text-accent-text">
            {movie.title}
          </h2>
        </div>
        <div className="mt-2 flex items-center justify-between gap-3">
          <p className="text-sm font-medium text-text-soft">{movie.year}</p>
          {movie.rating !== 0 && (
            <span
              aria-label={`Rating ${movie.rating.toFixed(1)} from ${movie.voteCount} votes`}
              className={clsx(
                'rounded-full px-2.5 py-1 text-xs font-bold',
                getRatingClassName(movie.rating),
              )}
            >
              {movie.rating.toFixed(1)} ({formattedVoteCount})
            </span>
          )}
        </div>
        <ul
          aria-label="Movie categories"
          className="mt-4 flex min-h-12 flex-wrap content-start gap-1 gap-y-1.5"
        >
          {visibleGenres.map((genre) => (
            <li
              className="max-w-max truncate rounded-full border border-border bg-surface-muted px-2.5 py-1 text-xs font-semibold text-text-muted"
              key={genre}
            >
              {genre}
            </li>
          ))}

          {hiddenGenreCount > 0 ? (
            <li className="rounded-full border border-border bg-accent-muted px-2.5 py-1 text-xs font-bold text-accent-text">
              +{hiddenGenreCount}
            </li>
          ) : null}
        </ul>
      </div>
    </article>
  );
};
