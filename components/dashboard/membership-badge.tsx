"use client";

import { motion } from "framer-motion";
import { Crown, Sparkles, Infinity } from "lucide-react";
import { cn } from "@/lib/utils";

type PlanType = "free" | "pro" | "infinity";

interface MembershipBadgeProps {
  plan: PlanType;
  className?: string;
}

const planConfig = {
  free: {
    name: "Free",
    icon: Sparkles,
    className: "border-gray-500/30 bg-gray-500/10 text-gray-400",
    glowClass: "",
  },
  pro: {
    name: "Pro",
    icon: Crown,
    className:
      "border-yellow-500/50 bg-gradient-to-r from-yellow-500/20 to-amber-500/20 text-yellow-400",
    glowClass: "shadow-lg shadow-yellow-500/20 animate-pulse",
  },
  infinity: {
    name: "Level Infinity",
    icon: Infinity,
    className:
      "border-neon-blue/50 bg-gradient-to-r from-neon-blue/20 to-neon-teal/20 text-neon-blue",
    glowClass: "shadow-lg shadow-neon-blue/30",
  },
};

export function MembershipBadge({ plan, className }: MembershipBadgeProps) {
  const config = planConfig[plan] || planConfig.free;
  const Icon = config.icon;

  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 py-1.5 text-sm font-medium",
        config.className,
        config.glowClass,
        className
      )}
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.05 }}
    >
      <Icon className="h-4 w-4" />
      <span>{config.name}</span>
      {plan === "infinity" && (
        <motion.div
          className="absolute inset-0 rounded-full"
          animate={{
            boxShadow: [
              "0 0 10px rgba(0, 212, 255, 0.3)",
              "0 0 20px rgba(0, 212, 255, 0.5)",
              "0 0 10px rgba(0, 212, 255, 0.3)",
            ],
          }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
