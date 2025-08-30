import { useEffect, useState } from 'react';
/* eslint-disable no-unused-vars */

import { motion, AnimatePresence } from 'framer-motion';
import { getModal, subscribe, hideModal } from '../../stores/modalStore';
import {
  LuCircleCheck,
  LuCircleX,
  LuTriangleAlert,
  LuInfo,
  LuX,
  LuCopy,
  LuRefreshCw,
  LuExternalLink,
} from 'react-icons/lu';
import {
  fadeIn,
  slideUp,
  zoomIn,
  pressEffect,
  rippleEffect,
  slideInUp,
} from '../../utils/animationVariants';

// Custom variants for the modal
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    transition: { duration: 0.2, ease: 'easeIn' },
  },
};

const modalVariants = {
  hidden: {
    opacity: 0,
    scale: 0.8,
    y: 50,
    filter: 'blur(4px)',
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    x: 0,
    filter: 'blur(0px)',
    transition: {
      type: 'spring',
      stiffness: 300,
      damping: 25,
      duration: 0.4,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    y: 20,
    filter: 'blur(2px)',
    transition: { duration: 0.2, ease: 'easeIn' },
  },
  shake: {
    x: [0, -10, 10, -8, 8, -4, 4, 0],
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const iconVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: {
    scale: 1,
    rotate: 0,
    transition: {
      type: 'spring',
      stiffness: 200,
      damping: 15,
      delay: 0.4,
    },
  },
  pulse: {
    scale: [1, 1.1, 1],
    transition: {
      duration: 1.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

const StatusModal = () => {
  const [modal, setModal] = useState(getModal());
  const [copySuccess, setCopySuccess] = useState(false);
  const [autoCloseTimer, setAutoCloseTimer] = useState(null);

  useEffect(() => {
    const unsubscribe = subscribe(setModal);
    return unsubscribe;
  }, []);

  // Auto-close timer for success messages
  useEffect(() => {
    if (modal.type === 'success' && modal.autoClose !== false) {
      const timer = setTimeout(() => {
        hideModal();
      }, modal.autoCloseDelay || 10000);
      setAutoCloseTimer(timer);
    }

    return () => {
      if (autoCloseTimer) {
        clearTimeout(autoCloseTimer);
      }
    };
  }, [modal, autoCloseTimer]);

  // Copy to clipboard function
  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  if (!modal.type) return null;

  const getModalConfig = () => {
    switch (modal.type) {
      case 'error':
        return {
          icon: LuCircleX,
          iconColor: 'text-red-500',
          titleColor: 'text-red-400',
          bgGradient: 'from-red-500/10 via-transparent to-red-500/5',
          borderColor: 'border-red-500/30',
          buttonClass: 'bg-red-500 hover:bg-red-600 text-white',
          title: modal.title || 'Error',
          shouldShake: true,
        };
      case 'success':
        return {
          icon: LuCircleCheck,
          iconColor: 'text-green-500',
          titleColor: 'text-green-400',
          bgGradient: 'from-green-500/10 via-transparent to-green-500/5',
          borderColor: 'border-green-500/30',
          buttonClass: 'btn-primary',
          title: modal.title || 'Success!',
          shouldBounce: true,
        };
      case 'warning':
        return {
          icon: LuTriangleAlert,
          iconColor: 'text-yellow-500',
          titleColor: 'text-yellow-400',
          bgGradient: 'from-yellow-500/10 via-transparent to-yellow-500/5',
          borderColor: 'border-yellow-500/30',
          buttonClass: 'bg-yellow-500 hover:bg-yellow-600 text-black',
          title: modal.title || 'Warning',
          shouldShake: false,
        };
      case 'info':
        return {
          icon: LuInfo,
          iconColor: 'text-blue-500',
          titleColor: 'text-blue-400',
          bgGradient: 'from-blue-500/10 via-transparent to-blue-500/5',
          borderColor: 'border-blue-500/30',
          buttonClass: 'bg-blue-500 hover:bg-blue-600 text-white',
          title: modal.title || 'Information',
          shouldBounce: false,
        };
      default:
        return {
          icon: LuInfo,
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-400',
          bgGradient: 'from-gray-500/10 via-transparent to-gray-500/5',
          borderColor: 'border-gray-500/30',
          buttonClass: 'btn-ghost',
          title: 'Notice',
          shouldBounce: false,
        };
    }
  };

  const config = getModalConfig();
  const IconComponent = config.icon;

  return (
    <AnimatePresence mode="wait">
      {modal.type && (
        <motion.div
          className="fixed inset-0 z-70 flex items-center justify-center p-4"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit">
          {/* Backdrop */}
          <motion.div
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            onClick={hideModal}
          />

          {/* Modal */}
          <motion.div
            className={`
              relative max-w-md w-full p-6 
              glass rounded-3xl shadow-2xl
              bg-gradient-to-br ${config.bgGradient}
              border ${config.borderColor}
              text-center overflow-hidden 
            `}
            variants={modalVariants}
            initial="hidden"
            animate={[
              'visible',
              config.shouldShake && modal.type === 'error' ? 'shake' : '',
            ]}>
            {/* Close button */}
            <motion.button
              className="absolute top-4 right-4 p-1 rounded-full hover:bg-white/10 transition-colors"
              onClick={hideModal}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}>
              <LuX className="w-5 h-5 text-gray-400 hover:text-white" />
            </motion.button>

            {/* Progress bar for auto-close */}
            {modal.type === 'success' && modal.autoClose !== false && (
              <motion.div
                className="absolute top-0 left-0 h-1 bg-green-500 rounded-t-2xl"
                initial={{ width: '100%' }}
                animate={{ width: '0%' }}
                transition={{
                  duration: modal.autoCloseDelay || 3000,
                  ease: 'linear',
                }}
              />
            )}

            {/* Icon */}
            <motion.div
              className="flex justify-center mb-6"
              variants={iconVariants}
              initial="hidden"
              animate={config.shouldBounce ? ['visible', 'pulse'] : 'visible'}>
              <div className="relative">
                {/* Glow effect */}
                <motion.div
                  className={`absolute inset-0 ${config.iconColor} opacity-30 blur-xl`}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: 'easeInOut',
                  }}>
                  <IconComponent className="w-16 h-16" />
                </motion.div>
                <IconComponent
                  className={`w-16 h-16 ${config.iconColor} relative z-10`}
                />
              </div>
            </motion.div>

            {/* Title */}
            <motion.h2
              className={`text-heading-lg mb-2 ${config.titleColor} font-bold`}
              variants={slideUp}
              transition={{ delay: 0.5 }}
              initial="hidden"
              animate="visible">
              {config.title}
            </motion.h2>

            {/* Status code */}
            {modal.status && (
              <motion.div
                className="inline-block px-3 py-1 mb-4 text-xs font-mono bg-white/10 rounded-full border border-white/20"
                variants={zoomIn}
                initial="hidden"
                transition={{ delay: 0.5 }}
                animate="visible">
                {modal.status}
              </motion.div>
            )}

            {/* Message */}
            <motion.p
              className="text-body text-gray-300 mb-6 leading-relaxed"
              variants={slideUp}
              transition={{ delay: 0.5 }}
              initial="hidden"
              animate="visible">
              {modal.message}
            </motion.p>

            {/* Details section */}
            {modal.details && (
              <motion.div
                className="mb-6 p-4 bg-white/5 rounded-xl border border-white/10 text-left"
                variants={slideUp}
                transition={{ delay: 0.6 }}
                initial="hidden"
                animate="visible">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-400">
                    Details
                  </span>
                  <motion.button
                    className="flex items-center gap-1 text-xs text-purple-400 hover:text-purple-300 transition-colors"
                    onClick={() => copyToClipboard(modal.details)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}>
                    <LuCopy className="w-3 h-3" />
                    {copySuccess ? 'Copied!' : 'Copy'}
                  </motion.button>
                </div>
                <code className="text-xs text-gray-300 font-mono block whitespace-pre-wrap">
                  {modal.details}
                </code>
              </motion.div>
            )}

            {/* Action buttons */}
            <motion.div
              className="flex gap-3 justify-center"
              variants={slideInUp}
              initial="hidden"
              animate="visible">
              {/* Primary action */}
              <motion.button
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-200 ${config.buttonClass}`}
                onClick={modal.onConfirm || hideModal}
                variants={rippleEffect}
                whileHover="hover"
                whileTap="tap">
                {modal.confirmText || 'Close'}
              </motion.button>

              {/* Secondary action */}
              {modal.onCancel && (
                <motion.button
                  className="px-6 py-3 rounded-xl font-semibold btn-ghost"
                  onClick={modal.onCancel}
                  variants={pressEffect}
                  whileTap="tap">
                  {modal.cancelText || 'Cancel'}
                </motion.button>
              )}

              {/* Retry action for errors */}
              {modal.type === 'error' && modal.onRetry && (
                <motion.button
                  className="p-3 rounded-xl btn-ghost"
                  onClick={modal.onRetry}
                  whileHover={{ rotate: 180 }}
                  whileTap={{ scale: 0.9 }}
                  title="Retry">
                  <LuRefreshCw className="w-5 h-5" />
                </motion.button>
              )}

              {/* External link action */}
              {modal.externalLink && (
                <motion.a
                  href={modal.externalLink.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-xl btn-ghost flex items-center gap-2"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  title={modal.externalLink.label || 'Open link'}>
                  <LuExternalLink className="w-5 h-5" />
                </motion.a>
              )}
            </motion.div>

            {/* Footer */}
            {modal.footer && (
              <motion.div
                className="mt-4 pt-4 border-t border-white/10 text-xs text-gray-500"
                variants={fadeIn}
                initial="hidden"
                animate="visible">
                {modal.footer}
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StatusModal;
