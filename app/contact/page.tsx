import { ArrowLeft, Mail, Linkedin } from "lucide-react";
import Link from "next/link";
import { Navbar } from "@/components/layout/navbar";

export const metadata = {
    title: "Contact Relay | Tharun Learning Lab"
};

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-transparent flex flex-col">
            <Navbar />

            <section className="flex-1 flex flex-col w-full px-6 pt-32 pb-12 md:px-12 relative z-10">
                <div className="container mx-auto max-w-4xl w-full flex flex-col items-center justify-center min-h-[60vh]">

                    {/* NAV & HEADER */}
                    <div className="mb-12 self-start shrink-0 w-full max-w-4xl">
                        <Link href="/" className="inline-flex items-center gap-2 font-mono uppercase tracking-widest text-[9px] md:text-[10px] text-slate-500 transition-colors hover:text-cyan-400 mb-6">
                            <ArrowLeft className="h-4 w-4" /> RETURN_TO_DESKTOP
                        </Link>

                        <div className="space-y-2">
                            <span className="flex items-center gap-3 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
                                // THARUN_LEARNING_LAB {'>'} CONTACT_RELAY [ACTIVE]
                            </span>
                        </div>
                    </div>

                    {/* CONTACT CONTENT */}
                    <div className="flex flex-col gap-10 text-slate-300 font-body pb-12 w-full max-w-4xl">

                        <div className="flex flex-col gap-4 border-b border-white/10 pb-8 text-center md:text-left">
                            <h1 className="font-heading text-3xl md:text-5xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-cyan-400 mb-2 focus-in-expand">
                                COMMUNICATIONS RELAY
                            </h1>
                            <p className="font-mono text-slate-400 text-sm md:text-base mt-2 leading-relaxed max-w-2xl mx-auto md:mx-0">
                                Open channels for collaborations, research conversations, educational experiments, AI workflow discussions, and system-building inquiries.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
                            <a href="mailto:tharun.gajula.2@gmail.com" className="bg-white/5 border border-white/10 p-10 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all flex flex-col items-center justify-center gap-6 group">
                                <Mail size={48} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                <div className="flex flex-col items-center gap-1">
                                    <span className="font-mono text-white tracking-widest text-sm text-center">tharun.gajula.2@gmail.com</span>
                                    <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">Direct inquiries</span>
                                </div>
                            </a>

                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="bg-white/5 border border-white/10 p-10 rounded-xl hover:bg-white/10 hover:border-cyan-400/50 hover:shadow-[0_0_30px_rgba(34,211,238,0.15)] transition-all flex flex-col items-center justify-center gap-6 group">
                                <Linkedin size={48} className="text-slate-400 group-hover:text-cyan-400 transition-colors" />
                                <div className="flex flex-col items-center gap-1">
                                    <span className="font-mono text-white tracking-widest text-sm">LINKEDIN NETWORK</span>
                                    <span className="font-mono text-[10px] tracking-widest text-slate-500 uppercase">Professional network</span>
                                </div>
                            </a>
                        </div>

                    </div>

                </div>
            </section>
        </main>
    );
}
