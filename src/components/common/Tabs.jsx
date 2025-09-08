import React, { useState } from 'react';
import clsx from 'clsx';

const VARIANTS = {
  underline: {
    wrapper: 'border-b border-slate-200 dark:border-slate-700',
    tab: 'px-4 py-2 text-sm font-medium transition-all relative',
    active:
      'text-blue-600 dark:text-blue-400 after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-blue-600 dark:after:bg-blue-400',
    inactive:
      'text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200',
  },
  pills: {
    wrapper: 'flex gap-2',
    tab: 'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
    active: 'bg-blue-600 text-white shadow',
    inactive:
      'bg-slate-100 text-slate-600 hover:bg-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600',
  },
  solid: {
    wrapper: 'flex gap-1 bg-slate-100 dark:bg-slate-800 rounded-lg p-1',
    tab: 'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
    active: 'bg-white text-slate-900 shadow dark:bg-slate-700 dark:text-white',
    inactive:
      'text-slate-600 hover:text-slate-800 dark:text-slate-300 dark:hover:text-white',
  },
};

export default function Tabs({
  tabs = [],
  defaultActive = null,
  variant = 'underline',
  onChange,
  className = '',
  contentClass = '',
  renderContent, // optional render prop for custom rendering
}) {
  const [activeKey, setActiveKey] = useState(defaultActive || tabs[0]?.key);

  const styles = VARIANTS[variant] || VARIANTS.underline;

  const handleSelect = (key) => {
    setActiveKey(key);
    onChange?.(key);
  };

  return (
    <div className={clsx('w-full', className)}>
      {/* Tab List */}
      <div
        role="tablist"
        className={clsx(
          'flex items-center overflow-x-auto no-scrollbar',
          styles.wrapper
        )}>
        {tabs.map(({ key, label, icon: Icon }) => {
          const isActive = key === activeKey;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelect(key)}
              className={clsx(
                styles.tab,
                isActive ? styles.active : styles.inactive,
                'flex items-center gap-2 whitespace-nowrap focus:outline-none'
              )}>
              {Icon && <Icon className="w-4 h-4" />}
              <span>{label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab Panels */}
      <div className={clsx('mt-4', contentClass)}>
        {tabs.map(({ key, content }) =>
          activeKey === key ? (
            <div
              key={key}
              role="tabpanel">
              {renderContent ? renderContent(key) : content}
            </div>
          ) : null
        )}
      </div>
    </div>
  );
}
