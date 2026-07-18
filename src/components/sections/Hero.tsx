"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Play, Sparkles } from "lucide-react";
import Image from "next/image";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { siteConfig } from "@/data/site";

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[100svh] items-center overflow-hidden pt-28 sm:pt-32"
    >
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 sm:px-8 lg:grid-cols-2 lg:gap-8">
        <div className="order-2 text-center lg:order-1 lg:text-right">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary lg:mx-0"
          >
            <Sparkles size={14} />
            متاح لمشاريع جديدة 2026
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="font-arabic mt-6 text-4xl font-extrabold leading-[1.15] text-white sm:text-5xl md:text-6xl"
          >
            أبني هويات بصرية
            <br />
            تجعل علامتك <span className="text-primary">تتميز</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-muted sm:text-lg lg:mx-0"
          >
            أنا علام المطري، مصمم جرافيك ومبدع رقمي أدمج بين الإبداع البصري
            وأدوات الذكاء الاصطناعي لأصنع هويات وحملات تسويقية تترك أثرًا
            حقيقيًا لعملائي.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
          >
            <MagneticButton href="#contact">
              ابدأ مشروعك
              <ArrowLeft size={16} />
            </MagneticButton>
            <MagneticButton href="#portfolio" variant="ghost">
              <Play size={16} />
              شاهد أعمالي
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto mt-12 flex max-w-md items-center justify-center gap-8 lg:mx-0 lg:justify-start"
          >
            {siteConfig.stats.slice(0, 3).map((stat) => (
              <div key={stat.id} className="text-center lg:text-right">
                <p className="text-2xl font-extrabold text-white">
                  {stat.value}
                  {stat.suffix}
                </p>
                <p className="mt-1 text-xs text-muted">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative order-1 mx-auto aspect-[4/5] w-full max-w-xs sm:max-w-md lg:order-2"
        >
          <div className="absolute -inset-6 rounded-[2.5rem] bg-primary/20 blur-3xl animate-pulse-glow" />
          <div className="relative h-full w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-surface shadow-card">
            <Image
              src="/images/hero-portrait.svg"
              alt="علام المطري - مصمم جرافيك"
              fill
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent" />
          </div>

          <motion.div
            animate={{ y: [0, -14, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-1 top-10 rounded-2xl border border-white/10 bg-surface/90 px-4 py-2.5 text-center shadow-card backdrop-blur-md sm:-right-6 sm:px-5 sm:py-3"
          >
            <p className="text-lg font-extrabold text-primary sm:text-xl">
              {siteConfig.stats[0].value}+
            </p>
            <p className="text-[11px] text-muted">مشروع منجز</p>
          </motion.div>

          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
            className="absolute left-1 bottom-16 rounded-2xl border border-white/10 bg-surface/90 px-4 py-2.5 text-center shadow-card backdrop-blur-md sm:-left-8 sm:px-5 sm:py-3"
          >
            <p className="text-lg font-extrabold text-primary sm:text-xl">
              {siteConfig.stats[1].value}+
            </p>
            <p className="text-[11px] text-muted">عميل سعيد</p>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 sm:flex"
      >
        <span className="text-xs text-muted">مرر للأسفل</span>
        <div className="h-9 w-5 rounded-full border border-white/25 p-1">
          <motion.div
            animate={{ y: [0, 14, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="h-1.5 w-1.5 rounded-full bg-primary"
          />
        </div>
      </motion.div>
    </section>
  );
}
