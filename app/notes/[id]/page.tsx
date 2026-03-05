import "@/lib/katex-setup";
import { getAllPostIds, getPostData } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import { Metadata } from "next";
import { cn } from "@/lib/utils";

// Pre-process markdown string to convert [[WikiLinks]] to custom markdown links
const processWikiLinks = (content: string) => {
    // Matches [[Title]] and converts to [Title](/notes/slugified-title)
    return content.replace(/\[\[(.*?)\]\]/g, (match, title) => {
        const slug = title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .replace(/^-+/, '')
            .replace(/-+$/, '');

        // We output a standard markdown link syntax but with a special prefix 
        // to our custom 'a' component can specifically target Zettelkasten links if needed.
        return `[${title}](/notes/${slug})`;
    });
};

export default async function Post({ params }: { params: { id: string } }) {
    const { id } = await params;
    const postData = getPostData(id) as any;

    const processedContent = postData.content ? processWikiLinks(postData.content) : '';

    return (
        <article className="min-h-screen bg-slate-950">
            {/* HEADER */}
            <header className="relative w-full border-b border-white/5 bg-zinc-900/30 py-24 px-6 md:px-12 backdrop-blur-md">
                <div className="container mx-auto max-w-3xl">
                    <Link href="/" className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> RETURN_TO_LAB
                    </Link>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className={cn(
                                "rounded-full border px-3 py-1 font-mono text-xs font-bold tracking-wider uppercase",
                                postData.protocol === '0' ? "border-violet-500/20 bg-violet-500/10 text-violet-500" :
                                    postData.protocol === '2' ? "border-orange-500/20 bg-orange-500/10 text-orange-500" :
                                        postData.protocol === '3' ? "border-sky-500/20 bg-sky-500/10 text-sky-500" :
                                            "border-purple-500/20 bg-purple-500/10 text-purple-500"
                            )}>
                                {postData.tag}
                            </span>
                            {postData.status && (
                                <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-zinc-500 uppercase">
                                    [{postData.status}]
                                </span>
                            )}
                            <span className="font-mono text-xs text-zinc-500">
                        // {postData.date}
                            </span>
                        </div>
                        <h1 className="font-heading text-4xl font-bold text-white md:text-5xl leading-tight">
                            {postData.title}
                        </h1>
                        <p className="font-body text-xl text-zinc-400 max-w-2xl">
                            {postData.excerpt}
                        </p>
                    </div>
                </div>
            </header>

            {/* CONTENT BODY */}
            <div className="container mx-auto max-w-3xl py-12 px-6 md:px-12">
                <div className="prose prose-invert prose-zinc max-w-none">
                    <ReactMarkdown
                        remarkPlugins={[remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                        components={{
                            h1: ({ node, ...props }) => <h1 className="font-heading text-3xl font-bold text-white mt-12 mb-6" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="font-heading text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="font-heading text-xl font-bold text-zinc-100 mt-6 mb-3" {...props} />,
                            p: ({ node, ...props }) => <p className="font-body text-zinc-300 leading-relaxed mb-6" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-outside space-y-2 text-zinc-300 mb-6 pl-5" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-outside space-y-2 text-zinc-300 mb-6 pl-5" {...props} />,
                            li: ({ node, ...props }) => <li className="pl-2" {...props} />,
                            strong: ({ node, ...props }) => <strong className="font-bold text-white" {...props} />,
                            code: ({ node, className, children, ...props }) => {
                                const match = /language-(\w+)/.exec(className || '');
                                const isInline = !match && !String(children).includes('\n');
                                if (isInline) {
                                    return <code className="rounded bg-white/10 px-1 py-0.5 font-mono text-sm text-primary" {...props}>{children}</code>
                                }
                                return (
                                    <div className="relative my-6 overflow-hidden rounded-lg border border-white/10 bg-zinc-900">
                                        <div className="flex items-center justify-between border-b border-white/5 bg-white/5 px-4 py-2">
                                            <span className="font-mono text-xs text-zinc-500">{match?.[1] || 'code'}</span>
                                        </div>
                                        <div className="overflow-x-auto p-4">
                                            <code className="font-mono text-sm text-cyan-400" {...props}>
                                                {children}
                                            </code>
                                        </div>
                                    </div>
                                )
                            },
                            a: ({ node, href, children, ...props }) => {
                                // Intercept Next.js Links (Internal WikiLinks)
                                if (href?.startsWith('/notes/')) {
                                    return (
                                        <Link
                                            href={href}
                                            className="font-bold text-zinc-300 underline decoration-zinc-700 hover:decoration-primary hover:text-white transition-colors"
                                        >
                                            {children}
                                        </Link>
                                    );
                                }
                                // External Links
                                return <a href={href} className="font-bold text-primary hover:underline underline-offset-4 decoration-primary/50 transition-all" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>
                            },
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/50 bg-primary/5 pl-4 py-2 italic text-zinc-300 my-6" {...props} />,
                            hr: ({ node, ...props }) => <hr className="border-white/10 my-8" {...props} />,
                        }}
                    >
                        {processedContent}
                    </ReactMarkdown>
                </div>

                {/* LINKED MENTIONS (ZETTELKASTEN BACKLINKS) */}
                {postData.inboundLinks && postData.inboundLinks.length > 0 && (
                    <div className="mt-12 pt-8 border-t border-zinc-800">
                        <div className="font-mono text-sm text-zinc-500 mb-4 tracking-wider uppercase">
                            // LINKED_MENTIONS_ (BACKLINKS)
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {postData.inboundLinks.map((link: any, index: number) => (
                                <Link
                                    key={index}
                                    href={`/notes/${link.id}`}
                                    className="block p-4 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-800/50 hover:border-zinc-700 transition-all group"
                                >
                                    <div className="flex items-start justify-between">
                                        <h4 className="font-heading text-zinc-200 group-hover:text-white transition-colors">
                                            {link.title}
                                        </h4>
                                        <ArrowUpRight className="h-4 w-4 text-zinc-600 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}

                {/* FOOTER NAV */}
                <div className="mt-16 pt-8 border-t border-white/10 flex justify-between items-center">
                    <Link href="/" className="font-mono text-xs font-bold text-zinc-500 hover:text-white flex items-center gap-2">
                        <ArrowLeft className="h-4 w-4" /> RETURN_TO_HOME
                    </Link>
                    <Link href="#top" className="font-mono text-xs font-bold text-zinc-500 hover:text-white">
                        // SCROLL_TO_TOP
                    </Link>
                </div>
            </div>
        </article>
    );
}
