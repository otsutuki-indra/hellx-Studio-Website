"use client";

import { motion } from "framer-motion";
import { Brain, Zap, Shield, BarChart3, Code2, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

const features = [
  {
    title: "Neural Processing",
    description:
      "Advanced AI models that understand context and generate intelligent responses in real-time.",
    icon: Brain,
    className: "md:col-span-2 md:row-span-2",
    gradient: "from-neon-blue/20 via-transparent to-neon-purple/10",
    iconBg: "bg-neon-blue/10 text-neon-blue",
    featured: true,
  },
  {
    title: "Instant Analytics",
    description: "Real-time insights and metrics at your fingertips.",
    icon: BarChart3,
    className: "md:col-span-1",
    gradient: "from-neon-purple/20 to-transparent",
    iconBg: "bg-neon-purple/10 text-neon-purple",
  },
  {
    title: "Secure Lab",
    description: "Enterprise-grade security with end-to-end encryption.",
    icon: Shield,
    className: "md:col-span-1",
    gradient: "from-neon-teal/20 to-transparent",
    iconBg: "bg-neon-teal/10 text-neon-teal",
  },
  {
    title: "Lightning Fast",
    description: "Sub-50ms response times powered by edge computing.",
    icon: Zap,
    className: "md:col-span-1",
    gradient: "from-yellow-500/10 to-transparent",
    iconBg: "bg-yellow-500/10 text-yellow-500",
  },
  {
    title: "Code Generation",
    description: "Generate production-ready code in any language.",
    icon: Code2,
    className: "md:col-span-1",
    gradient: "from-neon-blue/10 to-transparent",
    iconBg: "bg-neon-blue/10 text-neon-blue",
  },
  {
    title: "AI Assistance",
    description: "24/7 intelligent support for all your development needs.",
    icon: Sparkles,
    className: "md:col-span-2",
    gradient: "from-neon-purple/10 via-neon-blue/5 to-neon-teal/10",
    iconBg: "bg-gradient-to-br from-neon-purple/20 to-neon-blue/20 text-neon-purple",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export function BentoGrid() {
  return (
    <section className="px-4 py-24 md:px-8 md:py-32">
      <div className="boxed-container">
        <div className="glass-box mx-auto max-w-6xl rounded-2xl p-8 md:p-12">
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Powered by <span className="gradient-text">Innovation</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Cutting-edge features designed for the modern digital laboratory.
          </p>
        </motion.div>

        <motion.div
          className="grid gap-4 md:grid-cols-4 md:grid-rows-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div
              key={feature.title}
              variants={item}
              className={cn(
                "glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300",
                feature.className
              )}
              whileHover={{ scale: 1.02 }}
            >
              {/* Background gradient */}
              <div
                className={cn(
                  "pointer-events-none absolute inset-0 bg-gradient-to-br opacity-50",
                  feature.gradient
                )}
              />

              {/* Scanner effect */}
              <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="absolute inset-x-0 top-0 h-px animate-pulse bg-gradient-to-r from-transparent via-neon-blue to-transparent" />
              </div>

              <div className="relative z-10">
                <div className={cn("mb-4 inline-flex rounded-xl p-3", feature.iconBg)}>
                  <feature.icon className={cn("h-6 w-6", feature.featured && "h-8 w-8")} />
                </div>
                <h3
                  className={cn(
                    "mb-2 font-semibold text-foreground",
                    feature.featured ? "text-2xl" : "text-lg"
                  )}
                >
                  {feature.title}
                </h3>
                <p
                  className={cn(
                    "text-muted-foreground",
                    feature.featured ? "text-base" : "text-sm"
                  )}
                >
                  {feature.description}
                </p>
              </div>

              {/* Decorative corner */}
              {feature.featured && (
                <div className="absolute bottom-0 right-0 h-32 w-32 opacity-20">
                  <feature.icon className="h-full w-full text-neon-blue" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
