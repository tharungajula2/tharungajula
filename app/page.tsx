import { Navbar } from "@/components/layout/navbar";
import { HeroSection } from "@/components/home/hero-section";
import { NetworkActivity } from "@/components/home/network-activity";
import { QuoteSection } from "@/components/home/quote-section";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="min-h-screen bg-transparent">
      <Navbar />
      <HeroSection />
      <NetworkActivity />
      <QuoteSection />
    </main>
  );
}
