"use client";

import { useEffect, useRef } from "react";

export function RadialCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e: MouseEvent) => {
      el.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
      el.style.opacity = "1";
    };

    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed top-0 left-0 z-40 opacity-0 transition-opacity duration-300"
    >
      <div className="relative -left-[250px] -top-[250px] h-[500px] w-[500px] rounded-full bg-[radial-gradient(circle,_var(--color-primary)_0%,_transparent_70%)] opacity-[0.08]" />
    </div>
  );
}
