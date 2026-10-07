import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Tharun Gajula',
  description: 'Learning out loud. One subject at a time, explained badly until it isn\'t.',
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    url: 'https://tharungajula.vercel.app/',
    title: 'Tharun Gajula',
    description: 'Learning out loud. One subject at a time, explained badly until it isn\'t.',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tharun Gajula' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tharun Gajula',
    description: 'Learning out loud. One subject at a time, explained badly until it isn\'t.',
    images: ['/og-image.png'],
  },
};

const CARDS = [
  {
    href: '/notes',
    title: 'Notes Library',
    description:
      'Finance, health, AI and life — one subject at a time, explained badly until it isn\'t.',
  },
  {
    href: '/builds',
    title: 'Builds',
    description:
      'Flagship projects made in public. Simulations, tools and experiments.',
  },
  {
    href: '/newsletter',
    title: 'Newsletter',
    description:
      'A regular letter on what I\'m reading, building and learning. Subscribe for updates.',
  },
];

const CONTACT_LINKS = [
  { href: 'mailto:tharun.gajula.2@gmail.com', label: 'Email' },
  { href: 'https://linkedin.com/in/tharungajula', label: 'LinkedIn' },
  { href: 'https://github.com/tharungajula2', label: 'GitHub' },
];

export default function HomePage() {
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
          <h1 className="text-2xl md:text-3xl font-sans font-light tracking-wide text-foreground mb-3">
            Learning out loud. One subject at a time, explained badly until it isn&apos;t.
          </h1>
          <p className="text-base text-muted leading-relaxed mb-6">
            Finance, health and AI &mdash; and now and then, life. Rough by design.
          </p>

          {/* Contact links */}
          <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
            {CONTACT_LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                target={l.href.startsWith('mailto') ? undefined : '_blank'}
                rel={l.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className="text-xs font-mono text-muted hover:text-foreground transition-colors underline underline-offset-4"
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
