"use client";

import { useState, useEffect } from "react";
import { LProtocol } from "@/components/ui/l-protocol";
import { TllLogo } from "@/components/ui/tll-logo";
import { Home } from "lucide-react";
import Link from "next/link";

export function Navbar() {
    const [logoClicks, setLogoClicks] = useState(0);
    const [showLProtocol, setShowLProtocol] = useState(false);
    const [timeString, setTimeString] = useState<string>("");

    // Reset clicks after 2 seconds of inactivity
    useEffect(() => {
        if (logoClicks > 0 && logoClicks < 10) {
            const timer = setTimeout(() => setLogoClicks(0), 2000);
            return () => clearTimeout(timer);
        }
    }, [logoClicks]);

    useEffect(() => {
        const updateTime = () => {
            const time = new Date().toLocaleTimeString("en-US", {
                timeZone: "Asia/Kolkata",
                hour12: false,
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
            setTimeString(time + " IST");
        };
        updateTime();
        const interval = setInterval(updateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    const handleLogoClick = (e: React.MouseEvent) => {
        // If we strictly want 10 clicks to trigger, we check if current is 9 (so this is the 10th)
        if (logoClicks === 9) {
            e.preventDefault(); // Stop navigation
            setShowLProtocol(true);
            setLogoClicks(0);
        } else {
            setLogoClicks((prev) => prev + 1);
        }
    };

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-14 md:h-16 bg-slate-900/30 backdrop-blur-2xl border-b border-white/10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_0_20px_rgba(0,0,0,0.5)]">
            <div className="container mx-auto flex h-full items-center justify-between px-4 md:px-6 relative">
                <Link href="/" className="group flex items-center gap-2 md:gap-3" onClick={handleLogoClick}>
                    <div className="scale-110 origin-left">
                        <TllLogo size={24} />
                    </div>
                    <span className="font-heading text-[13px] md:text-lg font-extrabold tracking-widest bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 pb-1">
                        THARUN LEARNING LAB
                    </span>
                </Link>

                {/* RIGHT SYSTEM TRAY */}
                <div className="flex items-center gap-4 md:gap-6">
                    <Link href="/" className="text-slate-400 hover:text-cyan-400 transition-colors">
                        <Home className="h-4 w-4 md:h-5 md:w-5" />
                    </Link>
                    <div className="flex items-center gap-2 md:gap-4">
                        <span className="font-mono text-[10px] md:text-xs text-slate-400 tracking-wider">
                            {timeString || "LOADING..."}
                        </span>
                        <div className="h-1.5 w-1.5 md:h-2 md:w-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_8px_rgba(16,185,129,0.8)]" />
                    </div>
                </div>
            </div>

            <LProtocol isOpen={showLProtocol} onClose={() => setShowLProtocol(false)} />
        </nav>
    );
}
