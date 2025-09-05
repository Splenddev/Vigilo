import { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

const getAnchorEl = (anchorRef) => {
  if (!anchorRef) return null;
  if (typeof anchorRef === 'string') return document.getElementById(anchorRef);
  return anchorRef.current || null;
};

export default function DropdownPortal({ anchorRef, children, onClose }) {
  const [position, setPosition] = useState(null);

  const calculatePosition = () => {
    const anchorEl = getAnchorEl(anchorRef);
    if (!anchorEl) return;

    const rect = anchorEl.getBoundingClientRect();
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

    // Close on scroll (both directions)
    const handleScroll = () => onClose?.();

    // Recalculate on resize
    window.addEventListener('resize', calculatePosition);
    window.addEventListener('scroll', handleScroll, true);

    return () => {
      window.removeEventListener('resize', calculatePosition);
      window.removeEventListener('scroll', handleScroll, true);
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
