"use client";

import { motion } from "framer-motion";
import { FoxoVisionData } from "@/types/outreach";

interface FoxoVisionProps {
    data: FoxoVisionData;
}

export function FoxoVision({ data }: FoxoVisionProps) {
    return (
        <section className="w-full py-16 md:py-24 px-6 relative z-10">
            <div className="container mx-auto max-w-4xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="mb-10">
                        <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold">
                            {data.label}
                        </span>
                    </div>

                    <h2 className="font-heading text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-12 leading-[1.1]">
                        {data.headline}
                    </h2>

                    <div className="max-w-2xl">
                        <h3 className="font-heading text-xl md:text-2xl text-white font-medium mb-4">
                            {data.intro}
                        </h3>
                        <p className="font-body text-base md:text-lg text-slate-400 leading-relaxed font-light tracking-wide whitespace-pre-line opacity-90">
                            {data.context}
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
