"use client";

import { SoftCTAData } from "@/types/outreach";
import { SectionContainer } from "./SectionContainer";
import Link from "next/link";
import { motion } from "framer-motion";

interface SoftCTAProps {
    data: SoftCTAData;
}

export function SoftCTA({ data }: SoftCTAProps) {
    return (
        <SectionContainer className="pt-8 md:pt-16 pb-24 md:pb-32 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto px-2"
            >
                <div className="p-8 md:p-14 glass-card rounded-[1.5rem] md:rounded-[2rem] border-cyan-400/20 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-slate-950/40 backdrop-blur-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    
                    <h2 className="font-heading text-xl md:text-4xl font-extrabold text-white mb-6 tracking-tight leading-[1.2]">
                        {data.headline}
                    </h2>
                    <p className="font-body text-slate-300 text-[15px] md:text-xl mb-8 md:mb-10 leading-relaxed max-w-xl mx-auto italic antialiased opacity-95">
                        {data.description}
                    </p>
                    
                    <Link
                        href={data.link.href}
                        className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-5 bg-cyan-400 text-slate-950 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                    >
                        {data.link.label}
                    </Link>
                </div>
                
                <div className="mt-8 md:mt-12 flex flex-col items-center gap-5">
                    <div className="w-px h-8 md:h-10 bg-gradient-to-b from-cyan-400/30 to-transparent" />
                    
                    <div className="flex flex-col items-center gap-4">
                        <p className="font-mono text-[10px] md:text-[11px] text-slate-400 uppercase tracking-[0.4em] antialiased">
                            // FINAL_NOTE
                        </p>
                        
                        {(data.contact?.email || data.contact?.linkedin) && (
                            <div className="flex items-center gap-6">
                                {data.contact.email && (
                                    <Link 
                                        href={`mailto:${data.contact.email}`}
                                        className="font-mono text-[11px] md:text-[12px] text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-widest border-b border-white/5 pb-0.5"
                                    >
                                        Email
                                    </Link>
                                )}
                                {data.contact.linkedin && (
                                    <Link 
                                        href={data.contact.linkedin}
                                        target="_blank"
                                        className="font-mono text-[11px] md:text-[12px] text-slate-200 hover:text-cyan-400 transition-colors uppercase tracking-widest border-b border-white/5 pb-0.5"
                                    >
                                        LinkedIn
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="font-body text-[13px] md:text-[15px] text-slate-300 max-w-sm mt-6 opacity-95 px-6 italic leading-[1.75] antialiased">
                        This page comes from adjacent experience and a real interest in what FOXO is building. I am not claiming clinical expertise — only a product-builder’s interest in making complex health information clearer, more usable, and easier to act on.
                    </p>
                </div>


            </motion.div>
        </SectionContainer>
    );
}


