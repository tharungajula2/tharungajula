"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { LProtocol } from "@/components/ui/l-protocol";
import { TllLogo } from "@/components/ui/tll-logo";

const navLinks = [
    { name: "HOME", href: "/" },
    { name: "NEURAL MAP", href: "/map" },
    { name: "TILL 2026", href: "/till-2026" },
];

export function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [logoClicks, setLogoClicks] = useState(0);
    const [showLProtocol, setShowLProtocol] = useState(false);

    // Reset clicks after 2 seconds of inactivity
    useEffect(() => {
        if (logoClicks > 0 && logoClicks < 5) {
            const timer = setTimeout(() => setLogoClicks(0), 2000);
            return () => clearTimeout(timer);
        }
    }, [logoClicks]);

    const handleLogoClick = (e: React.MouseEvent) => {
        // If we strictly want 5 clicks to trigger, we check if current is 4 (so this is the 5th)
        if (logoClicks === 4) {
            e.preventDefault(); // Stop navigation
            setShowLProtocol(true);
            setLogoClicks(0);
        } else {
            setLogoClicks((prev) => prev + 1);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 bg-slate-950/90 backdrop-blur-md border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="container mx-auto flex h-full items-center justify-between px-6">
                {/* LOGO: The Pulse */}
                <Link href="/" className="group flex items-center gap-2" onClick={handleLogoClick}>
                    <TllLogo size={40} />
                    <span className="hidden font-heading text-lg font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 md:block">
                        THARUN LEARNING LAB
                    </span>
                </Link>

                {/* DESKTOP LINKS */}
                <div className="hidden gap-8 md:flex">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={cn(
                                "group relative font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400"
                            )}
                        >
                            <span className="relative z-10">{"// " + link.name}</span>
                            <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </div>

                {/* MOBILE MENU TOGGLE */}
                <button
                    className="flex items-center justify-center text-slate-500 hover:text-cyan-400 md:hidden"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </div>

            {/* MOBILE MENU DROPDOWN */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-16 left-0 w-full border-b border-white/5 bg-black/95 backdrop-blur-xl md:hidden"
                    >
                        <div className="flex flex-col p-6 space-y-6">
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    className="font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 hover:text-cyan-400"
                                    onClick={() => setIsOpen(false)}
                                >
                                    {"// " + link.name}
                                </Link>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <LProtocol isOpen={showLProtocol} onClose={() => setShowLProtocol(false)} />
        </nav>
    );
}
