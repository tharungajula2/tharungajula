"use client";

import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { useLayout } from "./LayoutContext";
import AIChatPanel from "@/components/ui/AIChatPanel";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { isChatOpen, setIsChatOpen } = useLayout();

  // Map route pathname to activeTab name
  let activeTab: 'thesis' | 'neural' | 'evolution' | 'connect' | 'blog' = 'thesis';
  if (pathname === '/work') activeTab = 'neural';
  else if (pathname === '/story') activeTab = 'evolution';
  else if (pathname === '/connect') activeTab = 'connect';
  else if (pathname === '/blog') activeTab = 'blog';

  // Map workTab from query parameters
  const tabParam = searchParams.get('tab');
  let workTab: 'overview' | 'product_lab' | 'analytics_quant' = 'product_lab'; // Default matches original state
  if (tabParam === 'overview') workTab = 'overview';
  else if (tabParam === 'product-lab') workTab = 'product_lab';
  else if (tabParam === 'analytics-quant') workTab = 'analytics_quant';

  return (
    <main className="h-[100svh] w-full overflow-hidden relative bg-black select-none">
      {/* STICKY HEADER */}
      <header className="fixed top-0 left-0 w-full h-16 bg-black/40 backdrop-blur-2xl border-b border-white/10 z-50 flex items-center justify-between px-4 sm:px-10">
        <Link
          href="/"
          scroll={false}
          className="text-xs sm:text-base font-bold tracking-[0.2em] uppercase select-none text-transparent bg-clip-text bg-gradient-to-r from-white to-cyan-400 cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
        >
          THARUN GAJULA
        </Link>

        <div className="flex items-center gap-4 sm:gap-6">
          <Link
            href="/blog"
            scroll={false}
            className={cn(
              "text-[10px] font-mono tracking-[0.2em] transition-colors uppercase cursor-pointer whitespace-nowrap shrink-0",
              activeTab === 'blog' ? "text-cyan-400 font-bold" : "text-white/50 hover:text-cyan-400"
            )}
          >
            BLOG
          </Link>
        </div>
      </header>

      {/* 3D BACKGROUND / VIEW LAYER */}
      <div className={cn(
        "absolute inset-0 z-0",
        activeTab === 'thesis' ? "fixed inset-0 overflow-hidden touch-none" : "overflow-y-auto no-scrollbar scroll-smooth pt-24"
      )}>
        {children}
      </div>

      {/* WORK VIEW TOGGLE — sleek 3-Tab glassmorphic selector visible only on WORK tab */}
      {activeTab === 'neural' && (
        <div
          className="fixed top-20 left-1/2 -translate-x-1/2 z-[55] flex items-center bg-black/60 backdrop-blur-2xl border border-white/10 rounded-full p-1 max-w-[95%] sm:max-w-none overflow-x-auto [&::-webkit-scrollbar]:hidden"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          <Link
            href="/work?tab=overview"
            scroll={false}
            className={cn(
              "text-[10px] font-mono tracking-widest px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap",
              workTab === 'overview' ? "bg-white/10 text-cyan-400 font-bold" : "text-white/40 hover:text-white/70"
            )}
          >
            Overview
          </Link>
          <Link
            href="/work?tab=product-lab"
            scroll={false}
            className={cn(
              "text-[10px] font-mono tracking-widest px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap",
              workTab === 'product_lab' ? "bg-white/10 text-cyan-400 font-bold" : "text-white/40 hover:text-white/70"
            )}
          >
            Product Lab
          </Link>
          <Link
            href="/work?tab=analytics-quant"
            scroll={false}
            className={cn(
              "text-[10px] font-mono tracking-widest px-4 py-1.5 rounded-full transition-all cursor-pointer uppercase whitespace-nowrap",
              workTab === 'analytics_quant' ? "bg-white/10 text-cyan-400 font-bold" : "text-white/40 hover:text-white/70"
            )}
          >
            Analytics<span className="hidden sm:inline"> & Quant</span>
          </Link>
        </div>
      )}

      {/* SPLINE LOGO MASKING ENGINE (Floating Pill Style) */}
      <div className="fixed bottom-5 right-5 hidden md:flex z-[60] bg-black/60 backdrop-blur-2xl border border-white/10 px-8 py-3 rounded-full items-center gap-3 select-none pointer-events-none shadow-2xl min-w-[200px] justify-center">
        <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
        <span className="text-[10px] text-white/60 font-mono tracking-[0.4em] uppercase">SYSTEM: ONLINE</span>
      </div>

      {/* BOTTOM NAV DOCK */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[420px] h-14 bg-black/50 backdrop-blur-2xl border border-white/10 rounded-full flex items-center justify-center px-4 z-[70] shadow-2xl pointer-events-auto">
        {/* Link Container */}
        <div className="flex items-center gap-5 sm:gap-10 overflow-hidden">
          <Link
            href={activeTab === 'neural' ? "/" : "/work"}
            scroll={false}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'neural' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> WORK
          </Link>
          <Link
            href="/story"
            scroll={false}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'evolution' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> STORY
          </Link>
          <Link
            href="/connect"
            scroll={false}
            className={cn(
              "text-[10px] sm:text-xs font-mono tracking-widest whitespace-nowrap transition-colors uppercase",
              activeTab === 'connect' ? "text-cyan-400 font-bold" : "text-white/70 hover:text-cyan-400"
            )}
          >
            <span className="opacity-50">//</span> CONNECT
          </Link>
        </div>
      </div>

      {/* AI CHAT PANEL */}
      <AIChatPanel
        isOpen={isChatOpen}
        onClose={() => setIsChatOpen(false)}
      />

      {/* SUBTLE SCANLINE EFFECT */}
      <div className="fixed inset-0 pointer-events-none z-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(255,0,0,0.02),rgba(0,255,0,0.01),rgba(0,0,255,0.02))] bg-[length:100%_2px,3px_100%] opacity-20" />
    </main>
  );
}
