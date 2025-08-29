import { useEffect } from 'react';

let globalLockCount = 0;
let previousBodyOverflow = '';

export function useBodyScrollLock(shouldLock = false) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !shouldLock) return;

    // Lock scroll
    globalLockCount += 1;
    if (globalLockCount === 1) {
      previousBodyOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }

    // Cleanup: unlock scroll
    return () => {
      globalLockCount = Math.max(0, globalLockCount - 1);
      if (globalLockCount === 0) {
        document.body.style.overflow = previousBodyOverflow || '';
      }
    };
  }, [shouldLock, isClient]);
}
