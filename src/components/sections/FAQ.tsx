"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Plus } from "lucide-react";
import { useState } from "react";
import { faqItems } from "@/data/faq";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<string | null>(faqItems[0]?.id ?? null);

  return (
    <section id="faq" className="relative py-28">
      <div className="mx-auto max-w-3xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="الأسئلة الشائعة"
          title="لديك"
          highlight="أسئلة؟"
          description="إجابات على أكثر الأسئلة شيوعًا حول طريقة العمل والخدمات المقدمة."
        />

        <div className="mt-14 flex flex-col gap-3">
          {faqItems.map((item) => {
            const isOpen = open === item.id;
            return (
              <Reveal key={item.id}>
                <div
                  className={cn(
                    "overflow-hidden rounded-2xl border transition-colors duration-300",
                    isOpen
                      ? "border-primary/40 bg-primary/5"
                      : "border-white/10 bg-surface/50"
                  )}
                >
                  <button
                    onClick={() => setOpen(isOpen ? null : item.id)}
                    data-cursor="hover"
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-right"
                  >
                    <span className="text-base font-semibold text-white">
                      {item.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.3 }}
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary"
                    >
                      <Plus size={16} />
                    </motion.span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                      >
                        <p className="px-6 pb-6 text-sm leading-relaxed text-muted">
                          {item.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
