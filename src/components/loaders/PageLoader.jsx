import React, { useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SpinnerLoader from './SpinnerLoader';
import DotsLoader from './DotsLoader';
import BarLoader from './BarLoader';
import PulseLoader from './PulseLoader';

const LOADER_SIZES = {
  sm: { loader: 'w-6 h-6', dot: 'w-2 h-2' },
  md: { loader: 'w-8 h-8', dot: 'w-3 h-3' },
  lg: { loader: 'w-10 h-10', dot: 'w-4 h-4' },
  xl: { loader: 'w-16 h-16', dot: 'w-5 h-5' },
};

const ANIMATION_VARIANTS = {
  overlay: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: 0.2 },
  },
  content: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: 0.2, delay: 0.1 },
  },
  text: {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 },
    transition: { duration: 0.3, delay: 0.2 },
  },
};

export const PageLoader = ({
  loading = true,
  fullscreen = false,
  text = '',
  size = 'lg',
  color = 'text-purple-500',
  variant = 'spinner',
  overlayOpacity = 25,
  textPosition = 'bottom',
  closeable = false,
  onClose,
  className = '',
  testId = 'page-loader',
  preventScroll = false,
  zIndex = 30,
}) => {
  // Validate props
  const validSizes = Object.keys(LOADER_SIZES);
  const validVariants = ['spinner', 'dots', 'bar', 'pulse'];
  const validTextPositions = ['bottom', 'right'];

  if (!validSizes.includes(size)) {
    console.warn(`Invalid size "${size}". Using "lg" instead.`);
  }
  if (!validVariants.includes(variant)) {
    console.warn(`Invalid variant "${variant}". Using "spinner" instead.`);
  }
  if (!validTextPositions.includes(textPosition)) {
    console.warn(
      `Invalid textPosition "${textPosition}". Using "bottom" instead.`
    );
  }

  // Sanitize props
  const safeSize = validSizes.includes(size) ? size : 'lg';
  const safeVariant = validVariants.includes(variant) ? variant : 'spinner';
  const safeTextPosition = validTextPositions.includes(textPosition)
    ? textPosition
    : 'bottom';
  const safeOverlayOpacity = Math.max(0, Math.min(100, overlayOpacity));

  // Handle escape key for closeable loaders
  const handleKeyDown = useCallback(
    (event) => {
      if (event.key === 'Escape' && closeable && onClose) {
        onClose();
      }
    },
    [closeable, onClose]
  );

  // Prevent body scroll when fullscreen loader is active
  useEffect(() => {
    if (loading && fullscreen && preventScroll) {
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';

      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [loading, fullscreen, preventScroll]);

  // Add escape key listener
  useEffect(() => {
    if (loading && closeable) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [loading, closeable, handleKeyDown]);

  // Render appropriate loader variant
  const renderLoader = () => {
    const loaderProps = { size: safeSize, color, LOADER_SIZES };

    switch (safeVariant) {
      case 'dots':
        return <DotsLoader {...loaderProps} />;
      case 'bar':
        return <BarLoader color={color} />;
      case 'pulse':
        return <PulseLoader {...loaderProps} />;
      case 'spinner':
      default:
        return <SpinnerLoader {...loaderProps} />;
    }
  };

  if (!loading) return null;

  const containerClasses = [
    'flex items-center justify-center',
    fullscreen && ['fixed inset-0'],
    !fullscreen && 'w-full h-full',
    className,
  ]
    .filter(Boolean)
    .flat()
    .join(' ');

  const contentClasses = [
    'flex items-center',
    safeTextPosition === 'right' ? 'flex-row space-x-4' : 'flex-col space-y-3',
  ].join(' ');

  return (
    <AnimatePresence mode='wait'>
      <motion.div
        {...ANIMATION_VARIANTS.overlay}
        role='status'
        aria-busy='true'
        aria-live='polite'
        aria-label={text || 'Loading content'}
        data-testid={testId}
        className={containerClasses}
        style={{
          ...(fullscreen && {
            zIndex,
          }),
        }}
        onClick={closeable ? onClose : undefined}>
        <motion.div
          {...ANIMATION_VARIANTS.content}
          className={contentClasses}
          onClick={(e) => e.stopPropagation()}>
          {renderLoader()}

          {text && (
            <motion.div
              {...ANIMATION_VARIANTS.text}
              className='text-center max-w-xs'>
              <p className='text-sm text-t-secondary'>{text}</p>
            </motion.div>
          )}

          {closeable && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.3 }}
              onClick={onClose}
              className='mt-2 px-3 py-1.5 text-xs font-medium rounded-md 
                         bg-gray-100 hover:bg-gray-200 
                         dark:bg-gray-700 dark:hover:bg-gray-600
                         text-gray-700 dark:text-gray-200
                         transition-colors duration-200
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                         active:scale-95 transform'
              aria-label='Cancel loading'>
              Cancel
            </motion.button>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
