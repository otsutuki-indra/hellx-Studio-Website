"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";
import { ArrowRight, Sparkles } from "lucide-react";
import { ParticleBackground } from "./particle-background";
import { TypingAnimation } from "./typing-animation";

const typingWords = ["Innovation", "Automation", "Intelligence", "Creation", "Excellence"];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pt-24">
      {/* 3D Particle Background */}
      <ParticleBackground />

      {/* Scanner pulse effect */}
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="absolute inset-x-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"
          animate={{
            top: ["0%", "100%", "0%"],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Boxed Container */}
      <div className="relative z-10 mx-auto w-full max-w-5xl">
        <motion.div
          className="glass-box rounded-2xl px-8 py-12 md:px-12 md:py-16"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            {/* Badge */}
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full border border-neon-purple/30 bg-neon-purple/10 px-4 py-2 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Sparkles className="h-4 w-4 text-neon-purple" />
              <span className="text-sm font-medium text-neon-purple">
                Digital Laboratory | AI-Powered Creative Hub
              </span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              className="mb-6 text-5xl font-bold tracking-tight text-balance sm:text-6xl md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="gradient-text-animated">HELLX</span>
              <br />
              <span className="text-foreground">STUDIO</span>
            </motion.h1>

            {/* New Slogan with Neon Pulse */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <p className="neon-pulse-text text-2xl font-bold tracking-wide text-neon-purple md:text-3xl lg:text-4xl">
                | We made Whatever Others Fear |
              </p>
            </motion.div>

            {/* Typing Animation Tagline */}
            <motion.div
              className="mb-4 text-xl font-semibold md:text-2xl"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
            >
              Where <TypingAnimation words={typingWords} /> meets execution.
            </motion.div>

            {/* Subtitle */}
            <motion.p
              className="mx-auto mb-10 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              Build next-generation digital experiences powered by cutting-edge AI
              technology and modern web architecture.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              className="flex flex-col items-center justify-center gap-4 sm:flex-row"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <NeonButton href="/sign-up" size="lg">
                Start Building
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </NeonButton>
              <NeonButton href="#features" size="lg" variant="secondary">
                Explore Features
              </NeonButton>
            </motion.div>
          </div>
        </motion.div>

        {/* Stats - Outside the box */}
        <motion.div
          className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
        >
          {[
            { value: "99.9%", label: "Uptime" },
            { value: "< 50ms", label: "Response Time" },
            { value: "10K+", label: "API Calls/sec" },
            { value: "24/7", label: "AI Support" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="glass-box rounded-2xl p-4 text-center backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
              whileHover={{ scale: 1.05, borderColor: "rgba(160, 32, 240, 0.4)" }}
            >
              <div className="text-2xl font-bold text-neon-purple md:text-3xl">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative elements */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
}
