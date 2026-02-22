import { getSortedPostsData, PostData } from "@/lib/posts";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";
import { SearchableArchive } from "@/components/notes/searchable-archive";
import KnowledgeGraph from "@/components/notes/knowledge-graph";

export const metadata = {
    title: "Neural Map | Tharun Health Lab"
};

export const dynamic = 'force-dynamic';

export default function MapPage() {
    const posts = getSortedPostsData() as any[];

    // 1. Generate Nodes
    const nodes = posts.map(post => ({
        id: post.id,
        name: post.title,
        group: post.protocol || "0", // Fallback group
        // Size node by relevance (excerpt length or just base 1 for now)
        // In full zettelkasten, val could be based on inboundLinks count
        val: 1
    }));

    // Generate a set of all valid node IDs for safe linking
    const validNodeIds = new Set(nodes.map(n => n.id));

    // 2. Generate Links
    const links: { source: string, target: string }[] = [];

    posts.forEach(post => {
        if (post.outboundLinks && post.outboundLinks.length > 0) {
            post.outboundLinks.forEach((targetSlug: string) => {
                // Only create edge if the target note actually exists
                if (validNodeIds.has(targetSlug)) {
                    links.push({
                        source: post.id,
                        target: targetSlug
                    });
                }
            });
        }
    });

    const graphData = { nodes, links };

    return (
        <main className="min-h-screen bg-black flex flex-col">
            <Navbar />

            <section className="flex-1 flex flex-col w-full px-6 pt-32 pb-12 md:px-12 relative z-10">
                <div className="container mx-auto max-w-6xl w-full h-full flex flex-col">

                    {/* NAV & HEADER */}
                    <div className="mb-8 shrink-0">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-6">
                            <ArrowLeft className="h-4 w-4" /> RETURN_TO_LAB
                        </Link>

                        <div className="space-y-2">
                            <span className="font-mono text-xs font-bold tracking-widest text-primary uppercase">
                                // SYSTEM_MAP {'>'} NEURAL_NETWORK
                            </span>
                            <h1 className="font-heading text-4xl font-bold text-white md:text-5xl">
                                DIGITAL BRAIN
                            </h1>
                            <p className="font-body text-zinc-400 max-w-2xl">
                                Interactive knowledge graph of the Zettelkasten. Nodes represent living concepts, edges represent bi-directional context paths.
                            </p>
                        </div>
                    </div>

                    {/* GRAPH CANVAS WRAPPER - HUD STYLING (HERO ELEMENT) */}
                    <div className="w-full h-[70vh] min-h-[600px] border border-zinc-800 rounded-xl overflow-hidden relative mb-8 bg-black">
                        {/* Grid Background */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none"></div>

                        {/* Radial Monitor Glow */}
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] pointer-events-none"></div>

                        {/* Force Graph */}
                        <div className="absolute inset-0 z-10">
                            <KnowledgeGraph graphData={graphData} />
                        </div>
                    </div>

                    {/* SEARCH ARCHIVE (LIST VIEW FALLBACK) */}
                    <div className="shrink-0 mt-8">
                        <SearchableArchive initialPosts={posts} />
                    </div>

                </div>
            </section>
        </main>
    );
}
