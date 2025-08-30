import { useAuthStore } from '../../stores/authStore';
import { useState, useEffect } from 'react';

const NetworkBanner = () => {
  const isOnline = useAuthStore((s) => s.isOnline);
  const [showBanner, setShowBanner] = useState(!isOnline);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (!isOnline && !showBanner) {
      setShowBanner(true);
      setIsAnimating(true);
    } else if (isOnline && showBanner) {
      setIsAnimating(false);
      // Delay hiding to show the animation
      const timeout = setTimeout(() => {
        setShowBanner(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [isOnline, showBanner]);

  if (!showBanner) return null;

  return (
    <div
      className={`
        relative overflow-hidden
        bg-gradient-to-r from-red-600/90 via-red-500/90 to-red-600/90
        glass-strong
        text-white text-center
        border-b border-red-400/30
        transition-all duration-300 ease-out
        ${isAnimating ? 'animate-fade-in-up' : 'opacity-100'}
        ${
          isOnline
            ? 'opacity-0 transform -translate-y-full'
            : 'opacity-100 transform translate-y-0'
        }
      `}>
      {/* Animated background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-3 px-4 flex items-center justify-center gap-3">
        {/* Pulsing warning icon */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-5 h-5 bg-red-300 rounded-full animate-ping absolute"></div>
            <div className="w-5 h-5 bg-red-100 rounded-full relative flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <span className="font-semibold text-sm sm:text-base">
            Connection Lost
          </span>
          <span className="text-red-100 text-xs sm:text-sm">
            You're offline. Some features may not work properly.
          </span>
        </div>

        <button
          onClick={() => {
            window.location.reload();
          }}
          className="ml-2 px-3 py-1 text-xs font-medium
                     bg-white/20 hover:bg-white/30
                     rounded-lg border border-white/30
                     transition-all duration-200
                     hover:scale-105 active:scale-95">
          Retry
        </button>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent"></div>
    </div>
  );
};

export default NetworkBanner;
