"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { ChevronUp, List, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showFloatingButton, setShowFloatingButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show floating button after scrolling past hero (approx 400px)
      if (window.scrollY > 400) {
        setShowFloatingButton(true);
      } else {
        setShowFloatingButton(false);
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (headings.length === 0) return null;

  const scrollToHeading = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth"
      });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <>
      {/* MOBILE FLOATING TOC BUTTON (xl:hidden) */}
      <AnimatePresence>
        {showFloatingButton && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="xl:hidden fixed bottom-8 right-6 z-[100]"
          >
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label={isMobileMenuOpen ? "Close table of contents" : "Open table of contents"}
              className="w-14 h-14 bg-cyan-500 text-black rounded-full shadow-[0_0_30px_rgba(6,182,212,0.4)] flex items-center justify-center hover:scale-110 active:scale-95 transition-transform"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <List className="w-6 h-6" />}
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE FULL-SCREEN OVERLAY TOC */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, backdropFilter: "blur(0px)" }}
            animate={{ opacity: 1, backdropFilter: "blur(12px)" }}
            exit={{ opacity: 0, backdropFilter: "blur(0px)" }}
            className="xl:hidden fixed inset-0 z-[90] bg-black/60 flex items-end justify-center pb-32 px-6"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 100, opacity: 0 }}
              className="w-full max-w-lg bg-slate-900 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6"
              onClick={(e) => e.stopPropagation()}
              role="dialog"
              aria-modal="true"
              aria-label="Table of contents"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-4">
                 <span className="font-mono text-[10px] uppercase tracking-widest font-black text-cyan-400">Structure</span>
                 <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                 >
                    <X className="w-4 h-4 text-slate-500" />
                 </button>
              </div>
              
              <div className="space-y-4 max-h-[50vh] overflow-y-auto pr-2 custom-scrollbar">
                {headings.map((h, i) => (
                  <button
                    key={h.id}
                    onClick={() => scrollToHeading(h.id)}
                    className={cn(
                      "block w-full text-left py-2 transition-all",
                      h.level === 2 
                        ? "text-lg font-bold text-white border-b border-white/5 pb-3 pt-4" 
                        : "text-sm font-light text-slate-400 hover:text-cyan-400 pl-4"
                    )}
                  >
                    <span className="font-mono text-[10px] mr-3 opacity-30">0{i+1}</span>
                    {h.text}
                  </button>
                ))}
              </div>

              <button 
                onClick={() => { window.scrollTo({ top: 0, behavior: "smooth" }); setIsMobileMenuOpen(false); }}
                className="w-full py-4 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 group hover:bg-white/10 transition-colors"
              >
                 <ChevronUp className="w-4 h-4 text-cyan-400 group-hover:-translate-y-1 transition-transform" />
                 <span className="font-mono text-[10px] uppercase font-black tracking-widest">Back to top</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* DESKTOP SIDEBAR TOC (xl:block) */}
      <nav className="hidden xl:block fixed top-48 left-[6%] 2xl:left-[10%] w-64 space-y-6 animate-in fade-in slide-in-from-left-4 duration-1000 z-40">
        <div className="flex items-center gap-3 px-4">
           <div className="h-px w-8 bg-cyan-400/20" />
           <span className="font-mono text-[10px] text-slate-600 uppercase tracking-widest font-black">Structure</span>
        </div>
        
        <div className="space-y-4 px-4 overflow-y-auto max-h-[60vh] custom-scrollbar scrollbar-hide">
          {headings.map((h, i) => (
            <button
              key={h.id}
              onClick={() => scrollToHeading(h.id)}
              className={cn(
                "group block text-left text-[11px] md:text-[12px] uppercase tracking-widest transition-all duration-300",
                h.level === 2 
                  ? "font-black text-slate-500 hover:text-white" 
                  : "font-bold text-slate-700 hover:text-cyan-400 pl-4 py-1 border-l border-white/5 hover:border-cyan-400/30"
              )}
            >
              <span className="opacity-40 group-hover:opacity-100 mr-2 font-mono text-[9px] text-cyan-400/60 transition-opacity">0{i+1}</span>
              {h.text}
            </button>
          ))}
        </div>
      </nav>
    </>
  );
}
