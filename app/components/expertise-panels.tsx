"use client";

import { motion } from "motion/react";
import { Link } from "@/i18n/navigation";
import { ArrowRight } from "lucide-react";

interface ExpertisePanel {
  slug: string;
  title: string;
  description: string;
  services: { slug: string; title: string }[];
}

const ease = [0.16, 1, 0.3, 1] as const;
const viewport = { once: true, amount: 0.3 } as const;

export function ExpertisePanels({
  panels,
}: {
  panels: ExpertisePanel[];
}) {
  return (
    <div className="flex flex-col gap-6">
      {panels.map((panel, i) => (
        <motion.div
          key={panel.slug}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.7, delay: i * 0.25, ease }}
          className="flex flex-col rounded-2xl border border-black/5 p-8"
        >
          {/* Title */}
          <h3 className="text-xl font-medium tracking-tight">{panel.title}</h3>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: i * 0.25 + 0.2, ease }}
            className="mt-3 text-muted-foreground leading-relaxed"
          >
            {panel.description}
          </motion.p>

          {/* Service tags */}
          <div className="mt-6 flex flex-wrap gap-2">
            {panel.services.map((svc, si) => (
              <motion.span
                key={svc.slug}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={viewport}
                transition={{ duration: 0.3, delay: i * 0.25 + 0.3 + si * 0.05, ease }}
                className="rounded-full border border-border px-3 py-1 text-xs text-muted-foreground"
              >
                {svc.title}
              </motion.span>
            ))}
          </div>

          {/* Arrow link */}
          <div className="mt-8">
            <Link
              href={`/services/${panel.slug}`}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
              aria-label={panel.title}
            >
              <ArrowRight size={16} />
            </Link>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
