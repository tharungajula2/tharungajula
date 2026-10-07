'use client';

import React, { useRef, useMemo } from 'react';
import { DocumentMeta } from '@/lib/notes/markdown';
import { Mark } from '@/components/notes/Mark';
import { StickyHeader } from '@/components/notes/StickyHeader';
import { HomeClientView } from '@/components/notes/HomeClientView';

interface HomeViewContainerProps {
  documents: DocumentMeta[];
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const dayNum = parseInt(parts[2], 10);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (isNaN(monthIdx) || isNaN(dayNum) || monthIdx < 0 || monthIdx > 11) return dateStr;
  return `${dayNum} ${months[monthIdx]} ${year}`;
}

export function HomeViewContainer({ documents }: HomeViewContainerProps) {
  const headerRef = useRef<HTMLDivElement>(null);

  // Compute stats line dynamically from documents with clean wrapping segments
  const statsSegments = useMemo(() => {
    const masterclassCount = documents.filter((d) => d.format === 'masterclass').length;
    const articleCount = documents.filter((d) => d.format === 'article').length;

    const dates = documents.map((d) => d.updated).filter(Boolean).sort().reverse();
    const latestDateStr = dates[0] ? formatDateDisplay(dates[0]) : '';

    const segments: string[] = [];
    if (masterclassCount > 0) {
      segments.push(`${masterclassCount} masterclass${masterclassCount === 1 ? '' : 'es'}`);
    }
    if (articleCount > 0) {
      segments.push(`${articleCount} article${articleCount === 1 ? '' : 's'}`);
    }
    if (latestDateStr) {
      segments.push(`updated ${latestDateStr}`);
    }

    return segments;
  }, [documents]);

  return (
    <div className="flex-1 flex flex-col w-full min-w-0">
      <StickyHeader headerRef={headerRef} />

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-6 py-8 md:py-12 min-w-0">
        {/* Masthead Header */}
        <header ref={headerRef} id="masthead" className="mb-8 md:mb-10 pb-8 border-b border-border">
          <div className="flex items-center gap-3 mb-3">
            <Mark className="h-7 w-auto text-foreground shrink-0" animated={true} />
            <h1 className="text-xl md:text-2xl font-sans font-light tracking-wide text-foreground">
              Tharun Gajula
            </h1>
          </div>

          <p className="text-base text-foreground/90 leading-relaxed mb-2">
            Learning out loud. One subject at a time, explained badly until it isn&apos;t.
          </p>
          <p className="text-sm text-foreground/80 leading-relaxed mb-4">
            Finance, health and AI &mdash; and now and then, life. Rough by design. Consistency over polish.
          </p>

          <div className="space-y-0.5 mb-3.5">
            <p className="text-sm text-[#111111]">
              By <span className="font-medium">Tharun Gajula</span>
            </p>
            <p className="text-xs text-muted">
              Learning out loud &middot; Imperfect by design, learning as I go
            </p>
          </div>

          <p className="text-xs text-muted font-medium pt-1 flex flex-wrap items-center gap-x-2 gap-y-1">
            {statsSegments.map((seg, i) => (
              <React.Fragment key={seg}>
                <span className="inline-block whitespace-nowrap">{seg}</span>
                {i < statsSegments.length - 1 && (
                  <span className="text-muted/50 font-normal" aria-hidden="true">&middot;</span>
                )}
              </React.Fragment>
            ))}
          </p>
        </header>

        {/* Home Page Interactive Client View (Search, Filters, Sections) */}
        <HomeClientView documents={documents} />

        {/* Footer */}
        <footer className="mt-16 pt-8 pb-12 border-t border-border text-xs text-muted space-y-1">
          <div>Tharun Gajula &mdash; notes learned out loud, by Tharun Gajula</div>
        </footer>
      </main>
    </div>
  );
}
