"use client";

import { useEffect, useRef } from "react";

const CLEARANCE = 128;
const BASE_VW = 50;

function lerp(a: number, b: number, t: number) {
  return Math.round(a + (b - a) * t);
}

function lerpColor(r1: number, g1: number, b1: number, r2: number, g2: number, b2: number, t: number) {
  return `rgb(${lerp(r1, r2, t)},${lerp(g1, g2, t)},${lerp(b1, b2, t)})`;
}

// Orbital ring definitions
const RINGS = [
  { tiltX: 70, tiltY: 0, color: "0,220,255", speed: 14, dir: 1 },
  { tiltX: 60, tiltY: 120, color: "100,120,255", speed: 18, dir: -1 },
  { tiltX: 55, tiltY: 240, color: "180,80,255", speed: 22, dir: 1 },
];

// Sparkle particles
const SPARKLES = [
  { ring: 0, angle: 0, size: 6, delay: 0 },
  { ring: 0, angle: 180, size: 4, delay: 1.2 },
  { ring: 1, angle: 90, size: 5, delay: 0.5 },
  { ring: 1, angle: 270, size: 3, delay: 2.0 },
  { ring: 2, angle: 45, size: 5, delay: 0.8 },
  { ring: 2, angle: 200, size: 4, delay: 1.6 },
];

export function ScrollDot() {
  const ref = useRef<HTMLDivElement>(null);
  const effectsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hero = el.parentElement;
    let ticking = false;

    function getInitialTranslateY() {
      const cta = document.querySelector("[data-hero-cta]");
      if (!cta) return 82;
      const ctaBottom = cta.getBoundingClientRect().bottom;
      const heroHeight = hero?.offsetHeight || window.innerHeight;
      const circleSize = el!.offsetWidth;
      const targetTop = ctaBottom + window.scrollY + CLEARANCE;
      const tY = ((targetTop - heroHeight + circleSize) / circleSize) * 100;
      return Math.max(50, Math.min(95, tY));
    }

    let startTY = getInitialTranslateY();

    // Sphere layers
    const bodyEl = el.querySelector<HTMLDivElement>("[data-sphere-body]");
    const rimEl = el.querySelector<HTMLDivElement>("[data-sphere-rim]");
    const specEl = el.querySelector<HTMLDivElement>("[data-sphere-spec]");

    function update() {
      if (!el || !hero) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const isDark = document.documentElement.classList.contains("dark");

      const p = Math.max(0, Math.min(1, scrollY / (vh * 0.6)));
      const scale = 1 + p * 6;
      const translateY = startTY * (1 - p);

      el.style.transform = `translateX(-50%) translateY(${translateY}%) scale(${scale})`;

      const g = 1 - p; // effects fade factor

      // === Sphere body — glass-like radial with 3D shading ===
      if (bodyEl) {
        if (isDark) {
          // Dark: translucent dark body, lighter toward center
          const a1 = (0.4 * g).toFixed(2);
          const a2 = (0.5 * g).toFixed(2);
          const a3 = (0.6 * g).toFixed(2);
          const a4 = (0.3 * g).toFixed(2);
          bodyEl.style.background = [
            // Off-center highlight (upper-left) for 3D depth
            `radial-gradient(circle at 38% 35%,`,
            `  rgba(80,100,160,${a1}) 0%,`,
            `  rgba(40,50,100,${a2}) 30%,`,
            `  rgba(15,20,50,${a3}) 60%,`,
            `  rgba(5,5,20,${a4}) 85%,`,
            `  transparent 100%)`,
          ].join("");
        } else {
          // Light: translucent white-blue body, highlight upper-left
          const a1 = (0.9 * g + 0.1).toFixed(2);
          const a2 = (0.7 * g + 0.1).toFixed(2);
          const a3 = (0.5 * g).toFixed(2);
          const a4 = (0.25 * g).toFixed(2);
          bodyEl.style.background = [
            `radial-gradient(circle at 38% 35%,`,
            `  rgba(255,255,255,${a1}) 0%,`,
            `  rgba(220,230,255,${a2}) 30%,`,
            `  rgba(180,200,240,${a3}) 60%,`,
            `  rgba(140,170,220,${a4}) 85%,`,
            `  transparent 100%)`,
          ].join("");
        }
      }

      // === Rim glow — fresnel edge light ===
      if (rimEl) {
        const rimAlpha = (0.3 * g).toFixed(2);
        const rimColor = isDark ? "60,80,160" : "180,200,255";
        rimEl.style.background = [
          `radial-gradient(circle,`,
          `  transparent 0%,`,
          `  transparent 65%,`,
          `  rgba(${rimColor},${rimAlpha}) 80%,`,
          `  rgba(${rimColor},${(0.15 * g).toFixed(2)}) 92%,`,
          `  transparent 100%)`,
        ].join("");
      }

      // === Specular highlight — the bright "shine" spot ===
      if (specEl) {
        const specAlpha = (0.6 * g).toFixed(2);
        specEl.style.background = [
          `radial-gradient(circle at 50% 50%,`,
          `  rgba(255,255,255,${specAlpha}) 0%,`,
          `  rgba(255,255,255,${(0.2 * g).toFixed(2)}) 40%,`,
          `  transparent 70%)`,
        ].join("");
      }

      // === Ambient glow around sphere ===
      const gc = isDark ? "30,40,100" : "200,210,255";
      el.style.boxShadow = [
        `0 0 ${20 + p * 40}px ${8 + p * 20}px rgba(${gc},${(0.25 * g).toFixed(2)})`,
        `0 0 ${60 + p * 120}px ${30 + p * 60}px rgba(${gc},${(0.12 * g).toFixed(2)})`,
        `0 0 ${140 + p * 250}px ${70 + p * 140}px rgba(${gc},${(0.04 * g).toFixed(2)})`,
      ].join(", ");

      // As orb grows, it needs to cover the viewport in bg color
      // Add a large solid circle behind everything that expands
      const bgC = isDark ? "0,0,0" : "255,255,255";
      const solidStop = 20 + p * 40;
      el.style.background = [
        `radial-gradient(circle,`,
        `  rgba(${bgC},${(0.8 + p * 0.2).toFixed(2)}) 0%,`,
        `  rgba(${bgC},${(0.6 + p * 0.4).toFixed(2)}) ${solidStop}%,`,
        `  rgba(${bgC},${(0.2 + p * 0.4).toFixed(2)}) ${solidStop + 20}%,`,
        `  transparent 100%)`,
      ].join("");

      // Fade effects
      if (effectsRef.current) {
        effectsRef.current.style.opacity = `${g}`;
      }

      // Hero + main bg
      const t = p * p;
      const mainEl = hero.closest("main");
      if (isDark) {
        const bg = lerpColor(20, 20, 20, 0, 0, 0, t);
        hero.style.backgroundColor = bg;
        if (mainEl) (mainEl as HTMLElement).style.backgroundColor = bg;
      } else {
        const bg = lerpColor(232, 240, 254, 255, 255, 255, t);
        hero.style.backgroundColor = bg;
        if (mainEl) (mainEl as HTMLElement).style.backgroundColor = bg;
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    function onResize() {
      startTY = getInitialTranslateY();
      update();
    }

    const observer = new MutationObserver(() => update());
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    update();
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-0 left-1/2 z-[1] aspect-square rounded-full will-change-transform"
      style={{
        width: `${BASE_VW}vw`,
        transform: "translateX(-50%) translateY(82%) scale(1)",
        background:
          "radial-gradient(circle, rgba(255,255,255,0.8) 0%, rgba(255,255,255,0.6) 20%, rgba(255,255,255,0.2) 40%, transparent 100%)",
      }}
    >
      {/* Sphere body — glass-like translucent orb with off-center highlight */}
      <div
        data-sphere-body
        className="absolute inset-[5%] rounded-full"
        style={{
          background:
            "radial-gradient(circle at 38% 35%, rgba(255,255,255,0.95) 0%, rgba(220,230,255,0.7) 30%, rgba(180,200,240,0.4) 60%, rgba(140,170,220,0.2) 85%, transparent 100%)",
        }}
      />

      {/* Rim glow — fresnel edge, like light wrapping around a glass sphere */}
      <div
        data-sphere-rim
        className="absolute inset-[5%] rounded-full"
        style={{
          background:
            "radial-gradient(circle, transparent 0%, transparent 65%, rgba(180,200,255,0.3) 80%, rgba(180,200,255,0.15) 92%, transparent 100%)",
        }}
      />

      {/* Specular highlight — bright spot upper-left */}
      <div
        data-sphere-spec
        className="absolute rounded-full"
        style={{
          width: "35%",
          height: "35%",
          left: "22%",
          top: "18%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.2) 40%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />

      {/* Breathing pulse */}
      <div
        className="absolute inset-[15%] rounded-full animate-orb-pulse"
        style={{
          background:
            "radial-gradient(circle at 38% 35%, rgba(255,255,255,0.15) 0%, transparent 60%)",
        }}
      />

      {/* Effects container — rings, sparkles, flares */}
      <div ref={effectsRef} className="absolute inset-0">

        {/* Orbital rings */}
        {RINGS.map((ring, i) => (
          <div
            key={`ring-${i}`}
            className="absolute inset-[-15%]"
            style={{
              transform: `rotateX(${ring.tiltX}deg) rotateY(${ring.tiltY}deg)`,
              transformStyle: "preserve-3d",
            }}
          >
            <div
              className="absolute inset-0 animate-orbit-spin"
              style={{
                animationDuration: `${ring.speed}s`,
                animationDirection: ring.dir === -1 ? "reverse" : "normal",
              }}
            >
              <div
                className="absolute inset-[8%] rounded-full"
                style={{
                  border: `3px solid rgba(${ring.color},0.06)`,
                  filter: "blur(6px)",
                }}
              />
              <div
                className="absolute inset-[8%] rounded-full"
                style={{
                  border: `2px solid rgba(${ring.color},0.12)`,
                  filter: "blur(2px)",
                }}
              />
              <div
                className="absolute inset-[8%] rounded-full"
                style={{
                  border: `1px solid rgba(${ring.color},0.3)`,
                }}
              />
            </div>
          </div>
        ))}

        {/* Sparkle star particles */}
        {SPARKLES.map((spark, i) => {
          const ring = RINGS[spark.ring];
          return (
            <div
              key={`sparkle-${i}`}
              className="absolute inset-[-15%]"
              style={{
                transform: `rotateX(${ring.tiltX}deg) rotateY(${ring.tiltY}deg)`,
                transformStyle: "preserve-3d",
              }}
            >
              <div
                className="absolute inset-0 animate-orbit-spin"
                style={{
                  animationDuration: `${ring.speed}s`,
                  animationDirection: ring.dir === -1 ? "reverse" : "normal",
                }}
              >
                <div
                  className="absolute"
                  style={{
                    width: `${spark.size}px`,
                    height: `${spark.size}px`,
                    left: `${50 + 42 * Math.cos((spark.angle * Math.PI) / 180)}%`,
                    top: `${50 + 42 * Math.sin((spark.angle * Math.PI) / 180)}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="animate-sparkle-twinkle" style={{ animationDelay: `${spark.delay}s` }}>
                    <div
                      className="absolute inset-0"
                      style={{
                        background: `radial-gradient(circle, rgba(${ring.color},0.9) 0%, rgba(${ring.color},0.3) 40%, transparent 70%)`,
                        filter: "blur(1px)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-[-100%] right-[-100%]"
                      style={{
                        height: "1px",
                        background: `linear-gradient(90deg, transparent, rgba(${ring.color},0.6), transparent)`,
                        transform: "translateY(-0.5px)",
                      }}
                    />
                    <div
                      className="absolute left-1/2 top-[-100%] bottom-[-100%]"
                      style={{
                        width: "1px",
                        background: `linear-gradient(180deg, transparent, rgba(${ring.color},0.6), transparent)`,
                        transform: "translateX(-0.5px)",
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}

        {/* Lens flare rays */}
        <div className="absolute inset-0 animate-orb-rotate" style={{ animationDuration: "40s" }}>
          {[0, 60, 120, 180, 240, 300].map((angle, i) => {
            const isLong = i % 2 === 0;
            return (
              <div
                key={`flare-${angle}`}
                className="absolute left-1/2 top-1/2"
                style={{
                  width: isLong ? "55%" : "35%",
                  height: isLong ? "1.5px" : "1px",
                  transformOrigin: "0% 50%",
                  transform: `rotate(${angle}deg)`,
                  background: `linear-gradient(90deg, rgba(200,220,255,${isLong ? 0.2 : 0.1}) 0%, rgba(180,210,255,0.05) 50%, transparent 100%)`,
                  filter: "blur(0.5px)",
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
