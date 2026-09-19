"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isConnect = pathname === '/connect';
  const isAgent = !isConnect;

  return (
    <main className="w-full relative bg-surface text-ink min-h-screen min-h-[100dvh] h-full overflow-hidden">
      {/* HEADER NAVIGATION SHELL */}
      <header className="fixed top-0 left-0 w-full h-14 sm:h-16 bg-surface/90 backdrop-blur-md border-b border-hairline z-50 px-4 sm:px-8">
        <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-between">
          {/* BRAND WORDMARK */}
          <Link
            href="/agent"
            scroll={false}
            className="min-h-[44px] flex items-center text-xs sm:text-sm font-semibold tracking-[0.16em] uppercase select-none text-ink hover:opacity-75 transition-opacity whitespace-nowrap shrink-0 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none rounded-md"
          >
            THARUN GAJULA
          </Link>

          {/* NAVIGATION DESTINATIONS */}
          <nav className="flex items-center gap-4 sm:gap-6 shrink-0">
            <Link
              href="/agent"
              scroll={false}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors py-1 relative focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                isAgent
                  ? "text-ink font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1.5px] after:bg-ink"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              Agent
            </Link>
            <Link
              href="/connect"
              scroll={false}
              className={cn(
                "text-xs sm:text-sm font-medium transition-colors py-1 relative focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none",
                isConnect
                  ? "text-ink font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[1.5px] after:bg-ink"
                  : "text-ink-muted hover:text-ink"
              )}
            >
              Connect
            </Link>
          </nav>
        </div>
      </header>

      {/* VIEW CONTAINER LAYER */}
      <div className="z-0 absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth pt-16 sm:pt-20 pb-6 px-4 sm:px-8">
        {children}
      </div>
    </main>
  );
}
