"use client";

import { type ReactNode } from "react";
import { motion, useInView, type Variants } from "motion/react";
import { useRef } from "react";

/* ------------------------------------------------------------------ */
/*  Shared easing                                                     */
/* ------------------------------------------------------------------ */

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  FadeIn — fade + slide on scroll                                   */
/* ------------------------------------------------------------------ */

interface FadeInProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  once?: boolean;
  className?: string;
}

export function FadeIn({
  children,
  delay = 0,
  y = 24,
  x = 0,
  duration = 0.6,
  once = true,
  className,
}: FadeInProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y, x }}
      animate={inView ? { opacity: 1, y: 0, x: 0 } : { opacity: 0, y, x }}
      transition={{ duration, delay, ease: [...ease] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Stagger — container + items for staggered reveals                 */
/* ------------------------------------------------------------------ */

const staggerContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const staggerItem: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [...ease] },
  },
};

interface StaggerProps {
  children: ReactNode;
  once?: boolean;
  staggerDelay?: number;
  className?: string;
}

export function Stagger({
  children,
  once = true,
  staggerDelay,
  className,
}: StaggerProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  const variants = staggerDelay
    ? {
        ...staggerContainer,
        visible: {
          transition: { staggerChildren: staggerDelay, delayChildren: 0.1 },
        },
      }
    : staggerContainer;

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StaggerItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={staggerItem} className={className}>
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  HeroText — staggered hero entrance (no scroll trigger)            */
/* ------------------------------------------------------------------ */

const heroContainer: Variants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.3,
    },
  },
};

const heroItem: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [...ease] },
  },
};

export function HeroText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      variants={heroContainer}
      initial="hidden"
      animate="visible"
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div variants={heroItem} className={className}>
      {children}
    </motion.div>
  );
}
