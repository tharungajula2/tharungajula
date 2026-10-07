import Link from 'next/link';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Builds',
  description: 'Flagship builds and interactive simulations by Tharun Gajula.',
  alternates: { canonical: '/builds' },
  openGraph: {
    title: 'Builds - Tharun Gajula',
    description: 'Flagship builds and interactive simulations by Tharun Gajula.',
    url: 'https://tharungajula.vercel.app/builds',
  },
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
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <header className="space-y-2 border-b border-[#E2E8F0] pb-6">
        <h1 className="text-2xl sm:text-3xl font-sans font-light tracking-wide text-[#0F172A]">
          Builds
        </h1>
        <p className="text-sm sm:text-base text-[#64748B]">
          Flagship builds and interactive simulations, made in public.
        </p>
      </header>

      <ul className="divide-y divide-[#E2E8F0]">
        {BUILDS.map((b) => (
          <li key={b.href}>
            <Link
              href={b.href}
              className="group flex min-h-[44px] items-start justify-between gap-6 py-6 hover:opacity-80 transition-opacity"
            >
              <div className="space-y-1.5">
                <div className="flex items-center gap-3">
                  <h2 className="text-lg font-medium text-[#0F172A]">{b.title}</h2>
                  <span className="rounded bg-[#F1F5F9] px-2 py-0.5 text-xs font-mono text-[#64748B]">
                    {b.status}
                  </span>
                </div>
                <p className="text-sm text-[#334155] leading-relaxed">{b.description}</p>
              </div>
              <span aria-hidden className="pt-1 text-[#64748B] transition-transform group-hover:translate-x-1">
                →
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
