"use client";

import { useState } from "react";

import { TllLogo } from "@/components/ui/tll-logo";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";


export function TopStatusRail() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => setIsOpen(!isOpen);

    const menuItems = [
        { label: "Top", href: "/#top" }, // Updated to absolute for cross-page navigation
        { label: "Work", href: "/#work" },
        { label: "Github", href: "https://github.com/tharungajula2", external: true },
        { label: "Email", href: "mailto:tharun.gajula@gmail.com" },
        { label: "LinkedIn", href: "https://linkedin.com/in/tharungajula", external: true }
    ];



    return (
        <>
            <header className="fixed top-0 left-0 w-full z-50 flex items-center h-16 md:h-20 bg-slate-950/80 backdrop-blur-3xl border-b border-white/5 px-6 md:px-12 transition-all duration-300">
                <div className="w-full flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-3 md:gap-4">
                        <div className="flex items-center justify-center">
                            <TllLogo size={28} />
                        </div>
                        <span className="font-heading text-[13px] md:text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 uppercase">
                            THARUN GAJULA
                        </span>
                    </Link>


                    <button 
                        onClick={toggleMenu}
                        className="p-2 md:p-3 hover:bg-white/5 rounded-xl transition-colors text-slate-400 hover:text-white"
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
                            target={item.external ? "_blank" : undefined}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center w-full px-4 py-3.5 rounded-xl hover:bg-cyan-400/10 transition-colors group"
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



