"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { NeonButton } from "@/components/ui/neon-button";
import { HXLogo } from "@/components/ui/hx-logo";
import { UserButton, useAuth } from "@clerk/nextjs";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const navLinks = [
  { href: "/#features", label: "Features" },
  { href: "/#pricing", label: "Pricing" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { isSignedIn } = useAuth();

  return (
    <motion.header
      className="fixed left-0 right-0 top-0 z-50"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="glass-box mx-4 mt-4 rounded-2xl px-6 py-4 md:mx-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <HXLogo size="md" showText={true} href="/" />

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Buttons */}
          <div className="hidden items-center gap-4 md:flex">
            {!isSignedIn ? (
              <>
                <Link
                  href="/sign-in"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  Sign In
                </Link>
                <NeonButton href="/sign-up" size="sm">
                  Get Started
                </NeonButton>
              </>
            ) : (
              <>
                <NeonButton href="/dashboard" size="sm" variant="secondary">
                  Dashboard
                </NeonButton>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "w-10 h-10 ring-2 ring-neon-blue/30",
                    },
                  }}
                />
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="text-foreground md:hidden"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <motion.div
            className="mt-4 flex flex-col gap-4 border-t border-white/10 pt-4 md:hidden"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
          >
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-2">
              {!isSignedIn ? (
                <>
                  <Link
                    href="/sign-in"
                    className="text-sm font-medium text-muted-foreground"
                  >
                    Sign In
                  </Link>
                  <NeonButton href="/sign-up" size="sm">
                    Get Started
                  </NeonButton>
                </>
              ) : (
                <NeonButton href="/dashboard" size="sm" variant="secondary">
                  Dashboard
                </NeonButton>
              )}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
}
