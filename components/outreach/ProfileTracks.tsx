"use client";

import { motion } from "framer-motion";
import { ProfileTrack } from "@/types/outreach";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

interface ProfileTracksProps {
    data: {
        label: string;
        intro: string;
        items: ProfileTrack[];
    };
    id?: string;
}

export function ProfileTracks({ data, id }: ProfileTracksProps) {
    return (
        <section id={id} className="w-full py-16 md:py-24 px-4 sm:px-6 bg-slate-950/20 border-y border-white/5 relative z-10 scroll-mt-20">
            <div className="container mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16"
                >
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold mb-6 block">
                        {data.label}
                    </span>
                    <p className="font-body text-[17px] sm:text-xl md:text-2xl text-slate-300/90 max-w-3xl font-light leading-relaxed antialiased">
                        {data.intro}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 lg:gap-8">
                    {data.items.map((track, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group p-6 sm:p-8 md:p-10 glass-card rounded-3xl border border-white/5 hover:border-white/10 hover:bg-white/[0.02] transition-all duration-700 flex flex-col h-full"
                        >
                            <span className="font-mono text-[8.5px] md:text-[9.5px] text-slate-500 tracking-[0.3em] uppercase mb-4 block group-hover:text-cyan-400/50 transition-colors">
                                {track.label}
                            </span>
                            <h4 className="font-heading text-[22px] sm:text-2xl md:text-3xl text-white font-bold mb-4 md:mb-5 tracking-tight group-hover:text-white transition-colors">
                                {track.title}
                            </h4>
                            <p className="font-body text-[14px] sm:text-[15px] md:text-[17px] text-slate-300 leading-[1.65] font-light mb-8 md:mb-10 flex-grow antialiased">
                                {track.body}
                            </p>

                            <div className="mt-auto pt-6 md:pt-8 border-t border-white/5">
                                {track.tags && track.tags.length > 0 && (
                                    <div className="flex flex-wrap gap-2">
                                        {track.tags.map((tag, j) => (
                                            <span key={j} className="px-3 py-1 bg-white/5 rounded-full font-mono text-[8.5px] uppercase tracking-wider text-slate-400">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                )}

                                {track.buttons && track.buttons.length > 0 && (
                                    <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                                        {track.buttons.map((btn, j) => (
                                            <Link
                                                key={j}
                                                href={btn.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-2 font-mono text-[9.5px] font-bold uppercase tracking-widest text-white hover:text-cyan-400 transition-colors group/btn"
                                            >
                                                {btn.label}
                                                <ArrowUpRight className="w-3 h-3 text-slate-500 group-hover/btn:text-cyan-400 transition-colors" />
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
