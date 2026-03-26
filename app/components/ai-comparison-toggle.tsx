"use client";

import { useState } from "react";
import { motion } from "motion/react";

interface AiComparisonItem {
  aiTitle: string;
  aiText: string;
  humanTitle: string;
  humanText: string;
}

interface AiComparisonToggleProps {
  items: AiComparisonItem[];
  toggleLabel: string;
  aiColumnLabel: string;
  humanColumnLabel: string;
}

export function AiComparisonToggle({
  items,
  toggleLabel,
  aiColumnLabel,
  humanColumnLabel,
}: AiComparisonToggleProps) {
  const [includeRadial, setIncludeRadial] = useState(true);

  return (
    <div className="rounded-xl border border-black/5 dark:border-white/10 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className={`text-xs font-medium uppercase tracking-widest transition-colors duration-200 ${
          includeRadial ? "text-[#005BE4] dark:text-[#4D94FF]" : "text-muted-foreground"
        }`}>
          {includeRadial ? humanColumnLabel : aiColumnLabel}
        </span>
        <button
          type="button"
          onClick={() => setIncludeRadial(!includeRadial)}
          className="flex items-center gap-2.5 cursor-pointer"
        >
          <span className="text-sm font-medium text-muted-foreground">
            {toggleLabel}
          </span>
          <div
            className={`relative h-6 w-11 rounded-full transition-colors duration-200 ${
              includeRadial ? "bg-[#005BE4]" : "bg-muted"
            }`}
          >
            <motion.div
              className="absolute top-1 left-1 h-4 w-4 rounded-full bg-white shadow-sm"
              animate={{ x: includeRadial ? 20 : 0 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
            />
          </div>
        </button>
      </div>

      {/* Items */}
      <div className="divide-y divide-black/5 dark:divide-white/10">
        {items.map((item, i) => (
          <div key={i} className="py-4 first:pt-0 last:pb-0">
            <h3 className="text-sm font-medium text-foreground">
              {includeRadial ? item.humanTitle : item.aiTitle}
            </h3>
            <p className="mt-0.5 text-sm leading-relaxed text-muted-foreground">
              {includeRadial ? item.humanText : item.aiText}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
