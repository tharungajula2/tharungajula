import type { Metadata } from 'next';
import { NEWSLETTER_CONFIG } from '@/lib/newsletter/config';
import { SubscribeForm } from '@/components/newsletter/SubscribeForm';

export const dynamic = 'force-dynamic';

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
  description?: string;
  publish_date?: string;
  canonical_url?: string;
  secondary_id?: number;
  status?: string;
}

function formatDateSafe(dateStr?: string): string {
  if (!dateStr) return '';
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return '';
    return d.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  } catch {
    return '';
  }
}

async function getPublishedIssues(): Promise<ButtondownEmail[]> {
  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) return [];

  try {
    const res = await fetch('https://api.buttondown.email/v1/emails?status=sent', {
      headers: {
        'Authorization': `Token ${apiKey}`,
        'X-Buttondown-API-Version': '2026-04-01',
      },
      next: { revalidate: 1800 },
    });

    if (!res.ok) {
      console.error(`[Newsletter Fetch Error] HTTP ${res.status}`);
      return [];
    }

    const data = await res.json().catch(() => null);
    if (!data) return [];

    const rawList: unknown[] = Array.isArray(data)
      ? data
      : Array.isArray(data.results)
      ? data.results
      : [];

    const validIssues: ButtondownEmail[] = rawList
      .filter((item): item is ButtondownEmail => {
        if (!item || typeof item !== 'object') return false;
        const e = item as Partial<ButtondownEmail>;
        if (typeof e.id !== 'string' || !e.id) return false;
        if (typeof e.title !== 'string' || !e.title) return false;
        if (e.status && e.status !== 'sent') return false;
        if (!e.publish_date || isNaN(new Date(e.publish_date).getTime())) return false;
        if (!e.canonical_url || typeof e.canonical_url !== 'string') return false;
        return true;
      })
      .map((item) => ({
        id: item.id,
        title: item.title,
        description: typeof item.description === 'string' ? item.description : '',
        publish_date: item.publish_date,
        canonical_url: item.canonical_url,
        status: 'sent',
      }));

    return validIssues.sort((a, b) => {
      const timeA = new Date(a.publish_date!).getTime();
      const timeB = new Date(b.publish_date!).getTime();
      return timeB - timeA;
    });
  } catch (err: unknown) {
    console.error('[Newsletter Fetch Exception]:', err);
    return [];
  }
}

async function IssuesArchive() {
  const issues = await getPublishedIssues();

  return (
    <section className="space-y-6" aria-label="Published newsletter issues archive">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-muted">
        All Issues
      </h2>

      {issues.length === 0 ? (
        <div className="p-6 border border-border rounded-lg bg-background text-center sm:text-left">
          <h3 className="text-base font-medium text-foreground mb-1">
            First issue coming soon.
          </h3>
          <p className="text-sm text-muted">
            Subscribe above to receive new issues directly in your inbox.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {issues.map((issue) => {
            const formattedDate = formatDateSafe(issue.publish_date);
            return (
              <li key={issue.id} className="py-5">
                <a
                  href={issue.canonical_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block space-y-1 hover:opacity-80 transition-opacity"
                >
                  <div className="flex items-center justify-between gap-4 text-xs text-muted">
                    {formattedDate && <span>{formattedDate}</span>}
                    <span className="text-foreground font-medium group-hover:underline">Read issue →</span>
                  </div>
                  <h3 className="text-lg font-medium text-foreground leading-snug">
                    {issue.title}
                  </h3>
                  {issue.description && (
                    <p className="text-sm text-muted line-clamp-2 leading-relaxed">
                      {issue.description}
                    </p>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}

export default function NewsletterPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 space-y-10">
      <header className="space-y-3 border-b border-border pb-8">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground">
          {NEWSLETTER_CONFIG.name}
        </h1>
        <p className="text-base text-muted leading-relaxed">
          {NEWSLETTER_CONFIG.tagline} &mdash; {NEWSLETTER_CONFIG.description}
        </p>

        <div className="pt-4 max-w-lg">
          <SubscribeForm />
        </div>
      </header>

      {/* Issues Archive rendering wrapped in defensive fallback */}
      <IssuesArchive />
    </div>
  );
}
