"use client";

import { motion } from "framer-motion";
import { NeonButton } from "@/components/ui/neon-button";
import { ArrowRight } from "lucide-react";

export function CTA() {
  return (
    <section className="px-4 py-24 md:px-8 md:py-32">
      <div className="boxed-container">
        <motion.div
          className="mx-auto max-w-4xl"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="glass-box relative overflow-hidden rounded-2xl p-8 md:p-16">
          {/* Background gradient */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-neon-blue/10 via-transparent to-neon-purple/10" />

          <div className="relative text-center">
            <h2 className="mb-4 text-3xl font-bold text-balance md:text-4xl lg:text-5xl">
              Ready to Build the{" "}
              <span className="gradient-text">Future</span>?
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-lg text-muted-foreground">
              Join thousands of developers and teams building next-generation
              applications with HELLX STUDIO.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <NeonButton href="/sign-up" size="lg">
                Get Started Free
                <ArrowRight className="ml-2 inline h-5 w-5" />
              </NeonButton>
              <NeonButton href="#contact" size="lg" variant="secondary">
                Contact Sales
              </NeonButton>
            </div>
          </div>

          {/* Decorative corners */}
          <div className="absolute left-0 top-0 h-20 w-20 rounded-tl-2xl border-l-2 border-t-2 border-neon-purple/30" />
          <div className="absolute bottom-0 right-0 h-20 w-20 rounded-br-2xl border-b-2 border-r-2 border-neon-purple/30" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
