import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | HELLX STUDIO",
  description: "Privacy Policy for HELLX STUDIO - Learn how we collect, use, and protect your data.",
};

export default function PrivacyPage() {
  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-4xl">
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h1 className="mb-8 text-4xl font-bold gradient-text">Privacy Policy</h1>
            <p className="mb-6 text-muted-foreground">Last updated: {new Date().toLocaleDateString()}</p>

            <div className="prose prose-invert max-w-none">
              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">1. Introduction</h2>
                <p className="text-muted-foreground leading-relaxed">
                  HELLX STUDIO (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to protecting your personal data. 
                  This privacy policy explains how we collect, use, disclose, and safeguard your information when you use our 
                  digital laboratory platform and services.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">2. Information We Collect</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">We collect information in the following ways:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Account Information:</strong> When you create an account, we collect your name, email address, and profile picture through our authentication provider (Clerk).</li>
                  <li><strong className="text-foreground">Usage Data:</strong> We collect information about how you use our platform, including AI queries, projects created, and feature usage.</li>
                  <li><strong className="text-foreground">Communication Data:</strong> When you contact us, we collect the content of your messages and any information you provide.</li>
                  <li><strong className="text-foreground">Technical Data:</strong> We automatically collect certain technical information including IP address, browser type, device information, and cookies.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">3. How We Use Your Information</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">We use your information for the following purposes:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To process transactions and manage your subscription</li>
                  <li>To communicate with you about updates, security alerts, and support</li>
                  <li>To monitor and analyze usage patterns and trends</li>
                  <li>To personalize your experience and provide AI-powered features</li>
                  <li>To detect, prevent, and address technical issues and security threats</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">4. Data Sharing and Disclosure</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">
                  We do not sell your personal information. We may share your data with:
                </p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li><strong className="text-foreground">Service Providers:</strong> Third-party vendors who assist in operating our platform (e.g., Clerk for authentication, Turso for database services, Google for AI capabilities).</li>
                  <li><strong className="text-foreground">Legal Requirements:</strong> When required by law or to protect our rights and safety.</li>
                  <li><strong className="text-foreground">Business Transfers:</strong> In connection with any merger, acquisition, or sale of assets.</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">5. Data Security</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We implement appropriate technical and organizational security measures to protect your personal data against 
                  unauthorized access, alteration, disclosure, or destruction. This includes encryption in transit and at rest, 
                  regular security assessments, and access controls.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">6. Your Rights</h2>
                <p className="mb-4 text-muted-foreground leading-relaxed">Depending on your location, you may have the following rights:</p>
                <ul className="list-disc pl-6 text-muted-foreground space-y-2">
                  <li>Access and receive a copy of your personal data</li>
                  <li>Rectify inaccurate or incomplete data</li>
                  <li>Request deletion of your personal data</li>
                  <li>Object to or restrict processing of your data</li>
                  <li>Data portability</li>
                  <li>Withdraw consent at any time</li>
                </ul>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">7. Cookies and Tracking</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We use cookies and similar tracking technologies to enhance your experience, analyze usage, and provide 
                  personalized content. You can control cookie preferences through your browser settings. Essential cookies 
                  required for platform functionality cannot be disabled.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">8. International Data Transfers</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Your information may be transferred to and processed in countries other than your own. We ensure appropriate 
                  safeguards are in place to protect your data in compliance with applicable data protection laws.
                </p>
              </section>

              <section className="mb-8">
                <h2 className="mb-4 text-2xl font-semibold text-foreground">9. Changes to This Policy</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We may update this privacy policy from time to time. We will notify you of any material changes by posting 
                  the new policy on this page and updating the &quot;Last updated&quot; date.
                </p>
              </section>

              <section>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">10. Contact Us</h2>
                <p className="text-muted-foreground leading-relaxed">
                  If you have any questions about this Privacy Policy or our data practices, please contact us at:
                </p>
                <p className="mt-4 text-neon-blue">privacy@hellxstudio.com</p>
              </section>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
