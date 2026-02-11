
"use client";

import { motion } from "framer-motion";
import {
    Dna,
    Microscope,
    Activity,
    FileHeart,
    CheckCircle2,
    ArrowRight,
    ArrowLeft
} from "lucide-react";
import Link from "next/link";
import { ACADEMY_CURRICULUM, LAB_TOOLS } from "@/lib/n1-data";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolN1Page() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-emerald-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-emerald-500">
                        <Activity className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-emerald-500">
                                STATUS: ACTIVE_LEARNING
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-emerald-500">N=1</span>
                        </h1>

                        <p className="font-body text-xl md:text-2xl text-zinc-400 font-light">
                            The Health & Wellness Academy. A rigorous approach to decoding the human organism.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE SYLLABUS (Grid) */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex items-center justify-center gap-4 mb-16">
                        <div className="h-px w-12 bg-emerald-500/50" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-emerald-500 uppercase">
                            Academy_Syllabus // Core_Pillars
                        </h2>
                        <div className="h-px w-12 bg-emerald-500/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                        {ACADEMY_CURRICULUM.map((pillar, index) => (
                            <motion.div
                                key={pillar.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className={`group relative p-8 rounded-2xl border backdrop-blur-sm transition-all duration-300 ${pillar.title.includes("Diagnostics")
                                    ? "border-emerald-500/40 bg-emerald-900/5 hover:bg-emerald-900/10 shadow-[0_0_20px_rgba(16,185,129,0.05)]"
                                    : "border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20"
                                    }`}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <h3 className="font-heading text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
                                        {pillar.title}
                                    </h3>
                                    <span className="font-mono text-xs text-zinc-600 group-hover:text-emerald-500/50 transition-colors">
                                        0{index + 1}
                                    </span>
                                </div>

                                <p className="font-body text-sm text-zinc-400 mb-8 min-h-[40px]">
                                    {pillar.description}
                                </p>

                                {/* Modules List with Codes */}
                                <div className="space-y-3 mb-8">
                                    <h4 className="font-mono text-[10px] text-zinc-600 uppercase tracking-widest mb-4">
                                        Module Overview
                                    </h4>
                                    <ul className="grid gap-2">
                                        {pillar.modules.map((module) => (
                                            <li key={module.id} className="flex items-center gap-3 text-sm text-zinc-300 group/item">
                                                <span className="font-mono text-[10px] text-emerald-500/60 bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10 min-w-[55px] text-center">
                                                    {module.id}
                                                </span>
                                                <span className="text-xs group-hover/item:text-emerald-300/80 transition-colors">
                                                    {module.title}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2 pt-6 border-t border-white/5">
                                    <div className="flex justify-between text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                                        <span>Completion_Status</span>
                                        <span className="text-emerald-500">{pillar.progress}%</span>
                                    </div>
                                    <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: `${pillar.progress}%` }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1, delay: 0.5 }}
                                            className="h-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.5)]"
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* SECTION 3: THE LAB STACK (Tools) */}
            <section className="py-20 px-6 border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col items-center justify-center mb-12 text-center">
                        <div className="flex items-center gap-4 mb-4">
                            <div className="h-px w-12 bg-emerald-500" />
                            <h2 className="font-mono text-sm tracking-widest text-emerald-500 uppercase">
                                // ARCHITECTURE_CONCEPTS // CLOUD_LAB
                            </h2>
                            <div className="h-px w-12 bg-emerald-500" />
                        </div>
                        <p className="font-body text-sm text-zinc-500 max-w-lg">
                            An illustrative example of the hardware and software stack that could be used.
                            The actual architecture may vary based on specific requirements.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                        {LAB_TOOLS.map((tool, idx) => {
                            const Icon = tool.icon === "Dna" ? Dna
                                : tool.icon === "Microscope" ? Microscope
                                    : tool.icon === "FileHeart" ? FileHeart
                                        : Activity;

                            return (
                                <motion.div
                                    key={tool.name}
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    whileInView={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="flex flex-col items-center justify-center p-6 rounded-xl border border-white/5 bg-black hover:border-emerald-500/30 hover:bg-emerald-900/5 transition-all text-center group"
                                >
                                    <div className="p-3 mb-4 rounded-full bg-emerald-500/5 text-emerald-500/70 group-hover:text-emerald-400 group-hover:bg-emerald-500/10 group-hover:scale-110 transition-all">
                                        <Icon className="h-5 w-5" />
                                    </div>
                                    <h4 className="font-heading text-sm font-bold text-zinc-300 mb-1">
                                        {tool.name}
                                    </h4>
                                    <span className="font-mono text-[10px] text-zinc-600 uppercase tracking-wider group-hover:text-emerald-500/50 transition-colors">
                                        {tool.category}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* SECTION 4: THE OUTPUT */}
            <section className="py-32 px-6 text-center">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <p className="font-mono text-xs tracking-[0.3em] text-emerald-500 uppercase">
                            // MISSION_OBJECTIVE
                        </p>
                        <h3 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
                            "To build a verified knowledge base for the <br className="hidden md:block" />
                            <span className="text-emerald-500">Family Health OS (Yukti).</span>"
                        </h3>
                        <div className="pt-8">
                            <div className="h-16 w-px bg-gradient-to-b from-emerald-500 to-transparent mx-auto" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
