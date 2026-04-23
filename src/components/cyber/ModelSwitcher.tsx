import { motion } from "framer-motion";

interface Props {
  currentModel: "groq" | "gemini";
  onModelChange: (m: "groq" | "gemini") => void;
}

const models = [
  { id: "groq" as const, name: "HellV1", description: "Groq · llama3-70b", icon: "⚡", badge: "Recommended", grad: "from-[#a020f0] to-[#ff006e]" },
  { id: "gemini" as const, name: "Research", description: "gemini-2.0-flash", icon: "🔬", badge: "Beta", grad: "from-[#00d9ff] to-[#0099cc]" },
];

export function ModelSwitcher({ currentModel, onModelChange }: Props) {
  const active = models.find((m) => m.id === currentModel)!;
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <label className="text-[11px] uppercase tracking-[0.2em] text-muted-foreground">AI Model</label>
        <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#a020f0]/15 border border-[#a020f0]/40 text-[#c98bff] font-mono">
          {active.badge}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {models.map((m) => {
          const selected = m.id === currentModel;
          return (
            <motion.button
              key={m.id}
              type="button"
              onClick={() => onModelChange(m.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className={`relative p-3 rounded-lg border text-left overflow-hidden transition-all ${
                selected
                  ? "border-[#a020f0] bg-[#a020f0]/10 shadow-[0_0_18px_-4px_rgba(160,32,240,0.6)]"
                  : "border-border/60 bg-[#0a0a12]/60 hover:border-[#a020f0]/50"
              }`}
            >
              {selected && (
                <motion.div
                  layoutId="model-bg"
                  className={`absolute inset-0 bg-gradient-to-br ${m.grad} opacity-10`}
                  transition={{ type: "spring", stiffness: 280, damping: 28 }}
                />
              )}
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-base">{m.icon}</span>
                  <h4 className="font-semibold text-sm">{m.name}</h4>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono truncate">{m.description}</p>
                {selected && (
                  <div className="mt-2 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#a020f0] cyber-pulse" />
                    <span className="text-[10px] font-medium text-[#c98bff] uppercase tracking-wider">Active</span>
                  </div>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}