
"use client";

import { motion, Variants } from "framer-motion";
import { Activity, Dna, LayoutTemplate, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";


const protocols = [
    {
        id: "n1",
        label: "N=1 // ACADEMY",
        description: "The Knowledge OS: Clinical Biology & Systems Physiology.",
        icon: Dna,
        href: "/protocols/n1",
        color: "text-emerald-500",
        borderColor: "hover:border-emerald-500/50",
        bgGlow: "bg-emerald-500/10",
        textGlow: "group-hover:text-emerald-500",
    },
    {
        id: "yukti",
        label: "FAMILY // OS",
        description: "The Context Engine: Intelligent Healthcare for the Family.",
        icon: LayoutTemplate,
        href: "/protocols/family_os",
        color: "text-orange-500",
        borderColor: "hover:border-orange-500/50",
        bgGlow: "bg-orange-500/10",
        textGlow: "group-hover:text-orange-500",
    },
    {
        id: "kriya",
        label: "CLINICAL // OS",
        description: "The Triage Engine: Workflow & Decision Support for Providers.",
        icon: Stethoscope,
        href: "/protocols/clinical_os",
        color: "text-blue-500",
        borderColor: "hover:border-blue-500/50",
        bgGlow: "bg-blue-500/10",
        textGlow: "group-hover:text-blue-500",
    },
];




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
                    <div className="flex items-center gap-3 rounded-full border border-white/10 bg-zinc-900/30 px-4 py-1.5 backdrop-blur-sm">
                        <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                        </span>
                        <span className="font-mono text-[10px] tracking-widest text-zinc-400 uppercase">
                            SYSTEM_STATUS: EVOLVING // CONCEPT_PHASE
                        </span>
                    </div>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="font-heading text-5xl font-black tracking-tighter text-white sm:text-7xl md:text-8xl lg:text-9xl"
                >
                    THARUN <br className="hidden md:block" /> <span className="text-zinc-600">HEALTH LAB</span>
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="font-mono text-sm tracking-[0.2em] text-primary uppercase md:text-base mb-6"
                >
                    SYSTEMS. BIOLOGY. CODE.
                </motion.p>

                <motion.p
                    variants={itemVariants}
                    className="max-w-2xl font-body text-xl text-zinc-400 font-light tracking-wide"
                >
                    Decoding the Operating Systems for Biology, Family, and Clinical Operations.
                </motion.p>
            </motion.div>

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid w-full max-w-5xl gap-6 md:grid-cols-3 md:gap-8"
            >
                {protocols.map((protocol) => (
                    <Link key={protocol.id} href={protocol.href} className="block h-full">
                        <motion.div
                            variants={itemVariants}
                            whileHover={{ y: -5 }}
                            className={cn(
                                "group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-6 backdrop-blur-md transition-all duration-500",
                                protocol.borderColor
                            )}
                        >
                            <div className="flex h-full flex-col justify-start"> {/* Inner wrapper for content */}
                                {/* Icon Box */}
                                <div className={cn(
                                    "mb-4 inline-flex h-12 w-12 items-center justify-center rounded-xl transition-colors duration-300",
                                    protocol.bgGlow,
                                    protocol.color
                                )}>
                                    <protocol.icon className="h-6 w-6" strokeWidth={1.5} />
                                </div>

                                {/* Text Content */}
                                <div>
                                    <span className={cn(
                                        "block font-mono text-sm font-bold tracking-wider text-zinc-500 transition-colors duration-300",
                                        protocol.textGlow
                                    )}>
                                        {protocol.label}
                                    </span>
                                    <p className="mt-2 block font-body text-sm leading-relaxed text-zinc-400 transition-colors duration-300 group-hover:text-zinc-200">
                                        {protocol.description}
                                    </p>
                                </div>
                            </div>

                            {/* Corner Accent */}
                            <div className={cn(
                                "absolute top-0 right-0 h-24 w-24 translate-x-8 translate-y--8 rounded-full blur-2xl transition-opacity duration-500 opacity-0 group-hover:opacity-20",
                                protocol.bgGlow
                            )} />
                        </motion.div>
                    </Link>
                ))}
            </motion.div>
        </section>
    );
}
