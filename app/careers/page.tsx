import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { NeonButton } from "@/components/ui/neon-button";
import { Metadata } from "next";
import { MapPin, Clock, Briefcase, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Careers | HELLX STUDIO",
  description: "Join the HELLX STUDIO team and help build the future of AI-powered development.",
};

const openings = [
  {
    id: 1,
    title: "Senior Full-Stack Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build and scale our core platform using Next.js, TypeScript, and modern cloud infrastructure.",
  },
  {
    id: 2,
    title: "AI/ML Engineer",
    department: "AI Research",
    location: "Remote",
    type: "Full-time",
    description: "Develop and optimize AI models that power our intelligent assistant and code generation features.",
  },
  {
    id: 3,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Create beautiful, intuitive interfaces that make complex AI technology accessible to everyone.",
  },
  {
    id: 4,
    title: "Developer Advocate",
    department: "Developer Relations",
    location: "Remote",
    type: "Full-time",
    description: "Build community, create content, and help developers succeed with HELLX STUDIO.",
  },
];

const perks = [
  "Competitive salary + equity",
  "Remote-first culture",
  "Unlimited PTO",
  "Health & wellness benefits",
  "Learning & development budget",
  "Latest tech equipment",
  "Flexible working hours",
  "Team retreats",
];

export default function CareersPage() {
  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              Join the <span className="gradient-text">Lab</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Help us build the future of AI-powered development. We&apos;re looking for 
              passionate individuals who want to make an impact.
            </p>
          </div>

          {/* Culture Section */}
          <div className="mb-16">
            <GlassCard className="p-8 md:p-12">
              <div className="grid gap-8 md:grid-cols-2">
                <div>
                  <h2 className="mb-4 text-3xl font-bold text-foreground">Why HELLX STUDIO?</h2>
                  <p className="mb-6 text-muted-foreground leading-relaxed">
                    We&apos;re a team of builders, dreamers, and problem-solvers working on the 
                    cutting edge of AI and web technology. At HELLX STUDIO, you&apos;ll have the 
                    opportunity to work on challenging problems, learn from talented colleagues, 
                    and make a real impact on how developers build software.
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    We believe in autonomy, transparency, and continuous learning. Our remote-first 
                    culture means you can work from anywhere while staying connected with a 
                    collaborative, supportive team.
                  </p>
                </div>
                <div>
                  <h3 className="mb-4 text-xl font-semibold text-foreground">Perks & Benefits</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {perks.map((perk) => (
                      <div 
                        key={perk}
                        className="flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-3 py-2 text-sm text-foreground"
                      >
                        <div className="h-2 w-2 rounded-full bg-neon-blue" />
                        {perk}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>

          {/* Open Positions */}
          <div>
            <h2 className="mb-8 text-3xl font-bold text-foreground">Open Positions</h2>
            <div className="space-y-4">
              {openings.map((job) => (
                <GlassCard key={job.id} className="p-6" hoverEffect>
                  <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                    <div className="flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <h3 className="text-xl font-semibold text-foreground">{job.title}</h3>
                        <span className="rounded-full bg-neon-blue/10 px-3 py-1 text-xs font-medium text-neon-blue">
                          {job.department}
                        </span>
                      </div>
                      <p className="mb-3 text-muted-foreground">{job.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <MapPin className="h-4 w-4" />
                          {job.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {job.type}
                        </span>
                        <span className="flex items-center gap-1">
                          <Briefcase className="h-4 w-4" />
                          {job.department}
                        </span>
                      </div>
                    </div>
                    <NeonButton href="/contact" variant="secondary" size="sm">
                      Apply Now
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </NeonButton>
                  </div>
                </GlassCard>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-16 text-center">
            <GlassCard className="p-8 md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Don&apos;t see a perfect fit?</h2>
              <p className="mb-6 text-muted-foreground">
                We&apos;re always looking for exceptional talent. Send us your resume and tell us 
                how you&apos;d like to contribute.
              </p>
              <NeonButton href="/contact">
                Get in Touch
              </NeonButton>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
