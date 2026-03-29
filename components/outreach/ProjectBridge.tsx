"use client";

import { ProjectBridgeData } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";
import { motion } from "framer-motion";

interface ProjectBridgeProps {
    data: ProjectBridgeData;
}

export function ProjectBridge({ data }: ProjectBridgeProps) {
    return (
        <SectionContainer className="bg-slate-900/10 backdrop-blur-3xl border-y border-white/5" align="left">
            <div className="max-w-5xl mx-auto space-y-12 md:space-y-16">
                <div className="space-y-4">
                    <span className="font-mono text-cyan-400 text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-bold">
                        // THE_BRIDGE
                    </span>

                    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                        <div className="space-y-4">
                            <h2 className="font-heading text-3xl md:text-5xl font-extrabold text-white tracking-tight">
                                {data.title}
                            </h2>
                            <p className="font-body text-slate-400 text-base md:text-lg max-w-2xl leading-relaxed">
                                {data.premise}
                            </p>
                        </div>
                        <a 
                            href="https://yukti-os.vercel.app" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:border-cyan-400/50 hover:bg-cyan-400/5 transition-all text-sm font-mono tracking-widest uppercase mb-1"
                        >
                            Launch Prototype
                        </a>

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-6 text-left">
                    {data.highlights.map((item, i) => (
                        <motion.div 
                            key={i}
                            whileHover={{ y: -5 }}
                            className="glass-card p-6 md:p-8 rounded-2xl border-white/5 hover:border-cyan-400/30 transition-all duration-500 bg-slate-900/20 text-left items-start flex flex-col"
                        >
                            <h4 className="font-heading text-white text-base md:text-lg font-bold mb-3 tracking-tight text-left">{item.title}</h4>
                            <p className="font-body text-slate-500 text-[13px] md:text-sm leading-relaxed antialiased text-left">
                                {item.description}
                            </p>
                        </motion.div>
                    ))}
                </div>

                <div className="max-w-3xl">
                    <div className="glass-card p-8 md:p-10 rounded-2xl border-cyan-400/10 text-left relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                        <p className="font-body text-slate-300 text-base md:text-lg leading-relaxed italic relative z-10 antialiased opacity-90 text-left">
                            "{data.relevance}"
                        </p>
                    </div>
                </div>

            </div>
        </SectionContainer>
    );
}


