"use client";

import { useRef, useState, useCallback, useEffect, useSyncExternalStore } from "react";
import { motion, useScroll, useMotionValueEvent } from "motion/react";

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

  // Scroll progress — detect how far into the section we are
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Max ring size = viewport height so rings never reach the logo divider
  const [maxRingSize, setMaxRingSize] = useState(700);
  useEffect(() => {
    setMaxRingSize(Math.min(window.innerHeight, window.innerWidth) * 0.8);
  }, []);

  // Trigger text reveal when scrolled ~halfway into section
  const [hasTriggered, setHasTriggered] = useState(false);
  const [maskSize, setMaskSize] = useState(0);
  const [revealed, setRevealed] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [zoomDone, setZoomDone] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    if (v > 0.01 && !hasTriggered) setHasTriggered(true);
    if (v <= 0.01 && hasTriggered) {
      setHasTriggered(false);
      setMaskSize(0);
      setRevealed(0);
      setIsAnimating(false);
      setZoomDone(false);
    }
  });

  // Once triggered, fade in text + reveal segments
  useEffect(() => {
    if (!hasTriggered) return;
    setMaskSize(160);
    setZoomDone(true);
    let count = 0;
    const interval = setInterval(() => {
      count++;
      setRevealed(count);
      setIsAnimating(count < totalSegments);
      if (count >= totalSegments) {
        clearInterval(interval);
        setIsAnimating(false);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [hasTriggered, totalSegments]);



  // Render a segment (sentence) as a single unit
  const renderSegment = (seg: TextSegment, index: number, isRevealed: boolean) => {
    const isAccent = seg.style === "accent";
    return (
      <span key={index} className="inline">
        <span
          data-revealed={isRevealed || undefined}
          data-word=""
          className="inline text-muted-foreground"
          style={{
            opacity: maskSize > 0 ? 1 : 0,
            filter: maskSize > 20 ? "blur(0px)" : "blur(6px)",
            transition: "opacity 0.8s ease-out, filter 1.2s ease-out",
          }}
        >
          {seg.text}
        </span>{seg.break ? <span className="block h-[0.5em]" /> : ""}
      </span>
    );
  };

  let segCounter = 0;

  return (
    <div ref={containerRef} className="relative h-[150vh]">

      <div
        ref={stickyRef}
        className="sticky top-0 flex min-h-[100svh] items-center justify-center px-8 relative"
      >
        {/* Concentric circles */}
        <div
          ref={circlesRef}
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{
            opacity: maskSize > 10 ? 0 : 1,
            transition: "opacity 0.8s ease-out",
          }}
          aria-hidden
        >
          {[1, 2, 3].map((i) => (
            <motion.div
              key={i}
              className="absolute rounded-full border border-border"
              style={{
                width: `${maxRingSize}px`,
                height: `${maxRingSize}px`,
              }}
              animate={{
                scale: [0, 0.05, 0.8, 1],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 6,
                ease: "linear",
                repeat: Infinity,
                delay: i * 2,
                times: [0, 0.02, 0.8, 1],
              }}
            />
          ))}
        </div>

        <div className={className} style={{ position: "relative", fontFamily: "var(--font-satoshi), sans-serif", fontWeight: 500 }}>
          {label && (
            <span className="mb-6 block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              {label}
            </span>
          )}
          {sparkles && <Sparkles containerRef={stickyRef} active={isAnimating} />}

          {/* Before-core segments */}
          <div className="text-center" style={{ textWrap: "balance" }}>
            {segments.map((seg, i) => {
              const isRevealed = segCounter < revealed;
              segCounter++;
              return renderSegment(seg, i, isRevealed);
            })}
          </div>

          {/* Core text — own centered line, font-size driven by scroll */}
          <div className="text-center" style={{ padding: "32px 0" }}>
            <span
              ref={coreLineRef}
              className="whitespace-nowrap text-[48px] md:text-[64px]"
              style={{
                fontFamily: "var(--font-satoshi), sans-serif",
                fontWeight: 500,
                backgroundImage: "linear-gradient(135deg, #6b4aa8 0%, #3b5db0 40%, #2a6fc0 70%, #4a7bcf 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              {coreText}
            </span>
          </div>

          {/* After-core segments */}
          <div className="text-center" style={{ textWrap: "balance" }}>
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
