"use client";

import Link from "next/link";
import { Github, Linkedin, Youtube, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import { GenesisModal } from "@/components/ui/genesis-modal";

const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Protocols", href: "/#protocols" },
    { name: "Lab Notes", href: "/notes" },
    { name: "About", href: "/#about" },
];

const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/tharungajula2" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/tharungajula" },
    { name: "YouTube", icon: Youtube, href: "https://youtube.com/@tharunhealthlab" },
    // { name: "Twitter", icon: Twitter, href: "#" }, // Uncomment when active
    { name: "Email", icon: Mail, href: "mailto:tharun.gajula.2@gmail.com" },
];

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
        <footer className="border-t border-white/5 bg-black/50 backdrop-blur-xl">
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* BRAND */}
                    <div className="space-y-4">
                        <h3 className="font-heading text-xl font-bold text-white tracking-tight">
                            THARUN HEALTH LAB
                        </h3>
                        <p className="font-body text-sm text-zinc-500 max-w-xs leading-relaxed">
                            Building the Operating Systems for Biology, Family, and Cognition.
                        </p>

                        {/* SYSTEM STATUS (Moved here for mobile visibility) */}
                        <div
                            onClick={handleStatusClick}
                            className="pt-4 inline-flex items-center gap-2 cursor-pointer group"
                        >
                            <span className="font-mono text-[10px] text-zinc-800 tracking-widest group-hover:text-emerald-500 transition-colors select-none">
                                SYSTEM_STATUS: EVOLVING // CONCEPT_PHASE
                            </span>
                            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        </div>
                    </div>

                    {/* SITEMAP */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            // NAVIGATION
                        </h4>
                        <ul className="space-y-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link href={link.href} className="font-body text-sm text-zinc-500 hover:text-primary transition-colors">
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONNECT */}
                    <div className="space-y-4">
                        <h4 className="font-mono text-xs font-bold text-zinc-400 uppercase tracking-wider">
                            // CONNECT
                        </h4>
                        <div className="flex flex-wrap gap-4">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 rounded-full border border-white/5 bg-white/5 text-zinc-400 hover:text-white hover:border-white/20 hover:bg-white/10 transition-all"
                                    aria-label={social.name}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                        {/* Dedication */}
                        <p className="mt-6 text-xs text-zinc-600 font-inter leading-relaxed max-w-xs">
                            This journey is dedicated to my Parents.
                        </p>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <p className="font-mono text-xs text-zinc-600">
                            © 2026 Tharun Kumar Gajula. All rights reserved.
                        </p>
                    </div>
                    <p className="font-mono text-xs text-zinc-600">
                        Built with Next.js, Tailwind & Coffee.
                    </p>
                </div>
            </div>
            {showModal && <GenesisModal onClose={() => setShowModal(false)} />}
        </footer>
    );
}
