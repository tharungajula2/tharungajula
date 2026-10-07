"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mark } from "@/components/notes/Mark";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // If viewing a note reader page, let it use its own dedicated reading chrome
  const isNoteReader = pathname.startsWith('/notes/') && pathname !== '/notes';

  const isNotes = pathname === '/notes' || (pathname.startsWith('/notes/') && !isNoteReader);
  const isBuilds = pathname === '/builds' || pathname.startsWith('/builds/');
  const isNewsletter = pathname === '/newsletter';

  return (
    <div className="w-full relative bg-[#FAFAF9] text-[#0F172A] min-h-screen flex flex-col">
      {!isNoteReader && (
        <header className="sticky top-0 left-0 w-full h-14 sm:h-16 bg-[#FAFAF9]/90 backdrop-blur-md border-b border-[#E2E8F0] z-50 px-4 sm:px-8">
          <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-sm sm:text-base font-medium tracking-wide text-[#0F172A] hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
            >
              <Mark className="h-6 w-auto text-[#0F172A]" animated />
              <span>Tharun Gajula</span>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link
                href="/notes"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors py-1 relative",
                  isNotes
                    ? "text-[#0F172A] font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0F172A]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
              >
                Notes
              </Link>
              <Link
                href="/builds"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors py-1 relative",
                  isBuilds
                    ? "text-[#0F172A] font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0F172A]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
              >
                Builds
              </Link>
              <Link
                href="/newsletter"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors py-1 relative",
                  isNewsletter
                    ? "text-[#0F172A] font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-[#0F172A]"
                    : "text-[#64748B] hover:text-[#0F172A]"
                )}
              >
                Newsletter
              </Link>
            </nav>
          </div>
        </header>
      )}

      <main className="flex-1 w-full min-w-0">
        {children}
      </main>
    </div>
  );
}
