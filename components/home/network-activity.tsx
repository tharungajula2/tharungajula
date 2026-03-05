import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function NetworkActivity() {
    const posts = getSortedPostsData().slice(0, 5); // Show top 5 recent nodes

    return (
        <section id="notes" className="relative w-full">
            <div className="w-full">
                {/* HEADER */}
                <div className="mb-4 border-b border-white/10 pb-3 flex justify-between items-end">
                    <span className="font-mono text-[10px] font-bold tracking-widest text-slate-400 text-zinc-500 uppercase">
                        // RECENT_ACTIVITY
                    </span>
                    <span className="font-mono text-[9px] text-cyan-400 animate-pulse">
                        LIVE_SYNC
                    </span>
                </div>

                {/* DENSE TERMINAL LIST */}
                <div className="flex flex-col gap-2">
                    {posts.map((post) => {
                        const protocol = post.protocol || "1";
                        const isProtocol0 = protocol === "0";
                        const isProtocol1 = protocol === "1";
                        const isProtocol2 = protocol === "2";
                        const isProtocol3 = protocol === "3";

                        return (
                            <Link key={post.id} href={`/notes/${post.id}`} className="group flex flex-col py-2 px-3 rounded-lg hover:bg-white/5 border border-transparent hover:border-white/10 transition-all gap-1.5">

                                <div className="flex items-start gap-2">
                                    <span className={cn(
                                        "font-mono text-[8px] font-bold tracking-wider px-1.5 py-0.5 rounded uppercase border shrink-0 mt-0.5",
                                        !isProtocol0 && !isProtocol1 && !isProtocol2 && !isProtocol3 && "border-cyan-500/20 bg-cyan-500/10 text-cyan-500",
                                        isProtocol0 && "border-zinc-400/30 bg-zinc-400/10 text-zinc-400",
                                        isProtocol1 && "border-purple-500/30 bg-purple-500/10 text-purple-500",
                                        isProtocol2 && "border-orange-500/20 bg-orange-500/10 text-orange-500",
                                        isProtocol3 && "border-sky-500/20 bg-sky-500/10 text-sky-500"
                                    )}>
                                        [{post.tag}]
                                    </span>

                                    <span className="font-heading text-xs text-slate-300 group-hover:text-cyan-400 transition-colors line-clamp-1">
                                        {post.title}
                                    </span>
                                </div>

                                <div className="flex items-center justify-between opacity-70 group-hover:opacity-100 transition-opacity">
                                    <span className="font-mono text-[9px] text-slate-500">
                                        {post.date}
                                    </span>
                                    <ArrowUpRight className="h-3 w-3 text-slate-500 group-hover:text-cyan-400 transition-colors" />
                                </div>
                            </Link>
                        );
                    })}

                    {/* EMPTY STATE */}
                    {posts.length === 0 && (
                        <div className="py-6 text-center text-slate-500 font-mono text-[10px]">
                            NO_RECENT_ACTIVITY_DETECTED
                        </div>
                    )}
                </div>

                {/* TERMINAL FOOTER NAV */}
                <div className="mt-4 pt-3 border-t border-white/10 flex justify-end">
                    <Link href="/map" className="inline-flex items-center gap-1 font-mono text-[10px] font-bold text-slate-500 hover:text-cyan-400 transition-colors group">
                        ACCESS_FULL_MAP <ArrowUpRight className="h-3 w-3 transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
