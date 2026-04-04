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
        <SectionContainer id="contact" className="pt-4 md:pt-8 pb-20 md:pb-24 text-center">
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-3xl mx-auto px-2"
            >
                <div className="flex flex-col items-center gap-5">
                    <div className="w-px h-8 md:h-10 bg-gradient-to-b from-cyan-400/30 to-transparent" />
                    
                    <div className="flex flex-col items-center gap-4 w-full">
                        <p className="font-mono text-[12px] md:text-[13px] text-slate-400 uppercase tracking-[0.4em] antialiased opacity-80">
                            // FINAL_NOTE
                        </p>
                        
                        {(data.contact?.email || data.contact?.linkedin) && (
                            <div className="flex flex-col items-center gap-16 mt-6 w-full">
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

                    <p className="font-body text-[14px] md:text-[16px] text-slate-500 max-w-xl mt-16 opacity-70 px-6 italic leading-relaxed antialiased border-t border-white/5 pt-12">
                        This page comes from adjacent experience and a real interest in what FOXO is building. I am not claiming clinical expertise, only a product-builder’s interest in making complex health information clearer and more usable.
                    </p>
                </div>
            </motion.div>
        </SectionContainer>
    );
}
