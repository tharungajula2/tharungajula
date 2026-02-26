
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
                <motion.div
                    variants={itemVariants}
                    className="flex justify-center mb-8"
                >
                    <div className="flex items-center gap-3 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-4 py-1.5 backdrop-blur-sm cursor-help" title="Currently in discovery and ideation phase">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)]"></span>
                        </span>
                        <span className="font-mono text-[10px] items-center tracking-widest text-emerald-500 uppercase flex gap-2">
                            SYSTEM_STATUS: ONLINE // ACTIVE
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="font-heading text-5xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl"
                >
                    THARUN <br className="hidden md:block" /> <span className="text-zinc-600">LEARNING LAB</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="font-mono text-sm tracking-[0.2em] text-primary uppercase md:text-base mb-6"
                >
                    [INSERT TAGLINE HERE]
                </motion.p>

                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl font-body text-xl text-zinc-400 font-light tracking-wide"
                >
                    An alternative operating system for the next generation. We are building the escape hatch from rote-learning by decoding the real-world systems of wealth, health, and creation.
                </motion.p>
            </motion.div>


        </section>
    );
}
