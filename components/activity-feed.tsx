'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export interface ActivityItem {
  id: string;
  type: 'query' | 'conversation' | 'purchase' | 'system';
  title: string;
  description: string;
  timestamp: number;
  icon: string;
}

interface ActivityFeedProps {
  maxItems?: number;
}

export function ActivityFeed({ maxItems = 6 }: ActivityFeedProps) {
  const [activities, setActivities] = useState<ActivityItem[]>([
    {
      id: '1',
      type: 'query',
      title: 'New AI Query',
      description: 'Processed request with HellV1 model',
      timestamp: Date.now(),
      icon: '🚀',
    },
    {
      id: '2',
      type: 'conversation',
      title: 'Conversation Started',
      description: 'New conversation about design patterns',
      timestamp: Date.now() - 300000,
      icon: '💬',
    },
    {
      id: '3',
      type: 'system',
      title: 'System Update',
      description: 'Improved response latency by 15%',
      timestamp: Date.now() - 600000,
      icon: '⚡',
    },
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newActivity: ActivityItem = {
        id: Date.now().toString(),
        type: ['query', 'conversation', 'system'][Math.floor(Math.random() * 3)] as any,
        title: ['New AI Query', 'Conversation Started', 'System Update'][Math.floor(Math.random() * 3)],
        description: 'Real-time activity update',
        timestamp: Date.now(),
        icon: ['🚀', '💬', '⚡'][Math.floor(Math.random() * 3)],
      };

      setActivities((prev) => [newActivity, ...prev].slice(0, maxItems));
    }, 8000);

    return () => clearInterval(interval);
  }, [maxItems]);

  const getTypeColor = (type: string) => {
    const colors: Record<string, string> = {
      query: 'from-[#A020F0] to-[#7B2CBF]',
      conversation: 'from-[#FF006E] to-[#FF1744]',
      purchase: 'from-[#FFD700] to-[#FFA500]',
      system: 'from-[#00D9FF] to-[#0099CC]',
    };
    return colors[type] || 'from-[#A020F0] to-[#7B2CBF]';
  };

  const formatTime = (timestamp: number) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    return `${Math.floor(seconds / 3600)}h ago`;
  };

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-foreground">Live Activity Feed</h3>

      <div className="space-y-2 max-h-96 overflow-y-auto">
        <AnimatePresence>
          {activities.map((activity, idx) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="group relative p-3 rounded-lg border border-[#A020F0]/20 bg-[#050505]/50 hover:border-[#A020F0] hover:bg-[#050505]/70 transition-all overflow-hidden"
            >
              {/* Animated gradient background on hover */}
              <div
                className={`absolute inset-0 opacity-0 group-hover:opacity-10 blur-xl pointer-events-none bg-gradient-to-r ${getTypeColor(activity.type)}`}
              />

              <div className="relative z-10 flex items-start gap-3">
                <div className="text-lg mt-0.5">{activity.icon}</div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <p className="text-sm font-medium text-foreground truncate">
                        {activity.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {activity.description}
                      </p>
                    </div>
                  </div>
                </div>
                <span className="text-xs text-muted-foreground whitespace-nowrap">
                  {formatTime(activity.timestamp)}
                </span>
              </div>

              {/* Status indicator */}
              <motion.div
                className={`absolute top-1 right-1 w-2 h-2 rounded-full bg-gradient-to-r ${getTypeColor(activity.type)}`}
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
