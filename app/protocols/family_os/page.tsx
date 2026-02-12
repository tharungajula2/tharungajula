"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    Users,
    Stethoscope,
    TrafficCone,
    BrainCircuit,
    Sparkles,
    LayoutTemplate,
    Search
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolFamilyOSPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-orange-500/30 overflow-x-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-orange-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER - RESEARCH FOCUSED */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    {/* GLASS ICON BOX */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-orange-500">
                        <LayoutTemplate className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-orange-500">
                                STATUS: BUILDER_PHASE
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-orange-500">FAMILY</span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-light text-zinc-200">
                            The Family Health Architecture.
                        </h2>

                        <p className="font-body text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Investigating the 'Broken Loop' of Indian Healthcare. Exploring the friction between WhatsApp chaos, plastic bags, and the 'Context Blindness' that plagues the Indian Family Unit.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE EXPLORATION GRID (Problem Spaces) */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 text-center">
                        <div className="h-px w-12 bg-orange-500/50 hidden md:block" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-orange-500 uppercase">
                            RESEARCH_AREAS // EXPLORATION_VECTORS
                        </h2>
                        <div className="h-px w-12 bg-orange-500/50 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">

                        {/* CARD 1: THE CHO */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-orange-500/40 md:hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] active:scale-[0.98] active:border-orange-500/40 active:bg-orange-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-orange-400 active:text-orange-400 transition-colors">
                                    The 'Chief Health Officer'
                                </h3>
                                <Users className="h-5 w-5 text-orange-500/50 md:group-hover:text-orange-500 active:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-orange-500/70 active:text-orange-500/70 transition-colors">
                                    THE_COGNITIVE_LOAD_PROBLEM
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Analyzing the burden on the Mother (The CHO). How does she manage the mental load of Kids, Parents, and Pets simultaneously?
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Multi-Generational Care", "The Plastic Bag Syndrome"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 2: CLINICAL REALITY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-orange-500/40 md:hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] active:scale-[0.98] active:border-orange-500/40 active:bg-orange-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-orange-400 active:text-orange-400 transition-colors">
                                    The Incentive Gap
                                </h3>
                                <Stethoscope className="h-5 w-5 text-orange-500/50 md:group-hover:text-orange-500 active:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-orange-500/70 active:text-orange-500/70 transition-colors">
                                    CLINICAL_REALITY
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Why do Doctors reject apps? Investigating the economics of the '3-Minute Consult' and the unpaid chaos of WhatsApp.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Clinical Workflow", "Revenue vs. Triage"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 3: THE BANGALORE REALITY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-orange-500/40 md:hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] active:scale-[0.98] active:border-orange-500/40 active:bg-orange-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-orange-400 active:text-orange-400 transition-colors">
                                    Logistics as a Health Determinant
                                </h3>
                                <TrafficCone className="h-5 w-5 text-orange-500/50 md:group-hover:text-orange-500 active:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-orange-500/70 active:text-orange-500/70 transition-colors">
                                    THE_BANGALORE_REALITY
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Studying how Traffic dictates healthcare choices in Bangalore. Can '10-minute delivery' models apply to primary care?
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Hyper-Local Friction", "Hybrid Care Models"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 4: THE DATA SILO */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-orange-500/40 md:hover:shadow-[0_0_20px_rgba(249,115,22,0.05)] active:scale-[0.98] active:border-orange-500/40 active:bg-orange-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-orange-400 active:text-orange-400 transition-colors">
                                    Solving Context Blindness
                                </h3>
                                <BrainCircuit className="h-5 w-5 text-orange-500/50 md:group-hover:text-orange-500 active:text-orange-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-orange-500">
                                <div className="h-px w-8 bg-orange-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-orange-500/70 active:text-orange-500/70 transition-colors">
                                    THE_DATA_SILO
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Researching why medical history is lost between visits. How do we create a longitudinal record without friction?
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Context Continuity", "Data Portability"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 5: EVOLVING ROADMAP */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="group relative p-8 rounded-2xl border border-dashed border-zinc-800 bg-black/20 backdrop-blur-sm flex flex-col justify-center items-center text-center md:hover:border-zinc-700 active:border-zinc-700 active:scale-[0.98] transition-all md:col-span-2 lg:col-span-2"
                        >
                            <div className="p-4 rounded-full bg-zinc-900 text-zinc-600 mb-4 md:group-hover:text-orange-500 active:text-orange-500 transition-colors">
                                <Sparkles className="h-6 w-6 animate-pulse" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-zinc-500 mb-2">
                                Exploration // Evolving
                            </h3>
                            <p className="font-body text-sm text-zinc-600 max-w-sm">
                                Continuous investigation into family dynamics and healthcare policy. The problem space expands as we learn.
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* SECTION 4: THE MISSION OBJECTIVE */}
            <section className="py-32 px-6 text-center border-t border-white/5 bg-white/[0.02]">
                <div className="container mx-auto max-w-4xl">
                    <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="space-y-6"
                    >
                        <p className="font-mono text-xs tracking-[0.3em] text-orange-500 uppercase">
                            // MISSION_OBJECTIVE
                        </p>
                        <h3 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
                            "To decode the complex reality of the <br className="hidden md:block" />
                            <span className="text-orange-500">Indian Family Unit</span> and architect slow, steady <br className="hidden md:block" />
                            solutions for <span className="text-orange-500">Sustainable Health Security</span>."
                        </h3>
                        <div className="pt-8">
                            <div className="h-16 w-px bg-gradient-to-b from-orange-500 to-transparent mx-auto" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
