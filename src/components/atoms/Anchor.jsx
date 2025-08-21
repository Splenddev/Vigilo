import React from 'react';
import clsx from 'clsx';
import { Link } from 'react-router-dom';

const Anchor = ({
  children,
  href = '#',
  variant = 'default',
  // | 'primary' | 'secondary' | 'danger',
  size = 'md', // "sm" | "md" | "lg"
  className = '',
  func = () => {},
  ...props
}) => {
  const baseClasses =
    'items-center rounded-md transition-colors de duration-200 ';

  const sizeClasses = {
    sm: 'px-2 py-1 text-sm',
    md: 'px-3 py-1.5 text-base',
    lg: 'px-4 py-2 text-lg',
  };

  const variantClasses = {
    default: 'text-neutral-dark hover:bg-neutral-light focus:ring-neutral',

    primary: 'text-primary hover:bg-brand-green-soft focus:ring-primary',

    light: 'bg-white text-brand-blue hover:bg-gray-50',

    secondary:
      'text-secondary hover:bg-brand-blue-light/20 focus:ring-secondary',
    danger: 'text-danger hover:bg-danger-light/20 focus:ring-danger',
  };

  return (
    <Link
      to={href}
      className={clsx(
        baseClasses,
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      onClick={func}
      {...props}>
      {children}
    </Link>
  );
};

export default Anchor;
