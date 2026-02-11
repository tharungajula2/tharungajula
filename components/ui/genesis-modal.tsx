"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Terminal } from "lucide-react";
import { useEffect, useState } from "react";

interface GenesisModalProps {
    onClose: () => void;
}

export function GenesisModal({ onClose }: GenesisModalProps) {
    const [text, setText] = useState("");
    const fullText = `[GENESIS_BLOCK_LOG]
STATUS: DECRYPTED
TIMESTAMP: 2026-02-11
LOCATION: Bengaluru, India

// TO_THE_ROOTS
To the roots that held me when the storm broke:

This entire architecture is dedicated to my Parents and the friend
who stood by me during the reboot.

You are the reason I have the strength to take this leap of faith again.
I know the path is long, but I am no longer walking it alone.

This is Day 0.

— Tharun.`;

    useEffect(() => {
        let i = 0;
        const speed = 20; // Typing speed in ms
        const timer = setInterval(() => {
            if (i < fullText.length) {
                setText((prev) => prev + fullText.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, speed);

        return () => clearInterval(timer);
    }, [fullText]);

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/95 backdrop-blur-xl p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="relative w-full max-w-2xl overflow-hidden rounded-lg border border-emerald-500/20 bg-black p-8 font-mono text-emerald-500 shadow-2xl shadow-emerald-500/10"
                    onClick={(e) => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="mb-6 flex items-center justify-between border-b border-emerald-500/20 pb-4">
                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase">
                            <Terminal className="h-4 w-4" />
                            <span>System_Override // Root_Access</span>
                        </div>
                        <button
                            onClick={onClose}
                            className="text-emerald-500/50 hover:text-emerald-500 transition-colors"
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="min-h-[300px] whitespace-pre-wrap text-sm leading-relaxed md:text-base">
                        {text}
                        <span className="animate-pulse">_</span>
                    </div>

                    {/* Footer */}
                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={onClose}
                            className="group flex items-center gap-2 border border-emerald-500/30 px-4 py-2 text-xs font-bold tracking-widest uppercase hover:bg-emerald-500/10 transition-colors"
                        >
                            [CLOSE_CONNECTION]
                        </button>
                    </div>

                    {/* Decorative Scanline */}
                    <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_50%,rgba(0,0,0,0.5)_51%)] bg-[length:100%_4px] opacity-20"></div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
