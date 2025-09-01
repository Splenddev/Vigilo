const VARIANTS = {
  light: {
    card: 'bg-white border border-slate-200 shadow-sm hover:shadow-md',
    value: 'text-slate-800',
    label: 'text-slate-600',
    icon: 'text-slate-600',
  },
  dark: {
    card: 'bg-slate-800 border border-slate-700 shadow-sm hover:shadow-md',
    value: 'text-t-primary',
    label: 'text-slate-300',
    icon: 'text-slate-300',
  },
  glass: {
    card: 'glass-strong',
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
}) => {
  const Icon = icon;
  const styles = VARIANTS[variant] || VARIANTS.glass;
  const colorClass = iconColor
    ? COLOR_MAP[iconColor] || iconColor
    : styles.icon;

  return (
    <div
      className={`rounded-2xl p-4 text-center transition-all duration-300 
                  ${styles.card} ${className}`}>
      {icon &&
        (typeof icon === 'function' ? (
          <Icon className={`w-8 h-8 mx-auto mb-2 ${colorClass}`} />
        ) : (
          <div className={`mx-auto mb-2 ${colorClass}`}>{icon}</div>
        ))}
      <div className={`text-2xl font-bold ${styles.value}`}>{value}</div>
      <div className={`text-sm ${styles.label}`}>{label}</div>
    </div>
  );
};

export default StatCard;
