// hooks/useScrollIntoView.js
import { useCallback, useRef, useEffect } from 'react';

export function useScrollIntoView({ offset = 0, setActiveTab } = {}) {
  const pendingTarget = useRef(null);

  const resolveElement = (target) => {
    if (!target) return null;
    if (typeof target === 'string') {
      return document.getElementById(target);
    }
    if (target.current instanceof HTMLElement) {
      return target.current;
    }
    return null;
  };

  const doScroll = (target) => {
    const element = resolveElement(target);
    if (element) {
      const y = element.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: y, behavior: 'smooth' });
      element.focus?.({ preventScroll: true }); // accessibility
      pendingTarget.current = null;
      return true;
    }
    return false;
  };

  const scrollTo = useCallback(
    (target, tabKey) => {
      if (tabKey && setActiveTab) {
        setActiveTab(tabKey);
        pendingTarget.current = target;
      } else {
        doScroll(target);
      }
    },
    [setActiveTab]
  );

  useEffect(() => {
    if (!pendingTarget.current) return;

    let frame;
    const check = () => {
      const success = doScroll(pendingTarget.current);
      if (!success) {
        frame = requestAnimationFrame(check);
      }
    };
    frame = requestAnimationFrame(check);

    return () => cancelAnimationFrame(frame);
  }, []);

  return { scrollTo };
}
