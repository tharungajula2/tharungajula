"use client";

import { useState } from "react";


import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";


export function TopStatusRail() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: "// THESIS", href: "/#top" },
        { label: "// NEURAL_MAP", href: "#" },
        { label: "// EVOLUTION", href: "#" },
        { label: "// PROJECT_ARC", href: "#" }
    ];



    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 flex items-center h-16 md:h-20 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 px-5 md:px-12 transition-all duration-300">
                <div className="w-full flex items-center justify-between">
                    <Link href="/" className="group flex items-center active:scale-95 transition-transform duration-200">
                        <span className="font-heading text-[13px] md:text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 uppercase">
                            THARUN GAJULA
                        </span>
                    </Link>

                    {/* Desktop Navigation Row */}
                    <nav className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {menuItems.map((item, i) => (
                            <Link
                                key={i}
                                href={item.href}
                                className="font-mono text-[10px] tracking-[0.3em] text-slate-400 hover:text-cyan-400 transition-colors uppercase"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>


                    <button 
                        onClick={toggleMenu}
                        className="p-3 md:p-3 hover:bg-white/5 rounded-xl transition-all text-slate-400 hover:text-white active:scale-90 min-w-[48px] min-h-[48px] flex items-center justify-center"
                        aria-label="Toggle Navigation"
                    >
                        {isOpen ? <X className="h-6 w-6 md:h-5 md:w-5" /> : <Menu className="h-6 w-6 md:h-5 md:w-5" />}
                    </button>
                </div>
            </header>

            {/* Dropdown Menu Backdrop */}
            {isOpen && (
                <div 
                    className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[2px]" 
                    onClick={toggleMenu} 
                />
            )}

            <div className={cn(
                "fixed top-[70px] md:top-[85px] right-6 md:right-12 w-64 z-[60] bg-slate-900/95 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-300 origin-top-right",
                isOpen ? "opacity-100 scale-100 pointer-events-auto" : "opacity-0 scale-95 pointer-events-none"
            )}>
                <nav className="p-2">
                    {menuItems.map((item, i) => (
                        <Link
                            key={i}
                            href={item.href}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center w-full px-4 py-4 rounded-xl hover:bg-cyan-400/10 transition-all group active:scale-[0.98] min-h-[48px]"
                        >
                            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-slate-400 group-hover:text-cyan-400 uppercase transition-colors">
                                {item.label}
                            </span>
                        </Link>
                    ))}
                </nav>
            </div>
        </>
    );
}



