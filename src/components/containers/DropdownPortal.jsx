import { useEffect,  useState } from 'react';
import ReactDOM from 'react-dom';

export default function DropdownPortal({ anchorRef, children, onClose }) {
  const [position, setPosition] = useState(null);

  useEffect(() => {
    if (anchorRef.current) {
      const rect = anchorRef.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY, // account for scroll
        left: rect.right - 192 + window.scrollX, // align right, 192px = w-48
      });
    }

    // close on outside click
    const handleClick = (e) => {
      if (!anchorRef.current?.contains(e.target)) {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
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
