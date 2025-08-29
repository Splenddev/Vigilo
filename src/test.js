// src/hooks/useSidebar.js
import { useState, useEffect, useCallback } from 'react';
import { useLocalStorage } from './useLocalStorage';
import { useBodyScrollLock } from './useBodyScrollLock';
import { useKeyboard } from './useKeyboard';
import { useClickAway } from './useClickAway';
import { useGlobalEvents } from './useGlobalEvents';

const SIDEBAR_EVENTS = {
  OPEN: 'vigilo:sidebar:open',
  CLOSE: 'vigilo:sidebar:close',
  TOGGLE: 'vigilo:sidebar:toggle',
};

/**
 * Main sidebar hook - orchestrates other hooks for sidebar functionality
 */
export function useSidebar({
  initialOpen = false,
  lockScroll = true,
  persistKey = null,
  rootId = null,
} = {}) {
  const isClient = typeof window !== 'undefined';

  // Get initial state from localStorage if available, otherwise use initialOpen
  const getInitialState = () => {
    if (!isClient || !persistKey) return initialOpen;
    return useLocalStorage.getItem(persistKey, initialOpen);
  };

  const [isOpen, setIsOpen] = useState(getInitialState);

  // Local controls
  const open = useCallback(() => setIsOpen(true), []);
  const close = useCallback(() => setIsOpen(false), []);
  const toggle = useCallback(() => setIsOpen((prev) => !prev), []);

  // Persist state to localStorage
  useLocalStorage(persistKey, isOpen);

  // Lock body scroll when sidebar is open
  useBodyScrollLock(isOpen && lockScroll);

  // Close on ESC key
  useKeyboard('Escape', close);

  // Close on click away
  useClickAway(rootId, close);

  // Listen to global sidebar events
  useGlobalEvents({
    [SIDEBAR_EVENTS.OPEN]: open,
    [SIDEBAR_EVENTS.CLOSE]: close,
    [SIDEBAR_EVENTS.TOGGLE]: toggle,
  });

  return { isOpen, open, close, toggle };
}

// Global event broadcasters
export const openSidebar = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SIDEBAR_EVENTS.OPEN));
};

export const closeSidebar = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SIDEBAR_EVENTS.CLOSE));
};

export const toggleSidebar = () => {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(SIDEBAR_EVENTS.TOGGLE));
};

// ============================================================================
// src/hooks/useLocalStorage.js
import { useEffect } from 'react';

/**
 * Hook for persisting state to localStorage
 */
export function useLocalStorage(key, value) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !key || value === undefined) return;

    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.warn('Failed to save to localStorage:', error);
    }
  }, [key, value, isClient]);
}

/**
 * Utility to get initial value from localStorage
 */
useLocalStorage.getItem = (key, defaultValue) => {
  if (typeof window === 'undefined') return defaultValue;

  try {
    const item = localStorage.getItem(key);
    return item !== null ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.warn('Failed to read from localStorage:', error);
    return defaultValue;
  }
};

// ============================================================================
// src/hooks/useBodyScrollLock.js
import { useEffect } from 'react';

// Module-level state for managing multiple scroll locks
let globalLockCount = 0;
let previousBodyOverflow = '';

/**
 * Hook for locking body scroll - handles multiple simultaneous locks
 */
export function useBodyScrollLock(shouldLock) {
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

// ============================================================================
// src/hooks/useKeyboard.js
import { useEffect } from 'react';

/**
 * Hook for handling keyboard events
 */
export function useKeyboard(key, callback, options = {}) {
  const {
    event = 'keydown',
    target = window,
    preventDefault = false,
    stopPropagation = false,
  } = options;

  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !callback) return;

    const handler = (e) => {
      if (e.key === key) {
        if (preventDefault) e.preventDefault();
        if (stopPropagation) e.stopPropagation();
        callback(e);
      }
    };

    const eventTarget = target || window;
    eventTarget.addEventListener(event, handler);

    return () => eventTarget.removeEventListener(event, handler);
  }, [key, callback, event, target, preventDefault, stopPropagation, isClient]);
}

// ============================================================================
// src/hooks/useClickAway.js
import { useEffect } from 'react';

/**
 * Hook for detecting clicks outside an element (by ID)
 */
export function useClickAway(elementId, callback) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !elementId || !callback) return;

    const handler = (event) => {
      const element = document.getElementById(elementId);
      if (!element) return;

      if (!element.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [elementId, callback, isClient]);
}

// Alternative version that works with refs
export function useClickAwayRef(ref, callback) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !callback) return;

    const handler = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback(event);
      }
    };

    document.addEventListener('pointerdown', handler);
    return () => document.removeEventListener('pointerdown', handler);
  }, [ref, callback, isClient]);
}

// ============================================================================
// src/hooks/useGlobalEvents.js
import { useEffect } from 'react';

/**
 * Hook for listening to custom global events
 */
export function useGlobalEvents(eventMap) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !eventMap) return;

    const handlers = Object.entries(eventMap).map(([eventName, callback]) => {
      const handler = () => callback();
      window.addEventListener(eventName, handler);
      return { eventName, handler };
    });

    return () => {
      handlers.forEach(({ eventName, handler }) => {
        window.removeEventListener(eventName, handler);
      });
    };
  }, [eventMap, isClient]);
}

/**
 * Hook for listening to a single global event
 */
export function useGlobalEvent(eventName, callback) {
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    if (!isClient || !eventName || !callback) return;

    const handler = (event) => callback(event);
    window.addEventListener(eventName, handler);

    return () => window.removeEventListener(eventName, handler);
  }, [eventName, callback, isClient]);
}

// ============================================================================
// src/hooks/index.js - Barrel export for convenience

export {
  useSidebar,
  openSidebar,
  closeSidebar,
  toggleSidebar,
} from './useSidebar';
export { useLocalStorage } from './useLocalStorage';
export { useBodyScrollLock } from './useBodyScrollLock';
export { useKeyboard } from './useKeyboard';
export { useClickAway, useClickAwayRef } from './useClickAway';
export { useGlobalEvents, useGlobalEvent } from './useGlobalEvents';
