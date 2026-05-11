import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import { useFavoriteMoviesQuery } from '@entities/movie';
import { LanguageSelect } from '@features/select-language';
import { ThemeToggle } from '@features/toggle-theme';
import FilmIcon from '@shared/assets/icons/film.svg?react';
import HeartIcon from '@shared/assets/icons/heart.svg?react';
import { useI18n } from '@shared/i18n';

import { MobileHeaderMenu } from './mobile-header-menu';

const getNavLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  clsx(
    'inline-flex items-center gap-2 rounded-2xl px-3 py-2 text-sm font-semibold transition',
    isActive
      ? 'bg-primary text-primary-contrast'
      : 'text-text-muted hover:bg-surface-muted hover:text-text',
  );

export const Header = () => {
  const favoriteMoviesQuery = useFavoriteMoviesQuery({ refresh: false });
  const { t } = useI18n();

  const favoriteMovieCount = favoriteMoviesQuery.data.length;

  return (
    <header className="fixed inset-x-0 top-0 z-20 border-b border-border bg-[rgb(var(--color-app))]">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <NavLink
          aria-label={`${t('Movie Explorer')} home`}
          title={`${t('Movie Explorer')} home`}
          className="flex min-w-0 items-center gap-2 text-lg font-bold text-text"
          to="/"
        >
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-2xl bg-emerald-600 text-white">
            <FilmIcon className="h-5 w-5" aria-hidden="true" />
          </span>
          <span className="truncate">{t('Movie Explorer')}</span>
        </NavLink>
        <nav aria-label="Primary navigation" className="flex shrink-0 items-center gap-1 sm:gap-2">
          <NavLink
            className={(state) => clsx(getNavLinkClassName(state), 'hidden sm:inline-flex')}
            to="/"
          >
            {t('Movies')}
          </NavLink>
          <NavLink
            aria-label={`${t('Favorites')}: ${favoriteMovieCount}`}
            title={`${t('Favorites')}: ${favoriteMovieCount}`}
            className={(state) => clsx(getNavLinkClassName(state), 'hidden sm:inline-flex')}
            to="/favorites"
          >
            <HeartIcon className="h-4 w-4" aria-hidden="true" />
            <span>{favoriteMovieCount}</span>
          </NavLink>
          <div className="hidden sm:block">
            <LanguageSelect />
          </div>
          <div className="hidden sm:block">
            <ThemeToggle />
          </div>
          <MobileHeaderMenu favoriteMovieCount={favoriteMovieCount} />
        </nav>
      </div>
    </header>
  );
};
