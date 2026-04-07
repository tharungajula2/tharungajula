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
                        {data.label || "// VISION"}
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
            </motion.div>
        </section>
    );
}
