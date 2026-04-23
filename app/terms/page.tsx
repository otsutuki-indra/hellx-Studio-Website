'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';

export default function TermsPage() {
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
          <h1 className="text-4xl font-bold mb-2">Terms of Service</h1>
          <p className="text-muted-foreground mb-12">Last updated: April 23, 2026</p>

          <div className="prose prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                By accessing or using HELLX Studio (&quot;Service&quot;), you agree to be bound by these Terms of Service. If you do not agree to all terms, you may not access the Service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">2. Description of Service</h2>
              <p className="text-muted-foreground leading-relaxed">
                HELLX Studio is an AI-powered creative collaboration platform that provides:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Access to advanced AI language models (Groq, Gemini)</li>
                <li>Real-time conversation and code assistance</li>
                <li>Credit-based usage system</li>
                <li>Conversation history and project management</li>
                <li>API access for enterprise integrations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">3. User Accounts</h2>
              <h3 className="text-lg font-medium mb-2 text-foreground">3.1 Registration</h3>
              <p className="text-muted-foreground leading-relaxed">
                You must provide accurate, complete information when creating an account. You are responsible for maintaining the confidentiality of your credentials.
              </p>

              <h3 className="text-lg font-medium mb-2 mt-4 text-foreground">3.2 Account Security</h3>
              <p className="text-muted-foreground leading-relaxed">
                You are responsible for all activities under your account. Notify us immediately of unauthorized access at security@hellxstudio.com.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">4. Credits and Billing</h2>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                <li>Free tier: 100 credits upon registration</li>
                <li>Credits are consumed per AI interaction (1-2 credits per message)</li>
                <li>Paid plans auto-renew unless cancelled</li>
                <li>Unused credits do not roll over to the next billing cycle</li>
                <li>Refunds are processed within 14 days for unused portions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">5. Acceptable Use</h2>
              <p className="text-muted-foreground leading-relaxed">You agree NOT to:</p>
              <ul className="list-disc pl-6 space-y-2 text-muted-foreground mt-2">
                <li>Generate illegal, harmful, or malicious content</li>
                <li>Attempt to bypass rate limits or abuse the API</li>
                <li>Use automated scripts to exploit the service</li>
                <li>Impersonate others or misrepresent your identity</li>
                <li>Violate intellectual property rights</li>
                <li>Distribute malware or phishing content</li>
                <li>Generate content that exploits minors</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">6. Intellectual Property</h2>
              <h3 className="text-lg font-medium mb-2 text-foreground">6.1 Your Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                You retain ownership of content you create using our Service. You grant us a license to process and store this content to provide the Service.
              </p>

              <h3 className="text-lg font-medium mb-2 mt-4 text-foreground">6.2 AI-Generated Content</h3>
              <p className="text-muted-foreground leading-relaxed">
                Output generated by our AI models is provided &quot;as-is&quot;. You are responsible for reviewing and using AI outputs appropriately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">7. Limitation of Liability</h2>
              <p className="text-muted-foreground leading-relaxed">
                HELLX Studio is provided &quot;AS IS&quot; without warranties. We are not liable for indirect, incidental, or consequential damages. Our total liability is limited to amounts paid in the 12 months prior to the claim.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">8. Termination</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may suspend or terminate accounts that violate these terms. Upon termination, your right to use the Service ceases immediately. You may export your data within 30 days of termination.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">9. Changes to Terms</h2>
              <p className="text-muted-foreground leading-relaxed">
                We may modify these terms at any time. Continued use after changes constitutes acceptance. Material changes will be notified via email.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4 text-foreground">10. Contact</h2>
              <p className="text-muted-foreground leading-relaxed">
                Questions about these Terms? Contact us at:
              </p>
              <p className="text-primary mt-2">legal@hellxstudio.com</p>
            </section>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
