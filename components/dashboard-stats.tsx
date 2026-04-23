'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

interface StatsCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  color: 'purple' | 'pink' | 'cyan' | 'green';
  isLoading?: boolean;
}

export function StatsCard({
  icon,
  label,
  value,
  unit,
  trend,
  color,
  isLoading,
}: StatsCardProps) {
  const colorMap = {
    purple: 'from-[#A020F0] to-[#7B2CBF]',
    pink: 'from-[#FF006E] to-[#FF1744]',
    cyan: 'from-[#00D9FF] to-[#0099CC]',
    green: 'from-[#00FF00] to-[#00CC00]',
  };

  const shadowMap = {
    purple: 'shadow-[0_0_20px_rgba(160,32,240,0.3)]',
    pink: 'shadow-[0_0_20px_rgba(255,0,110,0.3)]',
    cyan: 'shadow-[0_0_20px_rgba(0,217,255,0.3)]',
    green: 'shadow-[0_0_20px_rgba(0,255,0,0.3)]',
  };

  const borderMap = {
    purple: 'border-[#A020F0]/30 hover:border-[#A020F0]',
    pink: 'border-[#FF006E]/30 hover:border-[#FF006E]',
    cyan: 'border-[#00D9FF]/30 hover:border-[#00D9FF]',
    green: 'border-[#00FF00]/30 hover:border-[#00FF00]',
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: 'easeOut' },
    },
  };

  const pulse = {
    animate: {
      boxShadow: [
        `0 0 0 0 rgba(160, 32, 240, 0.7)`,
        `0 0 0 10px rgba(160, 32, 240, 0)`,
      ],
      transition: {
        duration: 2,
        repeat: Infinity,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className={`relative p-6 rounded-xl border ${borderMap[color]} bg-[#050505]/50 backdrop-blur-md transition-all duration-300 hover:bg-[#050505]/70 ${shadowMap[color]}`}
    >
      {/* Animated background gradient */}
      <motion.div
        className={`absolute inset-0 rounded-xl opacity-0 blur-xl pointer-events-none bg-gradient-to-br ${colorMap[color]}`}
        animate={{ opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <motion.div
            className={`p-3 rounded-lg bg-gradient-to-br ${colorMap[color]} text-white`}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            {icon}
          </motion.div>
          {trend && (
            <div className={`text-xs font-semibold px-2 py-1 rounded-full ${
              trend > 0
                ? 'bg-green-500/20 text-green-400'
                : 'bg-red-500/20 text-red-400'
            }`}>
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            {isLoading ? (
              <div className="h-8 w-16 bg-muted rounded animate-pulse" />
            ) : (
              <>
                <span className={`text-3xl font-bold bg-gradient-to-r ${colorMap[color]} bg-clip-text text-transparent`}>
                  {value}
                </span>
                {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
              </>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardStats({ isLoading = false }: { isLoading?: boolean }) {
  const [stats, setStats] = useState({
    queries: 1284,
    conversations: 48,
    responseTime: '1.2s',
    successRate: '99.8%',
  });

  useEffect(() => {
    // Real-time stats updates
    const interval = setInterval(() => {
      setStats((prev) => ({
        ...prev,
        queries: prev.queries + Math.floor(Math.random() * 5),
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        }
        label="AI Queries"
        value={stats.queries}
        color="purple"
        trend={12}
        isLoading={isLoading}
      />
      <StatsCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        }
        label="Conversations"
        value={stats.conversations}
        color="pink"
        trend={8}
        isLoading={isLoading}
      />
      <StatsCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        }
        label="Response Time"
        value={stats.responseTime}
        color="cyan"
        trend={-5}
        isLoading={isLoading}
      />
      <StatsCard
        icon={
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        }
        label="Success Rate"
        value={stats.successRate}
        color="green"
        isLoading={isLoading}
      />
    </div>
  );
}
