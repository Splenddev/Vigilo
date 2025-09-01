import React from 'react';
import { FaArchive, FaExclamationCircle } from 'react-icons/fa';

const FormInput = ({
  icon: Icon,
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  register,
  rules = {},
  inputClassName = '',
  wrapperChildren,
  disabled = false,
  required = false,
  ...rest
}) => {
  // Validation: don’t allow both register and value (avoids RHF conflicts)
  if (register && (value !== undefined || onChange)) {
    console.warn(
      `FormInput "${name}" is using both "register" and "value/onChange". Choose one mode (RHF or controlled).`
    );
  }

  const inputProps = register
    ? register(name, rules)
    : {
        value: value ?? '',
        onChange,
      };

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block text-sm font-medium text-gray-300 mb-2 capitalize">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      <div className="relative">
        {/* Leading icon */}
        {Icon && (
          <Icon
            aria-hidden="true"
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4"
          />
        )}

        {/* Input */}
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder || label || name}
          disabled={disabled}
          aria-invalid={!!error}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`w-full ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4 py-2 bg-white/5 border rounded-xl text-t-primary placeholder-gray-400 
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all 
          ${error ? 'border-red-500' : 'border-white/20'} ${inputClassName}`}
          {...inputProps}
          {...rest}
        />

        {wrapperChildren}
      </div>

      {/* Error */}
      {error && (
        <p
          id={`${name}-error`}
          className="text-red-400 text-sm mt-1 flex items-center">
          <FaExclamationCircle
            aria-hidden="true"
            className="w-4 h-4 shrink-0 mr-2"
          />
          {typeof error === 'string' ? error : error.message}
        </p>
      )}
    </div>
  );
};

export default FormInput;
