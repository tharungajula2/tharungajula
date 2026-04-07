import React from "react";
import { Metadata } from "next";
import { getModuleBySlug, getUniverseMetadata, getAdjacentModules, extractHeadings } from "@/lib/atlas/content";
import { ModuleReaderBody } from "@/components/atlas/reader/ModuleReaderBody";
import { TableOfContents } from "@/components/atlas/reader/TableOfContents";
import { ReadingProgress } from "@/components/atlas/reader/ReadingProgress";
import { 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  ShieldCheck, 
  BarChart, 
  Library,
  Star
} from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";

interface PageProps {
  params: Promise<{ universeId: string; moduleSlug: string }>;
}

export async function generateStaticParams() {
  const { getAllPublicModules } = await import("@/lib/atlas/content");
  const modules = await getAllPublicModules();
  return modules.map((m) => ({
    universeId: m.universe,
    moduleSlug: m.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { universeId, moduleSlug } = await params;
  const module = await getModuleBySlug(universeId, moduleSlug);
  
  if (!module) return { title: "Module Not Found | Atlas" };
  
  const title = `${module.title} | Atlas Masterclass`;
  const description = module.summary.substring(0, 160);
  
  return {
    title,
    description,
    alternates: {
      canonical: `https://tharungajula.com/atlas/${universeId}/${moduleSlug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://tharungajula.com/atlas/${universeId}/${moduleSlug}`,
      images: [
        {
          url: "https://tharungajula.com/atlas/og-image.png", // Generic Atlas OG placeholder
          width: 1200,
          height: 630,
        },
      ],
    },
  };
}

export default async function ModuleReaderPage({ params }: PageProps) {
  const { universeId, moduleSlug } = await params;
  const module = await getModuleBySlug(universeId, moduleSlug);
  
  if (!module) notFound();

  const universe = await getUniverseMetadata(universeId);
  const { prev, next } = await getAdjacentModules(universeId, module.moduleNumber);
  const headings = extractHeadings(module.content);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 relative">
      <ReadingProgress />
      
      {/* NAVIGATION RAIL (Top) */}
      <nav className="flex items-center justify-between py-8 border-b border-white/5 mb-16">
        <Link 
          href={`/atlas/${universeId}`} 
          className="flex items-center gap-2 group text-slate-500 hover:text-white transition-colors"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono text-[10px] md:text-[11px] uppercase tracking-widest font-black text-slate-500">
            {universe?.title || "Universe"}
          </span>
        </Link>
        
        <div className="flex items-center gap-3">
           <span className="px-2 py-0.5 bg-cyan-500/10 border border-cyan-400/20 rounded font-mono text-[9px] text-cyan-400 uppercase font-black tracking-widest">
             Module {module.moduleNumber < 10 ? `0${module.moduleNumber}` : module.moduleNumber}
           </span>
        </div>
      </nav>

      {/* READER HEADER */}
      <header className="max-w-3xl mx-auto space-y-8 mb-24 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-full">
            <span className="font-mono text-[9px] md:text-[10px] text-slate-500 uppercase tracking-widest font-bold">
              Deep Knowledge // Global Health Archive
            </span>
          </div>
          
          <h1 className="font-heading text-5xl md:text-8xl font-black tracking-tight text-white leading-[1.05] md:-ml-1">
            {module.title}
          </h1>
          
          <p className="font-body text-xl md:text-3xl text-slate-400 leading-relaxed font-light italic opacity-80 decoration-cyan-400/20 underline underline-offset-8">
            {module.summary}
          </p>

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-10 pt-10 border-t border-white/5">
             <div className="flex items-center gap-3 text-slate-400 font-mono">
                <Clock className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black">{module.readingTime} Min Session</span>
             </div>
             <div className="flex items-center gap-3 text-slate-400 font-mono">
                <BarChart className="w-4 h-4 text-cyan-400" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black">Level: {module.difficulty}</span>
             </div>
             <div className="flex items-center gap-3 text-slate-400 font-mono">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span className="text-[10px] uppercase tracking-[0.25em] font-black">Validated Synthesis</span>
             </div>
          </div>
      </header>

      {/* TABLE OF CONTENTS (Desktop Sidebar + Mobile Collapsible) */}
      <TableOfContents headings={headings} />

      {/* CORE READING AREA */}
      <article className="max-w-3xl mx-auto pt-32 border-t border-white/5 relative">
         <div className="absolute -top-px left-1/2 -translate-x-1/2 w-48 h-px bg-cyan-400/30" />
         <ModuleReaderBody 
           content={module.content} 
           moduleTitle={module.title} 
         />
      </article>

      {/* BOTTOM NAVIGATION (Pagination) */}
      <footer className="max-w-4xl mx-auto mt-48 pt-24 border-t border-white/5 pb-32">
         <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {prev ? (
              <Link 
                href={`/atlas/${universeId}/${prev.slug}`}
                className="group p-10 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-cyan-400/20 transition-all text-left flex flex-col justify-between"
              >
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-6 block group-hover:text-cyan-400 transition-colors">Previous Module</span>
                <div className="flex items-center gap-6">
                   <ChevronLeft className="w-6 h-6 text-slate-800 group-hover:text-white group-hover:-translate-x-2 transition-all duration-500" />
                   <h4 className="text-xl font-bold text-slate-400 group-hover:text-white transition-colors">{prev.title}</h4>
                </div>
              </Link>
            ) : <div />}

            {next ? (
              <Link 
                href={`/atlas/${universeId}/${next.slug}`}
                className="group p-10 bg-slate-900/40 border border-white/5 rounded-3xl hover:border-cyan-400/20 transition-all text-right flex flex-col justify-between"
              >
                <span className="font-mono text-[9px] text-slate-500 uppercase tracking-widest mb-6 block group-hover:text-cyan-400 transition-colors">Continue Reading</span>
                <div className="flex items-center gap-6 justify-end">
                   <h4 className="text-xl font-bold text-slate-400 group-hover:text-white transition-colors">{next.title}</h4>
                   <ChevronRight className="w-6 h-6 text-slate-800 group-hover:text-white group-hover:translate-x-2 transition-all duration-500" />
                </div>
              </Link>
            ) : (
              <div className="p-12 bg-cyan-500/5 border border-cyan-400/20 rounded-3xl flex flex-col items-center justify-center text-center">
                 <Star className="w-8 h-8 text-cyan-400 mb-4 animate-pulse" />
                 <h4 className="text-xl font-black text-white mb-2 uppercase tracking-tight">Universe Foundation Complete</h4>
                 <p className="font-body text-sm text-slate-400 mb-8 max-w-xs">You have completed the initial foundations of human health. More advanced modules are currently being synthesized.</p>
                 <Link href="/atlas" className="inline-flex items-center gap-2 px-6 py-2 bg-white text-black font-mono text-[10px] uppercase font-black rounded-lg hover:bg-cyan-400 transition-colors">
                    <Library className="w-3 h-3" />
                    Return to Library
                 </Link>
              </div>
            )}
         </div>
         
         <div className="mt-24 text-center">
            <Link href="/atlas" className="group inline-flex items-center gap-3 text-[10px] font-mono text-slate-600 hover:text-white uppercase tracking-[0.4em] transition-colors">
              <span className="w-10 h-px bg-white/5 group-hover:bg-cyan-400/50 transition-colors" />
              Exit to Library
              <span className="w-10 h-px bg-white/5 group-hover:bg-cyan-400/50 transition-colors" />
            </Link>
         </div>
      </footer>
    </div>
  );
}
