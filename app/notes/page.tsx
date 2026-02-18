import Link from "next/link";
import { getSortedPostsData } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import { SearchableArchive } from "@/components/notes/searchable-archive";

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
                            // DIGITAL_GARDEN_ARCHIVE
                        </span>
                        <h1 className="font-heading text-5xl font-bold text-white md:text-6xl">
                            LAB ARCHIVES
                        </h1>
                        <p className="font-body text-xl text-zinc-400 max-w-2xl">
                            A digital garden of living concepts, framework patches, and active inquiries into the human stack.
                        </p>
                    </div>

                    {/* CLIENT SEARCH & GRID */}
                    <SearchableArchive initialPosts={posts} />
                </div>
            </section>
        </main>
    );
}
