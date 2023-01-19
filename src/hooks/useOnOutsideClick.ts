import { useEffect } from 'react';

export default function useOnClickOutside(
  ref: React.RefObject<HTMLElement>,
  handler: (e: MouseEvent | TouchEvent) => void
) {
  useEffect(() => {
    const listener = (e: MouseEvent | TouchEvent) => {
      // Do nothing if clicking ref's element or descendent elements
      if (!ref.current || ref.current.contains(e.target as Node)) {
        return;
      }

      handler(e);
    };

    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);

    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
}
