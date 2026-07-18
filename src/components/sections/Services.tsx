"use client";

import * as Icons from "lucide-react";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { services } from "@/data/services";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

type IconName = keyof typeof Icons;

export function Services() {
  return (
    <section id="services" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="ماذا أقدم"
          title="خدمات تصميم"
          highlight="متكاملة"
          description="من الفكرة إلى التنفيذ، أقدم مجموعة شاملة من الخدمات الإبداعية التي تلبي احتياجات علامتك التجارية."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.08)}
          className="mt-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service) => {
            const Icon = Icons[service.icon as IconName] as Icons.LucideIcon;
            return (
              <motion.div key={service.id} variants={fadeUp}>
                <GlowCard className="h-full p-7">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary transition-transform duration-500 group-hover:scale-110 group-hover:bg-primary group-hover:text-black">
                    {Icon && <Icon size={22} />}
                  </div>
                  <h3 className="mt-5 text-lg font-bold text-white">
                    {service.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">
                    {service.description}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    اعرف المزيد
                    <ArrowLeft size={14} />
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
