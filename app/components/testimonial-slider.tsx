"use client";

import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = 400 + 24; // card width + gap
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative">
      <div
        ref={scrollRef}
        className="flex gap-6 overflow-x-auto scrollbar-hide"
      >
        {items.map((item) => (
          <div
            key={item.author}
            className="w-[400px] shrink-0 rounded-2xl border border-black/5 bg-background p-8 flex flex-col justify-between dark:border-white/10"
          >
            <blockquote className="text-base leading-relaxed text-muted-foreground">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <div className="mt-6">
              <div className="text-sm font-medium">{item.author}</div>
              <div className="text-xs text-muted-foreground">
                {item.role}, {item.company}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <div className="mt-8 flex items-center gap-3">
        <button
          onClick={() => scroll("left")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          aria-label="Previous testimonials"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border transition-colors hover:bg-muted"
          aria-label="Next testimonials"
        >
          <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
