const COLOR_MAP = {
  blue: {
    text: 'text-blue-500',
    bgLight: 'bg-blue-400/10',
    bgDark: 'bg-blue-900/30',
    borderLight: 'border-blue-400/20',
    borderDark: 'border-blue-700',
  },
  emerald: {
    text: 'text-emerald-600',
    bgLight: 'bg-emerald-400/10',
    bgDark: 'bg-emerald-900/30',
    borderLight: 'border-emerald-400/20',
    borderDark: 'border-emerald-700',
  },
  purple: {
    text: 'text-purple-600',
    bgLight: 'bg-purple-400/10',
    bgDark: 'bg-purple-900/30',
    borderLight: 'border-purple-400/20',
    borderDark: 'border-purple-700',
  },
  orange: {
    text: 'text-orange-500',
    bgLight: 'bg-orange-400/10',
    bgDark: 'bg-orange-900/30',
    borderLight: 'border-orange-400/20',
    borderDark: 'border-orange-700',
  },
};

// Base variant styles (excluding color overrides)
const VARIANTS = {
  light: {
    wrapper: 'bg-white border border-slate-200 shadow-sm hover:shadow-md',
    value: 'text-slate-800',
    label: 'text-t-tertiary',
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

  // Resolve color map
  const color =
    typeof iconColor === 'string' && COLOR_MAP[iconColor]
      ? COLOR_MAP[iconColor]
      : null;

  const colorClasses = {
    text: color ? color.text : styles.icon,
    bg:
      variant === 'light'
        ? color?.bgLight
        : variant === 'dark'
        ? color?.bgDark
        : '',
    border:
      variant === 'light'
        ? color?.borderLight
        : variant === 'dark'
        ? color?.borderDark
        : '',
  };

  const renderContent = () => (
    <>
      {icon &&
        (typeof icon === 'function' ? (
          <Icon className={`w-8 h-8 ${colorClasses.text}`} />
        ) : (
          <div className={colorClasses.text}>{icon}</div>
        ))}
      <div className={`font-bold ${styles.value}`}>{value}</div>
      <div className={`text-sm ${styles.label}`}>{label}</div>
    </>
  );

  if (layout === 'list') {
    return (
      <div
        className={`flex items-center gap-3 px-3 rounded-xl py-2 ${className} ${colorClasses.bg} ${colorClasses.border}`}>
        {icon && (
          <div className="flex-shrink-0">
            {typeof icon === 'function' ? (
              <Icon className={`w-5 h-5 ${colorClasses.text}`} />
            ) : (
              <div className={colorClasses.text}>{icon}</div>
            )}
          </div>
        )}
        <div className="flex-1">
          <div className={`text-base font-semibold ${colorClasses.text}`}>
            {value}
          </div>
          <div className={`text-xs ${styles.label}`}>{label}</div>
        </div>
      </div>
    );
  }

  if (layout === 'inline') {
    return (
      <div
        className={`flex items-center gap-2 ${className} ${colorClasses.bg} ${colorClasses.border}`}>
        {icon &&
          (typeof icon === 'function' ? (
            <Icon className={`w-4 h-4 ${colorClasses.text}`} />
          ) : (
            <div className={colorClasses.text}>{icon}</div>
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
                  ${styles.wrapper} ${colorClasses.bg} ${colorClasses.border} ${className}`}>
      {renderContent()}
    </div>
  );
};

export default StatCard;
