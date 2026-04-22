"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { Zap, FolderKanban, Clock, TrendingUp } from "lucide-react";
import useSWR from "swr";

interface StatsData {
  totalQueries: number;
  totalProjects: number;
  daysSinceJoined: number;
  queriesRemaining: number;
  queryLimit: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function StatsCards() {
  const { data, isLoading } = useSWR<StatsData>("/api/user/stats", fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  const stats = [
    {
      title: "AI Queries",
      value: data?.totalQueries?.toLocaleString() ?? "0",
      change: `${data?.queriesRemaining === Infinity ? "Unlimited" : `${data?.queriesRemaining ?? 0} remaining`}`,
      trend: "up" as const,
      icon: Zap,
      color: "blue" as const,
    },
    {
      title: "Projects",
      value: data?.totalProjects?.toString() ?? "0",
      change: "Active projects",
      trend: "up" as const,
      icon: FolderKanban,
      color: "purple" as const,
    },
    {
      title: "Member Since",
      value: `${data?.daysSinceJoined ?? 1}`,
      change: "days ago",
      trend: "up" as const,
      icon: Clock,
      color: "teal" as const,
    },
    {
      title: "Success Rate",
      value: "99.8%",
      change: "+0.3% this month",
      trend: "up" as const,
      icon: TrendingUp,
      color: "blue" as const,
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <GlassCard key={i} className="animate-pulse">
            <div className="flex items-start justify-between">
              <div>
                <div className="mb-2 h-4 w-20 rounded bg-white/10" />
                <div className="mb-2 h-8 w-16 rounded bg-white/10" />
                <div className="h-3 w-24 rounded bg-white/10" />
              </div>
              <div className="h-9 w-9 rounded-lg bg-white/10" />
            </div>
          </GlassCard>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
      variants={container}
      initial="hidden"
      animate="show"
    >
      {stats.map((stat) => (
        <motion.div key={stat.title} variants={item}>
          <GlassCard
            hoverEffect
            glowColor={stat.color}
            className="relative overflow-hidden"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="mt-1 text-2xl font-bold text-foreground">
                  {stat.value}
                </p>
                <p
                  className={`mt-1 text-xs font-medium ${
                    stat.trend === "up" ? "text-green-400" : "text-neon-blue"
                  }`}
                >
                  {stat.change}
                </p>
              </div>
              <div
                className={`rounded-lg p-2 ${
                  stat.color === "blue"
                    ? "bg-neon-blue/10 text-neon-blue"
                    : stat.color === "purple"
                      ? "bg-neon-purple/10 text-neon-purple"
                      : "bg-neon-teal/10 text-neon-teal"
                }`}
              >
                <stat.icon className="h-5 w-5" />
              </div>
            </div>
            {/* Decorative gradient */}
            <div
              className={`absolute -bottom-6 -right-6 h-24 w-24 rounded-full opacity-20 blur-2xl ${
                stat.color === "blue"
                  ? "bg-neon-blue"
                  : stat.color === "purple"
                    ? "bg-neon-purple"
                    : "bg-neon-teal"
              }`}
            />
          </GlassCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
