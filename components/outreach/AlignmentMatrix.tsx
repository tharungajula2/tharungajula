"use client";

import { useState } from "react";
import { AlignmentData, AlignmentCard, DeepViewNote } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";
import { motion, AnimatePresence } from "framer-motion";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AlignmentMatrixProps {
    data: AlignmentData;
}

export function AlignmentMatrix({ data }: AlignmentMatrixProps) {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
        <SectionContainer id="alignment" align="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative mb-12">
                {/* Visual Connector Line (Desktop Only) */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

                {/* Left Side: The Company */}
                <div className="space-y-10 md:space-y-12">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
                            // THE_MISSION
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            {data.leftSide.title}
                        </h2>
                    </div>
                    
                    <div className="grid gap-5">
                        {data.leftSide.cards.map((card: AlignmentCard, i: number) => (
                            <div key={i} className="glass-card p-6 md:p-8 rounded-2xl border-white/5 hover:border-white/10 transition-all duration-500 bg-slate-900/20">
                                <h3 className="font-heading text-lg font-bold text-white mb-2">
                                    {card.title}
                                </h3>
                                <p className="font-body text-slate-400 text-sm md:text-base leading-relaxed antialiased">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: The Builder */}
                <div className="space-y-10 md:space-y-12">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
                            // THE_ALIGNMENT
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            {data.rightSide.title}
                        </h2>
                    </div>


                    <div className="grid gap-5">
                        {data.rightSide.cards.map((card: AlignmentCard, i: number) => (
                            <div key={i} className="glass-card p-6 md:p-8 rounded-2xl border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 bg-slate-900/40 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="font-body text-slate-300 text-sm md:text-base leading-relaxed antialiased">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Deep View Expandable Section */}
            {data.deepView && (
                <div className="w-full flex flex-col items-center mt-4">
                    <button
                        onClick={() => setIsExpanded(!isExpanded)}
                        className="group flex items-center gap-3 py-3 px-6 rounded-full hover:bg-white/5 transition-all duration-300"
                    >
                        <div className={cn(
                            "w-5 h-5 rounded-full border border-white/20 flex items-center justify-center transition-transform duration-500",
                            isExpanded ? "rotate-45 border-cyan-400/40" : ""
                        )}>
                            <Plus className={cn(
                                "w-3 h-3 text-slate-400 group-hover:text-white transition-colors",
                                isExpanded ? "text-cyan-400" : ""
                            )} />
                        </div>
                        <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] uppercase text-slate-400 group-hover:text-slate-200 transition-colors">
                            {data.deepView.label}
                        </span>
                    </button>

                    <AnimatePresence>
                        {isExpanded && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                                className="overflow-hidden w-full max-w-4xl mx-auto"
                            >
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-10 pb-8 px-4 md:px-0">
                                    {data.deepView.blocks.map((block: DeepViewNote, i: number) => (
                                        <div key={i} className="flex flex-col gap-4">
                                            <h4 className="font-heading text-sm md:text-base font-bold text-slate-200 tracking-wide">
                                                {block.title}
                                            </h4>
                                            <ul className="space-y-3">
                                                {block.points.map((point: string, j: number) => (
                                                    <li key={j} className="flex gap-3 text-[13px] md:text-[14px] text-slate-400 leading-relaxed antialiased">
                                                        <span className="text-cyan-400/60 font-mono mt-1">•</span>
                                                        <span>{point}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            )}
        </SectionContainer>
    );
}


