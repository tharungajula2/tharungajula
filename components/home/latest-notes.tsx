import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function LatestNotes() {
    const posts = getSortedPostsData().slice(0, 3); // Show top 3

    return (
        <section id="notes" className="relative w-full py-24 px-6 md:px-12 bg-black/20">
            <div className="container mx-auto max-w-6xl">
                {/* HEADER */}
                <div className="mb-12 flex items-end justify-between">
                    <div className="space-y-4">
                        <span className="font-mono text-xs font-bold tracking-widest text-zinc-500 uppercase">
                            // DIGITAL_GARDEN
                        </span>
                        <h2 className="font-heading text-xl font-bold text-white tracking-tight">
                            LIVING_CONCEPT_DOCUMENTS
                        </h2>
                    </div>
                    <Link href="/notes" className="hidden font-mono text-sm text-zinc-500 hover:text-white md:flex items-center gap-2 transition-colors">
                        VIEW_ARCHIVE <ArrowUpRight className="h-4 w-4" />
                    </Link>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                    {posts.map((post) => {
                        const protocol = post.protocol || "1";
                        const isProtocol1 = protocol === "1";
                        const isProtocol2 = protocol === "2";
                        const isProtocol3 = protocol === "3";

                        return (
                            <Link key={post.id} href={`/notes/${post.id}`} className={cn(
                                "group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300",
                                // Default / Fallback
                                !isProtocol1 && !isProtocol2 && !isProtocol3 && "hover:border-primary/50 hover:bg-primary/5",
                                // Protocol 1 (Emerald)
                                isProtocol1 && "hover:border-emerald-500/50 hover:bg-emerald-500/5",
                                // Protocol 2 (Orange)
                                isProtocol2 && "hover:border-orange-500/50 hover:bg-orange-500/5",
                                // Protocol 3 (Sky)
                                isProtocol3 && "hover:border-sky-500/50 hover:bg-sky-500/5"
                            )}>
                                <div className="mb-4 flex items-center justify-between">
                                    <span className={cn(
                                        "rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase",
                                        !isProtocol1 && !isProtocol2 && !isProtocol3 && "border-primary/20 bg-primary/10 text-primary",
                                        isProtocol1 && "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
                                        isProtocol2 && "border-orange-500/20 bg-orange-500/10 text-orange-500",
                                        isProtocol3 && "border-sky-500/20 bg-sky-500/10 text-sky-500"
                                    )}>
                                        {post.tag}
                                    </span>
                                    <span className="font-mono text-xs text-zinc-500">
                                        {post.date}
                                    </span>
                                </div>

                                <h3 className={cn(
                                    "mb-3 font-heading text-xl font-bold text-white transition-colors",
                                    !isProtocol1 && !isProtocol2 && !isProtocol3 && "group-hover:text-primary",
                                    isProtocol1 && "group-hover:text-emerald-400",
                                    isProtocol2 && "group-hover:text-orange-400",
                                    isProtocol3 && "group-hover:text-sky-400"
                                )}>
                                    {post.title}
                                </h3>

                                <p className="line-clamp-3 font-body text-sm text-zinc-400 group-hover:text-zinc-300 flex-grow">
                                    {post.excerpt}
                                </p>

                                <div className="mt-6 flex items-end justify-between">
                                    <div className={cn(
                                        "flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors",
                                        "group-hover:text-white"
                                    )}>
                                        READ_ENTRY <ArrowUpRight className="h-3 w-3" />
                                    </div>
                                    {post.status && (
                                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-bold tracking-wider text-zinc-500 uppercase group-hover:border-white/20 group-hover:text-zinc-400 transition-colors">
                                            [{post.status}]
                                        </span>
                                    )}
                                </div>
                            </Link>
                        );
                    })}

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
