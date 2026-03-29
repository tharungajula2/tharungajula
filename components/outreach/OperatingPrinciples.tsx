"use client";

import { OperatingPrinciple } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";

interface OperatingPrinciplesProps {
    principles: OperatingPrinciple[];
}

export function OperatingPrinciples({ principles }: OperatingPrinciplesProps) {
    return (
        <SectionContainer className="bg-slate-900/10 py-16 md:py-24 border-y border-white/5">
            <div className="max-w-5xl mx-auto w-full px-4 md:px-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {principles.map((p, i) => (
                        <div key={i} className="flex flex-col space-y-3 p-6 md:p-0 glass-card md:bg-transparent md:border-none md:backdrop-blur-none rounded-2xl md:rounded-none">
                            <span className="font-mono text-cyan-400/50 text-[10px] tracking-[0.3em] font-bold uppercase">
                                0{i + 1}_
                            </span>
                            <h3 className="font-heading text-white text-base md:text-lg font-extrabold leading-tight tracking-tight uppercase md:normal-case">
                                {p.title}
                            </h3>
                            <p className="font-body text-slate-500 text-[13px] leading-relaxed antialiased opacity-80">
                                {p.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </SectionContainer>
    );
}


