import React, { useState } from 'react';
import { 
  LuCircleAlert, LuRefreshCw, LuWifiOff, 
  LuTriangleAlert, LuX, LuArrowLeft, LuInfo
} from 'react-icons/lu';
import Button from '../atoms/Button';

const ErrorState = ({
  title = '',
  message = '',
  onRetry,
  onBack,
  onClose,
  details,
  errorCode,
  icon: Icon = LuCircleAlert,
  retryLabel = 'Try Again',
  backLabel = 'Go Back',
  variant = 'error',
  showAnimation = true,
  absolute=true
}) => {
  const [showDetails, setShowDetails] = useState(false);

  const variants = {
    error: {
      bgGradient: 'from-red-50 to-red-100/50',
      borderColor: 'border-red-200/60',
      shadowColor: 'shadow-red-100/50',
      iconColor: 'text-red-500',
      titleColor: 'text-red-800',
      messageColor: 'text-red-700',
      glowColor: 'shadow-red-500/20',
      accentColor: 'bg-red-500',
      defaultTitle: 'Something went wrong',
      defaultMessage: 'An unexpected error occurred. Please try again.'
    },
    warning: {
      bgGradient: 'from-amber-50 to-amber-100/50',
      borderColor: 'border-amber-200/60',
      shadowColor: 'shadow-amber-100/50',
      iconColor: 'text-amber-500',
      titleColor: 'text-amber-800',
      messageColor: 'text-amber-700',
      glowColor: 'shadow-amber-500/20',
      accentColor: 'bg-amber-500',
      defaultTitle: 'Warning',
      defaultMessage: 'Please review and take action.'
    },
    network: {
      bgGradient: 'from-blue-50 to-blue-100/50',
      borderColor: 'border-blue-200/60',
      shadowColor: 'shadow-blue-100/50',
      iconColor: 'text-blue-500',
      titleColor: 'text-blue-800',
      messageColor: 'text-blue-700',
      glowColor: 'shadow-blue-500/20',
      accentColor: 'bg-blue-500',
      defaultTitle: 'Network Issue',
      defaultMessage: 'We can’t connect right now. Check your internet and try again.'
    },
    critical: {
      bgGradient: 'from-purple-50 to-purple-100/50',
      borderColor: 'border-purple-200/60',
      shadowColor: 'shadow-purple-100/50',
      iconColor: 'text-purple-500',
      titleColor: 'text-purple-800',
      messageColor: 'text-purple-700',
      glowColor: 'shadow-purple-500/20',
      accentColor: 'bg-purple-500',
      defaultTitle: 'Critical Error',
      defaultMessage: 'A serious issue occurred. Immediate attention required.'
    }
  };

  const config = variants[variant];

  const getIcon = () => {
    if (Icon !== LuCircleAlert) return Icon;
    const iconMap = {
      error: LuX,
      warning: LuTriangleAlert,
      network: LuWifiOff,
      critical: LuCircleAlert
    };
    return iconMap[variant] || LuCircleAlert;
  };

  const IconComponent = getIcon();

  return (
    <div className={`${absolute?'absolute':''} inset-0 flex items-center justify-center p-4 backdrop-blur-sm bg-bg-glass-sm z-10`}>
      <div className={`
        relative flex flex-col items-center text-center p-8
        bg-gradient-to-br ${config.bgGradient}
        border ${config.borderColor}
        rounded-2xl shadow-2xl ${config.shadowColor} ${config.glowColor}
        max-w-md w-full mx-4
        backdrop-blur-sm
        ${showAnimation ? 'animate-fade-in-up' : ''}
        transform transition-all duration-300 hover:scale-[1.02]
      `}>
        
        {/* Close Button */}
        {onClose && (
          <button 
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 hover:text-gray-600"
          >
            <LuX className="w-5 h-5" />
          </button>
        )}

        {/* Icon */}
        <div className={`
          relative mb-6 p-4 rounded-full bg-white/80 backdrop-blur-sm
          shadow-lg ${config.shadowColor}
          ${showAnimation ? 'animate-bounce-subtle' : ''}
        `}>
          <div className={`absolute inset-0 ${config.accentColor} rounded-full opacity-20 blur-md ${showAnimation ? 'animate-pulse' : ''}`} />
          <IconComponent className={`${config.iconColor} w-12 h-12 relative z-10 ${showAnimation ? 'animate-pulse' : ''}`} />
        </div>

        {/* Content */}
        <div className="space-y-3 mb-6">
          <h2 className={`text-xl font-bold ${config.titleColor}`}>
            {title || config.defaultTitle}
          </h2>
          <p className={`text-sm ${config.messageColor} leading-relaxed max-w-sm font-medium`}>
            {message || config.defaultMessage}
          </p>

          {errorCode && (
            <p className="text-xs text-gray-500">Error Code: {errorCode}</p>
          )}

          {details && (
            <button 
              onClick={() => setShowDetails(!showDetails)}
              className="flex items-center justify-center gap-1 text-xs text-blue-600 hover:underline"
            >
              <LuInfo className="w-4 h-4" />
              {showDetails ? 'Hide Details' : 'Show Details'}
            </button>
          )}
          {showDetails && (
            <pre className="bg-white/70 text-gray-700 text-xs rounded-lg p-3 mt-2 text-left overflow-x-auto max-h-40">
              {details}
            </pre>
          )}
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3 w-full items-center justify-center">
          {onRetry && (
            <Button onClick={onRetry} variant="outline" className="group relative overflow-hidden">
              <LuRefreshCw className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
              <span>{retryLabel}</span>
            </Button>
          )}
          {onBack && (
            <Button onClick={onBack} variant="secondary">
              <LuArrowLeft className="w-4 h-4" />
              <span>{backLabel}</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorState;
