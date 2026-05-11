import type { MovieActor } from '@entities/movie';
import CameraOffIcon from '@shared/assets/icons/camera-off.svg?react';

interface ActorItemProps {
  actor: MovieActor;
}

export const ActorItem = ({ actor }: ActorItemProps) => (
  <li className="flex min-w-0 items-center gap-3 rounded-2xl border border-border bg-surface p-3">
    {actor.profileUrl ? (
      <img
        alt={actor.actorName}
        className="h-14 w-14 shrink-0 rounded-xl bg-surface-muted object-cover"
        loading="lazy"
        src={actor.profileUrl}
      />
    ) : (
      <div
        aria-label={`No photo available for ${actor.actorName}`}
        className="bg-gray-200 flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-surface-muted text-text-soft"
        role="img"
      >
        <CameraOffIcon className="h-6 w-6" aria-hidden="true" />
      </div>
    )}
    <div className="min-w-0">
      <p className="truncate text-sm font-semibold text-text">
        {actor.characterName} - {actor.actorName}
      </p>
      <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-text-soft">
        {actor.department ? <span>{actor.department}</span> : null}
        <a
          className="font-semibold text-accent-text hover:underline"
          href={actor.tmdbUrl}
          rel="noreferrer"
          target="_blank"
        >
          TMDB
        </a>
      </div>
    </div>
  </li>
);
