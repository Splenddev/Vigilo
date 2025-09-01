// components/FilterSummary.js
import { FiRefreshCcw, FiX } from 'react-icons/fi';
import Button from '../atoms/Button';
import { useFilterSummary } from '../../hooks/useFilterSummary';

const FilterSummary = ({ filters, selected, setSelected }) => {
  const summary = useFilterSummary(filters, selected);

  const removeFilter = (key, value = null, type = 'default') => {
    setSelected((prev) => {
      if (type === 'range') {
        // Reset range to its default values from filters definition
        const defaultRange = filters.find((f) => f.key === key)?.default || [
          0, 100,
        ];
        return { ...prev, [key]: defaultRange };
      }

      if (value === null) {
        return { ...prev, [key]: [] }; // reset non-range
      }

      return { ...prev, [key]: prev[key].filter((v) => v !== value) };
    });
  };

  if (summary.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {summary.map((s, idx) => (
        <span
          key={idx}
          className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-lg flex items-center gap-2 text-sm">
          {s.label}
          <Button
            icon={s.type === 'range' ? FiRefreshCcw : FiX}
            onClick={() => removeFilter(s.key, s.value, s.type)} // pass type
            className="hover:text-white"
          />
        </span>
      ))}
    </div>
  );
};

export default FilterSummary;
