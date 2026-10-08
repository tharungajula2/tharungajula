import type { Metadata } from 'next';
import Link from 'next/link';
import { getWritingPosts } from '@/lib/writing/posts';

export const metadata: Metadata = {
  title: 'Writing',
  description: 'Articles, essays and long-form writing by Tharun Gajula.',
  alternates: { canonical: '/writing' },
  openGraph: {
    title: 'Writing — Tharun Gajula',
    description: 'Articles, essays and long-form writing by Tharun Gajula.',
    url: 'https://tharungajula.vercel.app/writing',
  },
};

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

export default function WritingPage() {
  const posts = getWritingPosts();

  return (
    <div className="mx-auto w-full max-w-2xl px-4 sm:px-6 py-10 sm:py-16 space-y-8">
      <header className="space-y-2 border-b border-border pb-6">
        <h1 className="text-2xl sm:text-3xl font-serif font-bold tracking-tight text-foreground">
          Writing
        </h1>
        <p className="text-sm sm:text-base text-muted">
          Articles, essays and notes on building, reading and learning.
        </p>
      </header>

      {posts.length === 0 ? (
        <div className="p-8 border border-dashed border-border rounded-lg text-center bg-background">
          <p className="text-base font-medium text-foreground mb-1">
            Nothing here yet
          </p>
          <p className="text-sm text-muted">
            Check back soon for upcoming articles and essays.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-border">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <Link
                href={`/writing/${post.slug}`}
                className="group block space-y-1.5 hover:opacity-80 transition-opacity"
              >
                <div className="text-xs font-mono text-muted">
                  {formatDateDisplay(post.date)}
                </div>
                <h2 className="text-lg font-medium text-foreground leading-snug group-hover:underline">
                  {post.title}
                </h2>
                {post.description && (
                  <p className="text-sm text-muted leading-relaxed line-clamp-2">
                    {post.description}
                  </p>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
