import React from 'react';
import clsx from 'clsx';

const Select = ({
  label,
  options = [],
  value,
  onChange,
  placeholder = '',
  size = 'md', // sm | md | lg
  variant = 'outline', // solid | outline | ghost
  status = 'default', // default | success | warning | danger
  helperText,
  errorText,
  disabled = false,
  required = false,
  fullWidth = false,
  className = '',
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-2 py-1 text-sm rounded-md',
    md: 'px-3 py-2 text-base rounded-lg text-sm',
    lg: 'px-4 py-3 text-lg rounded-xl',
  };

  const variantClasses = {
    solid:
      'bg-[var(--color-primary-purple-soft)] border border-[var(--color-border-accent)] text-gray-900 focus:ring-2 focus:ring-[var(--color-primary)]',
    outline:
      'border border-gray-300 bg-transparent text-gray-800 focus:ring-2 focus:ring-[var(--color-primary)]',
    ghost:
      'bg-transparent border-none text-gray-800 hover:bg-gray-100 focus:ring-2 focus:ring-[var(--color-primary)]',
  };

  const statusClasses = {
    default: '',
    success: 'border-green-500 text-green-600',
    warning: 'border-yellow-500 text-yellow-600',
    danger: 'border-red-500 text-red-600',
  };

  return (
    <div className={clsx('flex flex-col gap-2', fullWidth && 'w-full')}>
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <select
        className={clsx(
          'transition-all duration-200 outline-none',
          sizeClasses[size],
          variantClasses[variant],
          statusClasses[status],
          fullWidth && 'w-full',
          disabled && 'opacity-50 cursor-not-allowed',
          className
        )}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        {...props}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt, i) => (
          <option
            key={i}
            value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
      {errorText ? (
        <p className="text-xs text-red-500">{errorText}</p>
      ) : (
        helperText && <p className="text-xs text-gray-500">{helperText}</p>
      )}
    </div>
  );
};

export default Select;
