import { useParams } from 'react-router-dom';

import { formatVoteCount, useMovieDetailsQuery } from '@entities/movie';
import { ToggleFavoriteButton } from '@features/favorite-movie';
import ClockIcon from '@shared/assets/icons/clock.svg?react';
import StarIcon from '@shared/assets/icons/star.svg?react';
import { useI18n } from '@shared/i18n';
import { BackButton } from '@shared/ui/back-button';

import { ActorItem } from './actor-item';

export const MovieDetailsPage = () => {
  const { t } = useI18n();
  const { movieId = '' } = useParams<{ movieId: string }>();
  const movieQuery = useMovieDetailsQuery(movieId);

  const movie = movieQuery.data;
  const formattedVoteCount = formatVoteCount(movie.voteCount);
  const runtimeHours = Math.floor(movie.runtime / 60);
  const runtimeMinutes = movie.runtime % 60;
  const formattedRuntime = [
    runtimeHours > 0 ? `${runtimeHours}h` : null,
    runtimeMinutes > 0 ? `${runtimeMinutes} min` : null,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <article aria-labelledby="movie-title" className="min-w-0">
      <div className="flex items-center justify-between mb-4">
        <BackButton title={t('Back to movies')} url="/" />
        <ToggleFavoriteButton movie={movie} iconOnly />
      </div>

      <div className="grid min-w-0 gap-8 lg:grid-cols-[320px_minmax(0,1fr)]">
        <img
          alt={`${movie.title} poster`}
          className="w-full rounded-3xl bg-surface-muted object-cover shadow-soft"
          src={movie.posterUrl}
        />
        <div className="min-w-0 space-y-6">
          <div>
            <div aria-label="Movie categories" className="mb-5 flex flex-wrap gap-1">
              {movie.genres.map((genre) => (
                <span
                  className="rounded-full border border-border bg-accent-muted px-3 py-1 text-xs font-semibold text-accent-text"
                  key={genre}
                >
                  {genre}
                </span>
              ))}
            </div>

            <h1
              className="max-w-full truncate text-3xl font-bold text-text sm:text-5xl"
              id="movie-title"
              title={movie.title}
            >
              {movie.title}
            </h1>

            <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-text-muted">
              <span>{movie.year}</span>
              <span className="inline-flex items-center gap-1">
                <ClockIcon className="h-4 w-4" aria-hidden="true" />
                {formattedRuntime}
              </span>
              <span
                aria-label={`Rating ${movie.rating.toFixed(1)} from ${movie.voteCount} votes`}
                className="inline-flex items-center gap-1"
              >
                <StarIcon className="h-4 w-4 text-amber-400" aria-hidden="true" />
                {movie.rating.toFixed(1)} ({formattedVoteCount})
              </span>
            </div>
          </div>

          <div className="space-y-3 text-text-muted">
            <p className="text-sm font-semibold uppercase tracking-wide text-text-soft">
              {t('Directed by')} {movie.director}
            </p>
            <p className="max-w-3xl leading-7">{movie.overview}</p>
          </div>
          {movie.cast.length > 0 && (
            <section aria-labelledby="cast-heading" className="space-y-3">
              <h2
                className="text-sm font-semibold uppercase tracking-wide text-text-soft"
                id="cast-heading"
              >
                {t('Cast')}
              </h2>
              <ul className="grid gap-3 sm:grid-cols-2">
                {movie.cast.map((castMember) => (
                  <ActorItem actor={castMember} key={castMember.id} />
                ))}
              </ul>
            </section>
          )}
        </div>
      </div>
    </article>
  );
};
