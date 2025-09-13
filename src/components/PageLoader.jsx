import React from 'react';
import { FiLoader } from 'react-icons/fi';
import clsx from 'clsx';

export const PageLoader = ({ loading = true, fullscreen = false, text }) => {
  if (!loading) return null;

  return (
    <div
      className={clsx(
        'flex items-center justify-center z-50',
        fullscreen
          ? 'fixed inset-0 bg-bg-primary/80 backdrop-blur-sm'
          : 'w-full h-full'
      )}>
      <div className="flex flex-col items-center space-y-4">
        <FiLoader className="w-10 h-10 text-color-primary animate-spin animate-pulse-glow" />
        {text && <p className="text-t-secondary text-body-sm">{text}</p>}
      </div>
    </div>
  );
};
