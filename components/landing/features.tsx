"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/glass-card";
import {
  Brain,
  Layers,
  Zap,
  Shield,
  Code2,
  Palette,
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI Integration",
    description:
      "Leverage cutting-edge AI models for intelligent automation, content generation, and predictive analytics.",
    color: "blue" as const,
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on modern edge infrastructure for sub-50ms response times and seamless global performance.",
    color: "purple" as const,
  },
  {
    icon: Layers,
    title: "Scalable Architecture",
    description:
      "Enterprise-grade infrastructure that grows with your needs. From MVP to millions of users.",
    color: "teal" as const,
  },
  {
    icon: Shield,
    title: "Security First",
    description:
      "End-to-end encryption, SOC 2 compliance, and advanced threat protection built into every layer.",
    color: "blue" as const,
  },
  {
    icon: Code2,
    title: "Developer Experience",
    description:
      "Intuitive APIs, comprehensive documentation, and powerful SDKs for rapid development.",
    color: "purple" as const,
  },
  {
    icon: Palette,
    title: "Design Systems",
    description:
      "Beautiful, consistent UI components with dark mode support and customizable theming.",
    color: "teal" as const,
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

export function Features() {
  return (
    <section id="features" className="px-4 py-24 md:px-8 md:py-32">
      <div className="boxed-container">
        <div className="glass-box mx-auto max-w-6xl rounded-2xl p-8 md:p-12">
        {/* Section Header */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
            Built for the{" "}
            <span className="gradient-text">Future of Web</span>
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Everything you need to build, deploy, and scale modern digital
            experiences with confidence.
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-100px" }}
        >
          {features.map((feature) => (
            <motion.div key={feature.title} variants={item}>
              <GlassCard glowColor={feature.color} className="h-full">
                <div
                  className={`mb-4 inline-flex rounded-lg p-3 ${
                    feature.color === "blue"
                      ? "bg-neon-blue/10 text-neon-blue"
                      : feature.color === "purple"
                        ? "bg-neon-purple/10 text-neon-purple"
                        : "bg-neon-teal/10 text-neon-teal"
                  }`}
                >
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-foreground">
                  {feature.title}
                </h3>
                <p className="leading-relaxed text-muted-foreground">
                  {feature.description}
                </p>
              </GlassCard>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>
    </section>
  );
}
