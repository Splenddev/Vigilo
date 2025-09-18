import React, { useState } from 'react';
import clsx from 'clsx';

const VARIANTS = {
  underline: {
    wrapper: 'border-b border-border-secondary',
    tab: 'px-4 py-2 text-sm font-medium transition-all relative',
    active:
      'text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-primary',
    inactive: 'text-t-muted hover:text-t-accent',
  },
  pills: {
    wrapper: 'flex gap-2',
    tab: 'px-3 py-1.5 rounded-full text-sm font-medium transition-all',
    active: 'bg-primary text-gray-50 shadow',
    inactive:
      'bg-bg-tertiary text-t-secondary hover:bg-bg-secondary hover:text-t-primary',
  },
  solid: {
    wrapper: 'flex gap-1 bg-bg-secondary rounded-lg p-1',
    tab: 'px-3 py-1.5 rounded-md text-sm font-medium transition-all',
    active: 'bg-bg-primary text-t-primary shadow',
    inactive: 'text-t-muted hover:text-t-accent',
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
    <div className={clsx('w-full sticky top-17 z-1', className)}>
      <div
        role="tablist"
        className={clsx(
          'flex items-center overflow-x-auto no-scrollbar p-2',
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
