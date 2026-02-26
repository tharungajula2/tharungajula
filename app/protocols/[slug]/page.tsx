import { protocols } from "@/lib/protocols";
import { Navbar } from "@/components/layout/navbar";
import { ArrowLeft, ArrowUpRight, Activity, Database } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

export async function generateStaticParams() {
    return Object.keys(protocols).map((slug) => ({
        slug,
    }));
}

export default async function ProtocolPage({ params }: { params: { slug: string } }) {
    const { slug } = await params;
    const protocol = protocols[slug];

    if (!protocol) {
        return (
            <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
                <div className="text-center">
                    <h1 className="text-4xl font-bold">404</h1>
                    <p className="text-zinc-500">Protocol Not Found</p>
                    <Link href="/" className="mt-4 text-primary hover:underline">Return to Lab</Link>
                </div>
            </main>
        )
    }

    const Icon = protocol.icon;

    return (
        <main className="min-h-screen bg-slate-950 overflow-hidden relative">
            <Navbar />

            {/* AMBIENT BACKGROUND GLOW */}
            <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] rounded-full blur-3xl opacity-20 pointer-events-none", protocol.bgColor)} />

            <div className="relative z-10 container mx-auto max-w-5xl px-6 md:px-12 pt-32 pb-24">

                {/* NAV BACK */}
                <Link href="/#protocols" className="inline-flex items-center gap-2 font-mono text-xs font-bold text-zinc-500 transition-colors hover:text-white mb-12">
                    <ArrowLeft className="h-4 w-4" /> RETURN_TO_PROTOCOLS
                </Link>

                {/* HERO HEADER */}
                <div className="flex flex-col items-center text-center space-y-8 mb-24">
                    <div className={cn("p-6 rounded-3xl border border-white/10 bg-white/5 backdrop-blur-xl ring-1 ring-white/10", protocol.color)}>
                        <Icon className="h-24 w-24 md:h-32 md:w-32" strokeWidth={1} />
                    </div>

                    <div className="space-y-4 max-w-3xl">
                        <div className="flex items-center justify-center gap-3">
                            <span className={cn("font-mono text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border border-current bg-black/50 backdrop-blur-md", protocol.color)}>
                                {protocol.status}
                            </span>
                        </div>

                        <h1 className="font-heading text-5xl md:text-7xl font-bold text-white tracking-tight">
                            {protocol.title}
                        </h1>

                        <p className="font-body text-xl md:text-2xl text-zinc-400 font-light">
                            {protocol.subtitle}
                        </p>
                    </div>
                </div>

                {/* CONTENT GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* MISSION LOG */}
                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-md">
                        <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                            <Activity className="h-4 w-4 text-primary" />
                            [MISSION_OBJECTIVE]
                        </div>
                        <p className="font-body text-lg text-zinc-300 leading-relaxed">
                            {protocol.mission}
                        </p>
                    </div>

                    {/* SYSTEM STACK */}
                    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 backdrop-blur-md">
                        <div className="mb-6 flex items-center gap-2 font-mono text-xs font-bold tracking-wider text-zinc-500">
                            <Database className="h-4 w-4 text-primary" />
                            [SYSTEM_STACK]
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {protocol.stack.map((item) => (
                                <div key={item.name} className="flex items-center gap-3 p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-colors">
                                    <item.icon className={cn("h-5 w-5", protocol.color)} />
                                    <span className="font-mono text-sm font-bold text-zinc-300">{item.name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </main>
    );
}
