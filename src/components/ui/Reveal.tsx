"use client";

import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";
import { fadeUp, viewportOnce } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface RevealProps {
  children: ReactNode;
  variants?: Variants;
  className?: string;
  delay?: number;
  as?: "div" | "span";
}

export function Reveal({
  children,
  variants = fadeUp,
  className,
  delay = 0,
  as = "div",
}: RevealProps) {
  const Component = motion[as];
  const delayedVariants: Variants = {
    hidden: variants.hidden,
    show: {
      ...(variants.show as object),
      transition: {
        ...((variants.show as { transition?: object })?.transition ?? {}),
        delay,
      },
    },
  };
  return (
    <Component
      initial="hidden"
      whileInView="show"
      viewport={viewportOnce}
      variants={delayedVariants}
      className={cn(className)}
    >
      {children}
    </Component>
  );
}
