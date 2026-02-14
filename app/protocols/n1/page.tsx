
"use client";

import { motion } from "framer-motion";
import {
    Dna,
    Microscope,
    Flame,
    Zap,
    Shield,
    Heart,
    Wind,
    Dumbbell,
    Utensils,
    Brain,
    Moon,
    Droplet,
    ArrowLeft,
    Sparkles,
    CheckCircle2
} from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProtocolN1Page() {
    return (
        <main className="min-h-screen bg-black text-white selection:bg-emerald-500/30 overflow-x-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] md:w-[800px] h-[300px] md:h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none bg-emerald-500" />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    <div className="p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10 text-emerald-500">
                        <Dna className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
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

            {/* SECTION 2: THE 12-SYSTEM GRID */}
            <section className="py-20 px-6">
                <div className="container mx-auto max-w-6xl">
                    <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-16 text-center">
                        <div className="h-px w-8 md:w-12 bg-emerald-500/50" />
                        <h2 className="font-mono text-xs tracking-[0.2em] text-emerald-500 uppercase">
                            SYSTEM_ARCHITECTURE // EXPLORATION_VECTORS
                        </h2>
                        <div className="h-px w-8 md:w-12 bg-emerald-500/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">

                        {/* CARD 1: GENOMIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.1 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Blueprint
                                </h3>
                                <Dna className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">GENOMIC</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Managing the source code. From genetic risk baselines to epigenetic 'age programs' and telomere maintenance.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Methylation", "DNA Repair", "Polygenic Risk"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 2: CELLULAR */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.15 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Repair Crew
                                </h3>
                                <Microscope className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">CELLULAR</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Optimizing the cleanup crews. clearing 'zombie' cells and boosting protein quality control (proteostasis).
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Autophagy", "Senescence", "NAD+"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 3: METABOLIC */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.2 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Energy Engine
                                </h3>
                                <Flame className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">METABOLIC</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Fueling the machine. optimizing glucose dynamics, mitochondrial efficiency, and metabolic flexibility.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Insulin Sensitivity", "Mitochondria", "Zone 2"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 4: ENDOCRINE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.25 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Control Layer
                                </h3>
                                <Zap className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">ENDOCRINE</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                The chemical messengers. Regulating the stress axis (HPA), sex hormones, and the balance between fight-or-flight.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Cortisol", "Thyroid", "HRV", "Testosterone"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>


                        {/* CARD 5: IMMUNE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.3 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Defense System
                                </h3>
                                <Shield className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">IMMUNE</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Managing the fire. Balancing innate immunity and suppressing chronic 'inflammaging' without compromising defense.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Cytokines", "Gut Barrier", "Lymphocytes"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 6: CARDIOVASCULAR */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.35 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    Pump & Pipes
                                </h3>
                                <Heart className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">CARDIOVASCULAR</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Hydraulics engineering. Managing pressure, flow, endothelial health, and lipid dynamics for longevity.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["VO2 Max", "ApoB", "Arterial Stiffness"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 7: RESPIRATORY */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    Gas Exchange
                                </h3>
                                <Wind className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">RESPIRATORY</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                The intake manifold. Optimizing oxygen capture and CO2 clearance for endurance and sleep quality.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["CO2 Tolerance", "Apnea Index", "SpO2"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 8: MUSCULOSKELETAL */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.45 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Structural Chassis
                                </h3>
                                <Dumbbell className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">MUSCULOSKELETAL</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Mechanical integrity. Preserving muscle mass, bone density, and joint articulation to prevent structural failure.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Sarcopenia", "Bone Density", "Connective Tissue"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 9: DIGESTIVE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.5 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The Nutrient Interface
                                </h3>
                                <Utensils className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">DIGESTIVE</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                The chemical processing plant. optimizing the microbiome and gut barrier to prevent systemic toxicity.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Gut Diversity", "Absorption", "Permeability"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 10: NEURO-COGNITIVE */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.55 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The CPU
                                </h3>
                                <Brain className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">NEURO_COGNITIVE</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                The processor. Optimizing neurotransmitter balance, focus states, and the architecture of learning.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Executive Function", "Neuroplasticity", "Dopamine"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 11: SLEEP */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.6 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    The System Scheduler
                                </h3>
                                <Moon className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">SLEEP_CIRCADIAN</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                The nightly reboot. Aligning biological clocks for hormone regulation and brain waste clearance.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["Deep Sleep", "REM", "Glymphatic Clearance"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* CARD 12: RENAL */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.65 }}
                            className="group relative p-6 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-all duration-300 md:hover:bg-white/10 md:hover:border-emerald-500/40 active:scale-[0.98] active:bg-emerald-900/5"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="font-heading text-xl font-bold text-white md:group-hover:text-emerald-400 transition-colors">
                                    Filtration Systems
                                </h3>
                                <Droplet className="h-5 w-5 text-emerald-500/50 md:group-hover:text-emerald-500 transition-colors" />
                            </div>
                            <div className="mb-4 flex items-center gap-2">
                                <div className="h-px w-6 bg-emerald-500/50" />
                                <span className="font-mono text-[10px] font-bold tracking-widest uppercase text-zinc-500">RENAL_DETOX</span>
                            </div>
                            <p className="font-body text-sm text-zinc-400 mb-6 leading-relaxed">
                                Waste management. Optimizing kidney filtration and liver phase I/II detoxification pathways.
                            </p>
                            <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                                {["GFR", "Liver Enzymes", "Electrolytes"].map((tag) => (
                                    <span key={tag} className="px-2 py-1 text-[10px] font-mono text-zinc-500 bg-zinc-900/50 rounded border border-white/5">{tag}</span>
                                ))}
                            </div>
                        </motion.div>

                        {/* EVOLVING CARD */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.7 }}
                            className="group relative p-8 rounded-2xl border border-dashed border-zinc-800 bg-black/20 backdrop-blur-sm flex flex-col justify-center items-center text-center md:hover:border-zinc-700 active:border-zinc-700 active:scale-[0.98] transition-all md:col-span-2 lg:col-span-3 mt-8"
                        >
                            <div className="p-4 rounded-full bg-zinc-900 text-zinc-600 mb-4 md:group-hover:text-emerald-500 active:text-emerald-500 transition-colors">
                                <CheckCircle2 className="h-6 w-6 animate-pulse" />
                            </div>
                            <h3 className="font-heading text-lg font-bold text-zinc-500 mb-2">
                                META_PROTOCOL // EVOLVING_SYSTEM
                            </h3>
                            <p className="font-body text-sm text-zinc-600 max-w-lg">
                                The realization is that everything is connected. We prioritize High-Signal Metrics (The Dashboard) over guesswork. <strong className="text-zinc-500">This architecture is not static; the learning evolves continuously.</strong>
                            </p>
                        </motion.div>

                    </div>
                </div>
            </section>



            {/* SECTION 4: THE OUTPUT */}
            <section className="py-32 px-6 text-center border-t border-white/5 bg-white/[0.02]">
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
                            "To decode the biological source code that powers <br className="hidden md:block" />
                            <span className="text-orange-500">Protocol Family</span> and <span className="text-blue-500">Protocol Habitat</span>."
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
