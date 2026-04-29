"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface DeepDiveToggleProps {
    isDeepDive: boolean;
    onChange: (value: boolean) => void;
}

export function DeepDiveToggle({ isDeepDive, onChange }: DeepDiveToggleProps) {
    return (
        <div className="flex justify-center w-full mb-12 relative z-10">
            <div className="bg-slate-900/50 backdrop-blur-xl border border-white/5 p-1.5 rounded-full flex items-center relative overflow-hidden shadow-2xl">
                {/* Sliding Background */}
                <motion.div
                    className="absolute h-[calc(100%-12px)] bg-white/10 rounded-full"
                    initial={false}
                    animate={{
                        x: isDeepDive ? "calc(100% + 4px)" : "4px",
                        width: isDeepDive ? "140px" : "160px", // Approximate widths
                    }}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />

                <button
                    onClick={() => onChange(false)}
                    className={cn(
                        "relative z-10 px-6 py-2.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 min-w-[160px]",
                        !isDeepDive ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    Executive Summary
                </button>

                <button
                    onClick={() => onChange(true)}
                    className={cn(
                        "relative z-10 px-6 py-2.5 rounded-full font-mono text-[10px] tracking-[0.2em] uppercase transition-colors duration-300 min-w-[140px]",
                        isDeepDive ? "text-white font-bold" : "text-slate-500 hover:text-slate-300"
                    )}
                >
                    Deep Dive
                </button>
            </div>
        </div>
    );
}
