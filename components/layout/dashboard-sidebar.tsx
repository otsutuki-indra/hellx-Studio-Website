"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { HXLogo } from "@/components/ui/hx-logo";
import {
  LayoutDashboard,
  MessageSquare,
  Settings,
  User,
  Zap,
  FileCode,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Overview" },
  { href: "/dashboard/projects", icon: FileCode, label: "Projects" },
  { href: "/dashboard/ai", icon: Zap, label: "AI Tools" },
  { href: "/dashboard/messages", icon: MessageSquare, label: "Messages" },
  { href: "/dashboard/profile", icon: User, label: "Profile" },
  { href: "/dashboard/settings", icon: Settings, label: "Settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <motion.aside
      className="glass-box fixed left-4 top-4 z-40 flex h-[calc(100vh-2rem)] flex-col rounded-2xl"
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1, width: collapsed ? 72 : 240 }}
      transition={{ duration: 0.3 }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-white/5 p-4">
        <HXLogo size="sm" showText={!collapsed} href="/" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-3">
        <ul className="flex flex-col gap-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all",
                    isActive
                      ? "bg-neon-blue/10 text-neon-blue"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  <item.icon className="h-5 w-5 shrink-0" />
                  {!collapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    >
                      {item.label}
                    </motion.span>
                  )}
                  {isActive && (
                    <motion.div
                      className="absolute left-0 h-8 w-1 rounded-r-full bg-neon-blue"
                      layoutId="activeTab"
                    />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Collapse Button */}
      <div className="border-t border-white/5 p-3">
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex w-full items-center justify-center gap-2 rounded-xl px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-white/5 hover:text-foreground"
        >
          {collapsed ? (
            <ChevronRight className="h-5 w-5" />
          ) : (
            <>
              <ChevronLeft className="h-5 w-5" />
              <span>Collapse</span>
            </>
          )}
        </button>
      </div>
    </motion.aside>
  );
}
