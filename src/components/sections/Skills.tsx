"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { skills } from "@/data/skills";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

type IconName = keyof typeof Icons;

export function Skills() {
  return (
    <section id="skills" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="أدواتي"
          title="المهارات"
          highlight="والأدوات"
          description="أوظّف مجموعة متكاملة من أدوات التصميم والذكاء الاصطناعي والتطوير لتقديم نتائج احترافية."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.05)}
          className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6"
        >
          {skills.map((skill) => {
            const Icon = Icons[skill.icon as IconName] as Icons.LucideIcon;
            return (
              <motion.div
                key={skill.name}
                variants={fadeUp}
                whileHover={{ y: -6 }}
                data-cursor="hover"
                className="group flex flex-col items-center gap-3 rounded-2xl border border-white/10 bg-surface/60 px-4 py-7 text-center backdrop-blur-sm transition-colors duration-300 hover:border-primary/40"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110">
                  {Icon && <Icon size={22} />}
                </div>
                <span className="text-sm font-semibold text-white">
                  {skill.name}
                </span>
                <div className="h-1 w-full overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={viewportOnce}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full bg-primary"
                  />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
