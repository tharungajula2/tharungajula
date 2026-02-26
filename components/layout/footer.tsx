"use client";

import Link from "next/link";
import { Github, Linkedin, Youtube, Twitter, Mail } from "lucide-react";
import { useState } from "react";
import { GenesisModal } from "@/components/ui/genesis-modal";
import { TllLogo } from "@/components/ui/tll-logo";

const footerLinks = [
    { name: "Home", href: "/" },
    { name: "Neural Map", href: "/map" },
    { name: "// TILL 2026", href: "/till-2026" },
];

const socialLinks = [
    { name: "GitHub", icon: Github, href: "https://github.com/tharungajula2" },
    { name: "LinkedIn", icon: Linkedin, href: "https://linkedin.com/in/tharungajula" },
    // { name: "YouTube", icon: Youtube, href: "https://youtube.com/@tharunlearninglab" }, // Removed as requested
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
        <footer className="bg-slate-950/90 backdrop-blur-md border-t border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)]">
            <div className="container mx-auto px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">

                    {/* BRAND */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <TllLogo size={32} />
                            <h3 className="font-heading text-xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400">
                                THARUN LEARNING LAB
                            </h3>
                        </div>
                        <p className="font-body text-sm text-slate-300 max-w-xs leading-relaxed">
                            A digital sandbox for decoding real-world systems and engineering life mastery.
                        </p>

                        {/* SYSTEM STATUS (Moved here for mobile visibility) */}
                    </div>

                    {/* SITEMAP */}
                    <div className="space-y-4">
                        <h4 className="font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500">
                            NAVIGATION
                        </h4>
                        <ul className="space-y-3 pt-2">
                            {footerLinks.map((link) => (
                                <li key={link.name}>
                                    <Link
                                        href={link.href}
                                        className="group relative font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400"
                                    >
                                        <span className="relative z-10">// {link.name.replace("// ", "")}</span>
                                        <span className="absolute -bottom-1 left-0 h-[1px] w-0 bg-cyan-400 transition-all duration-300 group-hover:w-full" />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* CONNECT */}
                    <div className="space-y-4">
                        <h4 className="font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500">
                            CONNECT
                        </h4>
                        <div className="flex flex-wrap gap-4 pt-2">
                            {socialLinks.map((social) => (
                                <a
                                    key={social.name}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2.5 rounded-full border border-white/5 bg-white/5 text-slate-500 hover:text-cyan-400 hover:border-cyan-400/30 hover:bg-cyan-400/10 transition-all shadow-sm"
                                    aria-label={social.name}
                                >
                                    <social.icon className="h-4 w-4" />
                                </a>
                            ))}
                        </div>
                        {/* Dedication */}
                        <p className="mt-6 font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 max-w-xs">
                            This journey is dedicated to my Parents.
                        </p>
                    </div>
                </div>

                {/* BOTTOM ROW */}
                <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                        <p className="font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500">
                            © 2026 Renaforge Systems. All rights reserved.
                        </p>
                    </div>
                    <p className="font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500">
                        Built with Next.js, Tailwind & Coffee.
                    </p>
                </div>
            </div>
            {showModal && <GenesisModal onClose={() => setShowModal(false)} />}
        </footer>
    );
}
