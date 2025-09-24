import React, { forwardRef } from 'react';
import {
  LuInfo as InfoIcon,
  LuCircleCheck as CheckCircle,
  LuTriangleAlert as AlertTriangle,
  LuCircleX as XCircle,
  LuCircleAlert as AlertCircle,
  LuBell as Bell,
  LuLightbulb as Lightbulb,
  LuShield as Shield,
  LuX as X,
} from 'react-icons/lu';
import { motion, AnimatePresence } from 'framer-motion';

// Variant configurations
const VARIANT_CONFIG = {
  info: {
    bgColor: 'bg-blue-300/20',
    borderColor: 'border-blue-500/50',
    iconColor: 'text-blue-600',
    titleColor: 'text-blue-500',
    messageColor: 'text-blue-500',
    gradientFrom: 'from-blue-500/10',
    gradientTo: 'to-blue-600/5',
    defaultIcon: InfoIcon,
    ariaLabel: 'Information',
  },
  success: {
    bgColor: 'bg-green-300/20',
    borderColor: 'border-green-500/50',
    iconColor: 'text-green-600',
    titleColor: 'text-green-500',
    messageColor: 'text-green-500',
    gradientFrom: 'from-green-500/10',
    gradientTo: 'to-green-600/5',
    defaultIcon: CheckCircle,
    ariaLabel: 'Success',
  },
  warning: {
    bgColor: 'bg-amber-300/20',
    borderColor: 'border-amber-500/50',
    iconColor: 'text-amber-600',
    titleColor: 'text-amber-500',
    messageColor: 'text-amber-500',
    gradientFrom: 'from-amber-500/10',
    gradientTo: 'to-amber-600/5',
    defaultIcon: AlertTriangle,
    ariaLabel: 'Warning',
  },
  error: {
    bgColor: 'bg-red-300/20',
    borderColor: 'border-red-500/50',
    iconColor: 'text-red-600',
    titleColor: 'text-red-500',
    messageColor: 'text-red-500',
    gradientFrom: 'from-red-500/10',
    gradientTo: 'to-red-600/5',
    defaultIcon: XCircle,
    ariaLabel: 'Error',
  },
  neutral: {
    bgColor: 'bg-gray-300/20',
    borderColor: 'border-gray-500/50',
    iconColor: 'text-gray-600',
    titleColor: 'text-gray-500',
    messageColor: 'text-gray-500',
    gradientFrom: 'from-gray-500/10',
    gradientTo: 'to-gray-600/5',
    defaultIcon: AlertCircle,
    ariaLabel: 'Notice',
  },
  tip: {
    bgColor: 'bg-purple-300/20',
    borderColor: 'border-purple-500/50',
    iconColor: 'text-purple-600',
    titleColor: 'text-purple-500',
    messageColor: 'text-purple-500',
    gradientFrom: 'from-purple-500/10',
    gradientTo: 'to-purple-600/5',
    defaultIcon: Lightbulb,
    ariaLabel: 'Tip',
  },
  security: {
    bgColor: 'bg-orange-300/20',
    borderColor: 'border-orange-500/50',
    iconColor: 'text-orange-600',
    titleColor: 'text-orange-500',
    messageColor: 'text-orange-500',
    gradientFrom: 'from-orange-500/10',
    gradientTo: 'to-orange-600/5',
    defaultIcon: Shield,
    ariaLabel: 'Security Notice',
  },
  notification: {
    bgColor: 'bg-indigo-300/20',
    borderColor: 'border-indigo-500/50',
    iconColor: 'text-indigo-600',
    titleColor: 'text-indigo-500',
    messageColor: 'text-indigo-500',
    gradientFrom: 'from-indigo-500/10',
    gradientTo: 'to-indigo-600/5',
    defaultIcon: Bell,
    ariaLabel: 'Notification',
  },
};

const SIZE_CONFIG = {
  xs: {
    padding: 'p-2',
    iconSize: 'w-3 h-3',
    titleSize: 'text-xs',
    messageSize: 'text-[11px]',
    gap: 'gap-1.5',
    rounded: 'rounded-sm',
    fontWeight: 'font-medium',
    iconColor: 'text-gray-400',
  },
  sm: {
    padding: 'p-3',
    iconSize: 'w-5 h-5',
    titleSize: 'text-sm',
    messageSize: 'text-xs',
    gap: 'gap-2',
    rounded: 'rounded-md',
    fontWeight: 'font-medium',
    iconColor: 'text-gray-500',
  },
  md: {
    padding: 'p-4',
    iconSize: 'w-7 h-7',
    titleSize: 'text-base',
    messageSize: 'text-sm',
    gap: 'gap-3',
    rounded: 'rounded-lg',
    fontWeight: 'font-semibold',
    iconColor: 'text-gray-600',
  },
  lg: {
    padding: 'p-5',
    iconSize: 'w-9 h-9',
    titleSize: 'text-lg',
    messageSize: 'text-base',
    gap: 'gap-4',
    rounded: 'rounded-xl',
    fontWeight: 'font-semibold',
    iconColor: 'text-gray-700',
  },
  xl: {
    padding: 'p-6',
    iconSize: 'w-10 h-10',
    titleSize: 'text-xl',
    messageSize: 'text-lg',
    gap: 'gap-5',
    rounded: 'rounded-2xl',
    fontWeight: 'font-bold',
    iconColor: 'text-gray-800',
  },
};

// Animation variants
const ANIMATION_VARIANTS = {
  slideIn: {
    initial: { opacity: 0, x: -20, scale: 0.95 },
    animate: { opacity: 1, x: 0, scale: 1 },
    exit: { opacity: 0, x: 20, scale: 0.95 },
    transition: { duration: 0.3, ease: 'easeOut' },
  },
  fadeIn: {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 10 },
    transition: { duration: 0.25 },
  },
  scaleIn: {
    initial: { opacity: 0, scale: 0.8 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.8 },
    transition: { duration: 0.2 },
  },
  none: {},
};

const Info = forwardRef(
  (
    {
      title,
      message,
      variant = 'info',
      icon: CustomIcon,
      size = 'md',
      dismissible = false,
      onDismiss,
      animation = 'fadeIn',
      bordered = true,
      elevated = false,
      className = '',
      style = {},
      testId = 'info-component',
      fullWidth = true,
      actions,
      compact = false,
      role,
      autoFocus = false,
      ...rest
    },
    ref
  ) => {
    // Validate variant
    const safeVariant = VARIANT_CONFIG[variant] ? variant : 'info';
    const config = VARIANT_CONFIG[safeVariant];
    const sizeConfig = SIZE_CONFIG[size] || SIZE_CONFIG.md;
    const animationConfig =
      ANIMATION_VARIANTS[animation] || ANIMATION_VARIANTS.fadeIn;

    // Determine icon to use
    const IconComponent = CustomIcon || config.defaultIcon;

    // Build classes
    const containerClasses = [
      // Base styles
      'relative overflow-hidden backdrop-blur-sm',
      // Background and border
      config.bgColor,
      bordered && config.borderColor,
      bordered && 'border',
      // Size and spacing
      sizeConfig.padding,
      compact && 'py-2',
      sizeConfig.rounded,
      // Shadow
      elevated && 'shadow-lg shadow-black/5',
      // Width
      fullWidth ? 'w-full' : 'max-w-fit',
      // Custom classes
      className,
    ]
      .filter(Boolean)
      .join(' ');

    const contentClasses = [
      'flex items-start',
      sizeConfig.gap,
      'relative z-10',
    ].join(' ');

    // Handle dismiss
    const handleDismiss = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (onDismiss) {
        onDismiss();
      }
    };

    // Handle keyboard navigation for dismissible
    const handleKeyDown = (e) => {
      if (dismissible && (e.key === 'Escape' || e.key === 'Delete')) {
        handleDismiss(e);
      }
    };

    const InfoContent = () => (
      <div
        ref={ref}
        className={containerClasses}
        style={style}
        data-testid={testId}
        role={role || (variant === 'error' ? 'alert' : 'status')}
        aria-live={variant === 'error' ? 'assertive' : 'polite'}
        aria-label={config.ariaLabel}
        tabIndex={dismissible ? 0 : undefined}
        onKeyDown={handleKeyDown}
        autoFocus={autoFocus}
        {...rest}>
        {/* Gradient overlay */}
        <div
          className={`
        absolute inset-0 bg-gradient-to-br ${config.gradientFrom} ${config.gradientTo}
        opacity-50
      `}
        />

        <div className={contentClasses}>
          {/* Icon */}
          {IconComponent && (
            <div className='flex-shrink-0'>
              <IconComponent
                className={`${sizeConfig.iconSize} ${config.iconColor} mt-0.5`}
                aria-hidden='true'
              />
            </div>
          )}

          {/* Content */}
          <div className='flex-1 min-w-0'>
            {title && (
              <h3
                className={`
              ${config.titleColor} font-semibold mb-1 
              ${sizeConfig.titleSize}
              ${compact ? 'mb-0.5' : ''}
            `}>
                {title}
              </h3>
            )}

            {message && (
              <div
                className={`
              ${config.messageColor} ${sizeConfig.messageSize}
              leading-relaxed
            `}>
                {typeof message === 'string' ? <p>{message}</p> : message}
              </div>
            )}

            {/* Custom Actions */}
            {actions && (
              <div className={`mt-3 ${compact ? 'mt-2' : ''}`}>{actions}</div>
            )}
          </div>

          {/* Dismiss Button */}
          {dismissible && (
            <button
              onClick={handleDismiss}
              className={`
              flex-shrink-0 p-1 rounded-md transition-colors
              ${config.iconColor} hover:bg-black/5 active:bg-black/10
              focus:outline-none focus:ring-2 focus:ring-current focus:ring-offset-2
            `}
              aria-label='Dismiss'
              type='button'>
              <X className='w-4 h-4' />
            </button>
          )}
        </div>
      </div>
    );

    // Apply animation if specified
    if (animation === 'none') {
      return <InfoContent />;
    }

    return (
      <AnimatePresence mode='wait'>
        <motion.div
          {...(animationConfig.initial && { initial: animationConfig.initial })}
          {...(animationConfig.animate && { animate: animationConfig.animate })}
          {...(animationConfig.exit && { exit: animationConfig.exit })}
          {...(animationConfig.transition && {
            transition: animationConfig.transition,
          })}>
          <InfoContent />
        </motion.div>
      </AnimatePresence>
    );
  }
);

Info.displayName = 'Info';

export const InfoSuccess = (props) => (
  <Info
    variant='success'
    {...props}
  />
);
export const InfoWarning = (props) => (
  <Info
    variant='warning'
    {...props}
  />
);
export const InfoError = (props) => (
  <Info
    variant='error'
    {...props}
  />
);
export const InfoTip = (props) => (
  <Info
    variant='tip'
    {...props}
  />
);
export const InfoSecurity = (props) => (
  <Info
    variant='security'
    {...props}
  />
);
export const InfoNotification = (props) => (
  <Info
    variant='notification'
    {...props}
  />
);

export default Info;
