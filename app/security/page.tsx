import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Metadata } from "next";
import { Shield, Lock, Key, Eye, Server, CheckCircle } from "lucide-react";

export const metadata: Metadata = {
  title: "Security | HELLX STUDIO",
  description: "Learn about HELLX STUDIO's security practices and how we protect your data.",
};

const securityFeatures = [
  {
    icon: Lock,
    title: "Encryption at Rest & Transit",
    description: "All data is encrypted using AES-256 encryption at rest and TLS 1.3 in transit.",
  },
  {
    icon: Key,
    title: "Secure Authentication",
    description: "Enterprise-grade authentication powered by Clerk with MFA support and secure session management.",
  },
  {
    icon: Eye,
    title: "Privacy by Design",
    description: "Minimal data collection, strict access controls, and transparent data handling practices.",
  },
  {
    icon: Server,
    title: "Infrastructure Security",
    description: "Hosted on Vercel's secure infrastructure with automatic failover and DDoS protection.",
  },
  {
    icon: Shield,
    title: "Regular Security Audits",
    description: "Continuous security monitoring, penetration testing, and vulnerability assessments.",
  },
  {
    icon: CheckCircle,
    title: "Compliance",
    description: "Designed to meet GDPR, SOC 2, and other international data protection standards.",
  },
];

const practices = [
  "24/7 security monitoring and incident response",
  "Regular third-party security audits",
  "Secure software development lifecycle (SSDLC)",
  "Employee security training and background checks",
  "Bug bounty program for responsible disclosure",
  "Data backup and disaster recovery procedures",
];

export default function SecurityPage() {
  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <div className="mb-6 inline-flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-neon-blue/20 to-neon-teal/20">
              <Shield className="h-10 w-10 text-neon-blue" />
            </div>
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              <span className="gradient-text">Security</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Your trust is our priority. Learn how we protect your data and maintain 
              the highest security standards.
            </p>
          </div>

          {/* Security Features Grid */}
          <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {securityFeatures.map((feature) => (
              <GlassCard key={feature.title} className="p-6">
                <div className="mb-4 inline-flex rounded-xl bg-neon-blue/10 p-3 text-neon-blue">
                  <feature.icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-foreground">{feature.title}</h3>
                <p className="text-sm text-muted-foreground">{feature.description}</p>
              </GlassCard>
            ))}
          </div>

          {/* Security Practices */}
          <GlassCard className="mb-16 p-8 md:p-12">
            <h2 className="mb-6 text-3xl font-bold text-foreground">Our Security Practices</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {practices.map((practice) => (
                <div key={practice} className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 shrink-0 text-green-500" />
                  <span className="text-muted-foreground">{practice}</span>
                </div>
              ))}
            </div>
          </GlassCard>

          {/* Data Protection */}
          <div className="grid gap-8 md:grid-cols-2">
            <GlassCard className="p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Data Protection</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We implement comprehensive data protection measures including:
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-blue" />
                  Strict data access controls and role-based permissions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-blue" />
                  Automated data retention and deletion policies
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-blue" />
                  Secure API endpoints with rate limiting
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-blue" />
                  Regular security patches and updates
                </li>
              </ul>
            </GlassCard>

            <GlassCard className="p-8">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Report a Vulnerability</h2>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                We appreciate the security research community&apos;s efforts in keeping our 
                platform safe. If you discover a security vulnerability, please report it 
                responsibly.
              </p>
              <p className="mb-4 text-muted-foreground leading-relaxed">
                Send vulnerability reports to:
              </p>
              <p className="text-neon-blue font-medium">security@hellxstudio.com</p>
              <p className="mt-4 text-sm text-muted-foreground">
                We aim to respond to all reports within 24 hours and will work with you 
                to understand and address the issue promptly.
              </p>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
