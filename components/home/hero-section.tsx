
"use client";

import { motion, Variants } from "framer-motion";
import { cn } from "@/lib/utils";
// Force HMR update
import Link from "next/link";




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


                <motion.span
                    variants={itemVariants}
                    className="font-mono uppercase tracking-widest text-[10px] text-cyan-400 mb-4 block"
                >
                    // RESEARCH_SANDBOX: ACTIVE
                </motion.span>

                <motion.h1
                    variants={itemVariants}
                    className="font-sans tracking-tight font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 text-5xl sm:text-7xl md:text-8xl lg:text-9xl"
                >
                    DECODING LIFE MASTERY.
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl font-body text-xl text-zinc-400 font-light tracking-wide"
                >
                    I built this lab as an open sandbox to explore the cognitive collapse and map an escape hatch from rote-learning. This is my personal research engine—decoding the 9 domains of real-world life mastery for the next generation.
                </motion.p>
            </motion.div>

            {/* MASTER ARCHITECTURE GRID */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-4xl mx-auto"
            >
                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-sm font-bold text-white mb-2 tracking-wider">[1] THE HARDWARE</h3>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Physical Resilience & Nervous System Regulation.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-sm font-bold text-white mb-2 tracking-wider">[2] THE SOFTWARE</h3>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Meta-Learning, Applied Logic & Information Hygiene.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-sm font-bold text-white mb-2 tracking-wider">[3] THE MULTIPLIERS</h3>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Financial Mechanics, Digital Engineering & Applied AI.</p>
                </motion.div>

                <motion.div variants={itemVariants} className="flex flex-col justify-center bg-gradient-to-br from-slate-800/80 to-slate-950/90 backdrop-blur-xl border border-white/10 shadow-[inset_0_2px_10px_rgba(255,255,255,0.05),_0_0_15px_rgba(0,240,255,0.12)] rounded-2xl p-6 text-left transition-colors">
                    <h3 className="font-mono text-sm font-bold text-white mb-2 tracking-wider">[4] THE HORIZON</h3>
                    <p className="font-body text-sm text-slate-300 leading-relaxed">Career Topography & The Uncharted Sandbox.</p>
                </motion.div>
            </motion.div>

        </section>
    );
}
