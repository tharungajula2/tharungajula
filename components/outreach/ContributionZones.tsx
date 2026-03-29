"use client";

import { ContributionZone } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";

interface ContributionZonesProps {
    contributions: ContributionZone[];
}

export function ContributionZones({ contributions }: ContributionZonesProps) {
    return (
        <SectionContainer id="contribute" align="left">
            <div className="max-w-4xl mx-auto w-full">
                <div className="mb-12 md:mb-16 md:text-center space-y-4">
                    <span className="font-mono text-cyan-400/80 text-[9px] md:text-[10px] tracking-[0.3em] uppercase font-bold">
                        // THE_OPPORTUNITY
                    </span>

                    <h2 className="font-heading text-3xl md:text-4xl text-white font-extrabold tracking-tight">
                        Direct Leverage for FOXO
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
                    {contributions.map((c, i) => (
                        <div key={i} className="group glass-card p-8 md:p-10 rounded-2xl border-white/5 hover:border-cyan-400/20 transition-all duration-500 bg-slate-900/40 relative overflow-hidden">
                            <span className="absolute -bottom-6 -right-6 font-heading text-9xl font-black text-white/[0.02] pointer-events-none group-hover:text-cyan-400/[0.04] transition-colors">{i+1}</span>
                            
                            <h4 className="font-heading text-lg md:text-xl font-bold text-white mb-3 md:mb-4 group-hover:text-cyan-400/90 transition-colors uppercase tracking-tight">
                                {c.title}
                            </h4>
                            <p className="font-body text-slate-400 text-[13px] md:text-sm leading-relaxed relative z-10 antialiased opacity-90">
                                {c.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}


