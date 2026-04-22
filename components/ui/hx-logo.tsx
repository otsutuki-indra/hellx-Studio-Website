"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface HXLogoProps {
  size?: "sm" | "md" | "lg";
  showText?: boolean;
  href?: string;
}

const sizeMap = {
  sm: { logo: 32, text: "text-lg" },
  md: { logo: 40, text: "text-xl" },
  lg: { logo: 48, text: "text-2xl" },
};

export function HXLogo({ size = "md", showText = true, href = "/" }: HXLogoProps) {
  const { logo, text } = sizeMap[size];

  const content = (
    <motion.div
      className="flex items-center gap-3"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
    >
      {/* HX Logo Image */}
      <div className="hx-logo-glow relative">
        <Image
          src="/images/hx-logo.png"
          alt="HELLX Logo"
          width={logo}
          height={logo}
          className="object-contain"
          priority
        />
      </div>
      
      {/* Text */}
      {showText && (
        <motion.span
          className={`font-bold tracking-tight ${text}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <span className="text-foreground">HELL</span>
          <span className="text-neon-purple neon-pulse-text">X</span>
        </motion.span>
      )}
    </motion.div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }

  return content;
}
