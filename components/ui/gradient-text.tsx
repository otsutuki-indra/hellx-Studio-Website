"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface GradientTextProps {
  children: React.ReactNode;
  className?: string;
  animated?: boolean;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}

export function GradientText({
  children,
  className,
  animated = false,
  as: Component = "span",
}: GradientTextProps) {
  return (
    <motion.span
      className={cn(
        animated ? "gradient-text-animated" : "gradient-text",
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <Component className="inline">{children}</Component>
    </motion.span>
  );
}
