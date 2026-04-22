import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Footer } from "@/components/layout/footer";
import { GlassCard } from "@/components/ui/glass-card";
import { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Calendar, Clock, User } from "lucide-react";

export const metadata: Metadata = {
  title: "Blog | HELLX STUDIO",
  description: "Insights, tutorials, and updates from the HELLX STUDIO team.",
};

const posts = [
  {
    id: 1,
    title: "Introducing HELLX AI: Your Intelligent Development Partner",
    excerpt: "Meet the AI assistant that understands your code and helps you build faster than ever before.",
    category: "Product",
    author: "HELLX Team",
    date: "2024-01-15",
    readTime: "5 min read",
  },
  {
    id: 2,
    title: "Building Scalable Applications with Next.js 16",
    excerpt: "Explore the latest features in Next.js 16 and how we leverage them at HELLX STUDIO.",
    category: "Engineering",
    author: "Tech Team",
    date: "2024-01-10",
    readTime: "8 min read",
  },
  {
    id: 3,
    title: "The Future of AI-Powered Development",
    excerpt: "How artificial intelligence is transforming the way we build software and what it means for developers.",
    category: "Insights",
    author: "HELLX Team",
    date: "2024-01-05",
    readTime: "6 min read",
  },
  {
    id: 4,
    title: "Security Best Practices for Modern Web Apps",
    excerpt: "A comprehensive guide to securing your applications with industry-standard practices.",
    category: "Security",
    author: "Security Team",
    date: "2024-01-01",
    readTime: "10 min read",
  },
];

const categoryColors: Record<string, string> = {
  Product: "bg-neon-blue/10 text-neon-blue",
  Engineering: "bg-neon-purple/10 text-neon-purple",
  Insights: "bg-neon-teal/10 text-neon-teal",
  Security: "bg-yellow-500/10 text-yellow-500",
};

export default function BlogPage() {
  return (
    <GridBackground>
      <Navbar />
      <main className="min-h-screen px-4 pb-16 pt-32">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-16 text-center">
            <h1 className="mb-6 text-5xl font-bold md:text-6xl">
              <span className="gradient-text">Blog</span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
              Insights, tutorials, and updates from the digital laboratory.
            </p>
          </div>

          {/* Featured Post */}
          <Link href="#" className="mb-12 block">
            <GlassCard className="relative overflow-hidden p-8 md:p-12" hoverEffect>
              <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors.Product}`}>
                Featured
              </span>
              <h2 className="mb-4 mt-4 text-3xl font-bold text-foreground md:text-4xl">
                Welcome to HELLX STUDIO
              </h2>
              <p className="mb-6 max-w-2xl text-lg text-muted-foreground">
                Discover how our digital laboratory is revolutionizing the way developers build 
                AI-powered applications. From intelligent code assistance to automated workflows, 
                explore what makes HELLX STUDIO unique.
              </p>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  HELLX Team
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  Today
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  3 min read
                </span>
              </div>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 rounded-full bg-gradient-to-br from-neon-blue/20 to-neon-purple/20 blur-3xl" />
            </GlassCard>
          </Link>

          {/* Posts Grid */}
          <div className="grid gap-6 md:grid-cols-2">
            {posts.map((post) => (
              <Link key={post.id} href="#">
                <GlassCard className="h-full p-6" hoverEffect>
                  <span className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${categoryColors[post.category] || categoryColors.Insights}`}>
                    {post.category}
                  </span>
                  <h3 className="mb-3 mt-4 text-xl font-semibold text-foreground">
                    {post.title}
                  </h3>
                  <p className="mb-4 text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span>{post.author}</span>
                      <span>-</span>
                      <span>{post.readTime}</span>
                    </div>
                    <ArrowRight className="h-4 w-4 text-neon-blue" />
                  </div>
                </GlassCard>
              </Link>
            ))}
          </div>

          {/* Newsletter */}
          <div className="mt-16">
            <GlassCard className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-2xl font-bold text-foreground">Stay Updated</h2>
              <p className="mb-6 text-muted-foreground">
                Subscribe to our newsletter for the latest updates, tutorials, and insights.
              </p>
              <div className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-foreground placeholder:text-muted-foreground focus:border-neon-blue focus:outline-none"
                />
                <button className="neon-button rounded-xl px-6 py-3 font-medium">
                  Subscribe
                </button>
              </div>
            </GlassCard>
          </div>
        </div>
      </main>
      <Footer />
    </GridBackground>
  );
}
