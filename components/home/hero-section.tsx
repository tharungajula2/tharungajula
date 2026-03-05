"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
// Force HMR update
import Link from "next/link";
import { Monitor } from "lucide-react";


const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.2,
            delayChildren: 0.3,
        },
    },
};

const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
        },
    },
};

export function HeroSection() {
    return (
        <section id="protocols" className="relative flex min-h-screen flex-col items-center justify-center pt-24 pb-12 px-6">
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="flex flex-col items-center text-center max-w-4xl mx-auto mb-16 space-y-6"
            >
                <div className="inline-flex max-w-fit items-center gap-2 rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 mb-8 shadow-[0_0_15px_rgba(0,240,255,0.1)]">
                    <Monitor className="h-3 w-3 text-cyan-400" />
                    <span className="font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
                        // RISK_MANAGEMENT_OS: ACTIVE
                    </span>
                </div>

                <h1 className="font-sans text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-extrabold tracking-tighter text-white drop-shadow-2xl">
                    ARCHITECTING
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-white via-cyan-100 to-cyan-400 mt-2">
                        RISK &
                    </span>
                    <span className="block bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mt-2">
                        INTELLIGENCE.
                    </span>
                </h1>

                <p className="mt-8 font-body text-base md:text-xl text-slate-300 max-w-2xl text-center md:text-left leading-relaxed">
                    I built this OS to bridge the gap between complex regulatory frameworks and scalable AI execution. This is my digital brain—mapping 0-to-1 product strategy, predictive credit modeling, and data engineering for modern finance.
                </p>
            </motion.div>

            {/* MASTER ARCHITECTURE GRID */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto"
            >
                {/* Card 1 */}
                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-[10px] font-bold tracking-widest text-purple-400 mb-2 uppercase border border-purple-500/20 bg-purple-500/10 px-2 py-0.5 rounded w-max">
                        [1] PREDICTIVE RISK
                    </h3>
                    <h4 className="font-heading text-xl font-bold text-white mb-2">Probability & Capital</h4>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Engineered robust risk frameworks. Focuses on PD Scorecards, Asset Liability Management (ALM), and Regulatory Stress Testing.</p>
                </motion.div>

                {/* Card 2 */}
                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-[10px] font-bold tracking-widest text-orange-400 mb-2 uppercase border border-orange-500/20 bg-orange-500/10 px-2 py-0.5 rounded w-max">
                        [2] PRODUCT STRATEGY
                    </h3>
                    <h4 className="font-heading text-xl font-bold text-white mb-2">Execution & Lifecycle</h4>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Translating complex business requirements into shipping code. Bridging stakeholders, engineering teams, and regulatory constraints.</p>
                </motion.div>

                {/* Card 3 */}
                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-[10px] font-bold tracking-widest text-sky-400 mb-2 uppercase border border-sky-500/20 bg-sky-500/10 px-2 py-0.5 rounded w-max">
                        [3] DATA ENGINEERING
                    </h3>
                    <h4 className="font-heading text-xl font-bold text-white mb-2">Pipelines & Intelligence</h4>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Structuring unstructured finance. Building ETL flows and ML integrations required to power predictive models at scale.</p>
                </motion.div>

                {/* Card 4 */}
                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors md:col-span-2">
                    <h3 className="font-mono text-[10px] font-bold tracking-widest text-emerald-400 mb-2 uppercase border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 rounded w-max">
                        [4] APPLIED AI & ML
                    </h3>
                    <h4 className="font-heading text-xl font-bold text-white mb-2">Convex Optimization</h4>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Deploying state-of-the-art Large Language Models (LLMs), Agentic Architectures (RAG), and Neural Networks to automate quantitative research and enhance algorithmic decision systems.</p>
                </motion.div>
            </motion.div>

        </section>
    );
}
