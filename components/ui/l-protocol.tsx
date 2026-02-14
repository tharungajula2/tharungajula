"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Lock, Heart, Terminal, Sparkles } from "lucide-react";
import { useState, useEffect, useRef } from "react";
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
    const [timestamp, setTimestamp] = useState("");
    const [mounted, setMounted] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        setMounted(true);
        // Set timestamp on mount
        setTimestamp("2026-02-11");
        // Focus input on mount
        if (inputRef.current) {
            inputRef.current.focus();
        }
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
                    className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden bg-black text-white"
                    style={{ backgroundColor: "#000000" }} // Force solid black
                >
                    {/* Background Noise/Grain (Optional subtle texture) */}
                    <div className="fixed inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

                    <button
                        onClick={onClose}
                        className={cn(
                            "fixed top-4 right-4 md:top-8 md:right-8 z-[10000] transition-colors duration-300 p-2 rounded-full hover:bg-white/10",
                            isUnlocked ? "text-rose-200/70 hover:text-rose-200" : "text-emerald-500/70 hover:text-emerald-500"
                        )}
                    >
                        <X className="h-6 w-6" />
                    </button>

                    <div className="min-h-full w-full flex flex-col items-center justify-center p-4 py-20">
                        <div className="w-full max-w-2xl px-4 relative z-10 text-center">
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
                                    className="flex flex-col items-center justify-center space-y-8 font-mono min-h-[50vh]"
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
                                                    ref={inputRef}
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
                                    className="flex flex-col items-center pb-12 w-full"
                                >
                                    {/* The Massive L & Star */}
                                    <div className="relative inline-block mb-12 pt-8 md:pt-12">
                                        <motion.div
                                            initial={{ scale: 0.8, opacity: 0, filter: "blur(20px)" }}
                                            animate={{ scale: 1, opacity: 1, filter: "blur(0px)" }}
                                            transition={{ delay: 0.2, duration: 1.2 }}
                                            className="font-serif text-8xl md:text-9xl leading-none text-rose-200 drop-shadow-[0_0_60px_rgba(251,113,133,0.4)] select-none mix-blend-screen"
                                        >
                                            L
                                        </motion.div>
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.6, 1, 0.6] }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                                            className="absolute -top-6 -right-10 md:-top-4 md:-right-8"
                                        >
                                            <Sparkles className="h-8 w-8 md:h-10 md:w-10 text-rose-200" />
                                        </motion.div>
                                    </div>

                                    {/* The Message */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 1.2, duration: 1 }}
                                        className="w-full max-w-xl mx-auto space-y-12 px-2"
                                    >
                                        {/* The Tribute */}
                                        <div className="space-y-6 text-center">
                                            <p className="font-sans text-rose-100/90 text-lg md:text-xl leading-relaxed italic">
                                                &quot;Special tribute to my special friend who has been there with me before even I am something and never ever doubted always reminded me that I am already enough and I can be great but I dont need to be great and she will always be there no matter what. Also reminded me that I am already great by truly being myself as a person and that is the most special thing in me. I promise to become better and better at every opportunity of learning I get in life. You are a great human being and I really wish great things happen to you always and you deserve all the joy and magic in life. I will jump at every opportunity if it can make your life better one way or other. You be super strong always and when you need more strength just feel my presence😂. I can keep on going ....Still it will be short of words and more coming soon, until then go back and come later😂&quot;
                                            </p>
                                        </div>

                                        <div className="h-[1px] w-24 bg-gradient-to-r from-transparent via-rose-500/30 to-transparent mx-auto" />

                                        <div className="pt-4 flex flex-col items-center gap-6 pb-20 md:pb-0">
                                            {/* Star Icon instead of Heart */}
                                            <Sparkles className="h-6 w-6 text-rose-500 fill-rose-500 animate-pulse drop-shadow-[0_0_10px_rgba(251,113,133,0.8)]" />

                                            {/* Timestamp */}
                                            <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-rose-200/30 font-mono">
                                                <span>System: Active</span>
                                                <span className="w-1 h-1 rounded-full bg-rose-500/50"></span>
                                                <span>{timestamp}</span>
                                            </div>
                                        </div>
                                    </motion.div>
                                </motion.div>
                            )}
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>,
        document.body
    );
}
