import type { Metadata } from 'next';
import Link from 'next/link';
import { getSortedDocumentsData } from '@/lib/notes/markdown';
import { Mark } from '@/components/notes/Mark';

export const metadata: Metadata = {
  title: {
    absolute: 'Tharun Gajula',
  },
  description: 'Notes, builds and a newsletter — learning out loud, making in public.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: '/',
    title: 'Tharun Gajula',
    description: 'Notes, builds and a newsletter — learning out loud, making in public.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tharun Gajula' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tharun Gajula',
    description: 'Notes, builds and a newsletter — learning out loud, making in public.',
    images: ['/og-image.png'],
  },
};

const CARDS = [
  {
    href: '/notes',
    label: 'NOTES',
    title: 'Notes Library',
    description:
      'Finance, health, AI and life — one subject at a time, explained badly until it isn\'t.',
  },
  {
    href: '/builds',
    label: 'BUILDS',
    title: 'Builds',
    description:
      'Flagship projects made in public. Simulations, tools and experiments.',
  },
  {
    href: '/newsletter',
    label: 'NEWSLETTER',
    title: 'Newsletter',
    description:
      'A regular letter on what I\'m reading, building and learning. Coming soon.',
  },
];

const CONTACT_LINKS = [
  { href: 'mailto:tharun.gajula.2@gmail.com', label: 'Email' },
  { href: 'https://linkedin.com/in/tharungajula', label: 'LinkedIn' },
  { href: 'https://github.com/tharungajula2', label: 'GitHub' },
];

function NoteStats({ count, totalWords }: { count: number; totalWords: number }) {
  const hours = Math.floor(totalWords / 225 / 60);
  const mins = Math.ceil((totalWords / 225) % 60);
  const readStr = hours > 0 ? `${hours}h ${mins}m` : `${mins}m`;
  return (
    <span className="text-xs text-muted font-medium">
      {count} note{count !== 1 ? 's' : ''} · {readStr} total read
    </span>
  );
}

export default function HomePage() {
  const notes = getSortedDocumentsData();
  const totalWords = notes.reduce((s, d) => s + (d.wordCount || 0), 0);

  return (
    <div
      className="min-h-full flex flex-col min-w-0 bg-background text-foreground"
      style={{ '--background': '#FCFCFC', '--foreground': '#111111' } as React.CSSProperties}
    >
      {/* PWA Splash */}
      <div
        id="pwa-splash"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FFFFFF] text-[#111111] pointer-events-none select-none"
        aria-hidden="true"
      >
        <Mark className="h-9 w-auto text-[#111111]" animated />
        <div className="text-xl font-sans font-light tracking-wide text-[#111111] mt-3">
          Tharun Gajula
        </div>
      </div>

      <main className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-16 min-w-0">
        {/* Hero */}
        <header className="mb-10 md:mb-14 pb-8 border-b border-border">
          <div className="flex items-center gap-3 mb-4">
            <Mark className="h-8 w-auto text-foreground shrink-0" animated />
            <h1 className="text-2xl md:text-3xl font-sans font-light tracking-wide text-foreground">
              Tharun Gajula
            </h1>
          </div>
          <p className="text-base text-foreground/90 leading-relaxed mb-2">
            Learning out loud. One subject at a time, explained badly until it isn&apos;t.
          </p>
          <p className="text-sm text-foreground/70 leading-relaxed mb-5">
            Finance, health and AI &mdash; and now and then, life. Rough by design.
          </p>

          {/* Stats */}
          <div className="mb-4">
            <NoteStats count={notes.length} totalWords={totalWords} />
          </div>

          {/* Contact links */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel={l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-sm text-muted hover:text-foreground transition-colors underline underline-offset-2"
              >
                {l.label}
              </a>
            ))}
          </div>
        </header>

        {/* Entry Cards */}
        <section className="space-y-4" aria-label="Site sections">
          {CARDS.map((card) => (
            <Link
              key={card.href}
              href={card.href}
              className="group block min-h-[56px] p-5 border border-border rounded-lg bg-background hover:border-foreground transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground focus-visible:outline-offset-2"
            >
              <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-1">
                {card.label}
              </div>
              <h2 className="text-[17px] md:text-lg font-medium text-foreground leading-snug mb-1 group-hover:underline">
                {card.title}
              </h2>
              <p className="text-sm text-muted leading-relaxed">
                {card.description}
              </p>
            </Link>
          ))}
        </section>

        {/* Footer */}
        <footer className="mt-16 pt-8 pb-12 border-t border-border text-xs text-muted">
          Tharun Gajula &mdash; notes learned out loud, builds made in public.
        </footer>
      </main>
    </div>
  );
}
