"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { GridBackground } from "@/components/layout/grid-background";
import { NeonButton } from "@/components/ui/neon-button";
import { ShieldAlert, ArrowLeft, Home } from "lucide-react";

export default function NotFound() {
  return (
    <GridBackground className="flex min-h-screen items-center justify-center px-4">
      <div className="relative text-center">
        {/* Glitch effect container */}
        <motion.div
          className="relative mb-8"
          animate={{
            x: [0, -2, 2, -2, 0],
          }}
          transition={{
            duration: 0.5,
            repeat: Infinity,
            repeatDelay: 3,
          }}
        >
          {/* 404 Text with glitch layers */}
          <div className="relative">
            <motion.h1
              className="text-[150px] font-bold leading-none text-transparent md:text-[200px]"
              style={{
                WebkitTextStroke: "2px rgba(0, 212, 255, 0.5)",
              }}
              animate={{
                opacity: [1, 0.8, 1],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatDelay: 2,
              }}
            >
              404
            </motion.h1>

            {/* Glitch layer 1 */}
            <motion.h1
              className="absolute inset-0 text-[150px] font-bold leading-none text-neon-blue/30 md:text-[200px]"
              animate={{
                x: [0, -4, 4, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
              }}
            >
              404
            </motion.h1>

            {/* Glitch layer 2 */}
            <motion.h1
              className="absolute inset-0 text-[150px] font-bold leading-none text-neon-purple/30 md:text-[200px]"
              animate={{
                x: [0, 4, -4, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.2,
                repeat: Infinity,
                repeatDelay: 3,
                delay: 0.1,
              }}
            >
              404
            </motion.h1>
          </div>
        </motion.div>

        {/* Icon */}
        <motion.div
          className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500/20 to-orange-500/20"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
        >
          <ShieldAlert className="h-10 w-10 text-red-400" />
        </motion.div>

        {/* Title */}
        <motion.h2
          className="mb-4 text-3xl font-bold text-foreground md:text-4xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          Access <span className="gradient-text">Restricted</span>
        </motion.h2>

        {/* Description */}
        <motion.p
          className="mx-auto mb-8 max-w-md text-lg text-muted-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          The page you&apos;re looking for doesn&apos;t exist or has been moved to a
          secure location in the digital laboratory.
        </motion.p>

        {/* Buttons */}
        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <NeonButton href="/" size="lg">
            <Home className="mr-2 h-5 w-5" />
            Return to Lab
          </NeonButton>
          <Link
            href="javascript:history.back()"
            className="flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Go Back
          </Link>
        </motion.div>

        {/* Decorative scan lines */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-20">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute left-0 right-0 h-px bg-neon-blue/50"
              style={{ top: `${i * 5}%` }}
              animate={{
                opacity: [0.3, 0.6, 0.3],
                scaleX: [1, 1.02, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            />
          ))}
        </div>

        {/* Corner decorations */}
        <div className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 border-l-2 border-t-2 border-neon-blue/30" />
        <div className="pointer-events-none absolute -bottom-4 -right-4 h-16 w-16 border-b-2 border-r-2 border-neon-purple/30" />
      </div>
    </GridBackground>
  );
}
