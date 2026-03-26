"use client";

import { Navbar } from "@/components/layout/navbar";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-transparent flex flex-col">
            <Navbar />
            <section className="flex-1 flex flex-col items-center justify-center p-6 pt-32 relative z-10">
                <div className="text-slate-500 font-mono text-xs tracking-widest uppercase">
                    // COMMUNICATIONS_RELAY_OFFLINE
                </div>
            </section>
        </main>
    );
}
