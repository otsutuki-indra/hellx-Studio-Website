"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { MessageSquare, Zap, FileCode, User, Activity } from "lucide-react";
import useSWR from "swr";
import { formatDistanceToNow } from "date-fns";

interface ActivityItem {
  id: number;
  type: string;
  description: string;
  createdAt: string;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const iconMap: Record<string, typeof MessageSquare> = {
  chat: MessageSquare,
  ai: Zap,
  project: FileCode,
  profile: User,
  login: Activity,
};

const colorMap: Record<string, string> = {
  chat: "bg-neon-purple/10 text-neon-purple",
  ai: "bg-neon-blue/10 text-neon-blue",
  project: "bg-neon-teal/10 text-neon-teal",
  profile: "bg-white/5 text-muted-foreground",
  login: "bg-green-500/10 text-green-500",
};

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { opacity: 1, x: 0 },
};

export function ActivityFeed() {
  const { data: activities, isLoading } = useSWR<ActivityItem[]>(
    "/api/user/activities",
    fetcher,
    { refreshInterval: 30000 }
  );

  // Fallback activities when no data
  const defaultActivities = [
    {
      id: 1,
      type: "login",
      description: "Welcome to HELLX STUDIO!",
      createdAt: new Date().toISOString(),
    },
  ];

  const displayActivities = activities?.length ? activities : defaultActivities;

  return (
    <GlassCard hoverEffect={false} className="h-full">
      <h3 className="mb-4 text-lg font-semibold text-foreground">
        Recent Activity
      </h3>

      {isLoading ? (
        <div className="flex flex-col gap-4">
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              className="flex animate-pulse items-start gap-3 border-b border-white/5 pb-4 last:border-0"
            >
              <div className="h-8 w-8 rounded-lg bg-white/10" />
              <div className="flex-1">
                <div className="mb-2 h-4 w-3/4 rounded bg-white/10" />
                <div className="h-3 w-1/4 rounded bg-white/10" />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <motion.div
          className="flex flex-col gap-4"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {displayActivities.map((activity) => {
            const Icon = iconMap[activity.type] || Activity;
            const colorClass = colorMap[activity.type] || colorMap.profile;
            const timeAgo = activity.createdAt
              ? formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })
              : "just now";

            return (
              <motion.div
                key={activity.id}
                variants={item}
                className="flex items-start gap-3 border-b border-white/5 pb-4 last:border-0 last:pb-0"
              >
                <div className={`rounded-lg p-2 ${colorClass}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1">
                  <p className="text-sm text-foreground">{activity.description}</p>
                  <p className="text-xs text-muted-foreground">{timeAgo}</p>
                </div>
              </motion.div>
            );
          })}

          {displayActivities.length === 0 && (
            <div className="py-8 text-center">
              <Activity className="mx-auto mb-2 h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">No recent activity</p>
            </div>
          )}
        </motion.div>
      )}
    </GlassCard>
  );
}
