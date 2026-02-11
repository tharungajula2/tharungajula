import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { AboutSection } from "@/components/home/about-section";
import { LatestNotes } from "@/components/home/latest-notes";
import { QuoteSection } from "@/components/home/quote-section";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <LatestNotes />
      <QuoteSection />
    </main>
  );
}
