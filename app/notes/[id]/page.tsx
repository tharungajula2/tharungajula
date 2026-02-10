import { getAllPostIds, getPostData } from "@/lib/posts";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import ReactMarkdown from "react-markdown";

export async function generateStaticParams() {
    const paths = getAllPostIds();
    return paths.map((path) => ({
        id: path.params.id,
    }));
}

export default async function Post({ params }: { params: { id: string } }) {
    const { id } = await params;
    const postData = getPostData(id);

    return (
        <article className="min-h-screen bg-black">
            {/* HEADER */}
            <header className="relative w-full border-b border-white/5 bg-zinc-900/30 py-24 px-6 md:px-12 backdrop-blur-md">
                <div className="container mx-auto max-w-3xl">
                    <Link href="/" className="mb-8 inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white">
                        <ArrowLeft className="h-4 w-4" /> RETURN_TO_LAB
                    </Link>

                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-xs font-bold text-primary tracking-wider uppercase">
                                {postData.tag}
                            </span>
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
                        components={{
                            h1: ({ node, ...props }) => <h1 className="font-heading text-3xl font-bold text-white mt-12 mb-6" {...props} />,
                            h2: ({ node, ...props }) => <h2 className="font-heading text-2xl font-bold text-white mt-8 mb-4 border-b border-white/10 pb-2" {...props} />,
                            h3: ({ node, ...props }) => <h3 className="font-heading text-xl font-bold text-zinc-100 mt-6 mb-3" {...props} />,
                            p: ({ node, ...props }) => <p className="font-body text-zinc-300 leading-relaxed mb-6" {...props} />,
                            ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-2 text-zinc-300 mb-6 pl-4" {...props} />,
                            ol: ({ node, ...props }) => <ol className="list-decimal list-inside space-y-2 text-zinc-300 mb-6 pl-4" {...props} />,
                            li: ({ node, ...props }) => <li className="font-body" {...props} />,
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
                            a: ({ node, ...props }) => <a className="font-bold text-primary hover:underline underline-offset-4 decoration-primary/50 transition-all" target="_blank" rel="noopener noreferrer" {...props} />,
                            blockquote: ({ node, ...props }) => <blockquote className="border-l-4 border-primary/50 bg-primary/5 pl-4 py-2 italic text-zinc-300 my-6" {...props} />,
                            hr: ({ node, ...props }) => <hr className="border-white/10 my-8" {...props} />,
                        }}
                    >
                        {postData.content}
                    </ReactMarkdown>
                </div>

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
