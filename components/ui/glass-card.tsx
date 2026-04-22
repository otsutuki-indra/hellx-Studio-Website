"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";

interface GlassCardProps extends Omit<HTMLMotionProps<"div">, "children"> {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
  glowColor?: "blue" | "purple" | "teal";
}

export function GlassCard({
  children,
  className,
  hoverEffect = true,
  glowColor = "blue",
  ...props
}: GlassCardProps) {
  const glowColors = {
    blue: "hover:shadow-[0_0_30px_rgba(0,212,255,0.15)]",
    purple: "hover:shadow-[0_0_30px_rgba(139,92,246,0.15)]",
    teal: "hover:shadow-[0_0_30px_rgba(6,182,212,0.15)]",
  };

  return (
    <motion.div
      className={cn(
        "glass-card rounded-xl p-6",
        hoverEffect && glowColors[glowColor],
        className
      )}
      whileHover={hoverEffect ? { scale: 1.02, y: -4 } : undefined}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      {...props}
    >
      {children}
    </motion.div>
  );
}
