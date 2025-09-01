// hooks/useFilterSummary.js
import { useMemo } from 'react';

/**
 * filters: array of filter descriptors (safe default [])
 * selected: selected state object (safe default {})
 *
 * Returns: array of { key, label, value } summary items
 */
export const useFilterSummary = (filters = [], selected = {}) => {
  return useMemo(() => {
    if (!Array.isArray(filters)) return [];

    return filters.reduce((acc, f) => {
      const value = selected?.[f.key];

      // nothing selected for this filter
      if (!value || (Array.isArray(value) && value.length === 0)) return acc;

      if (f.type === 'multi') {
        const items = (Array.isArray(value) ? value : [value]).map((v) => ({
          key: f.key,
          label: `${f.label}: ${v}`,
          value: v,
        }));
        return acc.concat(items);
      }

      if (f.type === 'range') {
        const [
          min = f.default?.[0] ?? f.min ?? 0,
          max = f.default?.[1] ?? f.max ?? 100,
        ] = value;
        return acc.concat({
          key: f.key,
          label: `${f.label}: ${min}% - ${max}%`,
          value: null,
        });
      }

      return acc;
    }, []);
  }, [filters, selected]);
};
