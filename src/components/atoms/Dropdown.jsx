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
    'flex items-center w-full px-4 py-2 text-sm transition-colors duration-200 rounded-md';

  const variants = {
    default: 'text-t-primary hover:text-slate-400 hover:bg-bg-glass-sm',
    danger: 'text-red-400 hover:text-red-300 hover:bg-red-500/10',
    success: 'text-green-500 hover:text-green-400 hover:bg-green-500/10',
    warning: 'text-yellow-500 hover:text-yellow-400 hover:bg-yellow-500/10',
    info: 'text-blue-500 hover:text-blue-400 hover:bg-blue-500/10',
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
