import { motion } from 'framer-motion';
import {
  FiCheckCircle,
  FiXCircle,
  FiAlertTriangle,
  FiInfo,
} from 'react-icons/fi';

// Shared variants
const BADGE_VARIANTS = {
  success: {
    icon: FiCheckCircle,
    className: 'bg-green-500/10 text-green-400 border border-green-500/20',
    pulse: false,
  },
  error: {
    icon: FiXCircle,
    className: 'bg-red-500/10 text-red-400 border border-red-500/20',
    pulse: false,
  },
  warning: {
    icon: FiAlertTriangle,
    className: 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/20',
    pulse: true,
  },
  info: {
    icon: FiInfo,
    className: 'bg-blue-500/10 text-blue-400 border border-blue-500/20',
    pulse: false,
  },
};

const Badge = ({
  variant = 'info',
  text,
  icon: CustomIcon,
  pulse = false,
  className = '',
}) => {
  const config = BADGE_VARIANTS[variant] || BADGE_VARIANTS.info;
  const Icon = CustomIcon || config.icon;

  return (
    <motion.span
      className={`px-3 py-1.5 text-xs rounded-full font-medium flex items-center gap-1.5 
                  ${config.className} ${className}`}
      animate={pulse ?? config.pulse ? { scale: [1, 1.05, 1] } : {}}
      transition={{ duration: 2, repeat: Infinity }}>
      {Icon && <Icon className="w-3 h-3" />}
      {text}
    </motion.span>
  );
};

export default Badge;
