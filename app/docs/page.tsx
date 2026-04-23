'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function DocsPage() {
  const sections = [
    {
      title: 'Getting Started',
      items: [
        { title: 'Quick Start Guide', description: 'Create your first AI conversation in under 5 minutes' },
        { title: 'Account Setup', description: 'Configure your profile and preferences' },
        { title: 'Understanding Credits', description: 'How the credit system works' },
      ],
    },
    {
      title: 'AI Models',
      items: [
        { title: 'HellV1 (Groq Llama3)', description: 'Fast, efficient responses for general tasks' },
        { title: 'Research (Gemini)', description: 'Advanced reasoning for complex analysis' },
        { title: 'Model Comparison', description: 'Choose the right model for your task' },
      ],
    },
    {
      title: 'API Reference',
      items: [
        { title: 'Authentication', description: 'JWT tokens and session management' },
        { title: 'Chat Endpoints', description: 'Send messages and manage conversations' },
        { title: 'Rate Limits', description: 'API quotas and best practices' },
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border/30 backdrop-blur-md bg-background/80">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          HELLX
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm">Back to Home</Button>
        </Link>
      </nav>

      <main className="max-w-6xl mx-auto px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Documentation</h1>
          <p className="text-muted-foreground mb-12">Everything you need to master HELLX Studio</p>

          <div className="space-y-12">
            {sections.map((section, sectionIdx) => (
              <motion.section
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: sectionIdx * 0.1 }}
              >
                <h2 className="text-2xl font-semibold mb-6">{section.title}</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {section.items.map((item) => (
                    <Card key={item.title} className="border-border bg-card/50 hover:border-primary/50 transition cursor-pointer">
                      <CardHeader className="pb-2">
                        <CardTitle className="text-lg">{item.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </motion.section>
            ))}
          </div>
        </motion.div>
      </main>
    </div>
  );
}
