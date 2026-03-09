"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
}

export function FaqAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border">
      {items.map((item, i) => (
        <div key={i}>
          <button
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
            className="flex w-full items-center justify-between py-5 text-left"
          >
            <span className="text-base font-medium pr-4">{item.q}</span>
            <ChevronDown
              size={18}
              className={`shrink-0 text-muted-foreground transition-transform duration-200 ${
                openIndex === i ? "rotate-180" : ""
              }`}
            />
          </button>
          <div
            className={`grid transition-all duration-200 ${
              openIndex === i ? "grid-rows-[1fr] pb-5" : "grid-rows-[0fr]"
            }`}
          >
            <div className="overflow-hidden">
              <p className="text-sm leading-relaxed text-muted-foreground">{item.a}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
