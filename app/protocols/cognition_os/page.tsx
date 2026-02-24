"use client";
// Force Rebuild for Metadata Sync

import { motion } from "framer-motion";
import {
    ArrowLeft,
    LayoutTemplate,
    Sparkles,
    Filter,
    Component,
    Library,
    Crosshair,
    Mic,
    Zap,
    Brain
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolCognitionPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-sky-500/30 overflow-x-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-sky-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER - COGNITIVE OS */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    {/* GLASS ICON BOX */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-sky-500">
                        <Brain className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-sky-500">
                                STATUS: CONCEPT_PHASE
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-sky-500">COGNITION</span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-light text-zinc-200">
                            The Cognitive Operating System.
                        </h2>

                        <p className="font-body text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            The Operator's Mind is the primary leverage. A synthesis of Munger's Mental Models, Feynman's Simplification, and High-Velocity Information Architecture.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE COGNITIVE GRID (6 Vectors) */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-8 text-center">
                        <div className="h-px w-12 bg-sky-500/50 hidden md:block" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-sky-500 uppercase">
                            RESEARCH_AREAS // EXPLORATION_VECTORS
                        </h2>
                        <div className="h-px w-12 bg-sky-500/50 hidden md:block" />
                    </div>



                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-20">

                        {/* VECTOR 1: INPUT */}
                        <Card
                            title="The Bayesian Filter"
                            icon={<Filter className="h-5 w-5" />}
                            layer="INPUT_HYGIENE"
                            description="The noise bottleneck. Ruthlessly filtering 'news' and low-signal inputs to preserve predictive accuracy."
                            tags={["Information Hygiene", "Lindy Effect"]}
                            delay={0.1}
                        />

                        {/* VECTOR 2: PROCESSING */}
                        <Card
                            title="The Latticework"
                            icon={<Component className="h-5 w-5" />}
                            layer="PROCESSING"
                            description="Synthesis over memorization. Using a multi-disciplinary toolkit (Physics, Microeconomics) to decode complex reality."
                            tags={["Mental Models", "First Principles"]}
                            delay={0.2}
                        />

                        {/* VECTOR 3: STORAGE */}
                        <Card
                            title="The External Cortex"
                            icon={<Library className="h-5 w-5" />}
                            layer="STORAGE"
                            description="Compound knowledge. Moving beyond 'collecting' to 'connecting'. Building a networked graph of ideas that surprises you."
                            tags={["Zettelkasten", "Second Brain"]}
                            delay={0.3}
                        />

                        {/* VECTOR 4: SIMULATION */}
                        <Card
                            title="Intuition Engineering"
                            icon={<Crosshair className="h-5 w-5" />}
                            layer="SIMULATION"
                            description="The simulator. Training the brain to recognize patterns and mentally simulate outcomes before executing high-stakes decisions."
                            tags={["Pre-Mortems", "Pattern Recognition"]}
                            delay={0.4}
                        />

                        {/* VECTOR 5: OUTPUT */}
                        <Card
                            title="The Interface"
                            icon={<Mic className="h-5 w-5" />}
                            layer="OUTPUT"
                            description="Transmission leverage. Mastering oration, writing, and persuasion to program the collective mind of the organization."
                            tags={["Pyramid Principle", "Storytelling"]}
                            delay={0.5}
                        />

                        {/* VECTOR 6: STATE */}
                        <Card
                            title="The Biosystem"
                            icon={<Zap className="h-5 w-5" />}
                            layer="STATE_PLASTICITY"
                            description="The biological engine. Managing dopamine for drive, entering Flow states on demand, and rewiring the brain through error-driven learning."
                            tags={["Deep Work", "Neuroplasticity"]}
                            delay={0.6}
                        />

                    </div>

                    {/* LAB NOTE DISCLAIMER */}
                    <div className="flex justify-center mt-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-sky-500/20 bg-sky-500/5 backdrop-blur-sm max-w-2xl text-center">
                            <span className="font-mono text-[10px] md:text-xs font-medium text-zinc-400">
                                NOTE: These vectors represent the current scope of exploration. This architecture is not static; it evolves continuously as new data is assimilated.
                            </span>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION 4: COMPOUND WISDOM FOOTER */}
            <section className="py-32 px-6 text-center border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <div className="flex justify-center mb-6 text-sky-500">
                            <Sparkles className="h-6 w-6 animate-pulse" />
                        </div>
                        <p className="font-mono text-xs tracking-[0.3em] text-sky-500 uppercase">
                            // MISSION_OBJECTIVE
                        </p>
                        <h3 className="font-heading text-2xl md:text-4xl font-bold text-white leading-tight">
                            "To engineer the <span className="text-sky-500">Cognitive Software</span> required to run <br className="hidden md:block" />
                            <span className="text-purple-500">Biology OS</span> and <span className="text-orange-500">Protocol Family</span>."
                        </h3>
                        <div className="pt-8">
                            <div className="h-16 w-px bg-gradient-to-b from-sky-500 to-transparent mx-auto" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}

// Reusable Card Component
function Card({ title, icon, layer, description, tags, delay }: { title: string, icon: any, layer: string, description: string, tags: string[], delay: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: delay }}
            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-sky-500/40 md:hover:shadow-[0_0_20px_rgba(14,165,233,0.05)] active:scale-[0.98] active:border-sky-500/40 active:bg-sky-900/5 flex flex-col h-full"
        >
            <div className="flex justify-between items-start mb-6">
                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-sky-400 active:text-sky-400 transition-colors">
                    {title}
                </h3>
                <div className="text-sky-500/50 md:group-hover:text-sky-500 active:text-sky-500 transition-colors">
                    {icon}
                </div>
            </div>

            <div className="mb-6 flex items-center gap-2 text-sky-500">
                <div className="h-px w-8 bg-sky-500/50" />
                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-sky-500/70 active:text-sky-500/70 transition-colors">
                    {layer}
                </h4>
            </div>

            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed flex-grow">
                {description}
            </p>

            <div className="space-y-3 pt-6 border-t border-white/5 mt-auto">
                <div className="flex flex-wrap gap-2">
                    {tags.map((tag) => (
                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
