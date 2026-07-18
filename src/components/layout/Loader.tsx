"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";

export function Loader() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const interval = setInterval(() => {
      setProgress((p) => {
        const next = Math.min(p + Math.random() * 18 + 6, 100);
        if (next >= 100) clearInterval(interval);
        return next;
      });
    }, 140);

    const timeout = setTimeout(() => {
      setLoading(false);
      document.body.style.overflow = "";
    }, 1800);

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          className="fixed inset-0 z-[10000] flex flex-col items-center justify-center gap-6 bg-bg"
          exit={{
            opacity: 0,
            transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="font-arabic text-4xl font-extrabold tracking-tight text-white sm:text-5xl"
          >
            علام <span className="text-primary">المطري</span>
          </motion.div>
          <div className="h-[2px] w-56 overflow-hidden rounded-full bg-white/10">
            <motion.div
              className="h-full bg-primary shadow-glow-sm"
              style={{ width: `${progress}%` }}
              transition={{ ease: "easeOut" }}
            />
          </div>
          <span className="font-mono text-xs tracking-widest text-muted">
            {Math.floor(progress)}%
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
