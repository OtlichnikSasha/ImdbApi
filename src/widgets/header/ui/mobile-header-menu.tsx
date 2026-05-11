import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useId, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';

import { ThemeToggle } from '@features/toggle-theme';
import CheckIcon from '@shared/assets/icons/check.svg?react';
import IconDe from '@shared/assets/icons/flag-de.svg?react';
import IconEs from '@shared/assets/icons/flag-es.svg?react';
import IconUs from '@shared/assets/icons/flag-us.svg?react';
import { languages, useI18n } from '@shared/i18n';
import type { LanguageCode } from '@shared/i18n';
import { useClickOutside } from '@shared/lib/use-click-outside';

interface MobileHeaderMenuProps {
  favoriteMovieCount: number;
}

const getMenuLinkClassName = ({ isActive }: { isActive: boolean }): string =>
  clsx(
    'flex w-full items-center gap-1 rounded-xl py-2 text-sm font-semibold transition px-2',
    isActive
      ? 'bg-primary text-primary-contrast'
      : 'text-text-muted hover:bg-surface-muted hover:text-text',
  );

const languageIcons: Record<LanguageCode, ReactElement> = {
  de: <IconDe />,
  en: <IconUs />,
  es: <IconEs />,
};

export const MobileHeaderMenu = ({ favoriteMovieCount }: MobileHeaderMenuProps) => {
  const { language, setLanguage, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();

  const closeMenu = useCallback(() => setOpen(false), []);

  const selectLanguage = (nextLanguage: LanguageCode): void => {
    setLanguage(nextLanguage);
  };

  useClickOutside(containerRef, closeMenu, open);

  return (
    <div className="relative sm:hidden" ref={containerRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-label="Open menu"
        className="inline-flex size-9 items-center justify-center rounded-[50%] border border-border bg-surface text-text shadow-sm transition hover:bg-surface-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        type="button"
      >
        <span className="relative h-4 w-5" aria-hidden="true">
          <span
            className={clsx(
              'absolute left-0 top-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200',
              open && 'translate-y-[7px] rotate-45',
            )}
          />
          <span
            className={clsx(
              'absolute left-0 top-[7px] h-0.5 w-5 rounded-full bg-current transition-opacity duration-150',
              open && 'opacity-0',
            )}
          />
          <span
            className={clsx(
              'absolute bottom-0 left-0 h-0.5 w-5 rounded-full bg-current transition-transform duration-200',
              open && '-translate-y-[7px] -rotate-45',
            )}
          />
        </span>
      </button>
      {open && (
        <div
          className="absolute right-0 mt-2 w-64 origin-top-right animate-[menu-in_160ms_ease-out_both] rounded-2xl border border-border bg-[rgb(var(--color-surface))] p-3 shadow-soft"
          id={menuId}
        >
          <nav aria-label="Mobile navigation" className="space-y-1 mb-2">
            <NavLink className={getMenuLinkClassName} onClick={closeMenu} to="/">
              {t('Movies')}
            </NavLink>
            <NavLink
              aria-label={`${t('Favorites')}: ${favoriteMovieCount}`}
              className={getMenuLinkClassName}
              onClick={closeMenu}
              to="/favorites"
            >
              <span>{t('Favorites')}</span>
              <span>({favoriteMovieCount})</span>
            </NavLink>
          </nav>

          <ThemeToggle />

          <div className="mt-2">
            <p className="mb-2 text-sm font-semibold text-text-muted">{t('Choose language')}</p>
            <div className="flex items-center gap-2">
              {languages.map((languageItem) => {
                const selected = languageItem.code === language;

                return (
                  <button
                    key={languageItem.code}
                    aria-label={languageItem.country}
                    aria-pressed={selected}
                    className={clsx(
                      'relative flex size-10 items-center justify-center rounded-full transition focus:outline-none focus-visible:ring-2 focus-visible:ring-accent',
                      selected && 'ring-2 ring-border',
                    )}
                    onClick={() => selectLanguage(languageItem.code)}
                    type="button"
                  >
                    <span className="block size-10 overflow-hidden rounded-full [&>svg]:size-full">
                      {languageIcons[languageItem.code]}
                    </span>

                    {selected && (
                      <span className="absolute inset-0 flex items-center justify-center rounded-full bg-surface-muted/70 text-accent-text">
                        <span className="flex size-7 items-center justify-center rounded-full bg-surface shadow-sm">
                          <CheckIcon className="size-5" aria-hidden="true" />
                        </span>
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
