import { motion } from "framer-motion";

export function PowerMeter({
  isStreaming = false,
  model = "groq",
  power = 87,
}: {
  isStreaming?: boolean;
  model?: "groq" | "gemini";
  power?: number;
}) {
  const segments = 12;
  const activeCount = isStreaming ? segments : Math.round((power / 100) * segments);

  return (
    <div className="flex flex-col items-center justify-center py-4">
      <div className="relative w-36 h-36 mb-4">
        <svg className="w-full h-full" viewBox="0 0 120 120" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="60" cy="60" r="50" fill="none" stroke="#1a1a26" strokeWidth="2" />
          {Array.from({ length: segments }).map((_, i) => {
            const isActive = i < activeCount;
            const stroke = !isActive ? "#2a2a3a" : i < 6 ? "#00ff88" : i < 10 ? "#ffb020" : "#ff006e";
            const segLen = (Math.PI * 2 * 50) / segments;
            return (
              <circle
                key={i}
                cx="60"
                cy="60"
                r="50"
                fill="none"
                stroke={stroke}
                strokeWidth="4"
                strokeDasharray={`${segLen - 4} ${Math.PI * 2 * 50 - segLen + 4}`}
                strokeDashoffset={-(segLen * i)}
                opacity={isActive ? 1 : 0.4}
                style={{ transition: "all 0.3s ease" }}
              />
            );
          })}
        </svg>

        <div className="absolute inset-0 flex flex-col items-center justify-center">
          {isStreaming ? (
            <motion.div
              animate={{ scale: [1, 1.08, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-center"
            >
              <div className="text-2xl font-bold bg-gradient-to-r from-[#a020f0] to-[#ff006e] bg-clip-text text-transparent">
                {model === "groq" ? "HV1" : "RSH"}
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Active</div>
            </motion.div>
          ) : (
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-[#00ff88] to-[#00d9ff] bg-clip-text text-transparent">
                {power}%
              </div>
              <div className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground mt-1">Power</div>
            </div>
          )}
        </div>

        {isStreaming && (
          <motion.div
            initial={{ scale: 0.85, opacity: 0.5 }}
            animate={{ scale: 1.2, opacity: 0 }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="absolute inset-0 rounded-full border-2 border-[#a020f0]"
          />
        )}
      </div>

      <div className="text-center">
        <p className="text-sm font-medium text-foreground">
          {isStreaming ? (model === "groq" ? "HellV1 Processing" : "Research Mode") : "Awaiting Input"}
        </p>
        <p className="text-[11px] text-muted-foreground mt-1 font-mono">
          {isStreaming ? "Real-time generation" : "Standby · 12ms latency"}
        </p>
      </div>
    </div>
  );
}