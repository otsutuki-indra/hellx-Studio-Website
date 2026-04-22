"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Plus, Zap, FileCode, Settings } from "lucide-react";

const actions = [
  {
    icon: Plus,
    label: "New Project",
    description: "Start a new creative project",
    href: "/dashboard/projects/new",
    variant: "primary" as const,
  },
  {
    icon: Zap,
    label: "AI Assistant",
    description: "Open HELLX AI chat",
    href: "#",
    variant: "secondary" as const,
  },
  {
    icon: FileCode,
    label: "Templates",
    description: "Browse project templates",
    href: "/dashboard/templates",
    variant: "secondary" as const,
  },
  {
    icon: Settings,
    label: "Settings",
    description: "Manage your account",
    href: "/dashboard/settings",
    variant: "secondary" as const,
  },
];

export function QuickActions() {
  return (
    <GlassCard hoverEffect={false}>
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Quick Actions
      </h3>
      <div className="grid gap-3 sm:grid-cols-2">
        {actions.map((action, index) => (
          <motion.div
            key={action.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <NeonButton
              href={action.href}
              variant={action.variant}
              className="flex w-full items-center justify-start gap-3 text-left"
            >
              <action.icon className="h-5 w-5 shrink-0" />
              <div>
                <p className="font-medium">{action.label}</p>
                <p className="text-xs opacity-70">{action.description}</p>
              </div>
            </NeonButton>
          </motion.div>
        ))}
      </div>
    </GlassCard>
  );
}
