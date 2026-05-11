import SearchIcon from '@shared/assets/icons/magnifying-glass.svg?react';
import XMarkIcon from '@shared/assets/icons/xmark.svg?react';
import { useI18n } from '@shared/i18n';
import { useTypewriterPlaceholder } from '@shared/lib/use-typewriter-placeholder';
import { Button } from '@shared/ui/button';
import { Input } from '@shared/ui/input';

interface MovieSearchProps {
  onChange: (value: string) => void;
  value: string;
}

export const MovieSearch = ({ onChange, value }: MovieSearchProps) => {
  const { t } = useI18n();
  const placeholder = useTypewriterPlaceholder({
    enabled: value.length === 0,
    text: t('Enter movie title...'),
  });

  return (
    <Input
      aria-label={t('Search movies by title')}
      leftIcon={<SearchIcon className="h-4 w-4 text-text-soft" aria-hidden="true" />}
      onChange={(event) => onChange(event.target.value)}
      placeholder={placeholder}
      rightIcon={
        value ? (
          <Button
            aria-label={t('Clear search')}
            className="h-8 w-8 rounded-full !px-0"
            onClick={() => onChange('')}
            variant="ghost"
          >
            <XMarkIcon className="h-4 w-4" aria-hidden="true" />
          </Button>
        ) : null
      }
      value={value}
    />
  );
};
