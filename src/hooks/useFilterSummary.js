// hooks/useFilterSummary.js
import { useMemo } from 'react';

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
          type: f.type,
        }));
        return acc.concat(items);
      }

      if (f.type === 'range') {
        const [
          min = f.default?.[0] ?? f.min ?? 0,
          max = f.default?.[1] ?? f.max ?? 100,
        ] = value;

        // ✅ only show if min > 0
        if (min > 0) {
          return acc.concat({
            key: f.key,
            label: `${f.label}: ${min}% - ${max}%`,
            value: [min, max],
            type: f.type,
          });
        }
      }

      return acc;
    }, []);
  }, [filters, selected]);
};
