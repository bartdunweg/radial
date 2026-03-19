"use client";

import { type MotionValue, motion, useTransform } from "motion/react";

/* ── Dust particles for Research phase — tiny dots floating around ── */
const DUST = [
  { size: 4, orbit: 52, speed: 16, delay: 0, opacity: 0.7 },
  { size: 3, orbit: 68, speed: 22, delay: 1.2, opacity: 0.5 },
  { size: 5, orbit: 44, speed: 14, delay: 0.5, opacity: 0.6 },
  { size: 3, orbit: 78, speed: 26, delay: 2.0, opacity: 0.4 },
  { size: 4, orbit: 58, speed: 18, delay: 3.2, opacity: 0.7 },
  { size: 3, orbit: 84, speed: 20, delay: 0.8, opacity: 0.5 },
  { size: 4, orbit: 48, speed: 24, delay: 1.8, opacity: 0.6 },
  { size: 3, orbit: 72, speed: 15, delay: 2.6, opacity: 0.4 },
  { size: 5, orbit: 62, speed: 19, delay: 0.3, opacity: 0.5 },
  { size: 3, orbit: 90, speed: 28, delay: 1.5, opacity: 0.35 },
  { size: 4, orbit: 55, speed: 21, delay: 3.8, opacity: 0.6 },
  { size: 3, orbit: 80, speed: 17, delay: 2.3, opacity: 0.45 },
];

/* ── Blueprint grid lines for Strategy phase ── */
const GRID_RINGS = [0.2, 0.35, 0.55, 0.8];
const GRID_LINES = [0, 45, 90, 135];

export function ProcessCircle({
  progress,
}: {
  progress: MotionValue<number>;
}) {
  /* ── Phase opacities with overlap zones ── */
  const researchOpacity = useTransform(progress, [0, 0.18, 0.25, 0.32], [1, 1, 0.5, 0]);
  const strategyOpacity = useTransform(progress, [0.2, 0.28, 0.45, 0.53], [0, 1, 1, 0]);
  // Design + Realization share the sphere — it appears at design and stays
  const sphereOpacity = useTransform(progress, [0.45, 0.55], [0, 1]);
  const realizationOpacity = useTransform(progress, [0.72, 0.8, 1], [0, 1, 1]);

  /* ── Base circle: outline that fades out when sphere appears ── */
  const baseBorderOpacity = useTransform(progress, [0, 0.45, 0.55], [1, 1, 0]);

  /* ── Strategy: SVG draw progress ── */
  const drawProgress = useTransform(progress, [0.22, 0.45], [0, 1]);

  /* ── Sphere layers staggered fade in ── */
  const sphereBodyOpacity = useTransform(progress, [0.48, 0.58], [0, 1]);
  const sphereSpecOpacity = useTransform(progress, [0.53, 0.63], [0, 1]);
  const sphereRimOpacity = useTransform(progress, [0.50, 0.60], [0, 1]);

  /* ── Realization: pulse intensity ── */
  const glowIntensity = useTransform(progress, [0.75, 0.9], [0, 1]);

  return (
    <div className="relative w-[120px] h-[120px] md:w-[140px] md:h-[140px]">
      {/* Base circle outline — dotted in research, solid in strategy, fades when sphere appears */}
      <motion.div
        className="absolute inset-0 rounded-full border-foreground/20"
        style={{
          borderWidth: 1,
          borderStyle: "dotted",
          opacity: baseBorderOpacity,
        }}
      />

      {/* ═══ Phase 1: Research — Dust particles ═══ */}
      <motion.div className="absolute inset-0" style={{ opacity: researchOpacity }}>
        {DUST.map((d, i) => (
          <div
            key={i}
            className="absolute inset-0 animate-orbit-spin"
            style={{
              animationDuration: `${d.speed}s`,
              animationDelay: `${d.delay}s`,
              animationDirection: i % 2 === 0 ? "normal" : "reverse",
            }}
          >
            <div
              className="absolute rounded-full"
              style={{
                width: d.size,
                height: d.size,
                opacity: d.opacity,
                backgroundColor: "#005BE4",
                left: `calc(50% + ${d.orbit}px)`,
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            />
          </div>
        ))}
      </motion.div>

      {/* ═══ Phase 2: Strategy — Blueprint Grid ═══ */}
      <motion.div className="absolute inset-0" style={{ opacity: strategyOpacity }}>
        <svg
          viewBox="0 0 140 140"
          className="absolute inset-0 w-full h-full"
          fill="none"
        >
          {GRID_RINGS.map((r, i) => (
            <motion.circle
              key={`ring-${i}`}
              cx="70"
              cy="70"
              r={r * 65}
              stroke="#005BE4"
              strokeWidth="1"
              strokeDasharray="600"
              style={{
                strokeDashoffset: useTransform(
                  drawProgress,
                  [i * 0.15, i * 0.15 + 0.4],
                  [600, 0]
                ),
              }}
            />
          ))}
          {GRID_LINES.map((angle, i) => {
            const rad = (angle * Math.PI) / 180;
            const len = 65;
            const x1 = 70 + Math.cos(rad) * len;
            const y1 = 70 + Math.sin(rad) * len;
            const x2 = 70 - Math.cos(rad) * len;
            const y2 = 70 - Math.sin(rad) * len;
            return (
              <motion.line
                key={`line-${i}`}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="rgba(0,91,228,0.7)"
                strokeWidth="0.75"
                strokeDasharray="200"
                style={{
                  strokeDashoffset: useTransform(
                    drawProgress,
                    [0.1 + i * 0.1, 0.3 + i * 0.1],
                    [200, 0]
                  ),
                }}
              />
            );
          })}
        </svg>
      </motion.div>

      {/* ═══ Phase 3+4: Skeuomorphic Sphere (persists from Design into Realization) ═══ */}
      <motion.div className="absolute inset-0" style={{ opacity: sphereOpacity }}>
        {/* Sphere body */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            opacity: sphereBodyOpacity,
            background:
              "radial-gradient(circle at 38% 35%, rgba(80,140,255,0.95) 0%, rgba(0,91,228,0.85) 30%, rgba(0,60,170,0.9) 60%, rgba(0,30,100,0.8) 85%, rgba(0,15,60,0.6) 100%)",
          }}
        />

        {/* Rim glow */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{
            opacity: sphereRimOpacity,
            background:
              "radial-gradient(circle, transparent 0%, transparent 60%, rgba(100,170,255,0.4) 78%, rgba(60,130,255,0.2) 90%, transparent 100%)",
          }}
        />

        {/* Specular highlight */}
        <motion.div
          className="absolute rounded-full"
          style={{
            opacity: sphereSpecOpacity,
            width: "35%",
            height: "35%",
            left: "22%",
            top: "18%",
            background:
              "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.25) 40%, transparent 70%)",
            filter: "blur(2px)",
          }}
        />
      </motion.div>

      {/* ═══ Phase 4: Realization — Radiating thin pulse rings ═══ */}
      <motion.div className="absolute inset-[-80%]" style={{ opacity: realizationOpacity }}>
        {[0, 1, 2, 3].map((i) => (
          <div
            key={`pulse-${i}`}
            className="absolute inset-0 rounded-full animate-radial-pulse"
            style={{
              animationDelay: `${i * 1}s`,
              animationDuration: "4s",
              border: "1px solid rgba(0,91,228,0.25)",
            }}
          />
        ))}
      </motion.div>
    </div>
  );
}
