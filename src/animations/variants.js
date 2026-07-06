// src/animations/variants.js
// Framer Motion animation variants for consistent animations

export const fadeIn = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2 } },
};

export const fadeInLeft = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

export const fadeInRight = {
  hidden: { opacity: 0, x: 20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } },
};

export const slideInLeft = {
  hidden: { x: '-100%', opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    x: '-100%',
    opacity: 0,
    transition: { duration: 0.25, ease: [0.4, 0, 0.2, 1] },
  },
};

export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.05,
    },
  },
};

export const staggerItem = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.35, ease: [0.4, 0, 0.2, 1] },
  },
};

export const pageTransition = {
  hidden: { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -8,
    transition: { duration: 0.25 },
  },
};

export const modalVariants = {
  hidden: { opacity: 0, scale: 0.88, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] },
  },
  exit: {
    opacity: 0,
    scale: 0.92,
    y: 10,
    transition: { duration: 0.2 },
  },
};

export const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.2 } },
};

export const cardHover = {
  rest: { y: 0, boxShadow: '0 4px 24px rgba(0,0,0,0.06)' },
  hover: {
    y: -4,
    boxShadow: '0 16px 48px rgba(41,121,255,0.15)',
    transition: { duration: 0.25, ease: 'easeOut' },
  },
};

export const numberCounter = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] },
  },
};

export const sidebarVariants = {
  expanded: {
    width: '260px',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
  collapsed: {
    width: '72px',
    transition: { duration: 0.3, ease: [0.4, 0, 0.2, 1] },
  },
};

export const sidebarItemVariants = {
  expanded: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
  collapsed: { opacity: 0, x: -10, transition: { duration: 0.1 } },
};

export const rippleVariants = {
  start: { scale: 0, opacity: 0.5 },
  end: { scale: 4, opacity: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

export const floatAnimation = {
  animate: {
    y: [0, -8, 0],
    transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
  },
};
