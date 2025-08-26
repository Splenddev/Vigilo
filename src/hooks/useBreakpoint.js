import { useState, useEffect } from 'react';

export const useBreakpoint = () => {
  const getBreakpoints = (width) => ({
    isMobile: width < 640,
    isTablet: width >= 640 && width < 1024,
    isDesktop: width >= 1024,
  });

  const [breakpoints, setBreakpoints] = useState(
    getBreakpoints(window.innerWidth)
  );

  useEffect(() => {
    const handleResize = () => {
      setBreakpoints(getBreakpoints(window.innerWidth));
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return breakpoints;
};
