import FilmIcon from '@shared/assets/icons/film.svg?react';

export const AppLoader = () => (
  <div
    aria-label="Loading"
    aria-live="polite"
    className="fixed inset-0 z-50 grid place-items-center bg-app px-6"
    role="status"
  >
    <div className="flex flex-col items-center gap-5">
      <div className="relative h-24 w-24">
        <div className="absolute inset-0 animate-[loader-orbit_1.6s_linear_infinite] rounded-full border-4 border-transparent border-t-emerald-500 border-r-sky-400" />
        <div className="absolute inset-3 animate-[loader-pulse_1.2s_ease-in-out_infinite] rounded-3xl bg-primary text-primary-contrast shadow-soft">
          <FilmIcon className="m-auto h-full w-10" aria-hidden="true" />
        </div>
      </div>
      <span className="sr-only">Loading movies</span>
    </div>
  </div>
);
