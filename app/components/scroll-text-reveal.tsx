"use client";

import { useRef, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "motion/react";

function useHomeVariant() {
  return useSyncExternalStore(
    (cb) => {
      const observer = new MutationObserver(cb);
      observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-home-variant"] });
      return () => observer.disconnect();
    },
    () => (document.documentElement.getAttribute("data-home-variant") as "a" | "b") || "b",
    () => "b" as const,
  );
}

/* ------------------------------------------------------------------ */
/*  Sparkle dots                                                       */
/* ------------------------------------------------------------------ */

interface Spark {
  id: number;
  x: number;
  y: number;
}

function Sparkles({
  containerRef,
  active,
}: {
  containerRef: React.RefObject<HTMLDivElement | null>;
  active: boolean;
}) {
  const [sparks, setSparks] = useState<Spark[]>([]);
  const idRef = useRef(0);

  const spawn = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;
    const words = el.querySelectorAll<HTMLSpanElement>("[data-revealed=true]");
    const cursor = words[words.length - 1];
    if (!cursor) return;

    const rect = cursor.getBoundingClientRect();
    const containerRect = el.getBoundingClientRect();
    const count = 2 + Math.floor(Math.random() * 2);
    const newSparks: Spark[] = [];
    for (let n = 0; n < count; n++) {
      newSparks.push({
        id: idRef.current++,
        x: rect.right - containerRect.left + (Math.random() - 0.5) * 20,
        y: rect.top - containerRect.top + rect.height / 2 + (Math.random() - 0.5) * 30,
      });
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
        const dotSize = 2 + Math.random() * 3;
        return (
          <motion.span
            key={s.id}
            initial={{ opacity: 1, scale: 1, x: 0, y: 0 }}
            animate={{ opacity: 0, scale: 0.3, x: (Math.random() - 0.5) * 50, y: -15 - Math.random() * 30 }}
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
/*  ScrollTextReveal — word-based for smooth performance               */
/* ------------------------------------------------------------------ */

export interface TextSegment {
  text: string;
  /** "default" = primary color, "accent" = bold + gradient (branded only) */
  style?: "default" | "accent";
  /** Add a line break after this segment */
  break?: boolean;
}

interface ScrollTextRevealProps {
  segments: TextSegment[];
  label?: string;
  className?: string;
  sparkles?: boolean;
}

interface Word {
  text: string;
  style: "default" | "accent";
  index: number;
  breakAfter?: boolean;
}

export function ScrollTextReveal({
  segments,
  label,
  className,
  sparkles = true,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const variant = useHomeVariant();
  const isBranded = variant === "b";

  // Build flat word list from segments
  const words: Word[] = [];
  let wordIdx = 0;
  for (const seg of segments) {
    const style = seg.style ?? "default";
    const segWords = seg.text.split(/\s+/).filter(Boolean);
    for (let i = 0; i < segWords.length; i++) {
      words.push({
        text: segWords[i],
        style,
        index: wordIdx++,
        breakAfter: seg.break && i === segWords.length - 1,
      });
    }
  }
  const totalWords = words.length;

  // Scroll progress mapped to word index
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const revealedCount = useTransform(scrollYProgress, [0.05, 0.85], [0, totalWords]);
  const [revealed, setRevealed] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const prevRevealed = useRef(0);

  useMotionValueEvent(revealedCount, "change", (v) => {
    const rounded = Math.round(v);
    setRevealed(rounded);
    const isMoving = rounded > prevRevealed.current;
    prevRevealed.current = rounded;
    setIsAnimating(isMoving && rounded > 0 && rounded < totalWords);
  });

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex min-h-[100svh] items-center px-8"
      >
        <div className={className} style={{ position: "relative" }}>
          {label && (
            <span className="mb-6 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
          )}
          {sparkles && <Sparkles containerRef={stickyRef} active={isAnimating} />}
          {words.map((w) => {
            const isRevealed = w.index < revealed;
            const isAccent = w.style === "accent";


            return (
              <span key={w.index} className="inline">
                <span
                  data-revealed={isRevealed || undefined}
                  className={`inline-block ${
                    isAccent
                      ? isBranded
                        ? "font-semibold"
                        : "font-semibold text-foreground"
                      : isBranded
                        ? ""
                        : "text-[#555] dark:text-[#999]"
                  }`}
                  style={{
                    opacity: isRevealed ? 1 : 0.15,
                    filter: isRevealed ? "blur(0px)" : "blur(4px)",
                    transition: "opacity 0.6s ease-out, filter 0.6s ease-out",
                    ...(isAccent && isBranded ? {
                      backgroundImage: "linear-gradient(135deg, #8070c0 0%, #5080d0 50%, #70a0f0 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    } : {}),
                  }}
                >
                  {w.text}
                </span>{w.breakAfter ? <span className="block h-[0.5em]" /> : " "}
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
