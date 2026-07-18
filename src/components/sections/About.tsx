"use client";

import { motion } from "framer-motion";
import { Compass, Heart, Rocket, Target } from "lucide-react";
import Image from "next/image";
import { Reveal } from "@/components/ui/Reveal";
import { GlowCard } from "@/components/ui/GlowCard";
import { staggerContainer, fadeUp, viewportOnce, slideInLeft, slideInRight } from "@/lib/motion";

const values = [
  {
    icon: Target,
    title: "قصتي",
    text: "بدأت رحلتي في التصميم شغفًا بتحويل الأفكار إلى صور تحكي قصصًا، وتطورت اليوم لأصبح شريكًا إبداعيًا للعلامات التجارية الطموحة.",
  },
  {
    icon: Rocket,
    title: "خبرتي",
    text: "أكثر من 7 سنوات في تصميم الهويات البصرية والحملات الرقمية لعملاء محليين وعالميين في قطاعات متنوعة.",
  },
  {
    icon: Compass,
    title: "رؤيتي",
    text: "أن أكون الخيار الأول للعلامات التجارية التي تبحث عن هوية بصرية استثنائية تدمج الإبداع بالتقنية والذكاء الاصطناعي.",
  },
  {
    icon: Heart,
    title: "قيمتي",
    text: "الجودة، الالتزام، والشفافية هي أساس كل مشروع أعمل عليه، مع حرص دائم على تجاوز توقعات عملائي.",
  },
];

export function About() {
  return (
    <section id="about" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-2">
          <motion.div
            variants={slideInRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="relative mx-auto aspect-square w-full max-w-md order-2 lg:order-1"
          >
            <div className="absolute -inset-4 rounded-[2rem] bg-primary/15 blur-3xl" />
            <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface">
              <Image
                src="/images/about-portrait.svg"
                alt="نبذة عن علام المطري"
                fill
                className="object-cover"
              />
            </div>
            <div className="absolute -bottom-6 right-1/2 translate-x-1/2 rounded-2xl border border-white/10 bg-surface/95 px-6 py-4 text-center shadow-card backdrop-blur-md">
              <p className="font-arabic text-lg font-bold text-white">علام المطري</p>
              <p className="text-xs text-primary">مصمم جرافيك ومبدع رقمي</p>
            </div>
          </motion.div>

          <motion.div
            variants={slideInLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOnce}
            className="order-1 text-center lg:order-2 lg:text-right"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-sm font-medium text-primary">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" />
              نبذة عني
            </span>
            <h2 className="mt-5 text-3xl font-bold leading-tight text-white sm:text-4xl">
              من هو <span className="text-primary">علام المطري</span>؟
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">
              مصمم جرافيك سعودي ومبدع بالذكاء الاصطناعي، أساعد العلامات
              التجارية على بناء حضور بصري قوي عبر الهوية البصرية، المحتوى
              الرقمي، والحملات التسويقية. أؤمن بأن التصميم الجيد ليس مجرد
              شكل جميل، بل أداة استراتيجية تصنع الفرق الحقيقي في نمو
              الأعمال.
            </p>
          </motion.div>
        </div>

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-20 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {values.map((value) => (
            <motion.div key={value.title} variants={fadeUp}>
              <GlowCard className="h-full p-7 text-center">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                  <value.icon size={22} />
                </div>
                <h3 className="mt-4 text-base font-bold text-white">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">
                  {value.text}
                </p>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
