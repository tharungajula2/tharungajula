import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'A regular letter on what Tharun is reading, building and learning. Coming soon.',
  alternates: { canonical: '/newsletter' },
};

export default function NewsletterPage() {
  return (
    <div
      className="min-h-full flex flex-col min-w-0 bg-background text-foreground"
      style={{ '--background': '#FCFCFC', '--foreground': '#111111' } as React.CSSProperties}
    >
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 md:px-6 py-10 md:py-16 min-w-0">
        <header className="mb-8 pb-8 border-b border-border">
          <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-2">
            NEWSLETTER
          </div>
          <h1 className="text-2xl md:text-3xl font-sans font-medium text-foreground mb-3">
            Newsletter
          </h1>
          <p className="text-base text-muted leading-relaxed">
            A regular letter on what I&apos;m reading, building and learning.
          </p>
        </header>

        <div className="p-5 border border-dashed border-border rounded-lg bg-background">
          <div className="text-[11px] font-sans font-semibold tracking-wider text-muted uppercase mb-2">
            COMING SOON
          </div>
          <p className="text-base text-foreground font-medium mb-2">
            First issue is on the way.
          </p>
          <p className="text-sm text-muted leading-relaxed">
            Finance, health, AI and life &mdash; one subject at a time, written for people who want to actually understand, not just be informed.
          </p>
        </div>
      </main>
    </div>
  );
}
