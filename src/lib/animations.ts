import { type Variants } from "framer-motion";

// ── Page Reveal ──
export const pageReveal: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Fade Up ──
export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Fade Up with delay ──
export const fadeUpDelayed = (delay: number = 0.2): Variants => ({
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1], delay },
  },
});

// ── Fade In (no movement) ──
export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Stagger Children ──
export const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

// ── Scale Reveal (image cards) ──
export const scaleReveal: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Line Reveal (for horizontal rules) ──
export const lineReveal: Variants = {
  hidden: { scaleX: 0 },
  visible: {
    scaleX: 1,
    transition: { duration: 1.2, ease: [0.25, 0.1, 0.25, 1] },
  },
};

// ── Parallax Y ──
export const parallaxY = (yOffset: number = 30): Variants => ({
  hidden: { y: yOffset, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 1, ease: [0.25, 0.1, 0.25, 1] },
  },
});

// ── Image Hover Scale (used with whileHover) ──
export const imageHover = {
  rest: { scale: 1, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
  hover: { scale: 1.04, transition: { duration: 0.7, ease: [0.25, 0.1, 0.25, 1] } },
};

// ── Card Hover ──
export const cardHover = {
  rest: { y: 0, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
  hover: { y: -8, transition: { duration: 0.5, ease: [0.25, 0.1, 0.25, 1] } },
};
