"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Heart, Terminal, Sparkles } from "lucide-react";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

interface LProtocolProps {
    isOpen: boolean;
    onClose: () => void;
}

export function LProtocol({ isOpen, onClose }: LProtocolProps) {
    const [input, setInput] = useState("");
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [error, setError] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Reset state when closed
    useEffect(() => {
        if (!isOpen) {
            setInput("");
            setIsUnlocked(false);
            setError(false);
        }
    }, [isOpen]);

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value.toUpperCase();
        setInput(val);
        setError(false);

        if (val === "ASALY") {
            setIsUnlocked(true);
        }
    };

    // Shake effect reset
    useEffect(() => {
        if (error) {
            const t = setTimeout(() => setError(false), 500);
            return () => clearTimeout(t);
        }
    }, [error]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="fixed inset-0 z-[9999] flex items-center justify-center bg-black text-white overflow-hidden"
                    style={{ backgroundColor: "#000000" }} // Force solid black
                >
                    {/* Background Noise/Grain (Optional subtle texture) */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    <button
                        onClick={onClose}
                        className={cn(
                            "absolute top-8 right-8 z-[10000] transition-colors duration-300",
                            isUnlocked ? "text-rose-200/50 hover:text-rose-200" : "text-emerald-500/50 hover:text-emerald-500"
                        )}
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="w-full max-w-4xl px-6 relative z-10">
                        {!isUnlocked ? (
                            // STAGE 1: THE SECURE TERMINAL (Password)
                            <motion.div
                                key="terminal"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{
                                    opacity: 1,
                                    scale: 1,
                                    x: error ? [-5, 5, -5, 5, 0] : 0
                                }}
                                exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
                                transition={{ type: "spring", duration: 0.5 }}
                                className="flex flex-col items-center justify-center space-y-8 font-mono"
                            >
                                <div className="flex items-center gap-3 text-emerald-500 mb-8">
                                    <Terminal className="h-8 w-8" />
                                    <span className="text-sm tracking-[0.2em] opacity-70">SECURE_GATEWAY_V1</span>
                                </div>

                                <div className="relative w-full max-w-md">
                                    <div className="flex items-center gap-2 text-xl md:text-2xl text-emerald-500 font-bold">
                                        <span className="whitespace-nowrap">{">"} ENTER_DECRYPTION_KEY:</span>
                                        <div className="relative flex-1">
                                            <input
                                                type="text"
                                                value={input}
                                                onChange={handleInput}
                                                className="w-full bg-transparent border-none outline-none text-emerald-400 placeholder-emerald-900/30 uppercase tracking-widest caret-transparent"
                                                autoFocus
                                                spellCheck={false}
                                            />
                                            {/* Custom Cursor visual */}
                                            <span className="absolute inset-y-0 left-0 pointer-events-none flex items-center">
                                                <span className="opacity-0">{input}</span>
                                                <span className="ml-[1px] inline-block h-6 w-3 bg-emerald-500 animate-pulse" />
                                            </span>
                                        </div>
                                    </div>
                                    {/* Focus Line */}
                                    <div className="mt-2 h-[2px] w-full bg-emerald-900/30 overflow-hidden">
                                        <div className="h-full w-full bg-emerald-500 origin-left scale-x-100 transition-transform duration-300" />
                                    </div>

                                    {/* Error Glitch Text */}
                                    <AnimatePresence>
                                        {error && (
                                            <motion.p
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0 }}
                                                className="absolute top-full mt-4 left-0 w-full text-center text-red-500 text-xs tracking-widest font-bold"
                                            >
                                                // ERROR: ACCESS_DENIED
                                            </motion.p>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </motion.div>
                        ) : (
                            // STAGE 2: THE REVEAL (Message)
                            <motion.div
                                key="reveal"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                className="flex flex-col items-center text-center"
                            >
                                {/* The Massive L */}
                                <motion.div
                                    initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
                                    animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                    transition={{ delay: 0.2, duration: 1.2 }}
                                    className="font-serif text-[12rem] leading-none text-rose-200 drop-shadow-[0_0_60px_rgba(251,113,133,0.4)] select-none mix-blend-screen"
                                >
                                    L
                                </motion.div>

                                {/* The Message */}
                                <motion.div
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 1.2, duration: 1 }}
                                    className="max-w-xl mx-auto mt-12 space-y-8"
                                >
                                    <Sparkles className="h-6 w-6 text-rose-300 mx-auto animate-pulse opacity-50" />

                                    <p className="font-sans text-xl md:text-2xl font-light text-zinc-300 leading-relaxed">
                                        You are the best thing that happened to me in the worst time of my life.
                                        <br />
                                        Thank you for being my anchor.
                                    </p>

                                    <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-rose-500/50 to-transparent mx-auto" />

                                    <p className="font-sans text-lg md:text-xl font-light text-zinc-400 leading-relaxed">
                                        I know you can be more, but you&apos;re enough already. And even if you just stay where you are, I&apos;ll be right here next to you. You&apos;re going to be great, but you don&apos;t need to be great.
                                    </p>

                                    <p className="font-sans text-lg md:text-xl font-medium text-rose-200/90 leading-relaxed">
                                        I&apos;m with you no matter what.
                                    </p>

                                    <div className="pt-12 flex justify-center">
                                        <Heart className="h-5 w-5 text-rose-500 fill-rose-500 animate-pulse drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]" />
                                    </div>
                                </motion.div>
                            </motion.div>
                        )}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
