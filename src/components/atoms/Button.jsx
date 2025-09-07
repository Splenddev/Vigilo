import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'custom' | 'outline'
  size = 'md', // 'sm' | 'md' | 'lg' | 'normal'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  func = () => {},
  text = '',
  ...props
}) => {
  const baseClasses =
    'flex cursor-pointer items-center gap-2 transition-all duration-200';

  const sizeClasses = {
    sm: 'text-body-xs px-2.5 py-1.5 rounded-xl',
    md: 'text-body px-4 py-2.5 rounded-xl',
    lg: 'text-heading-md px-6 py-3 rounded-xl',
    normal: '',
  };

  const variantClasses = {
    primary: 'btn-primary font-semibold',
    secondary: 'btn-secondary font-semibold',
    ghost:
      'bg-white/5 border border-white/10 hover:bg-gray-500/10 hover:border-secondary/10',
    custom: '',
    danger:
      'btn-danger bg-red-500 text-t-primary hover:bg-red-600 active:bg-red-700 font-semibold border border-red-600',
    dangerLight:
      'btn-danger-light font-semibold text-red-600 hover:text-red-700 active:text-red-800',
    outline:
      'font-semibold border rounded-xl border-gray-400 text-t-primary hover:bg-t-muted active:bg-gray-200',
    info: 'bg-blue-500 text-white hover:bg-blue-600 active:bg-blue-700 font-semibold rounded-xl',
    link: 'text-blue-500 hover:underline active:text-blue-700 bg-transparent p-0',
  };

  return (
    <button
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={func}
      {...props}>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {text && text}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;
