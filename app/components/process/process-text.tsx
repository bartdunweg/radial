"use client";

import { type MotionValue, motion, useTransform } from "motion/react";
import type { Step } from "./process-scroll";

export function ProcessText({
  progress,
  steps,
}: {
  progress: MotionValue<number>;
  steps: Step[];
}) {
  return (
    <div className="relative h-[420px] w-full max-w-xl flex flex-col">
      {/* Top: step content (number, title, description, learn more) */}
      <div className="relative flex-1">
        {steps.map((step, i) => {
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;
          const segment = 1 / steps.length;
          const start = i * segment;
          const end = start + segment;
          const opacity = useTransform(
            progress,
            isFirst
              ? [end - 0.05, end]
              : isLast
                ? [start, start + 0.05]
                : [start, start + 0.05, end - 0.05, end],
            isFirst
              ? [1, 0]
              : isLast
                ? [0, 1]
                : [0, 1, 1, 0]
          );
          const y = useTransform(
            progress,
            isFirst
              ? [end - 0.05, end]
              : isLast
                ? [start, start + 0.05]
                : [start, start + 0.05, end - 0.05, end],
            isFirst
              ? [0, -30]
              : isLast
                ? [30, 0]
                : [30, 0, 0, -30]
          );
          const pointerEvents = useTransform(opacity, (v) =>
            v > 0.5 ? "auto" : "none"
          );

          return (
            <motion.div
              key={i}
              className="absolute inset-0 flex flex-col justify-center"
              style={{ opacity, y, pointerEvents }}
            >
              <span className="text-sm font-medium text-muted-foreground tracking-widest uppercase">
                {step.number}
              </span>
              <h2 className="mt-3 text-3xl md:text-4xl tracking-tight">{step.title}</h2>
              <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-md">
                {step.description}
              </p>

              {step.expertiseSlug && (
                <a
                  href={`/expertise/${step.expertiseSlug}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Learn more
                  <svg
                    className="h-3.5 w-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              )}
            </motion.div>
          );
        })}
      </div>

      {/* Bottom: deliverables (services as tags) */}
      <div className="relative h-[120px]">
        {steps.map((step, i) => {
          const isFirst = i === 0;
          const isLast = i === steps.length - 1;
          const segment = 1 / steps.length;
          const start = i * segment;
          const end = start + segment;
          const opacity = useTransform(
            progress,
            isFirst
              ? [end - 0.05, end]
              : isLast
                ? [start, start + 0.05]
                : [start, start + 0.05, end - 0.05, end],
            isFirst
              ? [1, 0]
              : isLast
                ? [0, 1]
                : [0, 1, 1, 0]
          );
          const pointerEvents = useTransform(opacity, (v) =>
            v > 0.5 ? "auto" : "none"
          );

          if (step.services.length === 0) return null;

          return (
            <motion.div
              key={i}
              className="absolute inset-0"
              style={{ opacity, pointerEvents }}
            >
              <div className="flex flex-wrap gap-2">
                {step.services.map((service, si) =>
                  service.slug ? (
                    <a
                      key={service.slug}
                      href={`/expertise/${service.slug}`}
                      className="rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium transition-colors hover:border-foreground/20 hover:shadow-sm"
                    >
                      {service.title}
                    </a>
                  ) : (
                    <span
                      key={`label-${si}`}
                      className="rounded-lg border border-border/60 px-3 py-2 text-sm font-medium text-muted-foreground"
                    >
                      {service.title}
                    </span>
                  )
                )}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
