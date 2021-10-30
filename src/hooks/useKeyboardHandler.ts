import { useEffect } from 'react';
import { KeyModifier, Key } from '../@types/enums';

export interface HandlerKey {
  key: Key;
  modifier?: KeyModifier;
  callback?: () => void;
}

export default function useKeyboardHandler(watch: HandlerKey[]) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      const key = watch.find(opt => opt.key === event.key);

      if (!key || !key.callback) {
        return;
      }

      if (!key.modifier || (key.modifier && event[key.modifier])) {
        key.callback();
      }
    };

    window.addEventListener('keydown', handler);
    return () => {
      window.removeEventListener('keydown', handler);
    };
  }, []);
}
