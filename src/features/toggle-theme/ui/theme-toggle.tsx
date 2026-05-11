import clsx from 'clsx';

import MoonIcon from '@shared/assets/icons/moon.svg?react';
import SunIcon from '@shared/assets/icons/sun.svg?react';
import { useI18n } from '@shared/i18n';
import { useTheme } from '@shared/lib/theme-context';

interface ThemeToggleProps {
  onToggle?: () => void;
}

export const ThemeToggle = ({ onToggle }: ThemeToggleProps) => {
  const { theme, toggleTheme } = useTheme();
  const { t } = useI18n();
  const dark = theme === 'dark';

  const switchTheme = (): void => {
    toggleTheme();
    onToggle?.();
  };

  return (
    <button
      aria-label={dark ? t('Switch to light theme') : t('Switch to dark theme')}
      aria-pressed={dark}
      className="relative inline-flex h-9 w-[72px] items-center rounded-full border border-border bg-surface-muted p-1 shadow-sm ring-1 ring-border/70 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      onClick={switchTheme}
      type="button"
    >
      <span
        className={clsx(
          'absolute flex h-8 w-8 border items-center justify-center rounded-full bg-primary text-primary-contrast shadow-[var(--shadow-toggle-thumb)] transition-transform duration-300',
          dark ? 'translate-x-full' : 'translate-x-0',
        )}
      >
        {dark ? (
          <MoonIcon className="size-4" aria-hidden="true" />
        ) : (
          <SunIcon className="size-4" aria-hidden="true" />
        )}
      </span>
    </button>
  );
};
