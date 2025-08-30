import { useAuthStore } from '../../stores/authStore';
import { useState, useEffect } from 'react';

const statusMessages = {
  offline: {
    title: 'No Internet Connection',
    description: "You're offline. Check your Wi-Fi or mobile data.",
  },
  'server-down': {
    title: 'Server Unreachable',
    description: "You're online, but our servers can’t be reached.",
  },
};

const NetworkBanner = () => {
  const networkStatus = useAuthStore((s) => s.networkStatus);
  const checkConnection = useAuthStore((s) => s.checkConnection);

  const [showBanner, setShowBanner] = useState(networkStatus !== 'online');
  const [isAnimating, setIsAnimating] = useState(false);
  const [retrying, setRetrying] = useState(false);

  useEffect(() => {
    if (networkStatus !== 'online' && !showBanner) {
      setShowBanner(true);
      setIsAnimating(true);
    } else if (networkStatus === 'online' && showBanner) {
      setIsAnimating(false);
      const timeout = setTimeout(() => {
        setShowBanner(false);
      }, 300);
      return () => clearTimeout(timeout);
    }
  }, [networkStatus, showBanner]);

  if (!showBanner) return null;

  const message = statusMessages[networkStatus] || statusMessages['offline'];

  const handleRetry = async () => {
    setRetrying(true);
    await checkConnection();
    setRetrying(false);
  };

  return (
    <div
      className={`
        sticky top-0 overflow-hidden
        bg-gradient-to-r from-red-600/90 via-red-500/90 to-red-600/90 z-100 text-white text-center
        border-b border-red-400/30
        transition-all duration-300 ease-out
        ${isAnimating ? 'animate-fade-in-up' : 'opacity-100'} h-13 
        ${
          networkStatus === 'online'
            ? 'opacity-0 transform -translate-y-full'
            : 'opacity-100 transform translate-y-0'
        }
      `}>
      {/* Background shimmer */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 py-3 px-4 flex items-center justify-center gap-3">
        {/* Warning icon */}
        <div className="flex items-center justify-center">
          <div className="relative">
            <div className="w-5 h-5 bg-red-300 rounded-full animate-ping absolute"></div>
            <div className="w-5 h-5 bg-red-100 rounded-full relative flex items-center justify-center">
              <span className="text-red-600 text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Dynamic Message */}
        <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-3">
          <span className="font-semibold text-sm sm:text-base">
            {message.title}
          </span>
          <span className="text-red-100 text-xs sm:text-sm">
            {message.description}
          </span>
        </div>

        {/* Retry Button */}
        <button
          onClick={handleRetry}
          disabled={retrying}
          className={`
            ml-2 px-3 py-1 text-xs font-medium
            rounded-lg border border-white/30
            transition-all duration-200
            ${
              retrying
                ? 'bg-white/10 text-white/60 cursor-not-allowed'
                : 'bg-white/20 hover:bg-white/30 hover:scale-105 active:scale-95'
            }
          `}>
          {retrying ? 'Checking...' : 'Retry'}
        </button>
      </div>

      {/* Bottom gradient line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent"></div>
    </div>
  );
};

export default NetworkBanner;
