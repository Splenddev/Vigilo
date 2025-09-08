import React, { useEffect, useRef, useState, useId } from 'react';

// You can use any icons library, e.g., react-icons
import { FiInfo } from 'react-icons/fi';

const variantClasses = {
  info: 'bg-sky-500 text-white',
  success: 'bg-green-500 text-white',
  warning: 'bg-yellow-400 text-black',
  error: 'bg-red-500 text-white',
};

const Tooltip = ({
  children,
  message,
  isOpen: controlledOpen,
  onClose,
  autoClose = 0,
  variant = 'info',
  position = 'top',
  delay = 100,
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const open = controlledOpen !== undefined ? controlledOpen : internalOpen;
  const timerRef = useRef(null);
  const tooltipId = useId();

  // Positioning classes
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  const handleOpen = () => {
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      if (controlledOpen === undefined) setInternalOpen(true);
    }, delay);
  };

  const handleClose = () => {
    clearTimeout(timerRef.current);
    if (controlledOpen === undefined) setInternalOpen(false);
    if (onClose) onClose();
  };

  // Auto-close logic
  useEffect(() => {
    if (open && autoClose > 0) {
      timerRef.current = setTimeout(() => {
        handleClose();
      }, autoClose);
    }
    return () => clearTimeout(timerRef.current);
  }, [open, autoClose]);

  // Clone the child element to inject event handlers and accessibility props
  const triggerElement = React.cloneElement(children, {
    onMouseEnter: handleOpen,
    onMouseLeave: handleClose,
    onFocus: handleOpen,
    onBlur: handleClose,
    'aria-describedby': open ? tooltipId : undefined,
  });

  return (
    <div className="inline-block relative">
      {triggerElement}
      {open && (
        <div
          id={tooltipId}
          role="tooltip"
          className={`
            absolute px-3 py-1.5 rounded-md text-sm shadow-lg z-50
            transition-opacity duration-300
            ${variantClasses[variant]}
            ${getPositionClasses()}
            ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}
          `}>
          {message}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
