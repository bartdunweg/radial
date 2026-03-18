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
/*  ScrollTextReveal — zoom-out from core text                         */
/* ------------------------------------------------------------------ */

export interface TextSegment {
  text: string;
  style?: "default" | "accent";
  break?: boolean;
}

interface ScrollTextRevealProps {
  segments: TextSegment[];
  segmentsAfter?: TextSegment[];
  coreText?: string;
  label?: string;
  className?: string;
  sparkles?: boolean;
}

export function ScrollTextReveal({
  segments,
  segmentsAfter = [],
  coreText,
  label,
  className,
  sparkles = true,
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const coreLineRef = useRef<HTMLSpanElement>(null);
  const circlesRef = useRef<HTMLDivElement>(null);
  const variant = useHomeVariant();
  const isBranded = variant === "b";

  const totalSegments = segments.length + segmentsAfter.length;

  // Scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Core font-size zoom: 64px → base size
  const coreZoom = useTransform(scrollYProgress, [0, 0.35], [1.6, 1]);
  // Segment reveal (before + after combined)
  const revealCount = useTransform(scrollYProgress, [0.35, 0.9], [0, totalSegments]);
  // Circles — start huge (all rings beyond viewport), shrink with core text zoom
  // Smallest ring = 240px, needs scale ~8 to be off a 1920px screen
  const circleOpacity = useTransform(scrollYProgress, [0, 0.25, 0.4], [0.08, 0.08, 0]);
  const circleScale = useTransform(scrollYProgress, [0, 0.35], [8, 0.6]);
  const [revealed, setRevealed] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomDone, setZoomDone] = useState(false);
  const prevRevealed = useRef(0);

  useMotionValueEvent(revealCount, "change", (v) => {
    const rounded = Math.round(v);
    if (rounded !== prevRevealed.current) {
      setRevealed(rounded);
      setIsAnimating(rounded > prevRevealed.current && rounded > 0 && rounded < totalSegments);
      prevRevealed.current = rounded;
    }
  });

  // Track when zoom phase is complete
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const done = v >= 0.34;
    setZoomDone((prev) => prev !== done ? done : prev);
  });

  // Get base font size from the core text itself (now inline, inherits correct size)
  const baseFontSize = useRef(0);
  useEffect(() => {
    const el = coreLineRef.current;
    if (!el) return;
    baseFontSize.current = parseFloat(getComputedStyle(el).fontSize);
    // Set initial zoomed size
    el.style.fontSize = `${baseFontSize.current * 1.6}px`;
  }, []);

  // Drive core font-size on scroll
  useMotionValueEvent(coreZoom, "change", (v) => {
    const el = coreLineRef.current;
    if (el && baseFontSize.current > 0) {
      el.style.fontSize = `${baseFontSize.current * v}px`;
    }
  });

  // Drive circles on DOM
  useMotionValueEvent(circleOpacity, "change", (v) => {
    const el = circlesRef.current;
    if (el) el.style.opacity = String(v);
  });
  // Drive circle sizes directly (no transform scale) so border stays exactly 1px
  useMotionValueEvent(circleScale, "change", (v) => {
    const el = circlesRef.current;
    if (!el) return;
    const rings = el.querySelectorAll<HTMLDivElement>("[data-ring]");
    rings.forEach((ring, idx) => {
      const baseSize = (idx + 1) * 240;
      const size = baseSize * v;
      ring.style.width = `${size}px`;
      ring.style.height = `${size}px`;
    });
  });

  // Render a segment (sentence) as a single unit
  const renderSegment = (seg: TextSegment, index: number, isRevealed: boolean) => {
    const isAccent = seg.style === "accent";
    return (
      <span key={index} className="inline">
        <span
          data-revealed={isRevealed || undefined}
          data-word=""
          className={`inline ${
            isAccent
              ? isBranded ? "font-semibold" : "font-semibold text-foreground"
              : isBranded ? "" : "text-[#555] dark:text-[#999]"
          }`}
          style={{
            opacity: !zoomDone ? 0 : isRevealed ? 1 : 0.15,
            filter: !zoomDone ? "blur(6px)" : isRevealed ? "blur(0px)" : "blur(4px)",
            transition: "opacity 0.5s ease-out, filter 0.5s ease-out",
          }}
        >
          {seg.text}
        </span>{seg.break ? <span className="block h-[0.5em]" /> : ""}
      </span>
    );
  };

  let segCounter = 0;

  return (
    <div ref={containerRef} className="relative h-[300vh]">
      <div
        ref={stickyRef}
        className="sticky top-0 flex min-h-[100svh] items-center justify-center px-8 relative overflow-hidden"
      >
        {/* Concentric circles */}
        <div
          ref={circlesRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
          style={{ opacity: 0 }}
          aria-hidden
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              data-ring=""
              className="absolute rounded-full border border-current"
            />
          ))}
        </div>

        <div className={className} style={{ position: "relative" }}>
          {label && (
            <span className="mb-6 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
          )}
          {sparkles && <Sparkles containerRef={stickyRef} active={isAnimating} />}

          {/* Before-core segments */}
          <div className="text-center">
            {segments.map((seg, i) => {
              const isRevealed = segCounter < revealed;
              segCounter++;
              return renderSegment(seg, i, isRevealed);
            })}
          </div>

          {/* Core text — own centered line, font-size driven by scroll */}
          <div className="text-center my-2">
            <span
              ref={coreLineRef}
              className="font-semibold whitespace-nowrap"
              style={{
                ...(isBranded ? {
                  backgroundImage: "linear-gradient(135deg, #9b7ad8 0%, #6b8de0 40%, #5a9ff0 70%, #88bbff 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                } : {}),
              }}
            >
              {coreText}
            </span>
          </div>

          {/* After-core segments */}
          <div className="text-center">
            {segmentsAfter.map((seg, i) => {
              const isRevealed = segCounter < revealed;
              segCounter++;
              return renderSegment(seg, segments.length + i, isRevealed);
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
