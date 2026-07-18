"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { testimonials } from "@/data/testimonials";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(
    () => setIndex((i) => (i + 1) % testimonials.length),
    []
  );
  const prev = () =>
    setIndex((i) => (i - 1 + testimonials.length) % testimonials.length);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [paused, next]);

  const t = testimonials[index];

  return (
    <section id="testimonials" className="relative py-28">
      <div className="mx-auto max-w-4xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="آراء العملاء"
          title="ماذا يقول"
          highlight="عملائي"
          description="ثقة عملائي هي أكبر دليل على جودة العمل والالتزام في كل مشروع."
        />

        <div
          className="relative mt-14"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-surface/60 p-8 backdrop-blur-sm sm:p-12">
            <Quote className="mx-auto text-primary/40" size={40} />
            <AnimatePresence mode="wait">
              <motion.div
                key={t.id}
                initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-6 text-center"
              >
                <p className="text-lg leading-relaxed text-white sm:text-xl">
                  “{t.quote}”
                </p>
                <div className="mt-6 flex items-center justify-center gap-1">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-primary text-primary" />
                  ))}
                </div>
                <div className="mt-6 flex items-center justify-center gap-3">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                    <Image src={t.avatar} alt={t.name} fill className="object-cover" />
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-white">{t.name}</p>
                    <p className="text-xs text-muted">
                      {t.role} — {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <button
            onClick={prev}
            aria-label="السابق"
            data-cursor="hover"
            className="absolute -right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-bg-soft text-white shadow-card transition-colors hover:border-primary hover:text-primary sm:-right-6"
          >
            <ChevronRight size={18} />
          </button>
          <button
            onClick={next}
            aria-label="التالي"
            data-cursor="hover"
            className="absolute -left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-white/15 bg-bg-soft text-white shadow-card transition-colors hover:border-primary hover:text-primary sm:-left-6"
          >
            <ChevronLeft size={18} />
          </button>

          <div className="mt-8 flex items-center justify-center gap-2">
            {testimonials.map((item, i) => (
              <button
                key={item.id}
                onClick={() => setIndex(i)}
                aria-label={`الانتقال إلى رأي ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-8 bg-primary" : "w-1.5 bg-white/20"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
