"use client";

import { useRef, useState, type ReactNode } from "react";
import { useScroll, useMotionValueEvent } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

export interface ProcessStep {
  step: string;
  title: string;
  text: string;
  icon: ReactNode;
  href: string;
  readMoreLabel: string;
}

interface ProcessTimelineProps {
  items: ProcessStep[];
}

export function ProcessTimeline({ items }: ProcessTimelineProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.7", "end 0.5"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  const activeIndex = progress < 0.15 ? -1 : progress < 0.4 ? 0 : progress < 0.7 ? 1 : 2;
  const linePct = Math.min(100, Math.max(0, progress * 120));

  return (
    <div ref={containerRef} className="mt-16">
      {items.map((item, i) => (
        <div key={item.step} className="flex gap-6 md:gap-8">
          {/* Timeline column */}
          <div className="flex flex-col items-center">
            <div
              className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-700 [&_svg]:h-4 [&_svg]:w-4"
              style={{
                backgroundColor: i <= activeIndex ? "#005BE4" : "var(--color-background, #fff)",
                color: i <= activeIndex ? "#fff" : "var(--color-muted-foreground)",
                borderWidth: "1.5px",
                borderColor: i <= activeIndex ? "#005BE4" : "rgba(0,0,0,0.15)",
                transform: `scale(${i === activeIndex ? 1.15 : 1})`,
              }}
            >
              {item.icon}
            </div>
            {i < items.length - 1 && (
              <div className="relative w-px flex-1 bg-black/10 dark:bg-white/10 overflow-hidden">
                <div
                  className="absolute inset-x-0 top-0 bg-accent transition-all duration-700"
                  style={{
                    height: i < activeIndex ? "100%" : i === activeIndex ? `${Math.max(0, (linePct - i * 35) * 2.5)}%` : "0%",
                  }}
                />
              </div>
            )}
          </div>

          {/* Content */}
          <div
            className="flex-1 pb-12 md:pb-16 -mt-1 transition-all duration-700"
            style={{
              opacity: i <= activeIndex ? 1 : 0.25,
              transform: `translateY(${i <= activeIndex ? 0 : 8}px)`,
            }}
          >
            <Link href={item.href} className="group block">
              <h3 className="text-xl font-medium tracking-tight md:text-2xl">{item.title}</h3>
              <p className="mt-3 max-w-lg text-base text-muted-foreground leading-relaxed">{item.text}</p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                {item.readMoreLabel} <ArrowRight size={14} />
              </span>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
