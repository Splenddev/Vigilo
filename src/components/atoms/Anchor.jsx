import clsx from 'clsx';
import { AnimatePresence, motion } from 'framer-motion';
import { NavLink } from 'react-router-dom';

const Anchor = ({
  active = 'default',
  children,
  className = '',
  func = () => {},
  href = '#',
  size = 'md', // "sm" | "md" | "lg"
  variant = 'default', // "default" | "primary" | "secondary" | "ghost" | "glass" | "danger" | "success" | "warning"
  animated = false,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center rounded-xl transition-all duration-200 font-semibold no-underline group relative flex items-center w-full text-left transition-all duration-200 rounded-xl';

  const sizeClasses = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg',
  };

  const variantClasses = {
    default:
      'text-black/70 hover:bg-primary-purple/9 border border-transparent hover:border-white/10 hover:text-primary-purple-dark',
    primary: '',
    secondary: 'btn-secondary',
    ghost: 'btn-ghost',
    glass:
      'card hover:scale-105 transform text-white hover:border-purple-500/50',
    danger:
      'text-red-400 hover:text-red-300 hover:bg-red-500/10 border border-red-500/30 hover:border-red-400/50',
    success:
      'text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 border border-emerald-500/30 hover:border-emerald-400/50',
    warning:
      'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10 border border-amber-500/30 hover:border-amber-400/50',
  };

  const activeClasses = {
    default:
      'text-primary bg-gradient-to-r from-purple-500/20 to-pink-500/10 border-purple-500 bg-white/5 shadow-lg shadow-purple-500/10',
    primary: 'animate-pulse-glow shadow-lg shadow-purple-500/25',
    secondary: 'border-purple-400 bg-purple-500/20 animate-pulse-glow',
    ghost: 'bg-white/15 border-white/30 animate-pulse-glow',
    glass:
      'glass-strong border-purple-500/70 animate-pulse-glow shadow-lg shadow-purple-500/20',
    danger: 'bg-red-500/20 border-red-400 text-red-300 animate-pulse-glow',
    success:
      'bg-emerald-500/20 border-emerald-400 text-emerald-300 animate-pulse-glow',
    warning:
      'bg-amber-500/20 border-amber-400 text-amber-300 animate-pulse-glow',
  };

  const Link = motion(NavLink);
  if (animated) {
    return (
      <AnimatePresence>
        <Link
          to={href}
          className={({ isActive }) =>
            clsx(
              baseClasses,
              sizeClasses[size],
              variantClasses[variant],
              isActive ? activeClasses[active] : '',
              className
            )
          }
          onClick={func}
          initial={{ x: 10, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          {...props}>
          {children}
        </Link>
      </AnimatePresence>
    );
  }

  return (
    <NavLink
      to={href}
      className={({ isActive }) =>
        clsx(
          baseClasses,
          sizeClasses[size],
          variantClasses[variant],
          isActive ? activeClasses[active] : '',
          className
        )
      }
      onClick={func}
      {...props}>
      {children}
    </NavLink>
  );
};

export default Anchor;
