import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowUpRight } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";

export default function NotesArchive() {
    const posts = getSortedPostsData();

    return (
        <main className="min-h-screen bg-black">
            <Navbar />

            <section className="relative w-full py-32 px-6 md:px-12">
                <div className="container mx-auto max-w-6xl">
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
