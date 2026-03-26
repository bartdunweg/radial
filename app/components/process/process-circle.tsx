"use client";

import { type MotionValue, motion, useTransform } from "motion/react";

/* ── Dust particles for Research phase ── */
const DUST = [
  { size: 4, x: 30, y: 25, speed: 5, delay: 0, opacity: 0.7 },
  { size: 3, x: 70, y: 40, speed: 7, delay: 1.2, opacity: 0.5 },
  { size: 5, x: 45, y: 60, speed: 4, delay: 0.5, opacity: 0.6 },
  { size: 3, x: 20, y: 75, speed: 8, delay: 2.0, opacity: 0.4 },
  { size: 4, x: 60, y: 30, speed: 6, delay: 3.2, opacity: 0.7 },
  { size: 3, x: 80, y: 65, speed: 5.5, delay: 0.8, opacity: 0.5 },
  { size: 4, x: 35, y: 80, speed: 7.5, delay: 1.8, opacity: 0.6 },
  { size: 3, x: 55, y: 15, speed: 6.5, delay: 2.6, opacity: 0.4 },
  { size: 5, x: 75, y: 50, speed: 5, delay: 0.3, opacity: 0.5 },
  { size: 3, x: 25, y: 45, speed: 9, delay: 1.5, opacity: 0.35 },
  { size: 4, x: 50, y: 70, speed: 6, delay: 3.8, opacity: 0.6 },
  { size: 3, x: 65, y: 85, speed: 7, delay: 2.3, opacity: 0.45 },
];

/* ── Extra particles for the larger desktop screen ── */
const DUST_DESKTOP_EXTRA = [
  { size: 4, x: 10, y: 20, speed: 6, delay: 0.7, opacity: 0.6 },
  { size: 3, x: 90, y: 15, speed: 5.5, delay: 1.0, opacity: 0.5 },
  { size: 5, x: 15, y: 55, speed: 7, delay: 2.5, opacity: 0.55 },
  { size: 3, x: 85, y: 80, speed: 6.5, delay: 0.2, opacity: 0.45 },
  { size: 4, x: 42, y: 10, speed: 5, delay: 3.0, opacity: 0.6 },
  { size: 3, x: 58, y: 90, speed: 8, delay: 1.6, opacity: 0.4 },
  { size: 5, x: 92, y: 45, speed: 4.5, delay: 2.8, opacity: 0.65 },
  { size: 4, x: 8, y: 88, speed: 7.5, delay: 0.4, opacity: 0.5 },
  { size: 3, x: 78, y: 10, speed: 6, delay: 3.5, opacity: 0.45 },
  { size: 4, x: 38, y: 42, speed: 5.5, delay: 1.3, opacity: 0.55 },
];

/* ── Shared animation content rendered inside each device screen ── */
function ScreenContent({
  prefix,
  researchOpacity,
  strategyOpacity,
  designOpacity,
  realizationOpacity,
  drawProgress,
  uiHeader,
  uiCards,
  uiNav,
  viewBox,
  screenArea,
  extraDust,
}: {
  prefix: string;
  researchOpacity: MotionValue<number>;
  strategyOpacity: MotionValue<number>;
  designOpacity: MotionValue<number>;
  realizationOpacity: MotionValue<number>;
  drawProgress: MotionValue<number>;
  uiHeader: MotionValue<number>;
  uiCards: MotionValue<number>;
  uiNav: MotionValue<number>;
  viewBox: string;
  screenArea: { x: number; y: number; w: number; h: number };
  extraDust?: typeof DUST;
}) {
  const { x: sx, y: sy, w: sw, h: sh } = screenArea;
  const allDust = extraDust ? [...DUST, ...extraDust] : DUST;

  return (
    <>
      {/* Phase 1: Research — floating particles */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ opacity: researchOpacity }}>
        {allDust.map((d, i) => (
          <div
            key={`${prefix}-dust-${i}`}
            className="absolute animate-particle-float"
            style={{
              width: d.size,
              height: d.size,
              opacity: d.opacity,
              backgroundColor: "#005BE4",
              borderRadius: "50%",
              left: `${(sx / 140) * 100 + (d.x / 100) * (sw / 140) * 100}%`,
              top: `${(sy / 200) * 100 + (d.y / 100) * (sh / 200) * 100}%`,
              animationDuration: `${d.speed}s`,
              animationDelay: `${d.delay}s`,
              filter: "blur(0.5px)",
            }}
          />
        ))}
      </motion.div>

      {/* Phase 2: Strategy — blueprint grid */}
      <motion.div className="absolute inset-0" style={{ opacity: strategyOpacity }}>
        <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
          {Array.from({ length: 8 }, (_, i) => {
            const y = sy + (i / 7) * sh;
            return (
              <motion.line
                key={`${prefix}-h-${i}`}
                x1={sx} y1={y} x2={sx + sw} y2={y}
                stroke="rgba(0,91,228,0.5)" strokeWidth="0.75" strokeDasharray="200"
                style={{ strokeDashoffset: useTransform(drawProgress, [i * 0.08, i * 0.08 + 0.35], [200, 0]) }}
              />
            );
          })}
          {Array.from({ length: 5 }, (_, i) => {
            const x = sx + (i / 4) * sw;
            return (
              <motion.line
                key={`${prefix}-v-${i}`}
                x1={x} y1={sy} x2={x} y2={sy + sh}
                stroke="rgba(0,91,228,0.4)" strokeWidth="0.5" strokeDasharray="200"
                style={{ strokeDashoffset: useTransform(drawProgress, [0.1 + i * 0.1, 0.35 + i * 0.1], [200, 0]) }}
              />
            );
          })}
          {[
            [0.15, 0.0], [0.5, 0.14], [0.85, 0.29], [0.3, 0.43],
            [0.7, 0.57], [0.15, 0.71], [0.5, 0.86], [0.85, 1.0],
          ].map(([fx, fy], i) => (
            <motion.circle
              key={`${prefix}-dot-${i}`}
              cx={sx + fx * sw} cy={sy + fy * sh} r="1.5"
              fill="rgba(0,91,228,0.6)"
              style={{ opacity: useTransform(drawProgress, [0.3 + i * 0.05, 0.5 + i * 0.05], [0, 1]) }}
            />
          ))}
        </svg>
      </motion.div>

      {/* Phase 3+4: Design — abstract UI */}
      <motion.div className="absolute inset-0" style={{ opacity: designOpacity }}>
        <svg viewBox={viewBox} className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
          {/* Status bar */}
          <motion.g style={{ opacity: uiHeader }}>
            <rect x={sx + 4} y={sy + 4} width={sw * 0.28} height="3" rx="1.5" fill="rgba(0,91,228,0.6)" />
            <rect x={sx + sw - sw * 0.18} y={sy + 4} width={sw * 0.14} height="3" rx="1.5" fill="rgba(0,91,228,0.3)" />
          </motion.g>

          {/* Hero area */}
          <motion.g style={{ opacity: uiHeader }}>
            <rect x={sx + 4} y={sy + 14} width={sw - 8} height={sh * 0.18} rx="4" stroke="#005BE4" strokeWidth="0.75" fill="rgba(0,91,228,0.06)" />
            <rect x={sx + 8} y={sy + 20} width={sw * 0.4} height="3" rx="1.5" fill="rgba(0,91,228,0.5)" />
            <rect x={sx + 8} y={sy + 27} width={sw * 0.6} height="2" rx="1" fill="rgba(0,91,228,0.25)" />
            <rect x={sx + 8} y={sy + 32} width={sw * 0.5} height="2" rx="1" fill="rgba(0,91,228,0.2)" />
          </motion.g>

          {/* Nav dots */}
          <motion.g style={{ opacity: uiNav }}>
            <circle cx={sx + sw * 0.38} cy={sy + sh * 0.36} r="1.5" fill="rgba(0,91,228,0.6)" />
            <circle cx={sx + sw * 0.5} cy={sy + sh * 0.36} r="1.5" fill="rgba(0,91,228,0.25)" />
            <circle cx={sx + sw * 0.62} cy={sy + sh * 0.36} r="1.5" fill="rgba(0,91,228,0.25)" />
          </motion.g>

          {/* Two cards */}
          <motion.g style={{ opacity: uiCards }}>
            <rect x={sx + 4} y={sy + sh * 0.4} width={sw * 0.44} height={sh * 0.3} rx="3" stroke="#005BE4" strokeWidth="0.6" fill="rgba(0,91,228,0.04)" />
            <rect x={sx + 7} y={sy + sh * 0.42} width={sw * 0.36} height={sh * 0.12} rx="2" fill="rgba(0,91,228,0.1)" />
            <rect x={sx + 7} y={sy + sh * 0.57} width={sw * 0.28} height="2" rx="1" fill="rgba(0,91,228,0.3)" />
            <rect x={sx + 7} y={sy + sh * 0.61} width={sw * 0.22} height="2" rx="1" fill="rgba(0,91,228,0.2)" />

            <rect x={sx + sw * 0.52} y={sy + sh * 0.4} width={sw * 0.44} height={sh * 0.3} rx="3" stroke="#005BE4" strokeWidth="0.6" fill="rgba(0,91,228,0.04)" />
            <rect x={sx + sw * 0.55} y={sy + sh * 0.42} width={sw * 0.36} height={sh * 0.12} rx="2" fill="rgba(0,91,228,0.1)" />
            <rect x={sx + sw * 0.55} y={sy + sh * 0.57} width={sw * 0.28} height="2" rx="1" fill="rgba(0,91,228,0.3)" />
            <rect x={sx + sw * 0.55} y={sy + sh * 0.61} width={sw * 0.22} height="2" rx="1" fill="rgba(0,91,228,0.2)" />
          </motion.g>

          {/* CTA button */}
          <motion.g style={{ opacity: uiCards }}>
            <rect x={sx + 4} y={sy + sh * 0.75} width={sw - 8} height={sh * 0.08} rx="6" stroke="#005BE4" strokeWidth="0.75" fill="rgba(0,91,228,0.08)" />
            <rect x={sx + sw * 0.3} y={sy + sh * 0.775} width={sw * 0.4} height="3" rx="1.5" fill="rgba(0,91,228,0.4)" />
          </motion.g>

          {/* Bottom nav */}
          <motion.g style={{ opacity: uiNav }}>
            <line x1={sx} y1={sy + sh * 0.87} x2={sx + sw} y2={sy + sh * 0.87} stroke="rgba(0,91,228,0.15)" strokeWidth="0.5" />
            {[0.15, 0.38, 0.62, 0.85].map((f, i) => (
              <rect key={`${prefix}-bnav-${i}`} x={sx + f * sw - 4} y={sy + sh * 0.9} width="8" height="2" rx="1" fill="rgba(0,91,228,0.3)" />
            ))}
          </motion.g>

          {/* Realization — subtle shimmer on UI elements */}
          <motion.g style={{ opacity: realizationOpacity }}>
            {/* Hero pulse */}
            <rect x={sx + 4} y={sy + 14} width={sw - 8} height={sh * 0.18} rx="4" fill="rgba(0,91,228,0.06)" className="animate-ui-shimmer" />
            {/* Card 1 pulse */}
            <rect x={sx + 4} y={sy + sh * 0.4} width={sw * 0.44} height={sh * 0.3} rx="3" fill="rgba(0,91,228,0.04)" className="animate-ui-shimmer" style={{ animationDelay: "0.5s" }} />
            {/* Card 2 pulse */}
            <rect x={sx + sw * 0.52} y={sy + sh * 0.4} width={sw * 0.44} height={sh * 0.3} rx="3" fill="rgba(0,91,228,0.04)" className="animate-ui-shimmer" style={{ animationDelay: "1s" }} />
            {/* CTA pulse */}
            <rect x={sx + 4} y={sy + sh * 0.75} width={sw - 8} height={sh * 0.08} rx="6" fill="rgba(0,91,228,0.06)" className="animate-ui-shimmer" style={{ animationDelay: "1.5s" }} />
          </motion.g>
        </svg>
      </motion.div>
    </>
  );
}

export function ProcessCircle({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Phase opacities ── */
  const researchOpacity = useTransform(progress, [0, 0.18, 0.25, 0.32], [1, 1, 0.5, 0]);
  const strategyOpacity = useTransform(progress, [0.2, 0.28, 0.45, 0.53], [0, 1, 1, 0]);
  const designOpacity = useTransform(progress, [0.45, 0.55], [0, 1]);
  const realizationOpacity = useTransform(progress, [0.72, 0.8, 1], [0, 1, 1]);

  const deviceOpacity = useTransform(progress, [0, 0.05], [0.8, 1]);
  const drawProgress = useTransform(progress, [0.22, 0.45], [0, 1]);

  const uiHeader = useTransform(progress, [0.48, 0.54], [0, 1]);
  const uiCards = useTransform(progress, [0.52, 0.58], [0, 1]);
  const uiNav = useTransform(progress, [0.50, 0.56], [0, 1]);

  const pulseIntensity = useTransform(progress, [0.75, 0.85], [0, 1]);

  /* Screen areas within SVG viewboxes */
  const desktopScreen = { x: 8, y: 8, w: 184, h: 114 };
  const phoneScreen = { x: 26, y: 28, w: 88, h: 148 };

  const sharedProps = {
    researchOpacity,
    strategyOpacity,
    designOpacity,
    realizationOpacity,
    drawProgress,
    uiHeader,
    uiCards,
    uiNav,
  };

  return (
    <div className="relative w-[320px] h-[300px] md:w-[420px] md:h-[380px]">
      {/* ═══ Phase 4: Realization — pulse rings (behind devices) ═══ */}
      <motion.div className="absolute inset-[-30%]" style={{ opacity: realizationOpacity }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`pulse-${i}`}
            className="absolute inset-0 rounded-[16%/20%] animate-device-pulse"
            style={{
              animationDelay: `${i * 1}s`,
              animationDuration: "4s",
              border: "1px solid rgba(0,91,228,0.2)",
            }}
          />
        ))}
      </motion.div>

      {/* ═══ Phase 4: Realization — subtle glow (behind devices) ═══ */}
      <motion.div
        className="absolute inset-[-10%] rounded-full pointer-events-none"
        style={{
          opacity: pulseIntensity,
          background: "radial-gradient(circle, rgba(0,91,228,0.08) 0%, rgba(0,91,228,0.03) 40%, transparent 70%)",
        }}
      />

      {/* ═══ Desktop Monitor ═══ */}
      <div className="absolute left-0 top-0 w-[68%] h-[80%] z-[1]">
        {/* Desktop background */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            <rect x="4" y="2" width="192" height="126" rx="8" fill="var(--color-background)" />
          </svg>
        </div>
        {/* Desktop frame */}
        <motion.div className="absolute inset-0" style={{ opacity: deviceOpacity }}>
          <svg viewBox="0 0 200 150" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
            {/* Monitor body */}
            <rect x="4" y="2" width="192" height="126" rx="8" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />
            {/* Screen */}
            <rect x="8" y="8" width="184" height="114" rx="2" stroke="currentColor" strokeWidth="0.75" className="text-foreground/12" />
            {/* Camera */}
            <circle cx="100" cy="5" r="1.5" fill="currentColor" className="text-foreground/10" />
            {/* Stand */}
            <line x1="80" y1="128" x2="80" y2="142" stroke="currentColor" strokeWidth="1.5" className="text-foreground/15" />
            <line x1="120" y1="128" x2="120" y2="142" stroke="currentColor" strokeWidth="1.5" className="text-foreground/15" />
            <rect x="62" y="142" width="76" height="4" rx="2" fill="currentColor" className="text-foreground/10" />
          </svg>
        </motion.div>

        <ScreenContent prefix="desktop" viewBox="0 0 200 150" screenArea={desktopScreen} extraDust={DUST_DESKTOP_EXTRA} {...sharedProps} />
      </div>

      {/* ═══ Mobile Phone ═══ */}
      <div className="absolute right-[10%] bottom-0 w-[32%] h-[75%] z-10">
        {/* Phone background — covers desktop behind it */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 140 200" className="absolute inset-0 w-full h-full" preserveAspectRatio="xMidYMid meet">
            <rect x="20" y="8" width="100" height="184" rx="16" fill="var(--color-background)" />
          </svg>
        </div>
        {/* Phone frame */}
        <motion.div className="absolute inset-0" style={{ opacity: deviceOpacity }}>
          <svg viewBox="0 0 140 200" className="absolute inset-0 w-full h-full" fill="none" preserveAspectRatio="xMidYMid meet">
            <rect x="20" y="8" width="100" height="184" rx="16" stroke="currentColor" strokeWidth="1.5" className="text-foreground/20" />
            <rect x="26" y="28" width="88" height="148" rx="4" stroke="currentColor" strokeWidth="0.75" className="text-foreground/12" />
            <rect x="54" y="14" width="32" height="6" rx="3" fill="currentColor" className="text-foreground/10" />
            <rect x="50" y="186" width="40" height="3" rx="1.5" fill="currentColor" className="text-foreground/10" />
          </svg>
        </motion.div>

        <ScreenContent prefix="phone" viewBox="0 0 140 200" screenArea={phoneScreen} {...sharedProps} />
      </div>

    </div>
  );
}
