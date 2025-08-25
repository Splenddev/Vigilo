import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary', // 'primary' | 'secondary' | 'ghost' | 'custom'
  size = 'md', // 'sm' | 'md' | 'lg' |'none'
  className = '',
  icon: Icon,
  iconPosition = 'left',
  func = () => {},
  ...props
}) => {
  const baseClasses =
    'flex items-center gap-2 font-semibold rounded-xl transition-all duration-200';

  const sizeClasses = {
    sm: 'text-body-xs px-3 py-1.5',
    md: 'text-body px-5 py-2.5',
    lg: 'text-heading-md px-7 py-3',
    none: 'p-0 m-0', // for icon-only buttons
  };

  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    custom: '', // let consumers pass their own styling
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
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;
