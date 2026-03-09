"use client";

import { useEffect, useRef } from "react";

interface Dot {
  baseX: number;
  baseY: number;
  x: number;
  y: number;
  baseRadius: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  pulseSeed: number;
  circleIndex: number; // which concentric circle this dot belongs to
}

type CircleSize = "sm" | "md" | "lg";

interface Circle {
  size: CircleSize;
  radius: number; // radius of the concentric circle
  dotCount: number; // how many dots form this circle
  dotSize: number; // base size of each individual dot
  alpha: number; // base alpha
  pulseSpeed: number;
  pulseAmount: number; // how much the circle "breathes"
}

export function DotField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dots: Dot[] = [];
    let mouseX = -9999;
    let mouseY = -9999;
    let animId: number;
    let time = 0;
    let introProgress = 0; // 0..1, controls the expand-from-center animation
    const INTRO_SPEED = 0.012; // how fast the intro plays

    const MOUSE_RADIUS = 120;
    const MOUSE_PUSH = 25;

    const buildDots = () => {
      dots = [];
      const cx = w / 2;
      const cy = h / 2;
      const baseUnit = Math.min(w, h) * 0.38;

      // Define concentric circles with varied sizes
      // Pattern: sm, md, lg repeating outward with increasing radii
      const circles: Circle[] = [
        // Inner cluster — dense, bigger dots
        { size: "sm", radius: baseUnit * 0.06, dotCount: 8,   dotSize: 1.0, alpha: 0.18, pulseSpeed: 1.8, pulseAmount: 0.4 },
        { size: "md", radius: baseUnit * 0.13, dotCount: 12,  dotSize: 1.4, alpha: 0.16, pulseSpeed: 1.2, pulseAmount: 0.5 },
        { size: "lg", radius: baseUnit * 0.21, dotCount: 18,  dotSize: 1.8, alpha: 0.14, pulseSpeed: 0.8, pulseAmount: 0.6 },

        // Mid ring
        { size: "sm", radius: baseUnit * 0.30, dotCount: 24,  dotSize: 1.0, alpha: 0.14, pulseSpeed: 1.6, pulseAmount: 0.4 },
        { size: "md", radius: baseUnit * 0.39, dotCount: 30,  dotSize: 1.4, alpha: 0.12, pulseSpeed: 1.0, pulseAmount: 0.5 },
        { size: "lg", radius: baseUnit * 0.49, dotCount: 36,  dotSize: 1.8, alpha: 0.10, pulseSpeed: 0.7, pulseAmount: 0.6 },

        // Outer ring
        { size: "sm", radius: baseUnit * 0.60, dotCount: 42,  dotSize: 1.0, alpha: 0.10, pulseSpeed: 1.4, pulseAmount: 0.3 },
        { size: "md", radius: baseUnit * 0.72, dotCount: 48,  dotSize: 1.3, alpha: 0.08, pulseSpeed: 0.9, pulseAmount: 0.4 },
        { size: "lg", radius: baseUnit * 0.85, dotCount: 56,  dotSize: 1.6, alpha: 0.07, pulseSpeed: 0.6, pulseAmount: 0.5 },

        // Extended outer
        { size: "sm", radius: baseUnit * 0.98, dotCount: 64,  dotSize: 0.8, alpha: 0.07, pulseSpeed: 1.3, pulseAmount: 0.3 },
        { size: "md", radius: baseUnit * 1.12, dotCount: 72,  dotSize: 1.1, alpha: 0.06, pulseSpeed: 0.8, pulseAmount: 0.4 },
        { size: "lg", radius: baseUnit * 1.28, dotCount: 80,  dotSize: 1.4, alpha: 0.05, pulseSpeed: 0.5, pulseAmount: 0.5 },

        // Far outer
        { size: "sm", radius: baseUnit * 1.44, dotCount: 88,  dotSize: 0.7, alpha: 0.05, pulseSpeed: 1.1, pulseAmount: 0.2 },
        { size: "md", radius: baseUnit * 1.62, dotCount: 96,  dotSize: 1.0, alpha: 0.04, pulseSpeed: 0.7, pulseAmount: 0.3 },
        { size: "lg", radius: baseUnit * 1.82, dotCount: 104, dotSize: 1.2, alpha: 0.04, pulseSpeed: 0.4, pulseAmount: 0.4 },
      ];

      circles.forEach((circle, circleIdx) => {
        const phaseSeed = circleIdx * 1.3; // each circle gets a unique phase

        for (let i = 0; i < circle.dotCount; i++) {
          const angle = (i / circle.dotCount) * Math.PI * 2;
          const x = cx + Math.cos(angle) * circle.radius;
          const y = cy + Math.sin(angle) * circle.radius;

          // Only include dots within canvas bounds (with margin)
          if (x < -20 || x > w + 20 || y < -20 || y > h + 20) continue;

          dots.push({
            baseX: x,
            baseY: y,
            x: cx,  // start from center
            y: cy,  // start from center
            baseRadius: circle.dotSize,
            radius: 0, // start invisible
            baseAlpha: circle.alpha,
            alpha: 0, // start transparent
            pulseSeed: phaseSeed,
            circleIndex: circleIdx,
          });
        }
      });

      // Store circles for draw loop
      (canvas as any).__circles = circles;
    };

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      w = rect.width;
      h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      buildDots();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };

    const onMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
    };

    const totalCircles = 15; // total number of concentric circles

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      time += 0.015;

      // Advance intro animation
      if (introProgress < 1) {
        introProgress = Math.min(introProgress + INTRO_SPEED, 1);
      }

      const isDark = document.documentElement.classList.contains("dark");
      const dotColor = isDark ? "255, 255, 255" : "0, 0, 0";

      const circles = (canvas as any).__circles as Circle[] | undefined;
      const cx = w / 2;
      const cy = h / 2;

      for (const dot of dots) {
        const circle = circles?.[dot.circleIndex];
        const speed = circle?.pulseSpeed ?? 1.0;
        const amount = circle?.pulseAmount ?? 0.4;

        // Stagger intro by circle index: inner circles expand first
        const staggerDelay = (dot.circleIndex / totalCircles) * 0.4; // 0..0.4
        const rawT = Math.max(0, (introProgress - staggerDelay) / (1 - staggerDelay));
        const intro = rawT * rawT * (3 - 2 * rawT); // smoothstep easing

        // Interpolate target position from center to base position
        const targetX = cx + (dot.baseX - cx) * intro;
        const targetY = cy + (dot.baseY - cy) * intro;

        // All dots on the same circle pulse together (same pulseSeed)
        const pulse = Math.sin(time * speed + dot.pulseSeed) * 0.5 + 0.5; // 0..1
        const pulseRadius = dot.baseRadius * (1 - amount * 0.5 + pulse * amount) * intro;
        const pulseAlpha = dot.baseAlpha * (1 - amount * 0.4 + pulse * amount * 0.8) * intro;

        const dx = targetX - mouseX;
        const dy = targetY - mouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < MOUSE_RADIUS && intro > 0.5) {
          const t = 1 - dist / MOUSE_RADIUS;
          const push = t * t * MOUSE_PUSH;
          const angle = Math.atan2(dy, dx);
          dot.x += (targetX + Math.cos(angle) * push - dot.x) * 0.15;
          dot.y += (targetY + Math.sin(angle) * push - dot.y) * 0.15;
          dot.radius += (pulseRadius * (1 + t * 1.5) - dot.radius) * 0.15;
          dot.alpha += (Math.min(pulseAlpha * (1 + t * 3), 0.4) - dot.alpha) * 0.15;
        } else {
          dot.x += (targetX - dot.x) * 0.12;
          dot.y += (targetY - dot.y) * 0.12;
          dot.radius += (pulseRadius - dot.radius) * 0.12;
          dot.alpha += (pulseAlpha - dot.alpha) * 0.12;
        }

        if (dot.alpha < 0.003) continue; // skip nearly invisible dots

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, dot.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${dotColor}, ${dot.alpha})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseleave", onMouseLeave);
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseleave", onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0 h-full w-full"
    />
  );
}
