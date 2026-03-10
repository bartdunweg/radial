"use client";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
}

export function TestimonialSlider({ items }: { items: Testimonial[] }) {
  // Duplicate items for seamless infinite loop
  const duplicated = [...items, ...items];

  return (
    <div className="relative overflow-hidden group">
      <div
        className="flex gap-6 animate-marquee-left group-hover:[animation-play-state:paused]"
        style={{ width: "max-content" }}
      >
        {duplicated.map((item, i) => (
          <div
            key={`${item.author}-${i}`}
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
    </div>
  );
}
