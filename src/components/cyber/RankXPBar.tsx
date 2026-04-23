import { motion } from "framer-motion";

const ranks = [
  { name: "Pioneer", min: 0, max: 500, grad: "from-slate-400 to-blue-400" },
  { name: "Explorer", min: 500, max: 1500, grad: "from-blue-400 to-cyan-400" },
  { name: "Innovator", min: 1500, max: 3000, grad: "from-cyan-400 to-emerald-400" },
  { name: "Architect", min: 3000, max: 5000, grad: "from-emerald-400 to-lime-400" },
  { name: "Visionary", min: 5000, max: 8000, grad: "from-lime-400 to-amber-400" },
  { name: "Master", min: 8000, max: 12000, grad: "from-amber-400 to-orange-400" },
  { name: "Legend", min: 12000, max: 20000, grad: "from-orange-400 to-pink-500" },
  { name: "Elite", min: 20000, max: Infinity, grad: "from-pink-500 to-[#a020f0]" },
];

export function RankXPBar({ creditsUsed }: { creditsUsed: number }) {
  const current = ranks.find((r) => creditsUsed >= r.min && creditsUsed < r.max) ?? ranks[0];
  const idx = ranks.indexOf(current);
  const next = ranks[Math.min(idx + 1, ranks.length - 1)];
  const inRank = creditsUsed - current.min;
  const span = current.max - current.min;
  const pct = Math.min(100, Math.max(0, (inRank / span) * 100));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Operator Rank</p>
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            className={`text-2xl font-bold bg-gradient-to-r ${current.grad} bg-clip-text text-transparent`}
          >
            {current.name}
          </motion.div>
        </div>
        <div className="text-right">
          <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-1">Credits Used</p>
          <p className="text-xl font-bold text-[#c98bff]">{creditsUsed.toLocaleString()}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-[11px] text-muted-foreground font-mono">
          <span>{inRank.toLocaleString()} / {span === Infinity ? "∞" : span.toLocaleString()}</span>
          <span>{Math.round(pct)}%</span>
        </div>
        <div className="w-full h-3 rounded-full bg-[#15151f] border border-[#a020f0]/20 overflow-hidden relative">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={`h-full bg-gradient-to-r ${current.grad}`}
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.08)_50%,transparent_100%)] cyber-pulse pointer-events-none" />
        </div>
        <div className="flex items-center justify-between pt-1 text-[11px]">
          <span className="text-muted-foreground">Next: <span className="text-foreground/80 font-medium">{next.name}</span></span>
          <span className="text-[#c98bff] font-medium">
            {(current.max - creditsUsed).toLocaleString()} XP
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 pt-1">
        <div className="p-2 rounded-lg bg-[#a020f0]/8 border border-[#a020f0]/25">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Tier</p>
          <p className="text-sm font-semibold text-[#c98bff]">{idx + 1} / {ranks.length}</p>
        </div>
        <div className="p-2 rounded-lg bg-[#00d9ff]/8 border border-[#00d9ff]/25">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Boost</p>
          <p className="text-sm font-semibold text-[#7fe5ff]">+25% Speed</p>
        </div>
      </div>
    </div>
  );
}