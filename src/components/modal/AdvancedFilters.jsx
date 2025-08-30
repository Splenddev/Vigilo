import React from 'react';
import { FiFilter, FiX } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  fadeIn,
  scaleIn,
  staggerContainer,
  fadeInUpChild,
} from '../../utils/animationVariants';
import { useBodyScrollLock } from '../../hooks/useBodyScrollLock';

const AdvancedFilters = ({
  isOpen,
  onClose,
  title = 'Advanced Filters',
  filters = [],
  onApply = () => {},
  onClear = () => {},
  selected,
  setSelected,
}) => {
  useBodyScrollLock(isOpen);
  // ---- Handlers ----
  const handleMultiSelect = (key, value) => {
    setSelected((prev) => {
      const current = prev[key] || [];
      const exists = current.includes(value);
      return {
        ...prev,
        [key]: exists
          ? current.filter((v) => v !== value)
          : [...current, value],
      };
    });
  };

  const handleRangeChange = (key, index, value) => {
    setSelected((prev) => {
      const current = prev[key] || [0, 100];
      const updated = [...current];
      updated[index] = parseInt(value);
      return { ...prev, [key]: updated };
    });
  };

  const clearFilters = () => {
    const cleared = {};
    filters.forEach((f) => {
      if (f.type === 'multi') cleared[f.key] = [];
      if (f.type === 'range') cleared[f.key] = f.default || [0, 100];
    });
    setSelected(cleared);
    onClear();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <div className="fixed inset-0 flex items-center h-screen justify-center z-20">
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm  h-screen w-full cursor-default z-1"
              variants={fadeIn}
              onClick={onClose}
              initial="hidden"
              animate="visible"
              exit="exit"
            />
            <motion.div
              className="bg-gray-900 rounded-xl shadow-xl w-[90%] max-w-2xl p-6 space-y-4 z-40"
              variants={scaleIn}
              initial="hidden"
              animate="visible"
              exit="exit">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-gray-700 pb-3">
                <h3 className="text-lg font-semibold text-white">{title}</h3>
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white">
                  <FiX size={20} />
                </button>
              </div>

              {/* Filters */}
              <motion.div
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 pt-4 overflow-y-auto h-[calc(100vh-350px)]"
                variants={staggerContainer}
                initial="hidden"
                animate="visible">
                {filters.map((filter, i) => (
                  <motion.div
                    key={filter.key}
                    variants={fadeInUpChild}
                    custom={i}>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      {filter.label}
                    </label>

                    {filter.type === 'multi' && (
                      <div className="space-y-2 overflow-y-auto pr-1 max-h-56 hide-scrollbar">
                        {filter.options.map((opt) => (
                          <label
                            key={opt}
                            className="flex items-center gap-2 text-sm">
                            <input
                              type="checkbox"
                              checked={selected[filter.key]?.includes(opt)}
                              onChange={() =>
                                handleMultiSelect(filter.key, opt)
                              }
                              className="rounded border-gray-400 bg-white/5"
                            />
                            <span className="text-gray-300 capitalize">
                              {opt}
                            </span>
                          </label>
                        ))}
                      </div>
                    )}

                    {filter.type === 'range' && (
                      <div className="space-y-3">
                        <span className="text-gray-400 text-sm">
                          {selected[filter.key][0]}% - {selected[filter.key][1]}
                          %
                        </span>
                        <input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          value={selected[filter.key][0]}
                          onChange={(e) =>
                            handleRangeChange(filter.key, 0, e.target.value)
                          }
                          className="w-full"
                        />
                        <input
                          type="range"
                          min={filter.min}
                          max={filter.max}
                          value={selected[filter.key][1]}
                          onChange={(e) =>
                            handleRangeChange(filter.key, 1, e.target.value)
                          }
                          className="w-full"
                        />
                      </div>
                    )}
                  </motion.div>
                ))}
              </motion.div>

              {/* Actions */}
              <div className="flex gap-3 pt-4 border-t border-gray-700">
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-gray-400 hover:text-white transition-colors flex items-center gap-2">
                  <FiX /> Clear
                </button>

                <button
                  onClick={() => onApply(selected)}
                  className="ml-auto px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg flex items-center gap-2">
                  <FiFilter /> Apply
                </button>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default AdvancedFilters;
