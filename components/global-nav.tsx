'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { ChevronDown } from 'lucide-react';

export function GlobalNav() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const navItems = {
    Features: [
      { label: 'AI-Powered Studio', href: '#features' },
      { label: 'Real-time Sync', href: '#features' },
      { label: 'Credit System', href: '#features' },
      { label: 'Team Collaboration', href: '#features' },
    ],
    Pricing: [
      { label: 'Plans', href: '#pricing' },
      { label: 'Billing', href: '#pricing' },
      { label: 'Enterprise', href: '#pricing' },
    ],
    Docs: [
      { label: 'Getting Started', href: '/docs' },
      { label: 'API Reference', href: '/docs' },
      { label: 'Guides', href: '/docs' },
      { label: 'FAQ', href: '/docs' },
    ],
  };

  const dropdownVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    },
    exit: { 
      opacity: 0, 
      y: -10,
      transition: { duration: 0.15 }
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border/30 backdrop-blur-md bg-[#050505]/80">
      <Link href="/" className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#A020F0] to-[#FF006E] flex items-center justify-center font-bold text-white text-sm">
          HX
        </div>
        <span className="text-xl font-bold bg-gradient-to-r from-[#A020F0] to-[#FF006E] bg-clip-text text-transparent hidden sm:inline">
          HELLX STUDIO
        </span>
      </Link>

      <div className="hidden md:flex items-center gap-1">
        {Object.entries(navItems).map(([key, items]) => (
          <div
            key={key}
            className="relative group"
            onMouseEnter={() => setActiveDropdown(key)}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium hover:bg-[#A020F0]/10 hover:text-[#A020F0] transition-colors group">
              {key}
              <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform" />
            </button>

            <AnimatePresence>
              {activeDropdown === key && (
                <motion.div
                  variants={dropdownVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="absolute top-full left-0 mt-2 w-48 rounded-lg border border-[#A020F0]/30 bg-[#050505]/95 backdrop-blur-md shadow-lg overflow-hidden"
                >
                  {items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-[#A020F0]/20 hover:text-[#A020F0] transition-colors text-muted-foreground"
                    >
                      {item.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <Link href="/login">
          <Button variant="ghost" size="sm" className="text-sm">
            Sign In
          </Button>
        </Link>
        <Link href="/signup">
          <Button size="sm" className="bg-gradient-to-r from-[#A020F0] to-[#FF006E] hover:opacity-90">
            Get Started
          </Button>
        </Link>
      </div>
    </nav>
  );
}
