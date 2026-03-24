import { Navbar } from "@/components/layout/navbar";
// import { HeroSection } from "@/components/home/hero-section";
import { NetworkActivity } from "@/components/home/network-activity";
import { QuoteSection } from "@/components/home/quote-section";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-transparent relative">
      <Navbar />

      {/* Removed 3D AI REACTOR CORE per Creator OS revamp */}

      <div className="flex flex-col items-center justify-center h-full w-full px-4 relative z-10 pointer-events-none">

        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto z-10 pointer-events-auto">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-4 pb-2">
            Building Better Ways to Learn, Think, and Build.
          </h1>
          <p className="font-body text-slate-300 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Welcome to Tharun Learning Lab — a public lab for experiments in learning systems, AI-native workflows, curriculum design, and modern knowledge building. This is where ideas become prototypes, field notes, and real-world builds.
          </p>
        </div>

        {/* Widget B: The Live Terminal (Commented for testing Phase 4 screensaver focus)
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block w-80 bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 z-10 pointer-events-auto">
          <NetworkActivity />
        </div>
        */}

      </div>

    </main>
  );
}
