import type { Variants } from "framer-motion";

export const EASE_OUT_EXPO: [number, number, number, number] = [
  0.22, 1, 0.36, 1,
];
export const EASE_IO_QUART: [number, number, number, number] = [
  0.76, 0, 0.24, 1,
];

export const DURATION = {
  fast: 0.2,
  base: 0.5,
  slow: 1.2,
} as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: DURATION.base, ease: EASE_OUT_EXPO },
  },
};

export const fade: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { duration: DURATION.slow, ease: EASE_OUT_EXPO },
  },
};

export const wordStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.04, delayChildren: 0.1 },
  },
};

export const charStagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.025, delayChildren: 0.1 },
  },
};

export const wordChild: Variants = {
  hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};

export const charChild: Variants = {
  hidden: { opacity: 0, y: "60%", filter: "blur(8px)" },
  show: {
    opacity: 1,
    y: "0%",
    filter: "blur(0px)",
    transition: { duration: 0.7, ease: EASE_OUT_EXPO },
  },
};
