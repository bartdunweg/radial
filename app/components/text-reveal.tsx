"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "motion/react";

const ease = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------ */
/*  Sparkle particle                                                   */
/* ------------------------------------------------------------------ */

interface Spark {
  id: number;
  x: number;
  y: number;
}

/* Tiny dot particles — no icon shapes, just round glowing dots */

function Sparkles({ containerRef, active }: { containerRef: React.RefObject<HTMLSpanElement | null>; active: boolean }) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const idRef = useRef(0);

  const spawn = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    // Find the rightmost visible character as the "cursor" position
    const chars = el.querySelectorAll<HTMLSpanElement>("[data-char]");
    let cursor: HTMLSpanElement | null = null;
    for (let i = chars.length - 1; i >= 0; i--) {
      if (parseFloat(getComputedStyle(chars[i]).opacity) > 0.3) {
        cursor = chars[i];
        break;
      }
    }
    if (!cursor) return;

    const rect = cursor.getBoundingClientRect();
    const containerRect = el.getBoundingClientRect();

    // Spawn 2-3 particles per tick, spread around the cursor
    const count = 2 + Math.floor(Math.random() * 2);
    const newSparks: Spark[] = [];
    for (let n = 0; n < count; n++) {
      const x = rect.left - containerRect.left + rect.width / 2 + (Math.random() - 0.5) * 40;
      const y = rect.top - containerRect.top + rect.height / 2 + (Math.random() - 0.5) * 30;
      newSparks.push({ id: idRef.current++, x, y });
    }
    setSparks((prev) => [...prev, ...newSparks]);
    const ids = newSparks.map((s) => s.id);
    setTimeout(() => setSparks((prev) => prev.filter((s) => !ids.includes(s.id))), 900);
  }, [containerRef]);

  useEffect(() => {
    if (!active) return;
    const interval = setInterval(spawn, 35);
    return () => clearInterval(interval);
  }, [active, spawn]);

  return (
    <>
      {sparks.map((s) => {
        const dotSize = 2 + Math.random() * 3; // 2-5px
        const dx = (Math.random() - 0.5) * 50;
        const dy = -15 - Math.random() * 30;
        return (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{
              opacity: 0,
              scale: 0.3,
              x: dx,
              y: dy,
            }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="pointer-events-none absolute rounded-full"
            style={{
              left: s.x,
              top: s.y,
              width: dotSize,
              height: dotSize,
              backgroundColor: "#ffffff",
              boxShadow: "0 0 6px 2px rgba(255,255,255,0.9), 0 0 14px 4px rgba(255,255,255,0.4)",
            }}
          />
        );
      })}
    </>
  );
}

/* ------------------------------------------------------------------ */
/*  TextReveal                                                         */
/* ------------------------------------------------------------------ */

interface TextRevealProps {
  text: string;
  className?: string;
  /** Seconds between each character (default 0.015) */
  stagger?: number;
  /** Delay before the animation starts (default 0) */
  delay?: number;
  /** Show sparkle particles (default true) */
  sparkles?: boolean;
}

export function TextReveal({
  text,
  className,
  stagger = 0.015,
  delay = 0,
  sparkles = true,
}: TextRevealProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15%" });
  const [animating, setAnimating] = useState(false);

  // Track animation start/end for sparkles
  const totalChars = text.replace(/\n/g, "").length;
  const animDuration = delay + totalChars * stagger + 0.4; // stagger + last char duration

  useEffect(() => {
    if (!inView) return;
    setAnimating(true);
    const timer = setTimeout(() => setAnimating(false), animDuration * 1000);
    return () => clearTimeout(timer);
  }, [inView, animDuration]);

  // Split into paragraphs, then words, then characters
  const paragraphs = text.split("\n\n");
  let charIndex = 0;

  return (
    <span ref={ref} className={className} style={{ position: "relative" }}>
      {sparkles && <Sparkles containerRef={ref} active={animating} />}
      {paragraphs.map((paragraph, pIdx) => (
        <span key={pIdx}>
          {pIdx > 0 && (
            <>
              <br />
              <br />
            </>
          )}
          {paragraph.split(/(\s+)/).map((segment, sIdx) => {
            // Whitespace segments — render as-is but don't animate
            if (/^\s+$/.test(segment)) {
              return <span key={`${pIdx}-s-${sIdx}`}>{" "}</span>;
            }
            // Word — split into chars, wrap in inline-block to prevent mid-word breaks
            const chars = segment.split("");
            const wordChars = chars.map((char) => {
              const i = charIndex++;
              return (
                <motion.span
                  key={`${pIdx}-${i}`}
                  data-char
                  initial={{ opacity: 0, filter: "blur(16px)", y: 6 }}
                  animate={
                    inView
                      ? { opacity: 1, filter: "blur(0px)", y: 0 }
                      : { opacity: 0, filter: "blur(16px)", y: 6 }
                  }
                  transition={{
                    duration: 0.6,
                    delay: delay + i * stagger,
                    ease: [...ease],
                  }}
                  className="inline-block"
                >
                  {char}
                </motion.span>
              );
            });
            return (
              <span key={`${pIdx}-w-${sIdx}`} className="inline-block">
                {wordChars}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
}
