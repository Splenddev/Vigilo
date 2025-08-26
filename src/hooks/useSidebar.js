// src/hooks/useSidebar.js
import { useState, useEffect, useCallback } from 'react';

const OPEN_EVENT = 'vigilo:sidebar:open';
const CLOSE_EVENT = 'vigilo:sidebar:close';
const TOGGLE_EVENT = 'vigilo:sidebar:toggle';

// module-level state used for body-scroll locking across hook instances
let _globalOpenCount = 0;
let _prevBodyOverflow = '';

export function useSidebar({
  initialOpen = false,
  lockScroll = true,
  persistKey = null,
  rootId = null, // optional: id of the sidebar DOM element for click-away detection
} = {}) {
  const isClient = typeof window !== 'undefined';

  const [isOpen, setIsOpen] = useState(() => {
    if (!isClient) return initialOpen;
    if (persistKey) {
      try {
        const raw = localStorage.getItem(persistKey);
        if (raw !== null) return raw === 'true';
      } catch (e) {
        console.log(e);
        // ignore storage errors
      }
    }
    return initialOpen;
  });

  // local controls
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((s) => !s), []);

  // persist to localStorage (optional)
  useEffect(() => {
    if (!isClient || !persistKey) return;
    try {
      localStorage.setItem(persistKey, isOpen ? 'true' : 'false');
    } catch (e) {
      console.log(e);
    }
  }, [isOpen, persistKey, isClient]);

  // body scroll lock shared across instances
  useEffect(() => {
    if (!isClient || !lockScroll) return;

    if (isOpen) {
      _globalOpenCount += 1;
      if (_globalOpenCount === 1) {
        _prevBodyOverflow = document.body.style.overflow;
        document.body.style.overflow = 'hidden';
      }
    } else {
      _globalOpenCount = Math.max(0, _globalOpenCount - 1);
      if (_globalOpenCount === 0) {
        document.body.style.overflow = _prevBodyOverflow || '';
      }
    }

    return () => {
      if (isOpen) {
        _globalOpenCount = Math.max(0, _globalOpenCount - 1);
        if (_globalOpenCount === 0) {
          document.body.style.overflow = _prevBodyOverflow || '';
        }
      }
    };
  }, [isOpen, lockScroll, isClient]);

  // ESC to close
  useEffect(() => {
    if (!isClient) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setIsOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isClient]);

  // optional click-away by rootId (ref-free — requires you set id on sidebar DOM node)
  useEffect(() => {
    if (!isClient || !rootId) return;
    const handler = (e) => {
      const root = document.getElementById(rootId);
      if (!root) return;
      if (!root.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [rootId, isClient]);

  // Global window event sync: this hook listens for broadcasted events.
  useEffect(() => {
    if (!isClient) return;
    const onOpen = () => setIsOpen(true);
    const onClose = () => setIsOpen(false);
    const onToggle = () => setIsOpen((s) => !s);

    window.addEventListener(OPEN_EVENT, onOpen);
    window.addEventListener(CLOSE_EVENT, onClose);
    window.addEventListener(TOGGLE_EVENT, onToggle);

    return () => {
      window.removeEventListener(OPEN_EVENT, onOpen);
      window.removeEventListener(CLOSE_EVENT, onClose);
      window.removeEventListener(TOGGLE_EVENT, onToggle);
    };
  }, [isClient]);

  return { isOpen, open, close, toggle };
}

// helpers to broadcast open/close/toggle globally (useful from e.g. Navbar)
export const openSidebar = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(OPEN_EVENT));
};
export const closeSidebar = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(CLOSE_EVENT));
};
export const toggleSidebar = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(TOGGLE_EVENT));
};
