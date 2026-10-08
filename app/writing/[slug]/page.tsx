import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import { getWritingPosts, getWritingPostData } from '@/lib/writing/posts';

interface WritingPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getWritingPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: WritingPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getWritingPostData(slug);
  if (!post) {
    return { title: 'Post Not Found' };
  }

  return {
    title: `${post.title} — Tharun Gajula`,
    description: post.description || post.title,
    alternates: { canonical: `/writing/${slug}` },
    openGraph: {
      title: post.title,
      description: post.description || post.title,
      url: `https://tharungajula.vercel.app/writing/${slug}`,
    },
  };
}

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

export default async function WritingPostPage({ params }: WritingPostPageProps) {
  const { slug } = await params;
  const post = getWritingPostData(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="w-full min-h-screen bg-background text-foreground flex flex-col">
      {/* Top Navigation Bar */}
      <header className="sticky top-0 left-0 right-0 z-40 h-14 bg-background/80 backdrop-blur-md border-b border-border/40">
        <div className="w-full max-w-4xl mx-auto h-full px-4 sm:px-6 flex items-center justify-between">
          <Link
            href="/writing"
            className="flex items-center gap-2 text-sm font-medium text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Writing</span>
          </Link>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-2xl mx-auto px-4 sm:px-6 py-10 sm:py-16 min-w-0">
        <header className="mb-10 pb-6 border-b border-border">
          <div className="text-xs font-mono text-muted mb-2">
            {formatDateDisplay(post.date)}
          </div>
          <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight text-foreground mb-4 leading-tight">
            {post.title}
          </h1>
          {post.description && (
            <p className="text-lg text-muted leading-relaxed">
              {post.description}
            </p>
          )}
        </header>

        <article className="prose w-full max-w-none">
          <div dangerouslySetInnerHTML={{ __html: post.content }} />
        </article>
      </main>
    </div>
  );
}
