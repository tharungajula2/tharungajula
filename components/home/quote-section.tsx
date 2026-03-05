"use client";

import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

export function QuoteSection() {
    return (
        <section className="relative w-full py-8">
            <div className="relative z-10 w-full text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="flex flex-col items-center gap-6"
                >
                    {/* Decoration */}
                    <div className="flex items-center gap-4 opacity-50">
                        <span className="h-[1px] w-12 border-t border-dashed border-cyan-500/50" />
                        <Sparkles className="h-4 w-4 text-cyan-500" />
                        <span className="h-[1px] w-12 border-t border-dashed border-cyan-500/50" />
                    </div>

                    <blockquote className="font-heading text-lg md:text-xl font-light text-slate-300 italic leading-relaxed tracking-wide max-w-3xl mx-auto px-4">
                        "I constantly see people rise in life who are not the smartest, sometimes not even the most diligent, but they are learning machines. They go to bed every night a little wiser than they were when they got up and boy does that help, particularly when you have a long run ahead of you."
                    </blockquote>

                    <cite className="flex flex-col items-center gap-2 not-italic">
                        <span className="font-mono text-[10px] tracking-widest text-cyan-500 uppercase">
                            - Charles T. Munger
                        </span>
                    </cite>
                </motion.div>
            </div>
        </section>
    );
}
