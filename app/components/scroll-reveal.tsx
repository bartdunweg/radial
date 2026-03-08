"use client";

import { useEffect, useRef } from "react";

const ORB_BASE_VW = 50;

/**
 * Hides the entire content section until the orb fills the viewport.
 * Card rows animate in sequence: row 1 slides right→0, row 2 slides left→0, both rise up.
 * Each row uses its own IntersectionObserver so they only animate when actually visible.
 */
export function ScrollReveal({ children }: { children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const contentWrapper = container.parentElement;
    const items = container.querySelectorAll<HTMLElement>("[data-reveal-item]");
    const row1 = container.querySelector<HTMLElement>('[data-reveal-slide="left"]');
    const row2 = container.querySelector<HTMLElement>('[data-reveal-slide="right"]');
    let ticking = false;
    let wasRevealed = false;
    let row1Animated = false;
    let row2Animated = false;
    let observersStarted = false;
    const timers: ReturnType<typeof setTimeout>[] = [];

    const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

    // Item transitions (clients section etc.)
    items.forEach((el) => {
      el.style.transition = `transform 0.9s ${ease}, opacity 0.9s ${ease}, filter 0.9s ${ease}`;
    });

    function animateRow1() {
      if (!row1 || row1Animated) return;
      row1Animated = true;

      // Phase 1: horizontal slide (keep Y at 30px)
      row1.style.transition = `transform 0.7s ${ease}, opacity 0.7s ${ease}`;
      row1.style.transform = "translateX(0) translateY(30px)";
      row1.style.opacity = "1";
    }

    function animateRow2() {
      if (!row2 || row2Animated) return;
      row2Animated = true;

      // Phase 1: horizontal slide (keep Y at 30px)
      row2.style.transition = `transform 0.7s ${ease}, opacity 0.7s ${ease}`;
      row2.style.transform = "translateX(0) translateY(30px)";
      row2.style.opacity = "1";

      // Phase 2: both rows rise up together
      // Wait for row 2 X to finish (0.7s) + 0.4s pause = 1.1s
      const t = setTimeout(() => {
        if (row1) {
          row1.style.transition = `transform 0.5s ${ease}`;
          row1.style.transform = "translateX(0) translateY(0)";
        }
        if (row2) {
          row2.style.transition = `transform 0.5s ${ease}`;
          row2.style.transform = "translateX(0) translateY(0)";
        }
      }, 1100);
      timers.push(t);
    }

    // Row 1 observer — fires when 10% visible
    const row1Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            animateRow1();
            row1Observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    // Row 2 observer — fires when 30% visible, with stagger after row 1
    const row2Observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // 0.5s stagger after row 1 to make the sequence clearly visible
            const delay = row1Animated ? 500 : 0;
            const t = setTimeout(() => animateRow2(), delay);
            timers.push(t);
            row2Observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.3 }
    );

    function startObservers() {
      if (observersStarted) return;
      observersStarted = true;
      if (row1) row1Observer.observe(row1);
      if (row2) row2Observer.observe(row2);
    }

    function stopObservers() {
      observersStarted = false;
      if (row1) row1Observer.unobserve(row1);
      if (row2) row2Observer.unobserve(row2);
    }

    function resetRows() {
      row1Animated = false;
      row2Animated = false;
      timers.forEach(clearTimeout);
      timers.length = 0;
      stopObservers();

      if (row1) {
        row1.style.transition = "none";
        row1.style.transform = "translateX(160px) translateY(30px)";
        row1.style.opacity = "0";
      }
      if (row2) {
        row2.style.transition = "none";
        row2.style.transform = "translateX(-160px) translateY(30px)";
        row2.style.opacity = "0";
      }
    }

    function update() {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      const vw = window.innerWidth;

      const p = Math.max(0, Math.min(1, scrollY / (vh * 0.5)));
      const scale = 1 + p * 3;
      const orbWidth = (ORB_BASE_VW / 100) * vw * scale;
      const revealed = orbWidth >= vw;

      if (revealed !== wasRevealed) {
        wasRevealed = revealed;

        if (contentWrapper) {
          if (revealed) {
            contentWrapper.style.visibility = "visible";
            contentWrapper.style.opacity = "1";
            // Start observing rows — they animate only when in viewport
            startObservers();
          } else {
            contentWrapper.style.visibility = "hidden";
            contentWrapper.style.opacity = "0";
            resetRows();
          }
        }

        items.forEach((el) => {
          if (revealed) {
            el.style.transform = "translateY(0)";
            el.style.opacity = "1";
            el.style.filter = "blur(0)";
          } else {
            el.style.transform = "translateY(40px)";
            el.style.opacity = "0";
            el.style.filter = "blur(6px)";
          }
        });
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      row1Observer.disconnect();
      row2Observer.disconnect();
      timers.forEach(clearTimeout);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
}
