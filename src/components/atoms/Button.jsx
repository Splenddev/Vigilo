const Button = ({
  children,
  variant = 'primary', // "primary", "secondary", "outline", "ghost"
  size = 'md', // "sm", "md", "lg"
  className = '',
  icon: Icon, // optional icon component (from react-icons)
  iconPosition = 'left', // "left" | "right"
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center gap-2 font-semibold rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-2.5 text-base',
    lg: 'px-7 py-3 text-lg',
  };

  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-700 text-white hover:bg-gray-800 focus:ring-gray-500',
    outline:
      'border border-gray-300 text-gray-700 hover:bg-gray-100 focus:ring-gray-400',
    ghost: 'text-gray-600 hover:bg-gray-100 focus:ring-gray-300',
  };

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${variantClasses[variant]} ${className}`}
      {...props}>
      {Icon && iconPosition === 'left' && <Icon className="w-5 h-5" />}
      {children}
      {Icon && iconPosition === 'right' && <Icon className="w-5 h-5" />}
    </button>
  );
};

export default Button;
