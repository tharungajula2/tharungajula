import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Builds',
  description: 'Flagship builds by Tharun Gajula.',
};

const BUILDS = [
  {
    href: '/builds/credit-risk-city',
    title: 'Credit Risk City',
    description: 'A simulation city for mastering the whole credit-risk ecosystem through the eyes of a business analyst.',
    status: 'In development',
  },
];

export default function BuildsPage() {
  return (
    <div className="mx-auto w-full max-w-2xl space-y-8 py-8 sm:py-12">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">Builds.</h1>
        <p className="text-base text-ink-muted">Flagship builds, made in public.</p>
      </header>
      <ul className="border-t border-hairline">
        {BUILDS.map((b) => (
          <li key={b.href} className="border-b border-hairline">
            <Link
              href={b.href}
              className="group flex min-h-[44px] items-start justify-between gap-6 py-5 focus-visible:ring-2 focus-visible:ring-accent focus-visible:outline-none"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-medium text-ink">{b.title}</h2>
                  <span className="rounded-full bg-surface-sunken px-2 py-0.5 text-[11px] font-medium text-ink-muted">{b.status}</span>
                </div>
                <p className="text-sm text-ink-muted">{b.description}</p>
              </div>
              <span aria-hidden className="pt-1 text-ink-muted transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
