import { useEffect, useState } from 'react';

interface UseTypewriterPlaceholderOptions {
  enabled?: boolean;
  pauseMs?: number;
  text: string;
  tickMs?: number;
}

export const useTypewriterPlaceholder = ({
  enabled = true,
  pauseMs = 900,
  text,
  tickMs = 55,
}: UseTypewriterPlaceholderOptions): string => {
  const [placeholder, setPlaceholder] = useState<string>(text);

  useEffect(() => {
    if (!enabled) {
      return undefined;
    }

    let index = text.length;
    let direction: 1 | -1 = -1;
    let timeoutId = 0;

    const tick = (): void => {
      index += direction;
      setPlaceholder(text.slice(0, index));

      if (index === 0 || index === text.length) {
        direction = direction === 1 ? -1 : 1;
        timeoutId = window.setTimeout(tick, pauseMs);
        return;
      }

      timeoutId = window.setTimeout(tick, tickMs);
    };

    timeoutId = window.setTimeout(tick, pauseMs);

    return () => window.clearTimeout(timeoutId);
  }, [enabled, pauseMs, text, tickMs]);

  return placeholder;
};
