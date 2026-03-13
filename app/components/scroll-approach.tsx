"use client";

import { useState, useEffect, useCallback, useRef, type ReactNode } from "react";

interface ApproachItem {
  title: string;
  text: string;
  icon?: ReactNode;
  image?: string;
}

interface ScrollApproachProps {
  items: ApproachItem[];
  /** Auto-cycle interval in ms (default 5000) */
  interval?: number;
}

export function ScrollApproach({ items, interval = 5000 }: ScrollApproachProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const barRefs = useRef<(HTMLDivElement | null)[]>([]);
  const pausedRef = useRef(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  const startFill = useCallback((index: number) => {
    barRefs.current.forEach((bar) => {
      if (!bar) return;
      bar.style.transition = "none";
      bar.style.width = "0%";
    });

    const bar = barRefs.current[index];
    if (!bar) return;

    requestAnimationFrame(() => {
      bar.offsetWidth;
      bar.style.transition = `width ${interval}ms linear`;
      bar.style.width = "100%";
    });

    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      if (pausedRef.current) return;
      setActiveIndex((i) => (i + 1) % items.length);
    }, interval);
  }, [interval, items.length]);

  const goTo = useCallback((index: number) => {
    clearTimeout(timeoutRef.current);
    setActiveIndex(index);
  }, []);

  useEffect(() => {
    startFill(activeIndex);
    return () => clearTimeout(timeoutRef.current);
  }, [activeIndex, startFill]);

  const handleMouseEnter = useCallback(() => {
    pausedRef.current = true;
    clearTimeout(timeoutRef.current);
    const bar = barRefs.current[activeIndex];
    if (bar) {
      const currentWidth = bar.getBoundingClientRect().width;
      const parentWidth = bar.parentElement?.getBoundingClientRect().width || 1;
      const pct = (currentWidth / parentWidth) * 100;
      bar.style.transition = "none";
      bar.style.width = `${pct}%`;
    }
  }, [activeIndex]);

  const handleMouseLeave = useCallback(() => {
    pausedRef.current = false;
    const bar = barRefs.current[activeIndex];
    if (bar) {
      const currentWidth = bar.getBoundingClientRect().width;
      const parentWidth = bar.parentElement?.getBoundingClientRect().width || 1;
      const remaining = 1 - currentWidth / parentWidth;
      const remainingMs = remaining * interval;

      bar.offsetWidth;
      bar.style.transition = `width ${remainingMs}ms linear`;
      bar.style.width = "100%";

      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        if (pausedRef.current) return;
        setActiveIndex((i) => (i + 1) % items.length);
      }, remainingMs);
    }
  }, [activeIndex, interval, items.length]);

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {items.map((item, index) => {
        const isActive = activeIndex === index;
        return (
          <div key={index}>
            {/* Divider with progress */}
            <div className="relative h-[1px] bg-black/5 dark:bg-white/10">
              <div
                ref={(el) => { barRefs.current[index] = el; }}
                className="absolute inset-y-0 left-0 bg-foreground/80"
                style={{ width: "0%" }}
              />
            </div>
            <button
              type="button"
              onClick={() => goTo(index)}
              className="w-full py-5 text-left"
            >
              <h3 className="flex items-center justify-between text-lg font-medium tracking-tight">
                {item.title}
                <span className="shrink-0 text-muted-foreground text-xl leading-none">
                  {isActive ? "−" : "+"}
                </span>
              </h3>
              {isActive && (
                <p className="pt-2 text-sm text-muted-foreground leading-relaxed pr-8">
                  {item.text}
                </p>
              )}
            </button>
          </div>
        );
      })}
      <div className="h-[1px] bg-black/5 dark:bg-white/10" />
    </div>
  );
}
