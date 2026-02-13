"use client";

import { motion } from "framer-motion";
import {
    ArrowLeft,
    Stethoscope,
    Filter,
    ShieldCheck,
    Banknote,
    MessageCircle,
    Sparkles,
    LayoutTemplate
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolClinicalOSPage() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-blue-500/30 overflow-x-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-blue-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER - RESEARCH FOCUSED */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    {/* GLASS ICON BOX */}
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-blue-500">
                        <Stethoscope className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className="font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md text-blue-500">
                                STATUS: ACTIVE_LEARNING
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            Protocol <span className="text-blue-500">CLINICAL</span>
                        </h1>

                        <h2 className="text-2xl md:text-3xl font-light text-zinc-200">
                            The Clinical Architecture.
                        </h2>

                        <p className="font-body text-lg md:text-xl text-zinc-400 font-light max-w-2xl mx-auto leading-relaxed">
                            Investigating the operational chaos of Indian Primary Care. Exploring the friction between high patient volume, liability fears, and the 'Context Blindness' that leads to burnout.
                        </p>
                    </div>
                </div>

            </div>

            {/* SECTION 2: THE EXPLORATION GRID (Problem Spaces) */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-5xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 text-center">
                        <div className="h-px w-12 bg-blue-500/50 hidden md:block" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-blue-500 uppercase">
                            RESEARCH_AREAS // EXPLORATION_VECTORS
                        </h2>
                        <div className="h-px w-12 bg-blue-500/50 hidden md:block" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-20">

                        {/* CARD 1: THE VOLUME-VELOCITY PROBLEM */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    The Volume-Velocity Problem
                                </h3>
                                <Filter className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    THE_3_MINUTE_REALITY
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Analyzing the extreme pressure on Indian doctors. How does a 3-minute average consult time impact diagnostic accuracy and empathy?
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["High-Volume Triage", "Cognitive Fatigue"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 2: THE SHADOW HEALTH SYSTEM */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    The Shadow Health System
                                </h3>
                                <MessageCircle className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    THE_WHATSAPP_BLACK_HOLE
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Why do doctors use WhatsApp despite the risks? Studying the informal, unstructured data flows that sustain—and threaten—clinical practice.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Unstructured Data", "Informal Care"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 3: LIABILITY VS SPEED */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Liability vs. Speed
                                </h3>
                                <ShieldCheck className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    THE_DOCUMENTATION_DEBT
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                'If it isn't written, it didn't happen.' Researching the friction of EMR adoption in a high-volume, low-resource setting.
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Legal Safety", "EMR Friction"].map((tag) => (
                                        <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-400 bg-zinc-900/50 rounded border border-white/5">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* CARD 4: ECONOMICS OF CARE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-blue-500/40 md:hover:shadow-[0_0_20px_rgba(59,130,246,0.05)] active:scale-[0.98] active:border-blue-500/40 active:bg-blue-900/5"
                        >
                            <div className="flex justify-between items-start mb-6">
                                <h3 className="font-heading text-2xl font-bold text-white md:group-hover:text-blue-400 active:text-blue-400 transition-colors">
                                    Economics of Care
                                </h3>
                                <Banknote className="h-5 w-5 text-blue-500/50 md:group-hover:text-blue-500 active:text-blue-500 transition-colors" />
                            </div>

                            <div className="mb-6 flex items-center gap-2 text-blue-500">
                                <div className="h-px w-8 bg-blue-500/50" />
                                <h4 className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500 md:group-hover:text-blue-500/70 active:text-blue-500/70 transition-colors">
                                    THE_INCENTIVE_CONFLICT
                                </h4>
                            </div>

                            <p className="font-body text-sm text-zinc-400 mb-8 leading-relaxed min-h-[60px]">
                                Investigating why digital health fails to monetize. How do we align 'better care' with 'financial sustainability' for the independent practitioner?
                            </p>

                            <div className="space-y-3 pt-6 border-t border-white/5">
                                <div className="flex flex-wrap gap-2">
                                    {["Revenue Models", "Value-Based Care"].map((tag) => (
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
                            <div className="p-4 rounded-full bg-zinc-900 text-zinc-600 mb-4 md:group-hover:text-blue-500 active:text-blue-500 transition-colors">
                                <Sparkles className="h-6 w-6 animate-pulse" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-zinc-500 mb-2">
                                Exploration // Evolving
                            </h3>
                            <p className="font-body text-sm text-zinc-600 max-w-sm">
                                Continuous investigation into clinical workflows and medical policy. The problem space expands as we learn.
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
                        <p className="font-mono text-xs tracking-[0.3em] text-blue-500 uppercase">
                            // MISSION_OBJECTIVE
                        </p>
                        <h3 className="font-heading text-3xl md:text-5xl font-bold text-white leading-tight">
                            "To decode the operational reality of the <br className="hidden md:block" />
                            <span className="text-blue-500">Independent Clinic</span> and architect systems that <br className="hidden md:block" />
                            restore <span className="text-blue-500">Clinical Sanity</span> and <span className="text-blue-500">Patient Trust</span>."
                        </h3>
                        <div className="pt-8">
                            <div className="h-16 w-px bg-gradient-to-b from-blue-500 to-transparent mx-auto" />
                        </div>
                    </motion.div>
                </div>
            </section>
        </main>
    );
}
