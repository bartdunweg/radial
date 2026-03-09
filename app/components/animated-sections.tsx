"use client";

import { type ReactNode } from "react";
import { FadeIn, Stagger, StaggerItem, HeroText, HeroItem } from "./motion";

/* Re-export motion primitives for use in server components via composition */

export function AnimatedSection({
  children,
  className,
  delay,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <FadeIn delay={delay} className={className}>
      {children}
    </FadeIn>
  );
}

export function AnimatedGrid({
  children,
  className,
  staggerDelay,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <Stagger staggerDelay={staggerDelay} className={className}>
      {children}
    </Stagger>
  );
}

export function AnimatedGridItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <StaggerItem className={className}>
      {children}
    </StaggerItem>
  );
}

export function AnimatedHero({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <HeroText className={className}>
      {children}
    </HeroText>
  );
}

export function AnimatedHeroItem({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <HeroItem className={className}>
      {children}
    </HeroItem>
  );
}
