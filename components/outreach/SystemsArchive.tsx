"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { systemsData } from "@/data/systems";
import { cn } from "@/lib/utils";

interface SystemsArchiveProps {
    id?: string;
}

export function SystemsArchive({ id }: SystemsArchiveProps) {
    return (
        <section id={id} className="w-full py-24 md:py-32 px-6 bg-slate-950/20 border-y border-white/5 relative z-10 scroll-mt-20">
            <div className="container mx-auto max-w-6xl">
                {/* SECTION HEADER */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 md:mb-24"
                >
                    <span className="font-mono text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-cyan-400 font-bold mb-6 block">
                        // SYSTEMS_ARCHIVE
                    </span>
                    <h2 className="font-heading text-4xl md:text-6xl font-black text-white uppercase mb-8 tracking-tighter">
                        Systems I Build
                    </h2>
                    <p className="font-body text-lg md:text-xl text-slate-400 max-w-3xl font-light leading-relaxed antialiased">
                        A public index of structural digital systems, concept-operating environments, and quantitative portfolios. Each represents a unique environment built to make complex domains clearer and more usable.
                    </p>
                </motion.div>

                {/* SYSTEMS GRID */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-10">
                    {systemsData.map((project, i) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                            className="group glass-card p-10 md:p-12 rounded-3xl border border-white/5 hover:border-cyan-400/20 transition-all duration-700 bg-slate-900/20 hover:bg-slate-900/40 relative overflow-hidden flex flex-col justify-between"
                        >
                            {/* Subtle background glow on hover */}
                            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700" />
                            
                            <div>
                                <div className="flex items-center justify-between mb-8">
                                    <span className="font-mono text-[8px] md:text-[10px] tracking-[0.4em] text-slate-500 uppercase font-black group-hover:text-cyan-400 transition-colors">
                                        {project.label}
                                    </span>
                                    <div className={cn(
                                        "px-2.5 py-1 rounded-full border text-[8px] md:text-[9px] font-mono tracking-widest uppercase",
                                        project.status === "Live" ? "text-cyan-400 border-cyan-400/20 bg-cyan-400/5" : "text-slate-500 border-white/5 bg-white/5"
                                    )}>
                                        {project.status}
                                    </div>
                                </div>

                                <h3 className="font-heading text-3xl md:text-4xl font-bold text-white mb-6 group-hover:tracking-wider transition-all duration-500">
                                    {project.title}
                                </h3>
                                
                                <p className="font-body text-base md:text-lg text-slate-300 leading-relaxed font-light mb-10 antialiased">
                                    {project.description}
                                </p>

                                <div className="flex flex-wrap gap-2 mb-12">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 bg-white/5 rounded-full font-mono text-[8.5px] uppercase tracking-wider text-slate-500 border border-transparent group-hover:border-white/5 transition-colors">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <Link 
                                href={project.href}
                                target={project.isExternal ? "_blank" : undefined}
                                rel={project.isExternal ? "noopener noreferrer" : undefined}
                                className="inline-flex items-center gap-3 font-mono text-[10px] md:text-[11px] font-black uppercase tracking-[0.2em] text-white hover:text-cyan-400 transition-all duration-300 group/link"
                            >
                                {project.ctaLabel}
                                <ArrowUpRight className="w-4 h-4 text-slate-500 group-hover/link:text-cyan-400 transition-transform group-hover/link:translate-x-1 group-hover/link:-translate-y-1 duration-300" />
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
