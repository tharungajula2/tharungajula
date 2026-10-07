'use client';

import React, { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { ArrowLeft, List, X } from 'lucide-react';
import { DocumentData } from '@/lib/notes/markdown';
import clsx from 'clsx';

interface ClientReaderProps {
  doc: DocumentData;
  headings: { id: string; text: string }[];
  children: React.ReactNode;
}

function formatDateDisplay(dateStr: string): string {
  if (!dateStr) return '';
  const parts = dateStr.split('-');
  if (parts.length !== 3) return dateStr;
  const year = parts[0];
  const monthIdx = parseInt(parts[1], 10) - 1;
  const dayNum = parseInt(parts[2], 10);
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  if (isNaN(monthIdx) || isNaN(dayNum) || monthIdx < 0 || monthIdx > 11) return dateStr;
  return `${dayNum} ${months[monthIdx]} ${year}`;
}

export default function ClientReader({ doc, headings, children }: ClientReaderProps) {
  const [activeId, setActiveId] = useState<string>('');
  const [isTocOpen, setIsTocOpen] = useState(false);
  const [scrolledPastHeader, setScrolledPastHeader] = useState(false);
  const [progress, setProgress] = useState(0);
  const tocNavRef = useRef<HTMLElement>(null);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrolledPastHeader(window.scrollY > 80);

      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) {
        setProgress(0);
      } else {
        const pct = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setProgress(pct);
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '0px 0px -75% 0px', threshold: 0.1 }
    );

    headings.forEach(({ id }) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  // Keep active TOC item visible inside the sticky sidebar container as user scrolls
  useEffect(() => {
    if (!activeId || !tocNavRef.current) return;
    const activeEl = tocNavRef.current.querySelector(`[data-toc-id="${activeId}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeId]);

  // Section reveal observer for HTML notes or markdown sections
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll('.notes-html-note section, .atom-content section'));
    if (sections.length === 0) return;

    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              observer.unobserve(entry.target);
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.04 }
      );

      sections.forEach((sec) => {
        if (!sec.classList.contains('in')) {
          observer.observe(sec);
        }
      });

      return () => observer.disconnect();
    } else {
      sections.forEach((sec) => sec.classList.add('in'));
    }
  }, [children]);

  const showTocButton = headings.length >= 2;

  return (
    <div className="flex-1 flex flex-col w-full min-w-0">
      {/* Top Bar Header */}
      <header 
        className={clsx(
          "fixed top-0 left-0 right-0 z-40 h-14 bg-background/80 backdrop-blur-md backdrop-saturate-150 border-b border-border/40 transition-all duration-300"
        )}
      >
        <div className="w-full max-w-[90rem] mx-auto h-full px-3 md:px-6 lg:px-8 xl:px-12 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            <Link 
              href="/notes" 
              className="p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors shrink-0 text-foreground/80 hover:text-foreground"
              aria-label="Back to shelf"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            
            <h1 
              className={clsx(
                "font-medium text-sm text-foreground truncate transition-opacity duration-300 min-w-0 overflow-hidden",
                scrolledPastHeader ? "opacity-100" : "opacity-0"
              )}
            >
              {doc.title}
            </h1>
          </div>

          <div className="flex items-center gap-1 shrink-0">
            {showTocButton && (
              <button
                onClick={() => setIsTocOpen(true)}
                className="p-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors lg:hidden text-foreground/80 hover:text-foreground"
                aria-label="Table of contents"
              >
                <List className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
        
        {/* Scroll Progress Bar - Clean 2px indicator pinned to bottom border, no heavy track */}
        <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-transparent pointer-events-none">
          <div 
            className="h-full bg-foreground/90 transition-all duration-75 ease-out" 
            style={{ width: `${progress}%` }} 
          />
        </div>
      </header>

      {/* Main Layout Container */}
      <div className="w-full max-w-[90rem] mx-auto px-3 md:px-6 lg:px-8 xl:px-12 pt-20 pb-32 lg:grid lg:grid-cols-[16rem_1fr] xl:grid-cols-[18rem_1fr] lg:gap-8 xl:gap-12 items-start min-w-0 flex-1">
        {/* Column 1: Desktop Side Rail TOC */}
        {showTocButton ? (
          <aside 
            ref={tocNavRef}
            className="hidden lg:block w-full sticky top-20 max-h-[calc(100vh-6rem)] overflow-y-auto no-scrollbar py-2 border-r border-border/40 pr-4"
          >
            <h2 className="font-semibold text-xs uppercase tracking-wider text-muted mb-4 px-2">
              Contents
            </h2>
            <nav className="space-y-1">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  data-toc-id={heading.id}
                  href={`#${heading.id}`}
                  title={heading.text}
                  onClick={(e) => {
                    e.preventDefault();
                    const el = document.getElementById(heading.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 70;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={clsx(
                    "block px-3 py-1.5 rounded-md text-xs font-medium transition-all leading-snug line-clamp-2",
                    activeId === heading.id 
                      ? "bg-foreground/10 text-foreground font-semibold border-l-2 border-foreground pl-2.5" 
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {heading.text}
                </a>
              ))}
            </nav>
          </aside>
        ) : (
          <div className="hidden lg:block w-full" />
        )}

        {/* Column 2: Main Content Area */}
        <main className="w-full max-w-5xl min-w-0 flex-1">
          {/* Document Header */}
          <header className="mb-12 max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-black/5 text-muted shrink-0">
                {doc.format}
              </span>
              {doc.tags.length > 0 && (
                <span className="text-xs text-muted/60 truncate">
                  {doc.tags.map(t => `#${t}`).join(' ')}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-serif font-bold tracking-tight mb-4 leading-tight text-foreground">
              {doc.title}
            </h1>
            
            <p className="text-xl text-muted leading-relaxed mb-6">
              {doc.description}
            </p>

            {/* Single-Line Metadata Strip */}
            <div className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-medium text-muted/70 pt-3 border-t border-border/40">
              <span>{doc.readTime}</span>
              <span>&middot;</span>
              <span>{doc.wordCount.toLocaleString()} words</span>
              {doc.updated && (
                <>
                  <span>&middot;</span>
                  <span>Updated {formatDateDisplay(doc.updated)}</span>
                </>
              )}
              <span>&middot;</span>
              <span>
                {doc.verified === 'verified' ? 'Verified note' : 'Unverified draft'}
              </span>
            </div>
          </header>

          {/* Rendered Body: Markdown notes structurally receive .prose typography styles; HTML notes render inside unstyled wrapper container holding .loud-recall-html-note */}
          <article className={clsx("w-full min-w-0 max-w-none", doc.fileFormat !== 'html' && "prose")}>
            {children}
          </article>
        </main>
      </div>

      {/* TOC Sheet Overlay (Mobile / Tablet) */}
      {isTocOpen && (
        <div 
          className="fixed inset-0 z-50 flex flex-col justify-end sm:justify-center sm:items-center p-4 bg-background/60 backdrop-blur-sm"
          onClick={() => setIsTocOpen(false)}
        >
          <div 
            className="bg-background border border-border rounded-2xl w-full max-w-sm max-h-[80vh] flex flex-col shadow-2xl overflow-hidden animate-in slide-in-from-bottom-8 fade-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-4 border-b border-border">
              <h2 className="font-semibold text-base">Table of Contents</h2>
              <button 
                onClick={() => setIsTocOpen(false)}
                className="p-2 -mr-2 rounded-full hover:bg-black/5 active:bg-black/10 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            
            <div className="overflow-y-auto p-4 space-y-1 no-scrollbar">
              {headings.map((heading) => (
                <a
                  key={heading.id}
                  href={`#${heading.id}`}
                  title={heading.text}
                  onClick={(e) => {
                    e.preventDefault();
                    setIsTocOpen(false);
                    const el = document.getElementById(heading.id);
                    if (el) {
                      const y = el.getBoundingClientRect().top + window.scrollY - 70;
                      window.scrollTo({ top: y, behavior: 'smooth' });
                    }
                  }}
                  className={clsx(
                    "block px-3 py-2.5 rounded-lg text-sm font-medium transition-colors leading-snug line-clamp-2",
                    activeId === heading.id 
                      ? "bg-foreground/10 text-foreground font-semibold border-l-2 border-foreground pl-2.5" 
                      : "text-muted hover:bg-foreground/5 hover:text-foreground"
                  )}
                >
                  {heading.text}
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
