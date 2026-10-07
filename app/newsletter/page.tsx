import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: 'A regular letter on what Tharun is reading, building and learning. Coming soon.',
  alternates: { canonical: '/newsletter' },
  openGraph: {
    title: 'Newsletter - Tharun Gajula',
    description: 'A regular letter on what Tharun is reading, building and learning.',
    url: 'https://tharungajula.vercel.app/newsletter',
  },
};

export default function NewsletterPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <header className="space-y-2 border-b border-[#E2E8F0] pb-6">
        <div className="text-xs font-mono font-medium tracking-widest text-[#2563EB] uppercase mb-1">
          NEWSLETTER
        </div>
        <h1 className="text-2xl sm:text-3xl font-sans font-light tracking-wide text-[#0F172A]">
          Newsletter
        </h1>
        <p className="text-sm sm:text-base text-[#64748B]">
          A regular letter on what I&apos;m reading, building and learning.
        </p>
      </header>

      <div className="p-6 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC]">
        <div className="text-xs font-mono font-medium tracking-widest text-[#64748B] uppercase mb-2">
          COMING SOON
        </div>
        <h2 className="text-base font-medium text-[#0F172A] mb-2">
          First issue is on the way.
        </h2>
        <p className="text-sm text-[#334155] leading-relaxed">
          Finance, health, AI and life &mdash; one subject at a time, written for people who want to actually understand, not just be informed.
        </p>
      </div>
    </div>
  );
}
