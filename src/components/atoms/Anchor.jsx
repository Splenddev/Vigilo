import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

const Anchor = ({
  active = 'default',
  children,
  className = '',
  func = () => {},
  href = '#',
  size = 'md', // "sm" | "md" | "lg"
  variant = 'default',
  // | 'primary' | 'secondary' | 'danger',
  ...props
}) => {
  const baseClasses =
    'items-center rounded-md transition-colors transition-borders duration-200 ';

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-base',
    lg: 'px-4 py-2 text-lg',
  };

const variantClasses = {
  default: 'text-gray-700 hover:bg-gray-300',
  primary: 'text-primary hover:bg-brand-green-soft focus:ring-primary',
  light: 'bg-white text-brand-blue hover:bg-gray-50',
  secondary: 'text-secondary hover:bg-brand-blue-light/20 focus:ring-secondary',
  danger: 'text-danger hover:bg-danger-light/20 focus:ring-danger',
};

const activeClasses = {
  default: 'font-semibold border border-gray-400 bg-gray-200 text-gray-900',
  primary:
    'font-semibold border border-primary bg-brand-green-soft text-primary',
  light: 'font-semibold border border-brand-blue bg-white text-brand-blue',
  secondary:
    'font-semibold border border-secondary bg-brand-blue-light/30 text-secondary',
  danger: 'font-semibold border border-danger bg-danger-light/30 text-danger',
};


  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          isActive ? activeClasses[active] : '',
          className
        )
      }
      onClick={func}
      {...props}>
      {children}
    </NavLink>
  );
};

export default Anchor;
