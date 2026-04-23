import { motion } from "framer-motion";
import { useEffect, useState, type ReactNode } from "react";
import { Activity, MessageSquare, Zap, ShieldCheck } from "lucide-react";

type Color = "purple" | "pink" | "cyan" | "green";

const colorClasses: Record<Color, { grad: string; ring: string; glow: string; text: string }> = {
  purple: {
    grad: "from-[#a020f0] to-[#7b2cbf]",
    ring: "border-[#a020f0]/40 hover:border-[#a020f0]",
    glow: "shadow-[0_0_24px_-4px_rgba(160,32,240,0.55)]",
    text: "text-[#c98bff]",
  },
  pink: {
    grad: "from-[#ff006e] to-[#ff1744]",
    ring: "border-[#ff006e]/40 hover:border-[#ff006e]",
    glow: "shadow-[0_0_24px_-4px_rgba(255,0,110,0.55)]",
    text: "text-[#ff6aa3]",
  },
  cyan: {
    grad: "from-[#00d9ff] to-[#0099cc]",
    ring: "border-[#00d9ff]/40 hover:border-[#00d9ff]",
    glow: "shadow-[0_0_24px_-4px_rgba(0,217,255,0.55)]",
    text: "text-[#7fe5ff]",
  },
  green: {
    grad: "from-[#00ff88] to-[#00cc66]",
    ring: "border-[#00ff88]/40 hover:border-[#00ff88]",
    glow: "shadow-[0_0_24px_-4px_rgba(0,255,136,0.55)]",
    text: "text-[#7fffbb]",
  },
};

function StatsCard({
  icon,
  label,
  value,
  unit,
  trend,
  color,
}: {
  icon: ReactNode;
  label: string;
  value: string | number;
  unit?: string;
  trend?: number;
  color: Color;
}) {
  const c = colorClasses[color];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`relative p-5 rounded-xl border bg-[#0a0a12]/70 backdrop-blur-md transition-all duration-300 hover:bg-[#0a0a12]/90 ${c.ring} ${c.glow}`}
    >
      <motion.div
        className={`absolute inset-0 rounded-xl opacity-0 blur-2xl pointer-events-none bg-gradient-to-br ${c.grad}`}
        animate={{ opacity: [0.08, 0.18, 0.08] }}
        transition={{ duration: 3.5, repeat: Infinity }}
      />
      <div className="relative z-10 space-y-4">
        <div className="flex items-start justify-between">
          <div className={`p-2.5 rounded-lg bg-gradient-to-br ${c.grad} text-white`}>{icon}</div>
          {trend !== undefined && (
            <div
              className={`text-[10px] font-bold tracking-wider px-2 py-0.5 rounded-full uppercase ${
                trend > 0 ? "bg-emerald-500/15 text-emerald-400" : "bg-red-500/15 text-red-400"
              }`}
            >
              {trend > 0 ? "+" : ""}
              {trend}%
            </div>
          )}
        </div>
        <div>
          <p className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1">{label}</p>
          <div className="flex items-baseline gap-2">
            <span className={`text-3xl font-bold bg-gradient-to-r ${c.grad} bg-clip-text text-transparent`}>
              {value}
            </span>
            {unit && <span className="text-xs text-muted-foreground">{unit}</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardStats() {
  const [stats, setStats] = useState({
    queries: 1284,
    conversations: 48,
    response: "1.2s",
    success: "99.8%",
  });

  useEffect(() => {
    const id = setInterval(() => {
      setStats((s) => ({ ...s, queries: s.queries + Math.floor(Math.random() * 4) }));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard icon={<Activity className="w-5 h-5" />} label="AI Queries" value={stats.queries.toLocaleString()} color="purple" trend={12} />
      <StatsCard icon={<MessageSquare className="w-5 h-5" />} label="Conversations" value={stats.conversations} color="pink" trend={8} />
      <StatsCard icon={<Zap className="w-5 h-5" />} label="Avg Response" value={stats.response} color="cyan" trend={-5} />
      <StatsCard icon={<ShieldCheck className="w-5 h-5" />} label="Success Rate" value={stats.success} color="green" />
    </div>
  );
}