"use client";

import { motion } from "framer-motion";
import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  className?: string;
  as?: "a" | "button";
  target?: string;
  rel?: string;
}

export function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  className,
  as,
  target,
  rel,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setPos({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => setPos({ x: 0, y: 0 });

  const Tag = (as ?? (href ? "a" : "button")) as "a" | "button";

  const baseClasses = cn(
    "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-8 py-4 text-sm font-bold transition-colors duration-300",
    variant === "primary"
      ? "bg-primary text-black shadow-glow hover:bg-primary-light"
      : "border border-white/20 bg-white/5 text-white backdrop-blur hover:border-primary/60 hover:bg-primary/10",
    className
  );

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className="inline-block"
      data-cursor="hover"
    >
      <Tag
        href={href}
        onClick={onClick}
        target={target}
        rel={rel}
        className={baseClasses}
      >
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
        {variant === "primary" && (
          <span className="absolute inset-0 -z-0 translate-y-full bg-white/20 transition-transform duration-500 group-hover:translate-y-0" />
        )}
      </Tag>
    </motion.div>
  );
}
