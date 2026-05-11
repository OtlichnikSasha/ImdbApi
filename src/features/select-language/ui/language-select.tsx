import clsx from 'clsx';
import type { ReactElement } from 'react';
import { useCallback, useId, useRef, useState } from 'react';

import IconDe from '@shared/assets/icons/flag-de.svg?react';
import IconEs from '@shared/assets/icons/flag-es.svg?react';
import IconUs from '@shared/assets/icons/flag-us.svg?react';
import { languages, useI18n } from '@shared/i18n';
import type { LanguageCode } from '@shared/i18n';
import { useClickOutside } from '@shared/lib/use-click-outside';

const languageIcons: Record<LanguageCode, ReactElement> = {
  de: <IconDe />,
  en: <IconUs />,
  es: <IconEs />,
};

interface LanguageSelectProps {
  onSelect?: () => void;
}

export const LanguageSelect = ({ onSelect }: LanguageSelectProps) => {
  const { language, setLanguage, t } = useI18n();
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const menuId = useId();
  const closeMenu = useCallback(() => setOpen(false), []);

  const activeLanguage =
    languages.find((languageItem) => languageItem.code === language) ?? languages[0];

  const selectLanguage = (nextLanguage: LanguageCode): void => {
    setLanguage(nextLanguage);
    setOpen(false);
    onSelect?.();
  };

  useClickOutside(containerRef, closeMenu, open);

  return (
    <div className="relative size-9 min-h-9 min-w-9" ref={containerRef}>
      <button
        aria-controls={menuId}
        aria-expanded={open}
        aria-haspopup="menu"
        aria-label={t('Language')}
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        type="button"
      >
        <span aria-hidden="true" className="[&>svg]:size-9">
          {languageIcons[activeLanguage.code]}
        </span>
      </button>
      {open && (
        <ul
          className="absolute right-0 mt-2 w-48 origin-top-right animate-[menu-in_160ms_ease-out_both] overflow-hidden rounded-2xl border border-border bg-[rgb(var(--color-surface))] py-1 shadow-soft"
          id={menuId}
          role="menu"
        >
          {languages.map((languageItem) => (
            <li
              key={languageItem.code}
              aria-pressed={languageItem.code === language}
              className={clsx(
                'flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-sm font-semibold transition',
                languageItem.code === language
                  ? 'bg-accent-muted text-accent-text'
                  : 'text-text-muted hover:bg-surface-muted',
              )}
              onClick={() => selectLanguage(languageItem.code)}
              role="menuitem"
            >
              <span aria-hidden="true" className="[&>svg]:size-5">
                {languageIcons[languageItem.code]}
              </span>
              <span>{languageItem.country}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
