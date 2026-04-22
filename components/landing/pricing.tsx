"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Zap, Crown, Infinity } from "lucide-react";
import { NeonButton } from "@/components/ui/neon-button";
import { cn } from "@/lib/utils";

const plans = [
  {
    name: "Free",
    description: "Perfect for getting started",
    monthlyPrice: 0,
    yearlyPrice: 0,
    icon: Zap,
    badge: null,
    badgeClass: "",
    features: [
      "50 AI queries per month",
      "3 projects",
      "Basic analytics",
      "Community support",
      "Standard response time",
    ],
    cta: "Get Started Free",
    popular: false,
    glowColor: "gray",
  },
  {
    name: "Pro",
    description: "For serious builders",
    monthlyPrice: 29,
    yearlyPrice: 290,
    icon: Crown,
    badge: "Popular",
    badgeClass:
      "bg-gradient-to-r from-yellow-500 to-amber-500 text-background shadow-lg shadow-yellow-500/30",
    features: [
      "500 AI queries per month",
      "Unlimited projects",
      "Advanced analytics",
      "Priority support",
      "Faster response time",
      "Custom integrations",
      "API access",
    ],
    cta: "Upgrade to Pro",
    popular: true,
    glowColor: "gold",
  },
  {
    name: "Level Infinity",
    description: "Unlimited power",
    monthlyPrice: 99,
    yearlyPrice: 990,
    icon: Infinity,
    badge: "Ultimate",
    badgeClass:
      "bg-gradient-to-r from-neon-blue to-neon-teal text-background animate-pulse shadow-lg shadow-neon-blue/30",
    features: [
      "Unlimited AI queries",
      "Unlimited projects",
      "Real-time analytics",
      "24/7 dedicated support",
      "Instant response time",
      "Custom AI training",
      "White-label options",
      "SLA guarantee",
    ],
    cta: "Go Infinity",
    popular: false,
    glowColor: "cyan",
  },
];

export function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  return (
    <section id="pricing" className="px-4 py-24 md:px-8 md:py-32">
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
            Simple, <span className="gradient-text">Transparent</span> Pricing
          </h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
            Choose the plan that fits your needs. Upgrade or downgrade anytime.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 rounded-full border border-white/10 bg-white/5 p-1">
            <button
              onClick={() => setIsYearly(false)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all",
                !isYearly
                  ? "bg-gradient-to-r from-neon-blue to-neon-teal text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Monthly
            </button>
            <button
              onClick={() => setIsYearly(true)}
              className={cn(
                "rounded-full px-6 py-2 text-sm font-medium transition-all",
                isYearly
                  ? "bg-gradient-to-r from-neon-blue to-neon-teal text-background"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Yearly
              <span className="ml-2 rounded-full bg-green-500/20 px-2 py-0.5 text-xs text-green-400">
                Save 20%
              </span>
            </button>
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-3">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(
                "glass-card relative overflow-hidden rounded-3xl p-8",
                plan.popular && "ring-2 ring-yellow-500/50",
                plan.glowColor === "cyan" && "ring-2 ring-neon-blue/30"
              )}
            >
              {/* Badge */}
              {plan.badge && (
                <div
                  className={cn(
                    "absolute right-4 top-4 rounded-full px-3 py-1 text-xs font-semibold",
                    plan.badgeClass
                  )}
                >
                  {plan.badge}
                </div>
              )}

              {/* Glow effect for popular/infinity */}
              {(plan.popular || plan.glowColor === "cyan") && (
                <div
                  className={cn(
                    "pointer-events-none absolute -top-20 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full blur-3xl",
                    plan.popular ? "bg-yellow-500/20" : "bg-neon-blue/20"
                  )}
                />
              )}

              <div className="relative">
                {/* Icon */}
                <div
                  className={cn(
                    "mb-4 inline-flex rounded-xl p-3",
                    plan.glowColor === "gold"
                      ? "bg-yellow-500/10 text-yellow-500"
                      : plan.glowColor === "cyan"
                        ? "bg-neon-blue/10 text-neon-blue"
                        : "bg-white/5 text-muted-foreground"
                  )}
                >
                  <plan.icon className="h-6 w-6" />
                </div>

                {/* Plan name & description */}
                <h3 className="mb-1 text-xl font-bold text-foreground">{plan.name}</h3>
                <p className="mb-4 text-sm text-muted-foreground">{plan.description}</p>

                {/* Price */}
                <div className="mb-6">
                  <span className="text-4xl font-bold text-foreground">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-muted-foreground">
                    /{isYearly ? "year" : "month"}
                  </span>
                </div>

                {/* Features */}
                <ul className="mb-8 space-y-3">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3 text-sm">
                      <Check
                        className={cn(
                          "h-4 w-4 shrink-0",
                          plan.glowColor === "gold"
                            ? "text-yellow-500"
                            : plan.glowColor === "cyan"
                              ? "text-neon-blue"
                              : "text-green-500"
                        )}
                      />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <NeonButton
                  href="/sign-up"
                  className="w-full justify-center"
                  variant={plan.popular || plan.glowColor === "cyan" ? "default" : "secondary"}
                >
                  {plan.cta}
                </NeonButton>
              </div>
            </motion.div>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
