import type { Metadata } from 'next';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { getSortedDocumentsData } from '@/lib/notes/markdown';
import { PRIMARY_TOPIC, TOPIC_ORDER, SUBJECT_MAP } from '@/lib/notes/subjects';

export const metadata: Metadata = {
  title: 'Tharun Gajula',
  description: 'Learning out loud. AI, finance, health and life — one subject at a time, explained badly until it isn\'t.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://tharungajula.vercel.app/',
    title: 'Tharun Gajula',
    description: 'Learning out loud. AI, finance, health and life — one subject at a time, explained badly until it isn\'t.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tharun Gajula' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tharun Gajula',
    description: 'Learning out loud. AI, finance, health and life — one subject at a time, explained badly until it isn\'t.',
    images: ['/og-image.png'],
  },
};

const CARDS = [
  {
    href: '/builds',
    title: 'Builds',
    description:
      'Flagship projects made in public. Simulations, tools and experiments.',
  },
];

const CONTACT_LINKS = [
  { href: 'mailto:tharun.gajula.2@gmail.com', label: 'Email' },
  { href: 'https://linkedin.com/in/tharungajula', label: 'LinkedIn' },
  { href: 'https://github.com/tharungajula2', label: 'GitHub' },
  { href: '/notes/my-work-cheatsheet', label: 'My work' },
];

export default function HomePage() {
  const allDocs = getSortedDocumentsData();

  const aiDocs = allDocs.filter((d) => d.subject === PRIMARY_TOPIC);
  const otherTopics = TOPIC_ORDER.filter((t) => t !== PRIMARY_TOPIC);

  return (
    <div className="min-h-full flex flex-col min-w-0 bg-background text-foreground">
      {/* PWA Splash */}
      <div
        id="pwa-splash"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-background text-foreground pointer-events-none select-none"
        aria-hidden="true"
      >
        <div className="text-xl font-sans font-light tracking-wide text-foreground">
          Tharun Gajula
        </div>
      </div>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-16 min-w-0">
        {/* Hero */}
        <header className="mb-10 md:mb-14 pb-8 border-b border-border">
          <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground mb-3">
            Learning out loud. One subject at a time, explained badly until it isn&apos;t.
          </h1>
          <p className="text-base text-muted leading-relaxed mb-6">
            Finance, health and AI &mdash; and now and then, life. Rough by design.
          </p>

          {/* Contact links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith('http') ? '_blank' : undefined}
                rel={l.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center min-h-[44px] text-xs font-mono text-muted hover:text-foreground transition-colors underline underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
              >
                {l.label}
              </a>
            ))}
          </div>
        </header>

        {/* AI Notes Block */}
        <section className="mb-10 space-y-4" aria-label="AI Notes">
          <div className="flex items-center justify-between pb-2 border-b border-border">
            <div>
              <h2 className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center">
                <span className="inline-block w-[6px] h-[6px] bg-foreground mr-2.5" aria-hidden="true" />
                {SUBJECT_MAP.ai.name} Notes
              </h2>
              <p className="text-xs text-muted mt-0.5">{SUBJECT_MAP.ai.description}</p>
            </div>
            <Link
              href="/notes?subject=ai"
              className="text-xs font-mono text-muted hover:text-foreground transition-colors underline underline-offset-4 shrink-0"
            >
              All notes &rarr;
            </Link>
          </div>

          <div className="space-y-3">
            {aiDocs.length === 0 ? (
              <div className="p-4 border border-dashed border-border rounded-lg text-xs text-muted">
                Notes coming soon.
              </div>
            ) : (
              aiDocs.map((doc) => (
                <Link
                  key={doc.slug}
                  href={`/notes/${doc.slug}`}
                  className="group block p-4 border border-border rounded-lg bg-background hover:border-foreground transition-colors"
                >
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted mb-1">
                    {doc.format === 'article' ? 'ARTICLE' : doc.order ? `MASTERCLASS · VOLUME ${doc.order}` : 'MASTERCLASS'}
                  </div>
                  <h3 className="text-base font-medium text-foreground leading-snug mb-1 group-hover:underline">
                    {doc.title}
                  </h3>
                  <p className="text-xs text-muted line-clamp-2 leading-relaxed mb-2">
                    {doc.description}
                  </p>
                  <div className="text-[11px] text-muted/80 font-mono">
                    {doc.readTime}
                  </div>
                </Link>
              ))
            )}
          </div>
        </section>

        {/* Collapsible More Notes (Finance, Health, Life) */}
        <details className="group mb-12 border-b border-border pb-4">
          <summary className="list-none cursor-pointer flex items-center justify-between py-3 min-h-[44px] rounded-md hover:bg-black/5 px-2 -mx-2 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground select-none">
            <span className="text-xs font-semibold uppercase tracking-wider text-foreground flex items-center">
              <span className="inline-block w-[6px] h-[6px] bg-foreground mr-2.5" aria-hidden="true" />
              More notes (Finance, Health, Life)
            </span>
            <ChevronDown className="w-4 h-4 text-muted transition-transform duration-200 ease-out group-open:rotate-180 motion-reduce:transition-none" />
          </summary>

          <div className="pt-4 space-y-6">
            {otherTopics.map((subjId) => {
              const config = SUBJECT_MAP[subjId];
              const docs = allDocs.filter((d) => d.subject === subjId);
              return (
                <div key={subjId} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-muted">
                      {config.name}
                    </h3>
                    <span className="text-xs text-muted font-mono">{docs.length} {docs.length === 1 ? 'note' : 'notes'}</span>
                  </div>
                  {docs.length === 0 ? (
                    <div className="p-3 border border-dashed border-border rounded text-xs text-muted">
                      Notes coming soon.
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {docs.map((doc) => (
                        <Link
                          key={doc.slug}
                          href={`/notes/${doc.slug}`}
                          className="group block p-3.5 border border-border rounded-lg bg-background hover:border-foreground transition-colors"
                        >
                          <h4 className="text-sm font-medium text-foreground group-hover:underline mb-1">
                            {doc.title}
                          </h4>
                          <p className="text-xs text-muted line-clamp-1">
                            {doc.description}
                          </p>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </details>

        {/* Entry Card (Builds) */}
        <section className="space-y-4" aria-label="Site sections">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block p-5 border border-border rounded-lg bg-background hover:border-foreground transition-colors"
            >
              <h2 className="text-lg font-medium text-foreground leading-snug mb-1.5 group-hover:underline">
                {card.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 pb-12 border-t border-border text-xs font-mono text-muted">
          Tharun Gajula &mdash; notes learned out loud, builds made in public.
        </footer>
      </main>
    </div>
  );
}
