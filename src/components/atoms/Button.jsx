import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'custom'
  size = 'md', // 'sm' | 'md' | 'lg' |'none'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  func = () => {},
  text = '',
  ...props
}) => {
  const baseClasses =
    'flex items-center gap-2 font-semibold rounded-xl transition-all duration-200';

  const sizeClasses = {
    sm: 'text-body-xs px-3 py-1.5',
    md: 'text-body px-5 py-2.5',
    lg: 'text-heading-md px-7 py-3',
    none: 'p-0 m-0',
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary:
      'btn-secondary text-[var(--color-primary)] hover:bg-purple-500/50 hover:text-white',
    ghost: 'btn-ghost',
    custom: '',
    danger:
      'btn-danger bg-red-500 text-white hover:bg-red-600 active:bg-red-700 border border-red-600',
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
