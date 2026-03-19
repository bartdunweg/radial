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
    <div ref={containerRef} className="relative" style={{ height: "400vh" }}>
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center gap-8">
        <ProcessCircle progress={smoothProgress} />
        <ProcessText progress={smoothProgress} steps={steps} />
      </div>
    </div>
  );
}
