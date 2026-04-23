import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

type ActivityType = "query" | "conversation" | "system" | "purchase";

interface Activity {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: number;
  icon: string;
}

const seed: Activity[] = [
  { id: "1", type: "query", title: "AI Query Processed", description: "HellV1 · 312 tokens", timestamp: Date.now() - 8000, icon: "⚡" },
  { id: "2", type: "conversation", title: "Conversation Started", description: "Topic: Design Patterns", timestamp: Date.now() - 320000, icon: "💬" },
  { id: "3", type: "system", title: "Latency Optimized", description: "Edge route −15ms", timestamp: Date.now() - 620000, icon: "🛰" },
  { id: "4", type: "purchase", title: "Credit Pack Loaded", description: "+500 XP credits", timestamp: Date.now() - 1200000, icon: "◆" },
];

const typeGrad: Record<ActivityType, string> = {
  query: "from-[#a020f0] to-[#7b2cbf]",
  conversation: "from-[#ff006e] to-[#ff1744]",
  purchase: "from-[#ffb020] to-[#ffa500]",
  system: "from-[#00d9ff] to-[#0099cc]",
};

function fmt(ts: number) {
  const s = Math.floor((Date.now() - ts) / 1000);
  if (s < 60) return `${s}s ago`;
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  return `${Math.floor(s / 3600)}h ago`;
}

export function ActivityFeed({ maxItems = 6 }: { maxItems?: number }) {
  const [activities, setActivities] = useState<Activity[]>(seed);

  useEffect(() => {
    const id = setInterval(() => {
      const types: ActivityType[] = ["query", "conversation", "system"];
      const titles = ["AI Query Processed", "Conversation Started", "Telemetry Sync"];
      const descs = ["HellV1 · 218 tokens", "New session created", "Edge node handshake"];
      const icons = ["⚡", "💬", "🛰"];
      const i = Math.floor(Math.random() * 3);
      setActivities((prev) =>
        [
          { id: Date.now().toString(), type: types[i], title: titles[i], description: descs[i], timestamp: Date.now(), icon: icons[i] },
          ...prev,
        ].slice(0, maxItems),
      );
    }, 6000);
    return () => clearInterval(id);
  }, [maxItems]);

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Live Activity Feed</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 cyber-pulse" />
          <span className="text-[10px] uppercase tracking-[0.2em] text-emerald-400">Live</span>
        </div>
      </div>

      <div className="space-y-2">
        <AnimatePresence initial={false}>
          {activities.map((a) => (
            <motion.div
              key={a.id}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 16 }}
              transition={{ duration: 0.3 }}
              className="group relative p-3 rounded-lg border border-[#a020f0]/20 bg-[#0a0a12]/60 hover:border-[#a020f0]/60 hover:bg-[#0a0a12]/80 transition-all overflow-hidden"
            >
              <div className={`absolute inset-0 opacity-0 group-hover:opacity-15 blur-2xl pointer-events-none bg-gradient-to-r ${typeGrad[a.type]}`} />
              <div className="relative z-10 flex items-start gap-3">
                <div className="text-base mt-0.5">{a.icon}</div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{a.title}</p>
                  <p className="text-[11px] text-muted-foreground truncate">{a.description}</p>
                </div>
                <span className="text-[10px] text-muted-foreground whitespace-nowrap font-mono">{fmt(a.timestamp)}</span>
              </div>
              <motion.div
                className={`absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-r ${typeGrad[a.type]}`}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}