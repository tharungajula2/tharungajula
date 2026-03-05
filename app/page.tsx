import { Navbar } from "@/components/layout/navbar";
// import { HeroSection } from "@/components/home/hero-section";
import { NetworkActivity } from "@/components/home/network-activity";
import { QuoteSection } from "@/components/home/quote-section";
import { AiCore } from "@/components/ui/ai-core";
import { Suspense } from "react";

export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="h-screen w-full overflow-hidden bg-transparent relative">
      <Navbar />

      {/* 3D AI REACTOR CORE - Lowest z-index, stretches full screen */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-auto flex items-center justify-center pointer-events-none">
        <div className="w-full h-[100dvh] scale-[0.7] md:scale-100 flex items-center justify-center origin-center transition-transform pointer-events-auto">
          <AiCore />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center h-full w-full px-4 relative z-10 pointer-events-none">

        {/* Widget A: The Centerpiece (Commented for testing Phase 4 screensaver focus) 
        <div className="flex flex-col items-center justify-center text-center max-w-4xl mx-auto z-10 pointer-events-auto">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-6">
            ARCHITECTING RISK & INTELLIGENCE.
          </h1>
          <div className="scale-90 transform origin-top">
            <QuoteSection />
          </div>
        </div>
        */}

        {/* Widget B: The Live Terminal (Commented for testing Phase 4 screensaver focus)
        <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden lg:block w-80 bg-slate-900/30 backdrop-blur-md border border-white/10 rounded-2xl p-4 z-10 pointer-events-auto">
          <NetworkActivity />
        </div>
        */}

      </div>

    </main>
  );
}
