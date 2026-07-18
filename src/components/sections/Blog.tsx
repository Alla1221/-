"use client";

import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import { blogPosts } from "@/data/blog";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { GlowCard } from "@/components/ui/GlowCard";
import { staggerContainer, fadeUp, viewportOnce } from "@/lib/motion";

const formatter = new Intl.DateTimeFormat("ar-SA", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export function Blog() {
  return (
    <section id="blog" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="المدونة"
          title="لنستكشف"
          highlight="مقالاتي"
          description="أفكار ونصائح حول التصميم، الهوية البصرية، والذكاء الاصطناعي في عالم الإبداع."
        />

        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={viewportOnce}
          variants={staggerContainer(0.1)}
          className="mt-16 grid grid-cols-1 gap-6 md:grid-cols-3"
        >
          {blogPosts.map((post) => (
            <motion.div key={post.id} variants={fadeUp}>
              <GlowCard className="group h-full cursor-pointer" >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.cover}
                    alt={post.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute right-4 top-4 rounded-full bg-primary px-3 py-1 text-[11px] font-bold text-black">
                    {post.category}
                  </span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-xs text-muted">
                    <span className="flex items-center gap-1.5">
                      <Calendar size={13} />
                      {formatter.format(new Date(post.date))}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Clock size={13} />
                      {post.readTime}
                    </span>
                  </div>
                  <h3 className="mt-3 text-lg font-bold leading-snug text-white transition-colors group-hover:text-primary">
                    {post.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-semibold text-primary">
                    قراءة المزيد
                    <ArrowLeft size={14} />
                  </div>
                </div>
              </GlowCard>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
