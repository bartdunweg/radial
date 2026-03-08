"use client";

import { useEffect, useRef } from "react";

const BASE_VW = 50;
const CLEARANCE = 128;

export function ScrollOrb() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const hero = el.parentElement;
    if (!hero) return;

    function applyGradient() {
      const isDark = document.documentElement.classList.contains("dark");
      const c = isDark ? "0,0,0" : "255,255,255";
      el!.style.background =
        `radial-gradient(circle, rgba(${c},0.9) 0%, rgba(${c},0.55) 20%, rgba(${c},0.3) 35%, rgba(${c},0.12) 50%, rgba(${c},0.04) 65%, rgba(${c},0) 80%)`;
    }

    applyGradient();

    const themeObserver = new MutationObserver(applyGradient);
    themeObserver.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    function getInitialTranslateY() {
      const cta = document.querySelector("[data-hero-cta]");
      if (!cta || !hero) return 82;
      const ctaBottom = cta.getBoundingClientRect().bottom;
      const heroHeight = hero.offsetHeight || window.innerHeight;
      const circleSize = el!.offsetWidth;
      const targetTop = ctaBottom + window.scrollY + CLEARANCE;
      const tY = ((targetTop - heroHeight + circleSize) / circleSize) * 100;
      return Math.max(50, Math.min(95, tY));
    }

    let startTY = getInitialTranslateY();
    let ticking = false;

    function updateScroll() {
      const p = Math.max(0, Math.min(1, window.scrollY / (window.innerHeight * 0.6)));
      const scale = 1 + p * 6;
      const translateY = startTY * (1 - p);
      el!.style.transform = `translateX(-50%) translateY(${translateY}%) scale(${scale})`;
      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(updateScroll);
        ticking = true;
      }
    }

    function onResize() {
      startTY = getInitialTranslateY();
      updateScroll();
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    updateScroll();

    return () => {
      themeObserver.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute bottom-0 left-1/2 z-[1] aspect-square will-change-transform"
      style={{
        width: `${BASE_VW}vw`,
        transform: "translateX(-50%) translateY(82%) scale(1)",
      }}
    />
  );
}
