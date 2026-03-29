"use client";

import { ProofStackData } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";

interface ProofStackProps {
    data: ProofStackData;
}

export function ProofStack({ data }: ProofStackProps) {
    return (
        <SectionContainer id="proof" align="left">
            <div className="max-w-4xl mx-auto w-full">
                <div className="mb-12 md:mb-16 md:text-center">
                    <span className="font-mono text-cyan-400/60 text-[9px] md:text-[10px] tracking-[0.3em] uppercase mb-4 block">
                        // SELECTED_PROOF
                    </span>

                    <h2 className="font-heading text-3xl md:text-4xl font-extrabold text-white tracking-tight uppercase">
                        {data.title}
                    </h2>
                </div>

                <div className="grid gap-5 md:gap-6">
                    {data.points.map((point, i) => (
                        <div key={i} className="flex flex-col md:flex-row items-start md:items-center gap-2 md:gap-6 p-1 bg-gradient-to-r from-cyan-400/5 to-transparent border border-white/5 rounded-2xl group hover:border-white/10 transition-colors duration-500">
                            <div className="flex-1 p-6 md:p-8">
                                <h3 className="font-mono text-cyan-400 text-[10px] md:text-[11px] font-bold mb-3 uppercase tracking-[0.2em]">{point.label}</h3>
                                <p className="font-body text-slate-300 text-sm md:text-base leading-relaxed antialiased opacity-90">{point.description}</p>
                            </div>
                            
                            <div className="flex flex-wrap gap-2 px-6 pb-6 md:p-8 md:border-l border-white/5 h-full items-center justify-start md:justify-center min-w-fit md:min-w-[200px]">
                                {point.tags?.map(tag => (
                                    <span key={tag} className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-full font-mono text-[8px] md:text-[9px] text-slate-500 uppercase tracking-widest whitespace-nowrap">
                                        {tag}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}


