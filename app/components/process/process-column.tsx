"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import { ProcessCircle } from "./process-circle";
import { ProcessText } from "./process-text";
import type { Step } from "./process-scroll";

export function ProcessColumn({ steps }: { steps: Step[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div ref={containerRef} className="relative" style={{ height: "500vh" }}>
      <div className="sticky top-0 h-screen flex items-center">
        <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left — scroll-driven text steps */}
          <ProcessText progress={smoothProgress} steps={steps} />

          {/* Right — animated illustration */}
          <div className="hidden md:flex items-center justify-center">
            <ProcessCircle progress={smoothProgress} />
          </div>
        </div>
      </div>
    </div>
  );
}
