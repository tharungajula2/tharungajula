"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Mark } from "@/components/notes/Mark";

interface ClientLayoutProps {
  children: React.ReactNode;
  hasWritingPosts: boolean;
}

export default function ClientLayout({ children, hasWritingPosts }: ClientLayoutProps) {
  const pathname = usePathname();

  // On note reader page or writing post page, let it use its own dedicated reading chrome bar
  const isNoteReader = pathname.startsWith('/notes/') && pathname !== '/notes';
  const isWritingReader = pathname.startsWith('/writing/') && pathname !== '/writing';
  const isDedicatedReader = isNoteReader || isWritingReader;

  const isNotes = pathname === '/notes' || (pathname.startsWith('/notes/') && !isNoteReader);
  const isBuilds = pathname === '/builds' || pathname.startsWith('/builds/');
  const isWriting = pathname === '/writing' || (pathname.startsWith('/writing/') && !isWritingReader);

  return (
    <div className="w-full relative bg-background text-foreground min-h-screen flex flex-col">
      {!isDedicatedReader && (
        <header className="sticky top-0 left-0 w-full h-14 bg-background/90 backdrop-blur-md border-b border-border z-50 px-4 sm:px-8">
          <div className="w-full max-w-4xl mx-auto h-full flex items-center justify-between">
            <Link
              href="/"
              className="flex items-center gap-2.5 text-sm sm:text-base font-medium tracking-wide text-foreground hover:opacity-80 transition-opacity whitespace-nowrap shrink-0"
            >
              <Mark className="h-6 w-auto text-foreground" animated />
              <span>Tharun Gajula</span>
            </Link>

            <nav className="flex items-center gap-4 sm:gap-6 shrink-0">
              <Link
                href="/notes"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors py-1 relative",
                  isNotes
                    ? "text-foreground font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                Notes
              </Link>
              <Link
                href="/builds"
                className={cn(
                  "text-xs sm:text-sm font-medium transition-colors py-1 relative",
                  isBuilds
                    ? "text-foreground font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-foreground"
                    : "text-muted hover:text-foreground"
                )}
              >
                Builds
              </Link>
              {hasWritingPosts && (
                <Link
                  href="/writing"
                  className={cn(
                    "text-xs sm:text-sm font-medium transition-colors py-1 relative",
                    isWriting
                      ? "text-foreground font-semibold after:absolute after:bottom-[-2px] after:left-0 after:right-0 after:h-[2px] after:bg-foreground"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  Writing
                </Link>
              )}
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
