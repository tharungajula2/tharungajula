import type { Metadata } from 'next';
import { NEWSLETTER_CONFIG } from '@/lib/newsletter/config';
import { SubscribeForm } from '@/components/newsletter/SubscribeForm';

export const metadata: Metadata = {
  title: 'Newsletter',
  description: NEWSLETTER_CONFIG.description,
  alternates: { canonical: '/newsletter' },
  openGraph: {
    title: 'Newsletter - Tharun Gajula',
    description: NEWSLETTER_CONFIG.description,
    url: 'https://tharungajula.vercel.app/newsletter',
  },
};

interface ButtondownEmail {
  id: string;
  title: string;
  description: string;
  publish_date: string;
  canonical_url: string;
  secondary_id?: number;
  status: 'sent' | 'draft' | 'scheduled';
}

async function getPublishedIssues(): Promise<ButtondownEmail[]> {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch('https://api.buttondown.email/v1/emails?status=sent', {
      headers: {
        'Authorization': `Token ${apiKey}`,
      },
      next: { revalidate: 1800 }, // Revalidate every 30 minutes (1800 seconds)
    });

    if (!res.ok) return [];

    const data = await res.json();
    const results: ButtondownEmail[] = data.results || [];
    return results.sort((a, b) => new Date(b.publish_date).getTime() - new Date(a.publish_date).getTime());
  } catch {
    return [];
  }
}

export default async function NewsletterPage() {
  const issues = await getPublishedIssues();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <header className="space-y-3 border-b border-[#E2E8F0] pb-8">
        <div className="text-xs font-mono font-medium tracking-widest text-[#2563EB] uppercase">
          NEWSLETTER
        </div>
        <h1 className="text-2xl sm:text-3xl font-sans font-light tracking-wide text-[#0F172A]">
          {NEWSLETTER_CONFIG.name}
        </h1>
        <p className="text-base text-[#334155] leading-relaxed">
          {NEWSLETTER_CONFIG.tagline} &mdash; {NEWSLETTER_CONFIG.description}
        </p>

        <div className="pt-4 max-w-lg">
          <SubscribeForm />
        </div>
      </header>

      {/* Issues Archive */}
      <section className="space-y-6" aria-label="Published newsletter issues archive">
        <h2 className="text-xs font-mono font-medium tracking-widest text-[#64748B] uppercase">
          ALL ISSUES
        </h2>

        {issues.length === 0 ? (
          <div className="p-6 border border-[#E2E8F0] rounded-lg bg-[#F8FAFC] text-center sm:text-left">
            <h3 className="text-base font-medium text-[#0F172A] mb-1">
              First issue coming soon.
            </h3>
            <p className="text-sm text-[#64748B]">
              Subscribe above to receive new issues directly in your inbox.
            </p>
          </div>
        ) : (
          <ul className="divide-y divide-[#E2E8F0]">
            {issues.map((issue) => (
              <li key={issue.id} className="py-5">
                <a
                  href={issue.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block space-y-1 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center justify-between gap-4 text-xs font-mono text-[#64748B]">
                    <span>
                      {new Date(issue.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    <span className="text-[#2563EB] group-hover:underline">Read issue →</span>
                  </div>
                  <h3 className="text-lg font-medium text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                    {issue.title}
                  </h3>
                  {issue.description && (
                    <p className="text-sm text-[#334155] line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
