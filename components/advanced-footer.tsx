'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

export function AdvancedFooter() {
  const currentYear = new Date().getFullYear();

  const footerColumns = [
    {
      title: 'Product',
      links: [
        { label: 'Features', href: '/#features' },
        { label: 'Pricing', href: '/#pricing' },
        { label: 'Changelog', href: '/docs' },
        { label: 'Documentation', href: '/docs' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About', href: '#' },
        { label: 'Blog', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Contact', href: '#' },
      ],
    },
    {
      title: 'Legal',
      links: [
        { label: 'Privacy Policy', href: '/privacy' },
        { label: 'Terms of Service', href: '/terms' },
        { label: 'Security Policy', href: '/security' },
        { label: 'Cookie Policy', href: '/privacy' },
      ],
    },
    {
      title: 'Support',
      links: [
        { label: 'Help Center', href: '/docs' },
        { label: 'Community', href: '#' },
        { label: 'Status Page', href: '#' },
        { label: 'API Status', href: '#' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Guides', href: '/docs' },
        { label: 'API Reference', href: '/docs' },
        { label: 'Code Examples', href: '/docs' },
        { label: 'Integrations', href: '#' },
      ],
    },
  ];

  return (
    <footer className="relative z-10 border-t border-border/30 bg-gradient-to-b from-background to-background/80 backdrop-blur-sm">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-8 mb-12">
          {/* Column 1: Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-1"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center font-bold text-white">
                HX
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                HELLX
              </span>
            </div>
            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              The digital laboratory for building next-generation AI-powered applications.
            </p>

            {/* Social Icons */}
            <div className="flex items-center gap-4">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2s9 5 20 5a9.5 9.5 0 00-9-5.5c4.75 2.25 7-7 7-7z" />
                </svg>
              </motion.a>
              <motion.a
                href="https://discord.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -4 }}
                className="p-2 rounded-lg border border-border/50 text-muted-foreground hover:text-primary hover:border-primary/50 hover:shadow-lg hover:shadow-primary/20 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.3671a19.8062 19.8062 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3754-.4447.8649-.6083 1.2543a18.268 18.268 0 00-5.487 0c-.1636-.3888-.3957-.8789-.6078-1.2543a.077.077 0 00-.0785-.037 19.7514 19.7514 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C1.75 8.068 1.1273 11.1395 1.8231 14.1128a.082.082 0 00.0313.0552c1.3159.7981 2.5859 1.1139 3.8387 1.39a.083.083 0 00.0841-.0469c.211-.3667.503-.8986.6931-1.314a.07.07 0 00-.0391-.0861 12.88 12.88 0 01-1.8383-.876.083.083 0 01-.0084-.1368c.1232-.0923.2465-.1876.3648-.2847a.07.07 0 01.0713-.0097c3.869 1.7647 8.062 1.7647 11.906 0a.07.07 0 01.0714.0094c.1184.0969.2417.1922.3664.2847a.083.083 0 01-.0083.1365 12.852 12.852 0 01-1.8383.876.084.084 0 00-.0391.0862c.1945.4158.4831.8487.6934 1.314a.083.083 0 00.0838.0469c1.3129-.2772 2.5873-.5922 3.8384-1.39a.083.083 0 00.0315-.0552c.7578-3.002.1645-5.6571-1.2026-7.9999z" />
                </svg>
              </motion.a>
            </div>
          </motion.div>

          {/* Columns 2-5: Links */}
          {footerColumns.map((column, idx) => (
            <motion.div
              key={column.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: (idx + 1) * 0.1 }}
              viewport={{ once: true }}
            >
              <h3 className="font-semibold text-foreground mb-6">{column.title}</h3>
              <ul className="space-y-3">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-sm text-muted-foreground">
            {currentYear} HELLX Studio. All rights reserved.
          </p>

          {/* System Status */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 px-4 py-2 rounded-full border border-border/50 bg-card/50 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="w-2 h-2 rounded-full bg-green-500"
              />
              <span className="text-xs font-medium text-muted-foreground">
                All Systems Operational
              </span>
            </div>
          </motion.div>

          <p className="text-sm text-muted-foreground">
            Built with passion in the Digital Laboratory
          </p>
        </div>
      </div>
    </footer>
  );
}
