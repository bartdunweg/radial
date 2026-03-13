"use client";

import { useRef, useCallback } from "react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const duplicated = [...items, ...items];
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(undefined);
  const speedRef = useRef(1); // 1 = full speed, 0 = stopped
  const targetSpeedRef = useRef(1);

  const lerp = useCallback(() => {
    const diff = targetSpeedRef.current - speedRef.current;
    if (Math.abs(diff) < 0.001) {
      speedRef.current = targetSpeedRef.current;
    } else {
      // Ease towards target — 0.03 gives a smooth ~1s deceleration
      speedRef.current += diff * 0.03;
    }

    if (trackRef.current) {
      const duration = 40; // base duration in seconds (must match CSS)
      // Map speed to animation duration (slower = longer duration)
      // We use playback rate via the Web Animations API
      const animations = trackRef.current.getAnimations();
      for (const anim of animations) {
        anim.playbackRate = speedRef.current;
      }
    }

    rafRef.current = requestAnimationFrame(lerp);
  }, []);

  const handleMouseEnter = useCallback(() => {
    targetSpeedRef.current = 0;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(lerp);
    }
  }, [lerp]);

  const handleMouseLeave = useCallback(() => {
    targetSpeedRef.current = 1;
    if (!rafRef.current) {
      rafRef.current = requestAnimationFrame(lerp);
    }
    // Stop the RAF loop once we're back to full speed
    const checkDone = () => {
      if (Math.abs(speedRef.current - 1) < 0.01) {
        if (rafRef.current) {
          cancelAnimationFrame(rafRef.current);
          rafRef.current = undefined;
        }
        // Ensure we're exactly at 1
        if (trackRef.current) {
          const animations = trackRef.current.getAnimations();
          for (const anim of animations) {
            anim.playbackRate = 1;
          }
        }
        return;
      }
      requestAnimationFrame(checkDone);
    };
    requestAnimationFrame(checkDone);
  }, [lerp]);

  return (
    <div
      className="relative overflow-hidden"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        ref={trackRef}
        className="flex gap-6 animate-marquee-left"
        style={{ width: "max-content" }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`${item.author}-${i}`}
            className="w-[400px] shrink-0 rounded-2xl border border-black/5 bg-background p-8 flex flex-col justify-between dark:border-white/10"
          >
            <blockquote className="text-lg leading-relaxed text-muted-foreground md:text-xl">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <div className="text-sm font-medium">{item.author}</div>
              <div className="text-xs text-muted-foreground">
                {item.role}, {item.company}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
