"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode, ComponentType } from "react";
import { EASE_OUT_EXPO } from "@/lib/motion";

type FadeUpProps = {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  as?: "div" | "section" | "article" | "li" | "a" | "span";
  once?: boolean;
  y?: number;
};

export function FadeUp({
  children,
  delay = 0,
  duration = 0.6,
  className,
  as = "div",
  once = true,
  y = 24,
}: FadeUpProps) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as ComponentType<Record<string, unknown>>;

  return (
    <MotionTag
      className={className}
      initial={{ opacity: 0, y: reduce ? 0 : y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: "-8% 0px" }}
      transition={{
        duration: reduce ? 0.01 : duration,
        delay: reduce ? 0 : delay,
        ease: EASE_OUT_EXPO,
      }}
    >
      {children}
    </MotionTag>
  );
}

type StaggerContainerProps = {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
  delayChildren?: number;
};

export function StaggerContainer({
  children,
  className,
  staggerDelay = 0.08,
  delayChildren = 0,
}: StaggerContainerProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-8% 0px" }}
      variants={{
        hidden: {},
        show: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

type StaggerItemProps = {
  children: ReactNode;
  className?: string;
  y?: number;
};

export function StaggerItem({
  children,
  className,
  y = 20,
}: StaggerItemProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: reduce ? 0 : y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: 0.5, ease: EASE_OUT_EXPO },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
