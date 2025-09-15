// components/common/ErrorState.jsx
import React from 'react';
import { FiAlertCircle } from 'react-icons/fi';
import Button from '../atoms/Button';

const ErrorState = ({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  icon: Icon = FiAlertCircle,
  retryLabel = 'Retry',
}) => {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="flex flex-col items-center text-center p-6 border border-red-200 rounded-lg bg-red-100/90 shadow-lg max-w-90 w-[80vw]">
        <Icon className="text-red-500 text-4xl mb-3" />
        <h2 className="text-lg font-semibold text-red-600">{title}</h2>
        <p className="text-sm text-gray-700 mt-1">{message}</p>

        {onRetry && (
          <Button
            onClick={onRetry}
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
            variant="">
            {retryLabel}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ErrorState;
