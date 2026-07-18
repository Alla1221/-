"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Expand, X } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";
import { projects } from "@/data/projects";
import { categoryFilters, categoryLabels } from "@/data/categories";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { Project, ProjectCategory } from "@/types";
import { viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function Portfolio() {
  const [active, setActive] = useState<ProjectCategory | "all">("all");
  const [selected, setSelected] = useState<Project | null>(null);

  const filtered = useMemo(
    () =>
      active === "all"
        ? projects
        : projects.filter((project) => project.category === active),
    [active]
  );

  return (
    <section id="portfolio" className="relative py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="أعمالي"
          title="معرض"
          highlight="المشاريع"
          description="مجموعة مختارة من المشاريع التي صممتها لعملاء من قطاعات مختلفة."
        />

        <div className="mt-12 flex flex-wrap items-center justify-center gap-3">
          {categoryFilters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActive(filter.id)}
              data-cursor="hover"
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
                active === filter.id
                  ? "border-primary bg-primary text-black shadow-glow-sm"
                  : "border-white/15 text-muted hover:border-primary/50 hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <motion.div
          layout
          className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.94 }}
                whileInView="show"
                viewport={viewportOnce}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelected(project)}
                data-cursor="hover"
                className="group relative aspect-[4/5] cursor-pointer overflow-hidden rounded-3xl border border-white/10 bg-surface"
              >
                <Image
                  src={project.cover}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-95" />

                <div className="absolute inset-x-0 bottom-0 flex translate-y-4 flex-col gap-1 p-6 opacity-90 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <span className="w-fit rounded-full bg-primary/90 px-3 py-1 text-[11px] font-bold text-black">
                    {categoryLabels[project.category]}
                  </span>
                  <h3 className="mt-2 text-lg font-bold text-white">
                    {project.title}
                  </h3>
                  <p className="text-xs text-white/60">{project.client} — {project.year}</p>
                </div>

                <div className="absolute right-4 top-4 flex h-10 w-10 -translate-y-3 items-center justify-center rounded-full bg-white/10 text-white opacity-0 backdrop-blur transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                  <Expand size={16} />
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative grid w-full max-w-4xl grid-cols-1 overflow-hidden rounded-3xl border border-white/10 bg-surface md:grid-cols-2"
            >
              <button
                onClick={() => setSelected(null)}
                aria-label="إغلاق"
                className="absolute left-4 top-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/50 text-white backdrop-blur"
              >
                <X size={18} />
              </button>
              <div className="relative aspect-square md:aspect-auto">
                <Image
                  src={selected.cover}
                  alt={selected.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-col justify-center p-8">
                <span className="w-fit rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
                  {categoryLabels[selected.category]}
                </span>
                <h3 className="mt-4 text-2xl font-bold text-white">
                  {selected.title}
                </h3>
                <p className="mt-1 text-sm text-muted">
                  {selected.client} — {selected.year}
                </p>
                <p className="mt-4 text-sm leading-relaxed text-white/70">
                  {selected.description}
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {selected.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
