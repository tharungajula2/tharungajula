"use client";

import { User, ShieldAlert, Database, Network, Mail } from "lucide-react";
import { useState } from "react";
import { GenesisModal } from "@/components/ui/genesis-modal";
import Link from "next/link";

export function Footer() {
    const [clickCount, setClickCount] = useState(0);
    const [showModal, setShowModal] = useState(false);

    const handleStatusClick = () => {
        const newCount = clickCount + 1;
        setClickCount(newCount);

        if (newCount === 7) {
            console.log("ACCESS_GRANTED");
            setShowModal(true);
            setClickCount(0);
        }
    };

    return (
        <>
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center justify-around md:justify-center w-[85vw] md:w-auto gap-2 md:gap-8 px-6 py-3 bg-slate-900/30 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-[inset_0_1px_0_0_rgba(255,255,255,0.05),_0_0_20px_rgba(0,0,0,0.5)] z-50">

                <Link href="/profile" className="flex flex-col md:flex-row items-center justify-start gap-1 md:gap-3 p-1.5 md:p-2 rounded-xl hover:bg-white/5 transition-all group cursor-pointer text-slate-400 hover:text-cyan-400">
                    <User className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="font-mono uppercase tracking-widest text-[8px] md:text-[10px] text-center whitespace-nowrap mt-0.5 md:mt-0">PROFILE</span>
                </Link>

                <Link href="/map" className="flex flex-col md:flex-row items-center justify-start gap-1 md:gap-3 p-1.5 md:p-2 rounded-xl hover:bg-white/5 transition-all group cursor-pointer text-slate-400 hover:text-cyan-400">
                    <Network className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="font-mono uppercase tracking-widest text-[8px] md:text-[10px] text-center whitespace-nowrap mt-0.5 md:mt-0">MAP</span>
                </Link>

                <Link href="/contact" className="flex flex-col md:flex-row items-center justify-start gap-1 md:gap-3 p-1.5 md:p-2 rounded-xl hover:bg-white/5 transition-all group cursor-pointer text-slate-400 hover:text-cyan-400">
                    <Mail className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="font-mono uppercase tracking-widest text-[8px] md:text-[10px] text-center whitespace-nowrap mt-0.5 md:mt-0">CONTACT</span>
                </Link>

            </div>

            <div className="fixed bottom-2 right-4 z-40">
                <span
                    className="font-mono text-[8px] text-slate-600/50 hover:text-slate-500 transition-colors cursor-pointer"
                    onClick={handleStatusClick}
                >
                    © 2026 Tharun Kumar Gajula.
                </span>
            </div>

            {showModal && <GenesisModal onClose={() => setShowModal(false)} />}
        </>
    );
}
