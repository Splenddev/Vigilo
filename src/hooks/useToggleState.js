import { useState, useCallback } from 'react';

export const useToggleState = (initialState, options = {}) => {
  const { exclusive = false } = options;
  const [state, setState] = useState(initialState);

  const toggle = useCallback(
    (key) => {
      setState((prev) => {
        if (typeof prev === 'boolean') {
          // simple on/off toggle
          return !prev;
        }

        if (Array.isArray(prev)) {
          if (exclusive) {
            // only one active at a time
            return prev.includes(key) ? [] : [key];
          }
          // multiple allowed
          return prev.includes(key)
            ? prev.filter((id) => id !== key)
            : [...prev, key];
        }

        if (typeof prev === 'object' && prev !== null) {
          if (exclusive) {
            // all off except the toggled key
            return Object.keys(prev).reduce(
              (acc, id) => ({
                ...acc,
                [id]: id === key ? !prev[key] : false,
              }),
              {}
            );
          }
          // independent toggles
          return {
            ...prev,
            [key]: !prev[key],
          };
        }

        return prev;
      });
    },
    [exclusive]
  );

  return [state, toggle, setState];
};
