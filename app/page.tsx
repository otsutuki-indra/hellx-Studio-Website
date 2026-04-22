import { GridBackground } from "@/components/layout/grid-background";
import { Navbar } from "@/components/layout/navbar";
import { Hero } from "@/components/landing/hero";
import { TechMarquee } from "@/components/landing/tech-marquee";
import { BentoGrid } from "@/components/landing/bento-grid";
import { Features } from "@/components/landing/features";
import { Pricing } from "@/components/landing/pricing";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/layout/footer";

export default function HomePage() {
  return (
    <GridBackground>
      <Navbar />
      <main>
        <Hero />
        <TechMarquee />
        <BentoGrid />
        <Features />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </GridBackground>
  );
}
