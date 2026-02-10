"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function QuoteSection() {
    return (
        <section className="relative overflow-hidden py-32 px-6">
            {/* Ambient Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-primary/5 blur-3xl rounded-full opacity-50 pointer-events-none" />

            <div className="container relative z-10 mx-auto max-w-4xl text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-8"
                >
                    {/* Decoration */}
                    <div className="flex items-center gap-4 opacity-50">
                        <span className="h-[1px] w-12 bg-gradient-to-r from-transparent to-cyan-500" />
                        <Sparkles className="h-4 w-4 text-cyan-500" />
                        <span className="h-[1px] w-12 bg-gradient-to-l from-transparent to-cyan-500" />
                    </div>

                    <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl font-light text-zinc-300 italic leading-relaxed tracking-wide">
                        &quot;Nobody ever figures out what life is all about, and it doesn&apos;t matter. Explore the world. Nearly everything is really interesting if you go into it deeply enough.&quot;
                    </blockquote>

                    <cite className="flex flex-col items-center gap-2 not-italic">
                        <span className="font-mono text-sm tracking-widest text-cyan-500 uppercase">
                            — Richard P. Feynman
                        </span>
                    </cite>
                </motion.div>
            </div>
        </section>
    );
}
