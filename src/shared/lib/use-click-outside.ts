import { useEffect } from 'react';
import type { RefObject } from 'react';

export const useClickOutside = <TElement extends HTMLElement>(
  ref: RefObject<TElement | null>,
  onClickOutside: () => void,
  enabled = true,
): void => {
  useEffect(() => {
    if (!enabled) {
      return;
    }

    const handlePointerDown = (event: PointerEvent): void => {
      const element = ref.current;

      if (element && !element.contains(event.target as Node)) {
        onClickOutside();
      }
    };

    document.addEventListener('pointerdown', handlePointerDown);

    return () => {
      document.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [enabled, onClickOutside, ref]);
};
