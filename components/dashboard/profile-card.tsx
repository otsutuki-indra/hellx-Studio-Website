"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import { useUser } from "@clerk/nextjs";
import { MembershipBadge } from "./membership-badge";
import Image from "next/image";
import useSWR from "swr";

interface UserStats {
  user: {
    planType: "free" | "pro" | "infinity";
  };
  totalQueries: number;
  totalProjects: number;
  daysSinceJoined: number;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function ProfileCard() {
  const { user, isLoaded } = useUser();
  const { data: stats } = useSWR<UserStats>("/api/user/stats", fetcher);

  if (!isLoaded) {
    return (
      <GlassCard hoverEffect={false} className="h-full animate-pulse">
        <div className="flex flex-col items-center text-center">
          <div className="mb-4 h-20 w-20 rounded-full bg-white/10" />
          <div className="mb-2 h-6 w-32 rounded bg-white/10" />
          <div className="h-4 w-48 rounded bg-white/10" />
        </div>
      </GlassCard>
    );
  }

  const planType = (stats?.user?.planType as "free" | "pro" | "infinity") || "free";

  return (
    <GlassCard hoverEffect={false} className="h-full">
      <motion.div
        className="flex flex-col items-center text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        {/* Avatar */}
        <div className="relative mb-4">
          <div className="h-20 w-20 overflow-hidden rounded-full ring-2 ring-neon-blue/30">
            {user?.imageUrl ? (
              <Image
                src={user.imageUrl}
                alt={user.fullName || "Profile"}
                width={80}
                height={80}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-neon-blue to-neon-purple">
                <span className="text-2xl font-bold text-background">
                  {user?.firstName?.[0] || "U"}
                </span>
              </div>
            )}
          </div>
          {/* Online indicator */}
          <div className="absolute -bottom-1 -right-1 rounded-full bg-background p-1">
            <div className="h-4 w-4 rounded-full bg-green-500 ring-2 ring-green-500/30" />
          </div>
        </div>

        {/* Name & Email */}
        <h3 className="mb-1 text-lg font-semibold text-foreground">
          {user?.fullName || "User"}
        </h3>
        <p className="mb-3 text-sm text-muted-foreground">
          {user?.primaryEmailAddress?.emailAddress}
        </p>

        {/* Plan Badge */}
        <MembershipBadge plan={planType} />

        {/* Stats */}
        <div className="mt-6 grid w-full grid-cols-3 gap-4 border-t border-white/5 pt-4">
          <div>
            <p className="text-lg font-bold text-foreground">
              {stats?.totalQueries ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Queries</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {stats?.totalProjects ?? 0}
            </p>
            <p className="text-xs text-muted-foreground">Projects</p>
          </div>
          <div>
            <p className="text-lg font-bold text-foreground">
              {stats?.daysSinceJoined ?? 1}
            </p>
            <p className="text-xs text-muted-foreground">Days</p>
          </div>
        </div>
      </motion.div>
    </GlassCard>
  );
}
