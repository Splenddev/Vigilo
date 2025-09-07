const VARIANTS = {
  light: {
    wrapper: 'bg-white border border-slate-200 shadow-sm hover:shadow-md',
    value: 'text-slate-800',
    label: 'text-slate-600',
    icon: 'text-slate-600',
  },
  dark: {
    wrapper: 'bg-slate-800 border border-slate-700 shadow-sm hover:shadow-md',
    value: 'text-t-primary',
    label: 'text-slate-300',
    icon: 'text-slate-300',
  },
  glass: {
    wrapper: 'glass-strong',
    value: 'text-t-primary',
    label: 'text-t-primary font-semibold',
    icon: 'text-t-tertiary',
  },
};

// Tailwind color map (extend as needed)
const COLOR_MAP = {
  blue: 'text-blue-500',
  emerald: 'text-emerald-600',
  purple: 'text-purple-600',
  orange: 'text-orange-500',
};

const StatCard = ({
  icon,
  value,
  label,
  className = '',
  variant = 'glass',
  iconColor,
  layout = 'card', // 'card' | 'list' | 'grid' | 'inline'
}) => {
  const Icon = icon;
  const styles = VARIANTS[variant] || VARIANTS.glass;
  const colorClass = iconColor
    ? COLOR_MAP[iconColor] || iconColor
    : styles.icon;

  const renderContent = () => (
    <>
      {icon &&
        (typeof icon === 'function' ? (
          <Icon className={`w-8 h-8 ${colorClass}`} />
        ) : (
          <div className={`${colorClass}`}>{icon}</div>
        ))}
      <div className={`font-bold ${styles.value}`}>{value}</div>
      <div className={`text-sm ${styles.label}`}>{label}</div>
    </>
  );

  if (layout === 'list') {
    return (
      <div className={`flex items-center gap-3 py-2 ${className}`}>
        {icon && (
          <div className="flex-shrink-0">
            {typeof icon === 'function' ? (
              <Icon className={`w-5 h-5 ${colorClass}`} />
            ) : (
              <div className={colorClass}>{icon}</div>
            )}
          </div>
        )}
        <div className="flex-1">
          <div className={`text-base font-semibold ${styles.value}`}>
            {value}
          </div>
          <div className={`text-xs ${styles.label}`}>{label}</div>
        </div>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        {icon &&
          (typeof icon === 'function' ? (
            <Icon className={`w-4 h-4 ${colorClass}`} />
          ) : (
            <div className={colorClass}>{icon}</div>
          ))}
        <span className={`font-semibold ${styles.value}`}>{value}</span>
        <span className={`text-xs ${styles.label}`}>{label}</span>
      </div>
    );
  }

  // default "card" (grid-friendly)
  return (
    <div
      className={`rounded-2xl p-4 text-center transition-all duration-300 
                  ${styles.wrapper} ${className}`}>
      {renderContent()}
    </div>
  );
};

export default StatCard;
