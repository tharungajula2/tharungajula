"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PostData } from "@/lib/posts";

interface SearchableArchiveProps {
    initialPosts: PostData[];
}

export function SearchableArchive({ initialPosts }: SearchableArchiveProps) {
    const [query, setQuery] = useState("");

    const filteredPosts = initialPosts.filter((post) => {
        const searchContent = `${post.title} ${post.excerpt} ${post.tag}`.toLowerCase();
        return searchContent.includes(query.toLowerCase());
    });

    return (
        <>
            {/* SEARCH */}
            <div className="mb-12">
                <div className="relative max-w-md">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <span className="text-zinc-500 font-mono text-xs">cmd_f</span>
                    </div>
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search logs..."
                        className="block w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3 pl-16 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:border-primary/50 focus:bg-zinc-900 focus:outline-none transition-all"
                    />
                </div>
            </div>

            {/* GRID */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filteredPosts.map((post) => {
                    const protocol = post.protocol || "1";
                    const isProtocol0 = protocol === "0";
                    const isProtocol1 = protocol === "1";
                    const isProtocol2 = protocol === "2";
                    const isProtocol3 = protocol === "3";

                    return (
                        <Link key={post.id} href={`/notes/${post.id}`} className={cn(
                            "group relative flex flex-col overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300",
                            // Default / Fallback
                            !isProtocol0 && !isProtocol1 && !isProtocol2 && !isProtocol3 && "hover:border-primary/50 hover:bg-primary/5",
                            // Protocol 0 (Zinc)
                            isProtocol0 && "hover:border-zinc-400/50 hover:bg-zinc-400/5",
                            // Protocol 1 (Purple)
                            isProtocol1 && "hover:border-purple-500/50 hover:bg-purple-500/5",
                            // Protocol 2 (Orange)
                            isProtocol2 && "hover:border-orange-500/50 hover:bg-orange-500/5",
                            // Protocol 3 (Blue)
                            isProtocol3 && "hover:border-sky-500/50 hover:bg-sky-500/5"
                        )}>
                            <div className="mb-4 flex items-center justify-between">
                                <span className={cn(
                                    "rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase",
                                    !isProtocol0 && !isProtocol1 && !isProtocol2 && !isProtocol3 && "border-primary/20 bg-primary/10 text-primary",
                                    isProtocol0 && "border-zinc-400/30 bg-zinc-400/10 text-zinc-400",
                                    isProtocol1 && "border-purple-500/30 bg-purple-500/10 text-purple-500",
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
                                !isProtocol0 && !isProtocol1 && !isProtocol2 && !isProtocol3 && "group-hover:text-primary",
                                isProtocol0 && "group-hover:text-zinc-400",
                                isProtocol1 && "group-hover:text-purple-400",
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

                {/* EMPTY STATE */}
                {filteredPosts.length === 0 && (
                    <div className="col-span-1 md:col-span-2 lg:col-span-3 flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-zinc-900/30 p-12 text-center">
                        <Search className="h-8 w-8 text-zinc-600 mb-4" />
                        <p className="font-mono text-sm text-zinc-500">// NO_RESULTS_FOUND</p>
                    </div>
                )}
            </div>
        </>
    );
}
