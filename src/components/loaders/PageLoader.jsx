import React from 'react';
import { FiLoader } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';

export const PageLoader = ({
  loading = true,
  fullscreen = false,
  text,
  size = 'lg', // sm, md, lg
  color = 'text-blue-400',
}) => {
  const sizeClasses = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-10 h-10',
  };

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          key="loader"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={clsx(
            'flex items-center justify-center z-30',
            fullscreen
              ? 'fixed inset-0 bg-bg-primary/80 backdrop-blur-sm'
              : 'w-full h-full'
          )}
          role="status"
          aria-busy="true">
          <div className="flex flex-col items-center space-y-4">
            <FiLoader
              className={clsx(sizeClasses[size], color, 'animate-spin')}
            />
            {text && (
              <p className="text-t-secondary text-body-sm text-center max-w-sm">
                {text}
              </p>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
