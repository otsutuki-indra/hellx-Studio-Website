'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-muted-foreground mb-12">Last updated: April 23, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Introduction</h2>
              <p className="text-muted-foreground leading-relaxed">
                HELLX Studio (&quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our AI-powered creative studio platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Information We Collect</h2>
              <h3 className="text-lg font-medium mb-2 text-foreground">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Email address and username during account registration</li>
                <li>Authentication credentials (securely hashed)</li>
                <li>Payment information for premium subscriptions (processed via Stripe)</li>
                <li>Profile preferences and settings</li>
              </ul>

              <h3 className="text-lg font-medium mb-2 mt-4 text-foreground">2.2 Usage Data</h3>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>AI conversation logs and prompts</li>
                <li>Credit usage and transaction history</li>
                <li>Session duration and interaction patterns</li>
                <li>Device information and IP addresses</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Provide and maintain our AI services</li>
                <li>Process transactions and manage your account</li>
                <li>Improve our AI models and user experience</li>
                <li>Send service updates and promotional communications</li>
                <li>Detect and prevent fraud or abuse</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Data Storage and Security</h2>
              <p className="text-muted-foreground leading-relaxed">
                We use industry-standard security measures including:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>AES-256 encryption for data at rest</li>
                <li>TLS 1.3 for data in transit</li>
                <li>Bcrypt password hashing with salt rounds</li>
                <li>JWT tokens with secure expiration policies</li>
                <li>Regular security audits and penetration testing</li>
              </ul>
              <p className="text-muted-foreground leading-relaxed mt-4">
                Your data is stored on secure servers powered by Turso (SQLite edge database) with automatic backups and disaster recovery protocols.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. AI Data Processing</h2>
              <p className="text-muted-foreground leading-relaxed">
                When you interact with our AI models (Groq Llama3, Google Gemini), your prompts and conversations are:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Processed in real-time by third-party AI providers</li>
                <li>Stored in our database for conversation history</li>
                <li>Not used to train AI models without explicit consent</li>
                <li>Deletable upon request (Right to Erasure)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Your Rights</h2>
              <p className="text-muted-foreground leading-relaxed">Under GDPR and CCPA, you have the right to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Access your personal data</li>
                <li>Rectify inaccurate information</li>
                <li>Request deletion of your data</li>
                <li>Data portability (export your data)</li>
                <li>Opt-out of marketing communications</li>
                <li>Lodge a complaint with supervisory authorities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Contact Us</h2>
              <p className="text-muted-foreground leading-relaxed">
                For privacy-related inquiries, contact our Data Protection Officer:
              </p>
              <p className="text-primary mt-2">privacy@hellxstudio.com</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
