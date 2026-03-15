"use client";

import { useEffect, useRef, useCallback } from "react";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  circle: number;
  size: number;
  baseOpacity: number;
  opacity: number;
  inCenter: boolean;
  windPhase: number;
  windSpeed: number;
  windAmplitudeX: number;
  windAmplitudeY: number;
}

const CIRCLES = [
  { cx: 0.35, cy: 0.36, r: 0.28 },   // top-left: Users
  { cx: 0.65, cy: 0.36, r: 0.28 },   // top-right: Tech
  { cx: 0.5, cy: 0.64, r: 0.28 },    // bottom: Business
];

// Centroid of the three circle centers
const CENTER = { x: 0.5, y: (0.36 + 0.36 + 0.64) / 3 };
const PULSE_RADIUS = 0.06; // particles within this distance from center pulse

const PARTICLE_COUNT = 3200;
const MOUSE_RADIUS = 0.12;
const MOUSE_FORCE = 18;

// Label anchor points on circle edges (outer side)
const LABELS = [
  { // Users — top-left of circle
    anchor: { x: 0.35 - 0.28 * Math.cos(Math.PI * 0.25), y: 0.36 - 0.28 * Math.sin(Math.PI * 0.25) },
    end: { x: 0.08, y: 0.08 },
  },
  { // Tech — top-right of circle
    anchor: { x: 0.65 + 0.28 * Math.cos(Math.PI * 0.25), y: 0.36 - 0.28 * Math.sin(Math.PI * 0.25) },
    end: { x: 0.92, y: 0.08 },
  },
  { // Business — bottom of circle
    anchor: { x: 0.5, y: 0.64 + 0.28 },
    end: { x: 0.5, y: 1.0 },
  },
];

function countCirclesAt(px: number, py: number, w: number, h: number, s: number): number {
  let count = 0;
  for (const c of CIRCLES) {
    const dx = px - c.cx * w;
    const dy = py - c.cy * h;
    if (Math.sqrt(dx * dx + dy * dy) < c.r * s) count++;
  }
  return count;
}

function createParticles(w: number, h: number): Particle[] {
  const particles: Particle[] = [];
  const s = Math.min(w, h);

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const circleIdx = Math.floor(Math.random() * 3);
    const circle = CIRCLES[circleIdx];

    const angle = Math.random() * Math.PI * 2;
    const dist = Math.pow(Math.random(), 0.6) * circle.r * s;
    const x = circle.cx * w + Math.cos(angle) * dist;
    const y = circle.cy * h + Math.sin(angle) * dist;

    const normalizedDist = dist / (circle.r * s);
    const baseOpacity = (1 - normalizedDist * normalizedDist) * (0.3 + Math.random() * 0.5);

    const overlapCount = countCirclesAt(x, y, w, h, s);
    const overlapBoost = overlapCount >= 3 ? 1.8 : overlapCount === 2 ? 1.4 : 1;
    const opacity = Math.min(baseOpacity * overlapBoost, 0.85);

    // Check if particle is inside ALL three circles (the true intersection)
    const inCenter = overlapCount >= 3;

    particles.push({
      x, y,
      baseX: x,
      baseY: y,
      circle: circleIdx,
      size: 0.8 + Math.random() * 1.2,
      baseOpacity: opacity,
      opacity,
      inCenter,
      windPhase: Math.random() * Math.PI * 2,
      windSpeed: 0.3 + Math.random() * 0.6,
      windAmplitudeX: 1.5 + Math.random() * 3,
      windAmplitudeY: 0.8 + Math.random() * 2,
    });
  }
  return particles;
}

export function VennDiagram() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const rafRef = useRef<number>(0);
  const sizeRef = useRef({ w: 0, h: 0 });

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    mouseRef.current = {
      x: (e.clientX - rect.left) * (canvas.width / rect.width),
      y: (e.clientY - rect.top) * (canvas.height / rect.height),
    };
  }, []);

  const handleMouseLeave = useCallback(() => {
    mouseRef.current = { x: -1000, y: -1000 };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const container = canvas.parentElement;
    if (!container) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = container.getBoundingClientRect();
      const w = rect.width;
      const h = rect.width;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      sizeRef.current = { w, h };
      particlesRef.current = createParticles(w, h);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", handleMouseMove);
    canvas.addEventListener("mouseleave", handleMouseLeave);

    const startTime = performance.now();

    const animate = (now: number) => {
      const elapsed = (now - startTime) / 1000;
      const { w, h } = sizeRef.current;
      const particles = particlesRef.current;
      const mouse = mouseRef.current;
      const s = Math.min(w, h);
      const mouseR = MOUSE_RADIUS * s;

      const isDark = document.documentElement.classList.contains("dark");
      const fillColor = isDark ? "#FAFAFA" : "#0A0A0A";
      const lineColor = isDark ? "rgba(250,250,250,0.35)" : "rgba(10,10,10,0.25)";
      const labelLineColor = isDark ? "rgba(250,250,250,0.25)" : "rgba(10,10,10,0.2)";

      // Pulse factor for center particles (slow breathe: 3s cycle)
      const pulse = 0.6 + 0.4 * Math.sin(elapsed * 2.1);

      ctx.clearRect(0, 0, w, h);

      // Circle outlines
      ctx.strokeStyle = lineColor;
      ctx.lineWidth = 1;
      for (const c of CIRCLES) {
        ctx.beginPath();
        ctx.arc(c.cx * w, c.cy * h, c.r * s, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Leader lines from labels to circle edges
      ctx.strokeStyle = labelLineColor;
      ctx.lineWidth = 1;
      for (const l of LABELS) {
        ctx.beginPath();
        ctx.moveTo(l.anchor.x * w, l.anchor.y * h);
        ctx.lineTo(l.end.x * w, l.end.y * h);
        ctx.stroke();
        // Small dot at anchor point
        ctx.fillStyle = fillColor;
        ctx.globalAlpha = 0.3;
        ctx.beginPath();
        ctx.arc(l.anchor.x * w, l.anchor.y * h, 2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Center label line — from center to the right edge
      const centerX = CENTER.x * w;
      const centerY = CENTER.y * h;
      ctx.strokeStyle = labelLineColor;
      ctx.lineWidth = 1;
      ctx.globalAlpha = 1;
      ctx.beginPath();
      ctx.moveTo(centerX, centerY);
      ctx.lineTo(w, centerY);
      ctx.stroke();
      // Dot at center
      ctx.fillStyle = fillColor;
      ctx.globalAlpha = 0.4;
      ctx.beginPath();
      ctx.arc(centerX, centerY, 2.5, 0, Math.PI * 2);
      ctx.fill();

      // Particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Wind movement
        const windX = Math.sin(elapsed * p.windSpeed + p.windPhase) * p.windAmplitudeX;
        const windY = Math.cos(elapsed * p.windSpeed * 0.7 + p.windPhase + 1.3) * p.windAmplitudeY;

        let targetX = p.baseX + windX;
        let targetY = p.baseY + windY;

        // Mouse repulsion
        const dx = targetX - mouse.x;
        const dy = targetY - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < mouseR && dist > 0) {
          const force = (1 - dist / mouseR) * MOUSE_FORCE;
          targetX += (dx / dist) * force;
          targetY += (dy / dist) * force;
        }

        // Smooth follow
        p.x += (targetX - p.x) * 0.08;
        p.y += (targetY - p.y) * 0.08;

        // Pulse center particles
        p.opacity = p.inCenter ? p.baseOpacity * pulse : p.baseOpacity;

        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = fillColor;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.inCenter ? p.size * (0.9 + pulse * 0.2) : p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(rafRef.current);
    };
  }, [handleMouseMove, handleMouseLeave]);

  return (
    <div className="flex justify-center py-16">
      <div className="relative w-full max-w-[500px]">
        <div className="relative aspect-square">
          <canvas ref={canvasRef} className="absolute inset-0 cursor-default" />
        </div>
        {/* Labels */}
        <div className="absolute top-[2%] left-[0%] pointer-events-none">
          <p className="text-xs text-muted-foreground">Desirable for</p>
          <p className="text-base font-medium tracking-tight">Users</p>
        </div>
        <div className="absolute top-[2%] right-[0%] text-right pointer-events-none">
          <p className="text-xs text-muted-foreground">Feasible as</p>
          <p className="text-base font-medium tracking-tight">Tech</p>
        </div>
        <div className="absolute bottom-[-6%] left-1/2 -translate-x-1/2 text-center pointer-events-none">
          <p className="text-xs text-muted-foreground">Viable to</p>
          <p className="text-base font-medium tracking-tight">Business</p>
        </div>
        {/* Center label — positioned outside the diagram to the right */}
        <div className="absolute top-[42.5%] left-[calc(100%+12px)] -translate-y-1/2 whitespace-nowrap pointer-events-none">
          <p className="text-xs text-muted-foreground">Your Product&apos;s</p>
          <p className="text-base font-medium tracking-tight">Core</p>
        </div>
      </div>
    </div>
  );
}
