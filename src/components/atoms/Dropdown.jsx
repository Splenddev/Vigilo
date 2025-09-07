import clsx from 'clsx';

const Dropdown = ({
  icon,
  label,
  onAction,
  variant = 'default',
  className = '',
}) => {
  const Icon = icon;

  const baseClasses =
    'flex items-center w-full px-4 py-2 text-sm transition-colors duration-200';

  const variants = {
    default: 'text-t-primary hover:text-slate-400 hover:bg-bg-glass-sm',
    danger: 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
  };

  return (
    <div>
      <button
        onClick={() => onAction()}
        className={clsx(baseClasses, variants[variant], className)}>
        <Icon className="w-4 h-4 mr-3" /> {label}
      </button>
    </div>
  );
};

export default Dropdown;
