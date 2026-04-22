"use client";

import { motion } from "framer-motion";

const technologies = [
  { name: "Next.js", icon: "N" },
  { name: "React", icon: "R" },
  { name: "TypeScript", icon: "TS" },
  { name: "Tailwind CSS", icon: "TW" },
  { name: "Clerk", icon: "CK" },
  { name: "Turso", icon: "TR" },
  { name: "Gemini AI", icon: "AI" },
  { name: "Drizzle", icon: "DZ" },
  { name: "Vercel", icon: "V" },
  { name: "Framer Motion", icon: "FM" },
];

// Duplicate for seamless loop
const allTechs = [...technologies, ...technologies];

export function TechMarquee() {
  return (
    <section className="overflow-hidden border-y border-white/5 bg-white/[0.01] py-12">
      <div className="flex flex-col gap-4">
        {/* Marquee heading */}
        <p className="text-center text-sm font-medium uppercase tracking-wider text-muted-foreground">
          Powered by cutting-edge technology
        </p>

        {/* Marquee container */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [0, -50 * technologies.length],
            }}
            transition={{
              x: {
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {allTechs.map((tech, index) => (
              <div
                key={`${tech.name}-${index}`}
                className="flex shrink-0 items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-6 py-3 backdrop-blur-sm transition-all hover:border-neon-blue/30 hover:bg-white/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-blue/20 to-neon-purple/20">
                  <span className="text-xs font-bold text-neon-blue">{tech.icon}</span>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Second row going opposite direction */}
        <div className="relative flex overflow-hidden">
          <motion.div
            className="flex gap-8"
            animate={{
              x: [-50 * technologies.length, 0],
            }}
            transition={{
              x: {
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              },
            }}
          >
            {allTechs.map((tech, index) => (
              <div
                key={`${tech.name}-reverse-${index}`}
                className="flex shrink-0 items-center gap-3 rounded-full border border-white/5 bg-white/[0.02] px-6 py-3 backdrop-blur-sm transition-all hover:border-neon-purple/30 hover:bg-white/5"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-neon-purple/20 to-neon-teal/20">
                  <span className="text-xs font-bold text-neon-purple">{tech.icon}</span>
                </div>
                <span className="whitespace-nowrap text-sm font-medium text-foreground">
                  {tech.name}
                </span>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
