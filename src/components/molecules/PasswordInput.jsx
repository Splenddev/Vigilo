import React, { useState } from 'react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import FormInput from './FormInput';
import Button from '../atoms/Button';
import {
  getPasswordStrengthColor,
  getPasswordStrengthText,
} from '../../utils/helpers';

const PasswordInput = ({
  label = 'Password',
  name = 'password',
  value,
  onChange,
  placeholder = '••••••••',
  error,
  matchWith, // compare against another password
  showMatchStatus = false,
  showStrength = false,
  passwordStrength,
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const passwordsMatch =
    showMatchStatus && matchWith !== undefined && value === matchWith;

  const renderStrengthMeter = showStrength && value;

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
        icon={FaLock}
        wrapperChildren={
          <Button
            type="button"
            variant="custom"
            size="none"
            func={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-t-primary transition-colors">
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
            <span className="text-xs text-gray-400">Password Strength</span>
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

      {/* ✅ Confirm Password Match */}
      {showMatchStatus && value && (
        <div className="mt-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-400">Confirm Password</span>
            <span
              className={`text-xs ${
                passwordsMatch ? 'text-green-400' : 'text-red-400'
              }`}>
              {passwordsMatch ? 'Passwords match' : 'Passwords do not match'}
            </span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className={`h-2 rounded-full transition-all duration-300 ${
                passwordsMatch ? 'bg-green-400' : 'bg-red-400'
              }`}
              style={{
                width: passwordsMatch ? '100%' : '50%',
              }}></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PasswordInput;
