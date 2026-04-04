"use client";

import { motion } from "framer-motion";
import { HeroData } from "@/types/outreach";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface HeroThesisProps {
    data: HeroData;
}

export function HeroThesis({ data }: HeroThesisProps) {
    return (
        <section className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative z-10 py-24 md:py-32">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-4xl pt-8 md:pt-0"
            >
                <div className="inline-block px-3 py-1 bg-cyan-400/10 border border-cyan-400/20 rounded-full mb-8">
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
                        // VISION
                    </span>
                </div>

                <h1 className="font-heading text-[2.4rem] sm:text-4xl md:text-6xl lg:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-white/50 mb-8 leading-[1.15] md:leading-[1.1]">
                    {data.headline}
                </h1>
                
                <div className="font-body text-base md:text-xl text-slate-300 max-w-xl mx-auto mb-10 leading-relaxed font-light tracking-wide whitespace-pre-line antialiased">
                    {data.subheadline}
                </div>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 mt-4 md:mt-0">
                    {data.ctas.map((cta, index) => (
                        <Link
                            key={index}
                            href={cta.href}
                            className={cn(
                                "w-full sm:w-auto px-8 py-4 rounded-full font-mono text-[10px] font-bold uppercase tracking-[0.2em] transition-all duration-500",
                                cta.variant === "primary"
                                    ? "bg-white text-slate-950 hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.3)]"
                                    : "bg-slate-900/40 border border-white/10 text-white backdrop-blur-xl hover:bg-white/5"
                            )}
                        >
                            {cta.label}
                        </Link>
                    ))}
                </div>

                {/* PROOF OF WORK SECTION - THE SIMULATION GATEWAY */}
                <div className="mt-8 pt-8 border-t border-white/5 w-full flex flex-col items-center max-w-2xl mx-auto">
                    <div className="inline-block px-2 py-0.5 bg-cyan-400/5 border border-cyan-400/10 rounded-full mb-4">
                        <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-cyan-400/60 font-bold">
                            // PROOF OF WORK
                        </span>
                    </div>

                    <p className="text-sm md:text-base text-slate-400 mb-8 font-light leading-relaxed max-w-sm">
                        Explore an interactive product simulation of a high-touch preventive health operating system.
                    </p>

                    <Link 
                        href="/simulation"
                        className="group relative flex items-center gap-4 px-10 py-5 bg-slate-950 border border-white/10 rounded-2xl overflow-hidden hover:border-cyan-400/40 transition-all duration-700 shadow-[0_0_40px_rgba(34,211,238,0.05)] hover:shadow-[0_0_60px_rgba(34,211,238,0.12)]"
                    >
                        <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shadow-[0_0_12px_#22d3ee]" />
                        <span className="font-mono text-[11px] md:text-[12px] font-bold uppercase tracking-[0.25em] text-white">
                            Explore Product Simulation
                        </span>
                        
                        {/* SUBTLE GLOW OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-cyan-400/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                    </Link>

                    <p className="mt-6 text-[9px] md:text-[10px] font-mono text-slate-500 uppercase tracking-[0.15em] max-w-xs md:max-w-none leading-relaxed">
                        Built with local mock data to explore longitudinal care workflows and internal AI support.
                    </p>
                </div>
            </motion.div>
        </section>
    );
}


