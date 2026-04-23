'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Folder,
  Zap,
  Settings,
  ChevronLeft,
  ChevronRight,
  Activity,
  MessageSquare,
  Zap as ZapIcon,
  CheckCircle,
  User,
  Star,
  TrendingUp,
  Clock,
} from 'lucide-react';

// ============ SIDEBAR NAVIGATION ============
const navItems = [
  { icon: LayoutDashboard, label: 'Overview', id: 'overview' },
  { icon: Folder, label: 'Projects', id: 'projects' },
  { icon: ZapIcon, label: 'AI Tools', id: 'tools' },
  { icon: Settings, label: 'Settings', id: 'settings' },
];

// ============ ACTIVITY DATA ============
const activityLog = [
  {
    id: 1,
    action: 'New AI Model Initialized',
    timestamp: '2 min ago',
    icon: '🚀',
  },
  {
    id: 2,
    action: 'Training Cycle Completed',
    timestamp: '15 min ago',
    icon: '✅',
  },
  {
    id: 3,
    action: 'Neural Network Optimized',
    timestamp: '1 hour ago',
    icon: '⚡',
  },
  {
    id: 4,
    action: 'Quantum Processing Active',
    timestamp: '3 hours ago',
    icon: '🔬',
  },
  {
    id: 5,
    action: 'System Update Deployed',
    timestamp: '5 hours ago',
    icon: '🔧',
  },
];

// ============ STAT CARD COMPONENT ============
interface StatCardProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  color: 'purple' | 'pink' | 'cyan' | 'green';
}

function StatCard({ icon, label, value, unit, trend, color }: StatCardProps) {
  const colorMap = {
    purple: {
      border: 'border-purple-500/30 hover:border-[#A020F0]',
      glow: 'shadow-[0_0_20px_rgba(160,32,240,0.2)]',
      text: 'text-[#A020F0]',
    },
    pink: {
      border: 'border-pink-500/30 hover:border-pink-400',
      glow: 'shadow-[0_0_20px_rgba(236,72,153,0.2)]',
      text: 'text-pink-400',
    },
    cyan: {
      border: 'border-cyan-500/30 hover:border-cyan-400',
      glow: 'shadow-[0_0_20px_rgba(34,211,238,0.2)]',
      text: 'text-cyan-400',
    },
    green: {
      border: 'border-green-500/30 hover:border-green-400',
      glow: 'shadow-[0_0_20px_rgba(34,197,94,0.2)]',
      text: 'text-green-400',
    },
  };

  const colors = colorMap[color];

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -2 }}
      className={`relative p-6 rounded-lg border ${colors.border} bg-[#050505] backdrop-blur-md ${colors.glow} transition-all duration-300 group`}
    >
      {/* Animated background gradient */}
      <div
        className={`absolute inset-0 rounded-lg opacity-0 blur-xl group-hover:opacity-10 pointer-events-none bg-gradient-to-br ${
          color === 'purple'
            ? 'from-[#A020F0] to-purple-900'
            : color === 'pink'
            ? 'from-pink-500 to-pink-900'
            : color === 'cyan'
            ? 'from-cyan-500 to-cyan-900'
            : 'from-green-500 to-green-900'
        }`}
      />

      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-lg bg-[#0a0a0a] border ${colors.border}`}>
            <div className={colors.text}>{icon}</div>
          </div>
          {trend && (
            <div
              className={`text-xs font-semibold px-2 py-1 rounded-full ${
                trend > 0
                  ? 'bg-green-500/20 text-green-400'
                  : 'bg-red-500/20 text-red-400'
              }`}
            >
              {trend > 0 ? '+' : ''}{trend}%
            </div>
          )}
        </div>

        <p className="text-xs text-gray-400 mb-2">{label}</p>
        <div className="flex items-baseline gap-2">
          <span className={`text-3xl font-bold ${colors.text}`}>{value}</span>
          {unit && <span className="text-xs text-gray-500">{unit}</span>}
        </div>
      </div>
    </motion.div>
  );
}

// ============ MAIN DASHBOARD COMPONENT ============
export default function CyberLabDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeNav, setActiveNav] = useState('overview');

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      {/* ============ HEADER ============ */}
      <div className="fixed top-0 left-0 right-0 z-40 border-b border-[#A020F0]/20 bg-[#050505]/80 backdrop-blur-md">
        <div className="flex items-center justify-between px-8 py-4">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-[#A020F0]/10 rounded-lg transition"
            >
              {sidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
            </button>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#A020F0] to-pink-500 bg-clip-text text-transparent">
                HELLX STUDIO
              </h1>
              <p className="text-xs text-gray-400">Cyber-Laboratory Interface</p>
            </div>
          </div>
          <div className="text-sm text-gray-400">System Status: <span className="text-green-400">● ONLINE</span></div>
        </div>
      </div>

      <div className="flex h-full pt-20">
        {/* ============ SIDEBAR ============ */}
        <motion.div
          animate={{ width: sidebarOpen ? 280 : 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 top-20 bottom-0 border-r border-[#A020F0]/20 bg-[#0a0a0a]/80 backdrop-blur-md overflow-hidden z-30"
        >
          <div className="p-6 space-y-2">
            {navItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveNav(item.id)}
                whileHover={{ x: 4 }}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  activeNav === item.id
                    ? 'bg-[#A020F0]/20 border border-[#A020F0] text-[#A020F0]'
                    : 'text-gray-400 hover:text-white hover:bg-[#A020F0]/10'
                }`}
              >
                <item.icon size={20} />
                <span className="font-medium">{item.label}</span>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* ============ MAIN CONTENT ============ */}
        <div
          className={`flex-1 transition-all duration-300 ${
            sidebarOpen ? 'ml-[280px]' : 'ml-0'
          }`}
        >
          <div className="p-8 space-y-8">
            {/* ============ METRICS CARDS ============ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              <StatCard
                icon={<Zap size={24} />}
                label="AI Queries"
                value="2,847"
                trend={12}
                color="purple"
              />
              <StatCard
                icon={<MessageSquare size={24} />}
                label="Total Conversations"
                value="342"
                trend={8}
                color="pink"
              />
              <StatCard
                icon={<Clock size={24} />}
                label="Response Time"
                value="1.2"
                unit="s"
                trend={-5}
                color="cyan"
              />
              <StatCard
                icon={<CheckCircle size={24} />}
                label="Success Rate"
                value="99.8"
                unit="%"
                color="green"
              />
            </motion.div>

            {/* ============ MAIN GRID ============ */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* ============ ACTIVITY FEED ============ */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="lg:col-span-2 rounded-lg border border-[#A020F0]/20 bg-[#0a0a0a] p-6 shadow-[0_0_20px_rgba(160,32,240,0.1)]"
              >
                <div className="flex items-center gap-3 mb-6">
                  <Activity className="text-[#A020F0]" size={24} />
                  <h2 className="text-xl font-bold">Recent Activity</h2>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {activityLog.map((item, index) => (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ delay: index * 0.05 }}
                        className="group flex items-center gap-4 p-4 rounded-lg border border-transparent hover:border-[#A020F0]/30 bg-[#050505]/50 hover:bg-[#050505] transition"
                      >
                        <div className="text-2xl">{item.icon}</div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-white">
                            {item.action}
                          </p>
                          <p className="text-xs text-gray-500">{item.timestamp}</p>
                        </div>
                        <motion.div
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="w-2 h-2 rounded-full bg-[#A020F0]"
                        />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* ============ USER PROFILE CARD ============ */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="rounded-lg border border-[#A020F0]/20 bg-[#0a0a0a] p-6 shadow-[0_0_20px_rgba(160,32,240,0.1)] flex flex-col h-fit"
              >
                {/* Avatar */}
                <div className="flex justify-center mb-6">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="relative"
                  >
                    <div className="w-24 h-24 rounded-full border-2 border-[#A020F0] bg-gradient-to-br from-[#A020F0]/20 to-pink-500/20 flex items-center justify-center">
                      <User size={48} className="text-[#A020F0]" />
                    </div>
                    <motion.div
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="absolute bottom-0 right-0 w-6 h-6 rounded-full bg-green-500 border-2 border-[#050505]"
                    />
                  </motion.div>
                </div>

                {/* User Info */}
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold mb-1">Alex Chen</h3>
                  <p className="text-sm text-gray-400">Senior AI Engineer</p>
                </div>

                {/* Rank */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className="mb-6 p-4 rounded-lg border border-[#A020F0]/30 bg-gradient-to-br from-[#A020F0]/10 to-transparent text-center"
                >
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Star className="text-yellow-400" size={18} />
                    <p className="font-bold text-[#A020F0]">ELITE PIONEER</p>
                    <Star className="text-yellow-400" size={18} />
                  </div>
                  <p className="text-xs text-gray-400">Tier 5 - Legendary</p>
                </motion.div>

                {/* XP Progress */}
                <div className="space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Experience Points</span>
                    <span className="font-bold text-[#A020F0]">8,240 / 10,000</span>
                  </div>

                  <div className="relative h-2 rounded-full bg-[#050505] border border-[#A020F0]/20 overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: '82.4%' }}
                      transition={{ duration: 1 }}
                      className="h-full bg-gradient-to-r from-[#A020F0] to-pink-500 shadow-[0_0_10px_rgba(160,32,240,0.6)]"
                    />
                  </div>

                  <div className="flex justify-between text-xs text-gray-500">
                    <span>Level 42</span>
                    <span>1,760 XP to next level</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-6 pt-6 border-t border-[#A020F0]/20 space-y-3">
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Total Queries</span>
                    <span className="text-[#A020F0] font-semibold">12,847</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Win Streak</span>
                    <span className="text-green-400 font-semibold">127 days</span>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-400">Credits</span>
                    <span className="text-pink-400 font-semibold">5,480</span>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* ============ BOTTOM SECTION ============ */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-lg border border-[#A020F0]/20 bg-[#0a0a0a] p-6 shadow-[0_0_20px_rgba(160,32,240,0.1)]"
            >
              <div className="flex items-center gap-3 mb-6">
                <TrendingUp className="text-[#A020F0]" size={24} />
                <h2 className="text-xl font-bold">System Performance</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { label: 'CPU Usage', value: '34%', color: 'from-cyan-500' },
                  { label: 'Memory Usage', value: '62%', color: 'from-pink-500' },
                  { label: 'Bandwidth', value: '78%', color: 'from-[#A020F0]' },
                ].map((stat) => (
                  <div key={stat.label} className="space-y-2">
                    <p className="text-sm text-gray-400">{stat.label}</p>
                    <div className="relative h-3 rounded-full bg-[#050505] border border-[#A020F0]/20 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: stat.value }}
                        transition={{ duration: 1 }}
                        className={`h-full bg-gradient-to-r ${stat.color} to-transparent shadow-lg`}
                      />
                    </div>
                    <p className="text-sm font-semibold text-right">{stat.value}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}
