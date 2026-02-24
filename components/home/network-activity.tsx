import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NetworkActivity() {
    const posts = getSortedPostsData().slice(0, 5); // Show top 5 recent nodes

    return (
        <section id="notes" className="relative w-full py-24 px-6 md:px-12 bg-black/20">
            <div className="container mx-auto max-w-4xl">
                {/* HEADER */}
                <div className="mb-8 border-b border-zinc-800 pb-4 flex justify-between items-end">
                    <span className="font-mono text-sm font-bold tracking-widest text-zinc-500 uppercase">
                        // RECENT_NETWORK_ACTIVITY
                    </span>
                    <span className="font-mono text-xs text-primary animate-pulse hidden md:block">
                        LIVE_SYNC
                    </span>
                </div>

                {/* DENSE TERMINAL LIST */}
                <div className="flex flex-col gap-3">
                    {posts.map((post) => {
                        const protocol = post.protocol || "1";
                        const isProtocol0 = protocol === "0";
                        const isProtocol1 = protocol === "1";
                        const isProtocol2 = protocol === "2";
                        const isProtocol3 = protocol === "3";

                        return (
                            <Link key={post.id} href={`/notes/${post.id}`} className="group flex flex-col md:flex-row md:items-center justify-between py-3 px-4 rounded-md hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all">

                                <div className="flex items-center gap-4">
                                    <span className={cn(
                                        "font-mono text-[10px] font-bold tracking-wider px-2 py-0.5 rounded uppercase border",
                                        !isProtocol0 && !isProtocol1 && !isProtocol2 && !isProtocol3 && "border-primary/20 bg-primary/10 text-primary",
                                        isProtocol0 && "border-zinc-400/30 bg-zinc-400/10 text-zinc-400",
                                        isProtocol1 && "border-purple-500/30 bg-purple-500/10 text-purple-500",
                                        isProtocol2 && "border-orange-500/20 bg-orange-500/10 text-orange-500",
                                        isProtocol3 && "border-sky-500/20 bg-sky-500/10 text-sky-500"
                                    )}>
                                        [{post.tag}]
                                    </span>

                                    <span className="font-heading text-zinc-300 group-hover:text-white transition-colors truncate max-w-[200px] md:max-w-md">
                                        {post.title}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 mt-2 md:mt-0 opacity-50 md:opacity-100">
                                    <span className="font-mono text-xs text-zinc-600 hidden md:inline-block">
                                        ....................
                                    </span>
                                    <span className="font-mono text-xs text-zinc-500 w-24 text-right">
                                        {post.date}
                                    </span>
                                    <ArrowUpRight className="h-3 w-3 text-zinc-600 group-hover:text-primary transition-colors hidden md:block" />
                                </div>
                            </Link>
                        );
                    })}

                    {/* EMPTY STATE */}
                    {posts.length === 0 && (
                        <div className="py-8 text-center text-zinc-600 font-mono text-sm">
                            NO_RECENT_ACTIVITY_DETECTED
                        </div>
                    )}
                </div>

                {/* TERMINAL FOOTER NAV */}
                <div className="mt-8 pt-4 border-t border-zinc-800 flex justify-end">
                    <Link href="/map" className="inline-flex items-center gap-2 font-mono text-sm font-bold text-zinc-500 hover:text-primary transition-colors group">
                        ACCESS_FULL_MAP <ArrowUpRight className="h-4 w-4 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
