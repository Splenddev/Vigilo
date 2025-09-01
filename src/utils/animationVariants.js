// animations.js
export const fadeIn = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const containerVariants = {
  collapsed: { height: 0, opacity: 0, transition: { when: 'afterChildren' } },
  expanded: {
    height: 'auto',
    opacity: 1,
    transition: { when: 'beforeChildren', staggerChildren: 0.08 },
  },
};

export const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  hover: {
    y: -5,
    transition: {
      duration: 0.3,
      ease: 'easeInOut',
    },
  },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.15, duration: 0.5, ease: 'easeOut' },
  }),
};

export const expandVariants = {
  collapsed: { opacity: 0, height: 0 },
  expanded: { opacity: 1, height: 'auto', transition: { duration: 0.4 } },
};

export const itemVariants = {
  collapsed: { opacity: 0, y: 20 },
  expanded: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

export const labelVariants = {
  expanded: {
    x: 0,
    opacity: 1,
    transition: { type: 'tween', duration: 0.3, ease: 'easeOut' },
  },
  collapsed: {
    x: -20,
    opacity: 0,
    transition: { type: 'tween', duration: 0.2, ease: 'easeIn' },
  },
};

export const navItemVariants = {
  collapsed: { opacity: 0, y: -10 },
  expanded: { opacity: 1, y: 0 },
};

export const slideUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut', delay: 0.4 },
  },
  exit: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slideDown = {
  hidden: { opacity: 0, y: -40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.97,
    transition: { duration: 0.25, ease: 'easeInOut' },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

export const fadeInUpChild = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
};

export const drawerLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const drawerRight = {
  hidden: { x: '100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const drawerBottom = {
  hidden: { y: '100%' },
  visible: {
    y: 0,
    transition: { type: 'spring', stiffness: 200, damping: 25 },
  },
  exit: { y: '100%', transition: { duration: 0.3, ease: 'easeInOut' } },
};

export const pulse = {
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 1.2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const zoomIn = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] },
  },
};

export const zoomOut = {
  hidden: { opacity: 0, scale: 1.2 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.35, ease: 'easeOut', delay: 0.4 },
  },
};

export const rotate = {
  initial: { rotate: 0 },
  open: { rotate: 90, transition: { duration: 0.3, ease: 'easeOut' } },
  close: { rotate: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

export const blurIn = {
  hidden: { opacity: 0, filter: 'blur(8px)' },
  visible: {
    opacity: 1,
    filter: 'blur(0px)',
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

export const shake = {
  hidden: { x: 0 },
  visible: {
    x: [0, -8, 8, -6, 6, -3, 3, 0],
    transition: { duration: 0.5, ease: 'easeInOut' },
  },
};

export const bounce = {
  hidden: { y: 0 },
  visible: {
    y: [0, -15, 0, -7, 0],
    transition: { duration: 0.6, ease: 'easeInOut' },
  },
};

export const flip = {
  hidden: { rotateY: 90, opacity: 0 },
  visible: {
    rotateY: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
  exit: {
    rotateY: -90,
    opacity: 0,
    transition: { duration: 0.4, ease: 'easeIn' },
  },
};

export const slideInLeft = {
  hidden: { x: -100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    x: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slideInRight = {
  hidden: { x: 100, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    x: 100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slideInUp = {
  hidden: { y: 100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut', delay: 0.6 },
  },
  exit: {
    y: 100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const slideInDown = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
  exit: {
    y: -100,
    opacity: 0,
    transition: { duration: 0.3, ease: 'easeIn' },
  },
};

export const hoverEffect = {
  hover: {
    scale: 1.05,
    boxShadow: '0px 4px 15px rgba(0, 0, 0, 0.2)',
    transition: { duration: 0.3, ease: 'easeInOut' },
  },
};

export const tapEffect = {
  tap: {
    scale: 0.98,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.1, ease: 'easeInOut' },
  },
};

export const rippleEffect = {
  hover: {
    scale: 1.03,
    boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.12)',
    transition: { duration: 0.2, ease: 'easeInOut' },
  },
  tap: {
    scale: 0.97,
    boxShadow: '0px 1px 6px rgba(0, 0, 0, 0.1)',
    transition: { duration: 0.1, ease: 'easeInOut' },
  },
};

export const pressEffect = {
  tap: {
    scale: 0.95,
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.15)',
    transition: { duration: 0.1, ease: 'easeInOut' },
  },
};
