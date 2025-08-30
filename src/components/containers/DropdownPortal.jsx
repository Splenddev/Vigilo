import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

export default function DropdownPortal({ anchorRef, children, onClose }) {
  const [position, setPosition] = useState(null);

  const calculatePosition = () => {
    if (!anchorRef.current) return;

    const rect = anchorRef.current.getBoundingClientRect();
    const dropdownHeight = 200; // rough estimate or pass as prop/ref
    const dropdownWidth = 192; // your w-48
    const viewportHeight = window.innerHeight;
    const viewportWidth = window.innerWidth;

    // Default: show below
    let top = rect.bottom + window.scrollY;
    let left = rect.right - dropdownWidth + window.scrollX;

    // Check vertical overflow → flip above if not enough space
    if (rect.bottom + dropdownHeight > viewportHeight) {
      top = rect.top - dropdownHeight + window.scrollY + 25;
    }

    // Clamp horizontal if overflowing screen
    if (left + dropdownWidth > viewportWidth) {
      left = viewportWidth - dropdownWidth - 8; // padding from edge
    }
    if (left < 8) left = 8;

    setPosition({ top, left });
  };

  useEffect(() => {
    calculatePosition();

    const handleClick = (e) => {
      if (!anchorRef.current?.contains(e.target)) {
        onClose?.();
      }
    };

    // Close on scroll (both directions)
    const handleScroll = () => onClose?.();

    // Recalc on resize
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', handleScroll, true);
    document.addEventListener('mousedown', handleClick);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', handleScroll, true);
      document.removeEventListener('mousedown', handleClick);
    };
  }, [anchorRef, onClose]);

  if (!position) return null;

  return ReactDOM.createPortal(
    <div
      className="absolute w-48 bg-bg-secondary rounded-xl shadow-xl ring-1 ring-white/10 z-50"
      style={{
        top: position.top,
        left: position.left,
      }}>
      {children}
    </div>,
    document.body
  );
}
