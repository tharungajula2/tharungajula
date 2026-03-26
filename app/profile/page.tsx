"use client";

import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export default function ProfilePage() {
    return (
        <main className="min-h-screen bg-transparent flex flex-col">
            <Navbar />

            <section className="flex-1 flex flex-col w-full px-6 pt-32 pb-12 md:px-12 relative z-10">
                <div className="container mx-auto max-w-4xl w-full flex flex-col">

                    {/* NAV & HEADER */}
                    <div className="mb-12 shrink-0">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400 mb-6">
                            <ArrowLeft className="h-4 w-4" /> RETURN_TO_DESKTOP
                        </Link>

                        <div className="space-y-2">
                            <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                                // THARUN_LEARNING_LAB {'>'} USER_PROFILE [ACTIVE]
                            </span>
                        </div>
                    </div>

                    {/* PROFILE CONTENT - PURGED */}
                    <div className="flex flex-col items-center justify-center min-h-[40vh] text-slate-500 font-mono text-xs tracking-widest uppercase">
                        // SECURE_PROFILE_DATA_STREAM_OFFLINE
                    </div>
                </div>
            </section>
        </main>
    );
}
