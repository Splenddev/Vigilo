import React, { useState } from 'react';
import { FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';

const FormInput = ({
  type = 'text',
  icon: Icon,
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  helpText,
  register,
  rules = {},
  inputClassName = '',
  wrapperChildren,
  disabled = false,
  required = false,
  rows = 4,
  disabledReason, // ✅ new
  ...rest
}) => {
  const [showReason, setShowReason] = useState(false);

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

  const commonClasses = `
    w-full rounded-xl text-t-primary transition-all border 
    placeholder-gray-400 
    focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
    ${error ? 'border-red-500' : 'border-white/20'}
    ${
      disabled
        ? 'bg-gray-800/40 text-gray-500 placeholder-gray-500 border-gray-600 cursor-not-allowed opacity-60 focus:ring-0 focus:border-gray-600'
        : 'bg-white/5'
    }
    ${inputClassName}
  `;

  return (
    <div className="w-full">
      {/* Label */}
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

        {/* Input or Textarea */}
        {type === 'textarea' ? (
          <textarea
            id={name}
            name={name}
            placeholder={placeholder || label || name}
            disabled={disabled}
            rows={rows}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${name}-error`
                : helpText
                ? `${name}-help`
                : disabledReason
                ? `${name}-disabled`
                : undefined
            }
            className={`${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2 ${commonClasses}`}
            {...inputProps}
            {...rest}
          />
        ) : (
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder || label || name}
            disabled={disabled}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${name}-error`
                : helpText
                ? `${name}-help`
                : disabledReason
                ? `${name}-disabled`
                : undefined
            }
            className={`${Icon ? 'pl-10' : 'pl-4'} pr-10 py-2 ${commonClasses}`}
            {...inputProps}
            {...rest}
          />
        )}

        {/* Suffix */}
        {wrapperChildren}

        {/* Disabled reason icon */}
        {disabled && disabledReason && (
          <button
            type="button"
            onMouseEnter={() => setShowReason(true)}
            onMouseLeave={() => setShowReason(false)}
            onClick={() => setShowReason((prev) => !prev)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200 z-10">
            <FaInfoCircle aria-hidden="true" />
          </button>
        )}

        {/* Tooltip/dialog */}
        {disabled && disabledReason && showReason && (
          <div
            id={`${name}-disabled`}
            role="tooltip"
            className="absolute right-0 bottom-full mb-1 w-max max-w-xs bg-gray-900 text-gray-200 text-sm rounded-lg shadow-lg p-3 z-15">
            {disabledReason}
          </div>
        )}
      </div>

      {/* Help text */}
      {!error && helpText && (
        <p
          id={`${name}-help`}
          className="text-gray-400 text-sm mt-1">
          {helpText}
        </p>
      )}

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
