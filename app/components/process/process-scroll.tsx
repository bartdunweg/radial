"use client";

import { useRef } from "react";
import { useScroll, useSpring } from "motion/react";
import { ProcessCircle } from "./process-circle";
import { ProcessText } from "./process-text";

export interface StepService {
  slug?: string;
  title: string;
  description?: string;
}

export interface Step {
  number: string;
  title: string;
  description: string;
  services: StepService[];
}

export function ProcessScroll({ steps }: { steps: Step[] }) {
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
      <div className="sticky top-0 h-screen flex flex-col md:flex-row items-center">
        <div className="w-full md:w-[280px] shrink-0 flex items-center justify-center md:ml-16 lg:ml-24">
          <ProcessCircle progress={smoothProgress} />
        </div>
        <div className="flex-1 flex items-center px-8 md:px-12 lg:px-20">
          <ProcessText progress={smoothProgress} steps={steps} />
        </div>
      </div>
    </div>
  );
}
