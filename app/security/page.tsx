'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function SecurityPage() {
  const securityFeatures = [
    {
      title: 'Encryption at Rest',
      description: 'All data stored in our Turso database is encrypted using AES-256 encryption.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
    {
      title: 'TLS 1.3',
      description: 'All data in transit is protected with the latest TLS 1.3 encryption protocol.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: 'Secure Authentication',
      description: 'Passwords hashed with bcrypt (12 rounds), JWT tokens with 7-day expiration.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
        </svg>
      ),
    },
    {
      title: 'SOC 2 Compliance',
      description: 'Our infrastructure and processes are SOC 2 Type II certified.',
      icon: (
        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 border-b border-border/30 backdrop-blur-md bg-background/80">
        <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
          HELLX
        </Link>
        <Link href="/">
          <Button variant="ghost" size="sm">Back to Home</Button>
        </Link>
      </nav>

      <main className="max-w-4xl mx-auto px-8 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-2">Security</h1>
          <p className="text-muted-foreground mb-12">How we protect your data and privacy</p>

          {/* Security Features Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {securityFeatures.map((feature, idx) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
              >
                <Card className="h-full border-border bg-card/50">
                  <CardContent className="pt-6">
                    <div className="text-primary mb-4">{feature.icon}</div>
                    <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Infrastructure Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                HELLX Studio runs on enterprise-grade infrastructure with multiple layers of security:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li><strong className="text-foreground">Vercel Edge Network:</strong> Global CDN with DDoS protection and automatic SSL</li>
                <li><strong className="text-foreground">Turso Database:</strong> Edge SQLite with automatic encryption and geo-replication</li>
                <li><strong className="text-foreground">AI Provider Security:</strong> Groq and Google maintain SOC 2 compliance for model inference</li>
                <li><strong className="text-foreground">Network Isolation:</strong> Private VPC with strict firewall rules</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Data Protection</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Passwords are never stored in plain text - we use bcrypt with 12 salt rounds</li>
                <li>Session tokens use cryptographically secure random generation</li>
                <li>All API endpoints require authentication via JWT</li>
                <li>Rate limiting prevents brute force attacks (100 requests/minute)</li>
                <li>Automatic session expiration after 7 days of inactivity</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">AI Model Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you interact with our AI models:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Prompts are transmitted over encrypted connections to AI providers</li>
                <li>Neither Groq nor Google retains your conversation data for training</li>
                <li>We implement content filtering to prevent harmful outputs</li>
                <li>All AI responses are logged for abuse prevention and audit trails</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Incident Response</h2>
              <p className="text-muted-foreground leading-relaxed">
                In the event of a security incident:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Affected users are notified within 72 hours</li>
                <li>Compromised sessions are immediately revoked</li>
                <li>Root cause analysis is conducted and documented</li>
                <li>Security patches are deployed within 24 hours</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">Vulnerability Disclosure</h2>
              <p className="text-muted-foreground leading-relaxed">
                Found a security vulnerability? We appreciate responsible disclosure.
              </p>
              <p className="text-primary mt-4">Report vulnerabilities to: security@hellxstudio.com</p>
              <p className="text-muted-foreground mt-2">
                We offer a bug bounty program for qualifying vulnerabilities. Response time: 24-48 hours.
              </p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
