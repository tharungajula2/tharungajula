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
        <SectionContainer className="pt-12 md:pt-24 pb-40 md:pb-56 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto px-2"
            >
                <div className="p-10 md:p-20 glass-card rounded-[2rem] md:rounded-[2.5rem] border-cyan-400/20 shadow-[0_0_80px_rgba(0,0,0,0.6)] bg-slate-950/40 backdrop-blur-3xl relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent" />
                    
                    <h2 className="font-heading text-[1.8rem] md:text-5xl font-extrabold text-white mb-6 tracking-tight leading-[1.15] md:leading-[1.1]">
                        {data.headline}
                    </h2>
                    <p className="font-body text-slate-400 text-sm md:text-lg mb-10 md:mb-12 leading-relaxed max-w-lg mx-auto italic antialiased opacity-85">
                        {data.description}
                    </p>
                    
                    <Link
                        href={data.link.href}
                        className="inline-flex w-full sm:w-auto items-center justify-center px-12 py-5 bg-cyan-400 text-slate-950 font-mono text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-white hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(34,211,238,0.3)]"
                    >
                        {data.link.label}
                    </Link>
                </div>
                
                <div className="mt-12 md:mt-16 flex flex-col items-center gap-6">
                    <div className="w-px h-10 md:h-12 bg-gradient-to-b from-cyan-400/30 to-transparent" />
                    
                    <div className="flex flex-col items-center gap-4">
                        <p className="font-mono text-[9px] md:text-[10px] text-slate-600 uppercase tracking-[0.5em] antialiased">
                            // FINAL_NOTE
                        </p>
                        
                        {(data.contact?.email || data.contact?.linkedin) && (
                            <div className="flex items-center gap-6 mt-2">
                                {data.contact.email && (
                                    <Link 
                                        href={`mailto:${data.contact.email}`}
                                        className="font-mono text-[10px] text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest border-b border-white/5 pb-0.5"
                                    >
                                        Email
                                    </Link>
                                )}
                                {data.contact.linkedin && (
                                    <Link 
                                        href={data.contact.linkedin}
                                        target="_blank"
                                        className="font-mono text-[10px] text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-widest border-b border-white/5 pb-0.5"
                                    >
                                        LinkedIn
                                    </Link>
                                )}
                            </div>
                        )}
                    </div>

                    <p className="font-body text-[10px] text-slate-600 max-w-sm mt-6 opacity-50 px-6 italic">
                        This outreach is based on adjacent systems-thinking and a serious interest in FOXO's mission. I am not claiming clinical authority, but a product-builder's commitment to biological interpretability.
                    </p>
                </div>


            </motion.div>
        </SectionContainer>
    );
}


