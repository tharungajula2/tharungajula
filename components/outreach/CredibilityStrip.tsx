"use client";

import { motion } from "framer-motion";
import { SectionContainer } from "./SectionContainer";

const proofItems = [
    { label: "Banking Analytics", title: "Credit Risk Systems", company: "Jana Small Finance Bank" },
    { label: "Lending Systems", title: "Business Analysis", company: "Lentra AI" },
    { label: "Analytics Portfolio", title: "8-Project Deep Dive", company: "Risk / NLP / Forecasting" },
    { label: "Systems Prototypes", title: "Built 3 Operating Systems", company: "Yukti, Quant, Curiosity" }
];


export function CredibilityStrip() {
    return (
        <section className="w-full py-12 md:py-20 border-y border-white/5 bg-slate-900/10">
            <div className="container mx-auto max-w-5xl px-6">
                <div className="mb-8 md:mb-10 flex flex-col items-center md:items-start">
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] text-cyan-400 font-bold uppercase">
                        // BACKGROUND_SIGNAL
                    </span>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
                    {proofItems.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8 }}
                            className="p-6 glass-card rounded-2xl border-white/5 hover:border-white/10 transition-all duration-500"
                        >
                            <span className="font-mono text-[8px] md:text-[9px] text-slate-500 tracking-widest uppercase mb-2 block">
                                {item.label}
                            </span>
                            <h4 className="font-heading text-white text-sm md:text-base font-bold mb-1">
                                {item.title}
                            </h4>
                            <p className="font-body text-slate-400 text-[11px] md:text-xs">
                                {i === 2 ? (
                                    <a href="https://quant-os.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline underline-offset-4 decoration-white/10 transition-colors">
                                        {item.company}
                                    </a>
                                ) : i === 3 ? (

                                    <span className="flex gap-2">
                                        <a href="https://yukti-os.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline underline-offset-4 decoration-white/10 transition-colors">Yukti</a>,
                                        <a href="https://quant-os.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline underline-offset-4 decoration-white/10 transition-colors">Quant</a>,
                                        <a href="https://curiosity-os.vercel.app" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 underline underline-offset-4 decoration-white/10 transition-colors">Curiosity</a>
                                    </span>
                                ) : (
                                    item.company
                                )}
                            </p>


                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
