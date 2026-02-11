
"use client";

import { motion } from "framer-motion";
import { BrainCircuit, ArrowLeft, Lightbulb, Puzzle, BookOpen } from "lucide-react";
import { Navbar } from "@/components/layout/navbar";
import Link from "next/link";

export default function ProtocolMindPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-yellow-500/30 overflow-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-yellow-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-yellow-500">
                        <BrainCircuit className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-yellow-500">
                                STATUS: CONCEPT_PHASE
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-yellow-500">MIND</span>
                        </h1>

                        <p className="font-body text-xl md:text-2xl text-zinc-400 font-light">
                            The Cognitive OS. Critical Thinking, Mental Clarity, and Decision Architecture.
                        </p>
                    </div>
                </div>

                {/* PLACEHOLDER CONTENT */}
                <div className="border-t border-white/5 pt-20">
                    <div className="container mx-auto max-w-4xl text-center">
                        <p className="font-mono text-xs tracking-[0.2em] text-yellow-500 uppercase mb-8">
                            // UNDER_DEVELOPMENT
                        </p>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 opacity-50">
                            {[
                                { icon: Lightbulb, title: "Mental Models" },
                                { icon: Puzzle, title: "Problem Solving" },
                                { icon: BookOpen, title: "Knowledge Mgmt" }
                            ].map((item, i) => (
                                <div key={i} className="p-6 rounded-2xl border border-white/5 bg-zinc-900/50 flex flex-col items-center">
                                    <item.icon className="w-8 h-8 text-yellow-500/50 mb-4" />
                                    <h3 className="text-zinc-400 font-bold">{item.title}</h3>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
