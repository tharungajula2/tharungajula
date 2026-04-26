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
        <SectionContainer id="contact" className="pt-4 md:pt-8 pb-16 md:pb-24 px-4 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto px-2"
            >
                <div className="flex flex-col items-center gap-5">
                    <div className="w-px h-8 md:h-10 bg-gradient-to-b from-cyan-400/30 to-transparent" />
                    
                    <h2 className="font-heading text-2xl sm:text-[2rem] md:text-[2.4rem] font-extrabold text-white tracking-tight mt-4 leading-tight">
                        {data.headline}
                    </h2>

                    <p className="font-body text-[14px] sm:text-[15px] md:text-[17px] text-slate-300 max-w-xl mt-4 md:mt-6 leading-relaxed glass-card p-5 md:p-6 rounded-2xl border-white/5 opacity-80 backdrop-blur-sm">
                        {data.description}
                    </p>
                    
                    <div className="flex flex-col items-center gap-4 w-full mt-12">
                        <p className="font-mono text-[12px] md:text-[13px] text-slate-500 uppercase tracking-[0.4em] antialiased">
                            // CONNECT_DIRECTLY
                        </p>
                        
                        {(data.contact?.email || data.contact?.linkedin) && (
                            <div className="flex flex-col items-center gap-8 mt-4 w-full">
                                <div className="flex items-center gap-10">
                                    {data.contact.email && (
                                        <Link 
                                            href={`mailto:${data.contact.email}`}
                                            className="font-mono text-[13px] md:text-[14px] text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em] font-medium border-b border-white/5 pb-0.5"
                                        >
                                            Email
                                        </Link>
                                    )}
                                    {data.contact.linkedin && (
                                        <Link 
                                            href={data.contact.linkedin}
                                            target="_blank"
                                            className="font-mono text-[13px] md:text-[14px] text-slate-400 hover:text-cyan-400 transition-colors uppercase tracking-[0.3em] font-medium border-b border-white/5 pb-0.5"
                                        >
                                            LinkedIn
                                        </Link>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </motion.div>
        </SectionContainer>
    );
}
