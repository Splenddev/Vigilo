import React, { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import FormInput from './FormInput';
import Button from '../atoms/Button';
import {
  getPasswordStrengthColor,
  getPasswordStrengthText,
} from '../../utils/helpers';
import { FiLock } from 'react-icons/fi';

const PasswordInput = ({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  placeholder = '••••••••',
  error,
  shouldMatch = [], // ✅ array of values this field should match
  notMatch = [], // ✅ array of values this field should NOT match
  showStrength = false,
  passwordStrength,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const renderStrengthMeter = showStrength && value;

  // ✅ Match checks
  const matches = shouldMatch.every((v) => v !== undefined && value === v);
  const failsNotMatch = notMatch.some((v) => v !== undefined && value === v);

  return (
    <div>
      <FormInput
        label={label}
        name={name}
        type={showPassword ? 'text' : 'password'}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        error={error}
        icon={FiLock}
        wrapperChildren={
          <Button
            type="button"
            variant="custom"
            size="none"
            func={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-t-tertiary hover:text-t-primary transition-colors">
            {showPassword ? (
              <FaEyeSlash className="w-4 h-4" />
            ) : (
              <FaEye className="w-4 h-4" />
            )}
          </Button>
        }
        {...rest}
      />

      {/* ✅ Password Strength */}
      {renderStrengthMeter && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-t-tertiary">Password Strength</span>
            <span
              className={`text-xs ${getPasswordStrengthColor(
                passwordStrength
              ).replace('bg-', 'text-')}`}>
              {getPasswordStrengthText(passwordStrength)}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                passwordStrength
              )}`}
              style={{
                width: `${(passwordStrength / 5) * 100}%`,
              }}></div>
          </div>
        </div>
      )}

      {/* ✅ Match status */}
      {shouldMatch.length > 0 && value && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-t-tertiary">Validation</span>
            <span
              className={`text-xs ${
                matches ? 'text-green-400' : 'text-red-400'
              }`}>
              {matches ? 'Values match' : 'Values do not match'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                matches ? 'bg-green-400' : 'bg-red-400'
              }`}
              style={{
                width: matches ? '100%' : '50%',
              }}></div>
          </div>
        </div>
      )}

      {/* ✅ Not Match status */}
      {notMatch.length > 0 && value && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-t-tertiary">Validation</span>
            <span
              className={`text-xs ${
                failsNotMatch ? 'text-red-400' : 'text-green-400'
              }`}>
              {failsNotMatch ? 'Value must not match' : 'Validation passed'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                failsNotMatch ? 'bg-red-400' : 'bg-green-400'
              }`}
              style={{
                width: failsNotMatch ? '50%' : '100%',
              }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
