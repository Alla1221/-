"use client";

import { motion } from "framer-motion";
import { Dribbble, Instagram, Linkedin, Mail, MessageCircle, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { GlowCard } from "@/components/ui/GlowCard";
import { Reveal } from "@/components/ui/Reveal";
import { siteConfig } from "@/data/site";

const contactChannels = [
  {
    icon: MessageCircle,
    label: "واتساب",
    value: siteConfig.whatsapp,
    href: `https://wa.me/${siteConfig.whatsapp.replace(/[^0-9]/g, "")}`,
  },
  {
    icon: Mail,
    label: "البريد الإلكتروني",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    icon: Instagram,
    label: "انستغرام",
    value: "@allam.design",
    href: siteConfig.social.instagram,
  },
  {
    icon: Linkedin,
    label: "لينكدإن",
    value: "علام المطري",
    href: siteConfig.social.linkedin,
  },
  {
    icon: Dribbble,
    label: "بيهانس",
    value: "allamalmutairi",
    href: siteConfig.social.behance,
  },
];

export function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <section id="contact" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="لنتواصل"
          title="لنبدأ"
          highlight="مشروعك القادم"
          description="أخبرني عن فكرتك وسأتواصل معك خلال 24 ساعة لمناقشة التفاصيل."
        />

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-5">
          <Reveal className="lg:col-span-2">
            <div className="flex h-full flex-col gap-4">
              {contactChannels.map((channel) => (
                <a
                  key={channel.label}
                  href={channel.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group flex items-center gap-4 rounded-2xl border border-white/10 bg-surface/60 p-5 backdrop-blur-sm transition-all duration-300 hover:border-primary/40 hover:bg-primary/5"
                >
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform duration-300 group-hover:scale-110">
                    <channel.icon size={20} />
                  </span>
                  <span>
                    <p className="text-xs text-muted">{channel.label}</p>
                    <p dir="ltr" className="mt-0.5 text-sm font-semibold text-white">
                      {channel.value}
                    </p>
                  </span>
                </a>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-3">
            <GlowCard className="p-8">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div className="sm:col-span-1">
                  <label className="mb-2 block text-sm text-muted">الاسم</label>
                  <input
                    required
                    type="text"
                    placeholder="اسمك الكامل"
                    className="w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-2 block text-sm text-muted">البريد الإلكتروني</label>
                  <input
                    required
                    type="email"
                    dir="ltr"
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-muted">نوع المشروع</label>
                  <input
                    type="text"
                    placeholder="هوية بصرية، سوشيال ميديا، موشن جرافيك..."
                    className="w-full rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm text-muted">تفاصيل المشروع</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="حدثني أكثر عن مشروعك وأهدافك..."
                    className="w-full resize-none rounded-xl border border-white/10 bg-bg/60 px-4 py-3 text-sm text-white placeholder:text-muted/60 outline-none transition-colors focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <MagneticButton as="button" className="w-full sm:w-auto">
                    إرسال الرسالة
                    <Send size={16} />
                  </MagneticButton>
                  {sent && (
                    <motion.p
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="mt-4 text-sm text-primary"
                    >
                      شكرًا لتواصلك! سأرد عليك في أقرب وقت ممكن.
                    </motion.p>
                  )}
                </div>
              </form>
            </GlowCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
