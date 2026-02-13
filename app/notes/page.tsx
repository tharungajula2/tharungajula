import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { cn } from "@/lib/utils";

export const dynamic = 'force-dynamic';

export default function NotesArchive() {
    const posts = getSortedPostsData();

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <section className="relative w-full py-32 px-6 md:px-12">
                <div className="container mx-auto max-w-6xl">
                    {/* NAV */}
                    <div className="mb-8">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white">
                            <ArrowLeft className="h-4 w-4" /> RETURN_TO_LAB
                        </Link>
                    </div>

                    {/* HEADER */}
                    <div className="mb-16 space-y-4">
                        <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                  // FULL_ARCHIVE
                        </span>
                        <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
                            LAB ARCHIVES
                        </h1>
                        <p className="font-body text-xl text-zinc-400 max-w-2xl">
                            A complete log of experiments, prototypes, and observations from the lab of Tharun Health.
                        </p>
                    </div>

                    {/* SEARCH (Placeholder for now) */}
                    <div className="mb-12">
                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <span className="text-zinc-500 font-mono text-xs">cmd_f</span>
                            </div>
                            <input
                                type="text"
                                disabled
                                placeholder="Search logs... (Coming Soon)"
                                className="block w-full rounded-xl border border-white/10 bg-zinc-900/50 py-3 pl-16 pr-4 text-sm text-zinc-300 placeholder-zinc-600 focus:border-primary/50 focus:bg-zinc-900 focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* GRID */}
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                        {posts.map((post) => {
                            const protocol = post.protocol || "1";
                            const isProtocol1 = protocol === "1";
                            const isProtocol2 = protocol === "2";
                            const isProtocol3 = protocol === "3";

                            return (
                                <Link key={post.id} href={`/notes/${post.id}`} className={cn(
                                    "group relative block overflow-hidden rounded-3xl border border-white/5 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-300",
                                    // Default / Fallback
                                    !isProtocol1 && !isProtocol2 && !isProtocol3 && "hover:border-primary/50 hover:bg-primary/5",
                                    // Protocol 1 (Emerald)
                                    isProtocol1 && "hover:border-emerald-500/50 hover:bg-emerald-500/5",
                                    // Protocol 2 (Orange)
                                    isProtocol2 && "hover:border-orange-500/50 hover:bg-orange-500/5",
                                    // Protocol 3 (Blue)
                                    isProtocol3 && "hover:border-blue-500/50 hover:bg-blue-500/5"
                                )}>
                                    <div className="mb-4 flex items-center justify-between">
                                        <span className={cn(
                                            "rounded-full border px-3 py-1 font-mono text-[10px] font-bold tracking-wider uppercase",
                                            !isProtocol1 && !isProtocol2 && !isProtocol3 && "border-primary/20 bg-primary/10 text-primary",
                                            isProtocol1 && "border-emerald-500/20 bg-emerald-500/10 text-emerald-500",
                                            isProtocol2 && "border-orange-500/20 bg-orange-500/10 text-orange-500",
                                            isProtocol3 && "border-blue-500/20 bg-blue-500/10 text-blue-500"
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
                                        isProtocol3 && "group-hover:text-blue-400"
                                    )}>
                                        {post.title}
                                    </h3>

                                    <p className="line-clamp-3 font-body text-sm text-zinc-400 group-hover:text-zinc-300">
                                        {post.excerpt}
                                    </p>

                                    <div className={cn(
                                        "mt-6 flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors",
                                        "group-hover:text-white"
                                    )}>
                                        READ_ENTRY <ArrowUpRight className="h-3 w-3" />
                                    </div>
                                </Link>
                            );
                        })}

                        {/* EMPTY STATE */}
                        {posts.length === 0 && (
                            <div className="col-span-3 flex flex-col items-center justify-center rounded-3xl border border-white/5 bg-zinc-900/30 p-12 text-center">
                                <p className="font-mono text-sm text-zinc-500">// NO_ARCHIVES_FOUND</p>
                            </div>
                        )}
                    </div>
                </div>
            </section>
        </main>
    );
}
