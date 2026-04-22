"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface NeonButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
}

export function NeonButton({
  children,
  variant = "primary",
  size = "md",
  href,
  className,
  ...props
}: NeonButtonProps) {
  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-6 py-3 text-base",
    lg: "px-8 py-4 text-lg",
  };

  const variantClasses = {
    primary: "neon-button",
    secondary: "neon-button-secondary",
  };

  const buttonContent = (
    <motion.button
      className={cn(
        "rounded-lg font-medium transition-all duration-300",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );

  if (href) {
    return <Link href={href}>{buttonContent}</Link>;
  }

  return buttonContent;
}
