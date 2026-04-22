"use client";

import { cn } from "@/lib/utils";

interface GridBackgroundProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "subtle";
  showGradient?: boolean;
}

export function GridBackground({
  children,
  className,
  variant = "default",
  showGradient = true,
}: GridBackgroundProps) {
  return (
    <div
      className={cn(
        "relative min-h-screen",
        variant === "default" ? "grid-background" : "grid-background-subtle",
        className
      )}
    >
      {showGradient && (
        <>
          {/* Top gradient orb */}
          <div className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(0,212,255,0.15)_0%,_transparent_70%)] blur-3xl" />
          {/* Bottom right gradient orb */}
          <div className="pointer-events-none absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[radial-gradient(ellipse_at_center,_rgba(139,92,246,0.1)_0%,_transparent_70%)] blur-3xl" />
        </>
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
