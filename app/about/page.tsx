import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { Metadata } from "next";
import { Brain, Zap, Shield, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "About | HELLX STUDIO",
  description: "Learn about HELLX STUDIO - The digital laboratory for building next-generation AI-powered applications.",
};

const values = [
  {
    icon: Brain,
    title: "Innovation First",
    description: "We push the boundaries of what's possible with AI and modern web technologies.",
  },
  {
    icon: Zap,
    title: "Speed & Performance",
    description: "Every millisecond matters. We optimize for blazing-fast experiences.",
  },
  {
    icon: Shield,
    title: "Security & Privacy",
    description: "Your data is sacred. We implement enterprise-grade security at every layer.",
  },
  {
    icon: Users,
    title: "Community Driven",
    description: "Built by developers, for developers. Your feedback shapes our roadmap.",
  },
];

export default function AboutPage() {
  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-4xl">
          {/* Hero Section */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              About <span className="gradient-text">HELLX STUDIO</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              We&apos;re building the future of digital creation - a place where innovation 
              meets execution and ideas become reality.
            </p>
          </div>

          {/* Mission Section */}
          <div className="glass-card mb-16 rounded-3xl p-8 md:p-12">
            <h2 className="mb-6 text-3xl font-bold text-foreground">Our Mission</h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              HELLX STUDIO was founded with a singular vision: to democratize access to 
              cutting-edge AI technology and empower creators, developers, and businesses 
              to build extraordinary digital experiences.
            </p>
            <p className="text-lg leading-relaxed text-muted-foreground">
              We believe that the future belongs to those who can harness the power of 
              artificial intelligence. Our platform provides the tools, infrastructure, 
              and support needed to turn ambitious ideas into production-ready applications.
            </p>
          </div>

          {/* Values Section */}
          <div className="mb-16">
            <h2 className="mb-8 text-center text-3xl font-bold text-foreground">Our Values</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {values.map((value) => (
                <div 
                  key={value.title}
                  className="glass-card rounded-2xl p-6"
                >
                  <div className="mb-4 inline-flex rounded-xl bg-neon-blue/10 p-3 text-neon-blue">
                    <value.icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-xl font-semibold text-foreground">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack Section */}
          <div className="glass-card rounded-3xl p-8 md:p-12">
            <h2 className="mb-6 text-3xl font-bold text-foreground">Our Technology</h2>
            <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
              HELLX STUDIO is built on a modern, scalable technology stack designed for 
              performance and reliability:
            </p>
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {[
                "Next.js 16",
                "React 19",
                "TypeScript",
                "Tailwind CSS 4",
                "Clerk Auth",
                "Turso Database",
                "Drizzle ORM",
                "Gemini AI",
                "Framer Motion",
              ].map((tech) => (
                <div 
                  key={tech}
                  className="rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-center text-sm text-foreground"
                >
                  {tech}
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
