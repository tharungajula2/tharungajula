import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";

export function LatestNotes() {
    const posts = getSortedPostsData().slice(0, 3); // Show top 3

    return (
        <section id="notes" className="relative w-full py-24 px-6 md:px-12 bg-black/20">
            <div className="container mx-auto max-w-6xl">
                {/* HEADER */}
                <div className="mb-12 flex items-end justify-between">
                    <div className="space-y-4">
                        <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                    // LAB_LOGS
                        </span>
                        <h2 className="font-heading text-4xl font-bold text-white md:text-5xl">
                            LATEST LAB NOTES
                        </h2>
                    </div>
                    <Link href="/notes" className="hidden font-mono text-sm text-zinc-500 hover:text-white md:flex items-center gap-2 transition-colors">
                        VIEW_ARCHIVE <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link key={post.id} href={`/notes/${post.id}`} className="group relative block overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300 hover:border-primary/50 hover:bg-primary/5">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-mono text-[10px] font-bold text-primary tracking-wider uppercase">
                                    {post.tag}
                                </span>
                                <span className="font-mono text-xs text-zinc-500">
                                    {post.date}
                                </span>
                            </div>

                            <h3 className="mb-3 font-heading text-xl font-bold text-white transition-colors group-hover:text-primary">
                                {post.title}
                            </h3>

                            <p className="line-clamp-3 font-body text-sm text-zinc-400 group-hover:text-zinc-300">
                                {post.excerpt}
                            </p>

                            <div className="mt-6 flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors group-hover:text-white">
                                READ_ENTRY <ArrowUpRight className="h-3 w-3" />
                            </div>
                        </Link>
                    ))}

                    {/* EMPTY STATE (If no posts) */}
                    {posts.length === 0 && (
                        <div className="col-span-3 flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-zinc-900/30 p-12 text-center">
                            <p className="font-mono text-sm text-zinc-500">// INITIALIZING_DATA_STREAM...</p>
                        </div>
                    )}
                </div>

                <div className="mt-8 md:hidden text-center">
                    <Link href="/notes" className="inline-flex items-center gap-2 font-mono text-sm text-zinc-500 hover:text-white">
                        VIEW_ARCHIVE <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
