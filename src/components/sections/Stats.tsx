"use client";

import { useCountUp } from "@/hooks/useCountUp";
import { siteConfig } from "@/data/site";
import { Reveal } from "@/components/ui/Reveal";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import { motion } from "framer-motion";

function StatItem({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const { ref, value: current } = useCountUp(value);
  return (
    <div className="text-center">
      <p className="font-arabic text-4xl font-extrabold text-white sm:text-5xl">
        <span ref={ref}>{current}</span>
        <span className="text-primary">{suffix}</span>
      </p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  );
}

export function Stats() {
  return (
    <section className="relative border-y border-white/10 bg-bg-soft/60 py-16">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.12)}
          className="grid grid-cols-2 gap-10 sm:grid-cols-4"
        >
          {siteConfig.stats.map((stat) => (
            <Reveal key={stat.id}>
              <StatItem
                value={stat.value}
                suffix={stat.suffix}
                label={stat.label}
              />
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
