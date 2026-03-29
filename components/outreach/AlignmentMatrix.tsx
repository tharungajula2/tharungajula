"use client";

import { AlignmentData } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";
import { motion } from "framer-motion";

interface AlignmentMatrixProps {
    data: AlignmentData;
}

export function AlignmentMatrix({ data }: AlignmentMatrixProps) {
    return (
        <SectionContainer id="alignment" align="left">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 relative">
                {/* Visual Connector Line (Desktop Only) */}
                <div className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent -translate-x-1/2" />

                {/* Left Side: The Company */}
                <div className="space-y-10 md:space-y-12">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400/60 font-medium">
                            // THE_MISSION
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight italic opacity-85">
                            {data.leftSide.title}
                        </h2>
                    </div>
                    
                    <div className="grid gap-5">
                        {data.leftSide.cards.map((card, i) => (
                            <div key={i} className="glass-card p-6 md:p-8 rounded-2xl border-white/5 hover:border-white/10 transition-all duration-500 bg-slate-900/20">
                                <h3 className="font-heading text-lg font-bold text-white mb-2">
                                    {card.title}
                                </h3>
                                <p className="font-body text-slate-500 text-[13px] md:text-sm leading-relaxed antialiased">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side: The Builder */}
                <div className="space-y-10 md:space-y-12">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-medium">
                            // THE_ALIGNMENT
                        </span>
                        <h2 className="font-heading text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                            {data.rightSide.title}
                        </h2>
                    </div>


                    <div className="grid gap-5">
                        {data.rightSide.cards.map((card, i) => (
                            <div key={i} className="glass-card p-6 md:p-8 rounded-2xl border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 bg-slate-900/40 shadow-[0_4px_24px_rgba(0,0,0,0.5)]">
                                <h3 className="font-heading text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                                    {card.title}
                                </h3>
                                <p className="font-body text-slate-300 text-[13px] md:text-sm leading-relaxed antialiased opacity-90">
                                    {card.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </SectionContainer>
    );
}


