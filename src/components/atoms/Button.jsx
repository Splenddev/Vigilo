import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  icon: Icon,
  iconPosition = 'left',
  func = () => {},
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  const variantClasses = {
    primary:
      'bg-primary text-white hover:bg-brand-green-dark focus:ring-primary',
    secondary:
      'bg-secondary text-white hover:bg-brand-blue-dark focus:ring-secondary',
    transparent: 'bg-white text-gray-400 hover:bg-gray-50',
    outline: 'border border-neutral-light text-neutral focus:ring-neutral',
    ghost: 'text-neutral-dark hover:bg-neutral-light focus:ring-neutral',
    custom: '',
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
