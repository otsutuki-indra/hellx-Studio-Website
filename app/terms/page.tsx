import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | HELLX STUDIO",
  description: "Terms of Service for HELLX STUDIO - Read our terms and conditions for using our platform.",
};

export default function TermsPage() {
  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h1 className="mb-8 text-4xl font-bold gradient-text">Terms of Service</h1>
            <p className="mb-6 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Agreement to Terms</h2>
                <p className="text-muted-foreground leading-relaxed">
                  By accessing or using HELLX STUDIO (&quot;the Service&quot;), you agree to be bound by these Terms of Service. 
                  If you do not agree to these terms, please do not use our Service. We reserve the right to modify these 
                  terms at any time, and your continued use constitutes acceptance of any changes.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Description of Service</h2>
                <p className="text-muted-foreground leading-relaxed">
                  HELLX STUDIO is a digital laboratory platform that provides AI-powered tools and services for building 
                  next-generation digital experiences. Our services include but are not limited to AI assistants, project 
                  management tools, and development resources.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">3. User Accounts</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">To use certain features, you must create an account. You agree to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Provide accurate and complete registration information</li>
                  <li>Maintain the security of your account credentials</li>
                  <li>Accept responsibility for all activities under your account</li>
                  <li>Notify us immediately of any unauthorized access</li>
                  <li>Not share your account with others or create multiple accounts</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Subscription Plans and Billing</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">We offer the following subscription tiers:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Free Plan:</strong> Limited features with 50 AI queries per month</li>
                  <li><strong className="text-foreground">Pro Plan ($29/month):</strong> Extended features with 500 AI queries per month</li>
                  <li><strong className="text-foreground">Level Infinity ($99/month):</strong> Unlimited features and queries</li>
                </ul>
                <p className="mt-4 text-muted-foreground leading-relaxed">
                  Subscriptions are billed in advance on a monthly or annual basis. You may cancel at any time, but refunds 
                  are not provided for partial billing periods. We reserve the right to change pricing with 30 days notice.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Acceptable Use</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">You agree not to use the Service to:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Violate any applicable laws or regulations</li>
                  <li>Infringe on intellectual property rights of others</li>
                  <li>Transmit malware, viruses, or harmful code</li>
                  <li>Attempt to gain unauthorized access to our systems</li>
                  <li>Harass, abuse, or harm other users</li>
                  <li>Generate illegal, harmful, or offensive content</li>
                  <li>Circumvent usage limits or security measures</li>
                  <li>Use the Service for competitive analysis</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">6. AI-Generated Content</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Our AI features generate content based on your inputs. You are responsible for reviewing and using 
                  AI-generated content appropriately. We do not guarantee the accuracy, completeness, or suitability 
                  of AI outputs. AI-generated content should not be used for critical decisions without human review.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Intellectual Property</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Our IP:</strong> The Service, including its design, features, and content, 
                  is owned by HELLX STUDIO and protected by intellectual property laws.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  <strong className="text-foreground">Your Content:</strong> You retain ownership of content you create using our 
                  Service. By using the Service, you grant us a limited license to process your content as necessary to 
                  provide the Service.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">8. Disclaimer of Warranties</h2>
                <p className="text-muted-foreground leading-relaxed">
                  THE SERVICE IS PROVIDED &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; WITHOUT WARRANTIES OF ANY KIND, EXPRESS OR IMPLIED. 
                  WE DO NOT WARRANT THAT THE SERVICE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE. WE DISCLAIM ALL 
                  WARRANTIES INCLUDING MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, AND NON-INFRINGEMENT.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Limitation of Liability</h2>
                <p className="text-muted-foreground leading-relaxed">
                  TO THE MAXIMUM EXTENT PERMITTED BY LAW, HELLX STUDIO SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, 
                  SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, OR ANY LOSS OF PROFITS OR REVENUES. OUR TOTAL LIABILITY 
                  SHALL NOT EXCEED THE AMOUNT PAID BY YOU IN THE TWELVE MONTHS PRECEDING THE CLAIM.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Termination</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may suspend or terminate your access to the Service at any time for violation of these terms or 
                  for any other reason at our sole discretion. Upon termination, your right to use the Service ceases 
                  immediately. You may terminate your account at any time through your account settings.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">11. Governing Law</h2>
                <p className="text-muted-foreground leading-relaxed">
                  These Terms shall be governed by and construed in accordance with the laws of the jurisdiction in 
                  which HELLX STUDIO operates, without regard to conflict of law principles. Any disputes shall be 
                  resolved through binding arbitration.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">12. Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  For questions about these Terms of Service, please contact us at:
                </p>
                <p className="mt-4 text-neon-blue">legal@hellxstudio.com</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
