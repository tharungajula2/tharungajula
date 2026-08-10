'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { Smartphone } from 'lucide-react';

interface SlideSection {
  title: string;
  slug: string;
  slideIndex?: number;
}

interface SlideDeckViewerProps {
  title: string;
  subtitle?: string;
  slug: string;
  deckHtmlPath: string;
  slideCount: number;
  sections: SlideSection[];
}

export default function SlideDeckViewer({
  title,
  subtitle,
  slug,
  deckHtmlPath,
  slideCount,
  sections,
}: SlideDeckViewerProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showToc, setShowToc] = useState(false);
  const [currentSlideIndex, setCurrentSlideIndex] = useState(1);
  const [isRecallActive, setIsRecallActive] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Touch Swipe Gesture State
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  // Synchronize presenting mode & no-rail attribute inside iframe
  const setDeckPresentingMode = (presenting: boolean) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const win = iframeRef.current.contentWindow;
        win.postMessage({ __omelette_presenting: presenting }, '*');
        const doc = iframeRef.current.contentDocument;
        if (doc) {
          const stage = doc.querySelector('deck-stage') as any;
          if (stage) {
            if (presenting) {
              stage.setAttribute('no-rail', '');
            } else {
              stage.removeAttribute('no-rail');
            }
            if (typeof stage._fit === 'function') {
              stage._fit();
            }
          }
        }
      } catch (err) {
        // Ignore cross-origin errors if any
      }
    }
  };

  // Toggle Fullscreen mode
  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current
        .requestFullscreen()
        .then(() => {
          setIsFullscreen(true);
          setTimeout(() => {
            setDeckPresentingMode(true);
            triggerIframeFit();
          }, 100);
        })
        .catch((err) => {
          console.error('Fullscreen request failed:', err);
        });
    } else {
      document
        .exitFullscreen()
        .then(() => {
          setIsFullscreen(false);
          setTimeout(() => {
            setDeckPresentingMode(false);
            triggerIframeFit();
          }, 100);
        })
        .catch((err) => {
          console.error('Exit fullscreen failed:', err);
        });
    }
  };

  useEffect(() => {
    const handleFsChange = () => {
      const fsActive = !!document.fullscreenElement;
      setIsFullscreen(fsActive);
      setDeckPresentingMode(fsActive);
      setTimeout(triggerIframeFit, 100);
    };
    document.addEventListener('fullscreenchange', handleFsChange);
    return () => document.removeEventListener('fullscreenchange', handleFsChange);
  }, []);

  const triggerIframeFit = () => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        const win = iframeRef.current.contentWindow;
        win.dispatchEvent(new Event('resize'));
        const doc = iframeRef.current.contentDocument;
        if (doc) {
          const stage = doc.querySelector('deck-stage') as any;
          if (stage && typeof stage._fit === 'function') {
            stage._fit();
          }
        }
      } catch (err) {
        // Ignore cross-origin error if any
      }
    }
  };

  // Sync iframe events & check initial URL hash
  const handleIframeLoad = () => {
    setIsLoading(false);
    triggerIframeFit();
    setDeckPresentingMode(isFullscreen);

    setTimeout(triggerIframeFit, 100);
    setTimeout(triggerIframeFit, 300);
    setTimeout(triggerIframeFit, 600);

    if (!iframeRef.current || !iframeRef.current.contentDocument) return;

    const doc = iframeRef.current.contentDocument;

    // Listen for slidechange custom events from <deck-stage>
    doc.addEventListener('slidechange', (e: any) => {
      if (e.detail && typeof e.detail.index === 'number') {
        setCurrentSlideIndex(e.detail.index + 1);
      }
    });

    // Handle direct URL slide jump hash (e.g. #10 or #slide-10)
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashNum = parseInt(window.location.hash.replace(/[^0-9]/g, ''), 10);
      if (hashNum && hashNum > 0 && hashNum <= slideCount) {
        setTimeout(() => jumpToSlide(hashNum), 200);
      }
    }

    iframeRef.current.focus();
  };

  // Global Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement)?.tagName)) return;

      if (e.key === 'f' || e.key === 'F') {
        e.preventDefault();
        toggleFullscreen();
      } else if (e.key === 'r' || e.key === 'R') {
        e.preventDefault();
        toggleRecallMode();
      } else if (e.key === 't' || e.key === 'T') {
        e.preventDefault();
        setShowToc((prev) => !prev);
      } else if (e.key === 'Escape') {
        setShowToc(false);
      } else if (e.key === 'ArrowRight' || e.key === ' ') {
        sendIframeKey('ArrowRight');
      } else if (e.key === 'ArrowLeft') {
        sendIframeKey('ArrowLeft');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const sendIframeKey = (key: string) => {
    if (iframeRef.current && iframeRef.current.contentWindow) {
      try {
        iframeRef.current.contentWindow.dispatchEvent(
          new KeyboardEvent('keydown', { key, bubbles: true })
        );
      } catch (err) {
        iframeRef.current.focus();
      }
    }
  };

  // Touch Swipe Handlers for Mobile / Tablet
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    const diffY = touchStartY.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        sendIframeKey('ArrowRight');
      } else {
        sendIframeKey('ArrowLeft');
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  };

  // Toggle Recall Mode inside HTML deck
  const toggleRecallMode = () => {
    const nextState = !isRecallActive;
    setIsRecallActive(nextState);
    if (iframeRef.current && iframeRef.current.contentDocument) {
      const doc = iframeRef.current.contentDocument;
      const dcElement = doc.querySelector('x-dc') as any;
      if (dcElement) {
        dcElement.recallMode = nextState;
      }
      if (nextState) {
        doc.documentElement.setAttribute('data-recall-mode', 'true');
        doc.body.classList.add('recall-mode-active');
      } else {
        doc.documentElement.removeAttribute('data-recall-mode');
        doc.body.classList.remove('recall-mode-active');
      }
    }
  };

  // Jump directly to specific slide index
  const jumpToSlide = (targetIndex: number) => {
    setCurrentSlideIndex(targetIndex);
    setShowToc(false);

    if (iframeRef.current && iframeRef.current.contentDocument) {
      const doc = iframeRef.current.contentDocument;
      const stage = doc.querySelector('deck-stage') as any;

      if (stage && typeof stage._go === 'function') {
        stage._go(targetIndex - 1, 'api');
      } else if (stage && typeof stage.goToSlide === 'function') {
        stage.goToSlide(targetIndex - 1);
      } else {
        const slideSections = doc.querySelectorAll('section');
        if (slideSections && slideSections[targetIndex - 1]) {
          slideSections[targetIndex - 1].scrollIntoView({ behavior: 'smooth' });
        }
      }

      if (typeof window !== 'undefined') {
        window.history.replaceState(null, '', `#${targetIndex}`);
      }

      iframeRef.current.focus();
    }
  };

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className={`w-full flex flex-col bg-[#07090b] text-[#f8fafc] font-sans transition-all duration-300 ${
        isFullscreen
          ? 'h-screen w-screen p-0 fixed inset-0 z-50 overflow-hidden'
          : 'rounded-2xl border border-hairline shadow-2xl overflow-hidden my-4'
      }`}
    >
      {/* ─── RESPONSIVE HEADER CONTROL BAR ─── */}
      <div
        className={`font-mono text-[#f8fafc] transition-all duration-200 ${
          isFullscreen
            ? 'absolute top-0 left-0 right-0 z-40 bg-[#0d1014]/90 backdrop-blur-md border-b border-[#1e293b]/80 shadow-xl'
            : 'bg-[#0d1014] border-b border-[#1e293b] z-20'
        }`}
      >
        {/* Primary Header Row */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 px-3 sm:px-4 py-2 sm:py-2.5">
          {/* Info Badges & Title */}
          <div className="flex items-center justify-between sm:justify-start gap-2 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <Link
                href="/notebook"
                className="px-2 py-1 rounded bg-[#0284c7]/20 border border-[#0284c7]/50 text-[#38bdf8] font-bold uppercase tracking-wider hover:bg-[#0284c7]/30 transition-all text-[10px] sm:text-xs shrink-0"
              >
                ← NOTEBOOK
              </Link>
              <span className="hidden sm:inline-block text-[#64748b]">|</span>
              <span className="font-bold text-[#f8fafc] truncate max-w-[150px] sm:max-w-[320px] uppercase text-[11px] sm:text-xs">
                {title}
              </span>
            </div>

            <span className="px-2 py-0.5 rounded border border-[#334155] bg-[#0f172a] text-[#38bdf8] font-bold uppercase text-[10px] sm:text-xs shrink-0">
              {currentSlideIndex} / {slideCount}
            </span>
          </div>

          {/* Action Toolbar Buttons */}
          <div className="grid grid-cols-3 sm:flex items-center gap-1.5 sm:gap-2 pt-1 sm:pt-0 border-t border-[#1e293b] sm:border-t-0">
            {/* Index Drawer Button */}
            <button
              onClick={() => setShowToc((prev) => !prev)}
              className={`px-2.5 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 text-[11px] sm:text-xs ${
                showToc
                  ? 'bg-[#0284c7] text-white border-[#0284c7] shadow-lg shadow-[#0284c7]/30'
                  : 'bg-[#1e293b] border-[#334155] text-[#f8fafc] hover:border-[#38bdf8] hover:text-[#38bdf8]'
              }`}
              title="Toggle Slide Index (Key: T)"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <span>INDEX</span>
            </button>

            {/* Recall Mode Button */}
            <button
              onClick={toggleRecallMode}
              className={`px-2.5 py-1.5 rounded-lg border font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-1 text-[11px] sm:text-xs ${
                isRecallActive
                  ? 'bg-[#b48ae8] text-[#07090b] border-[#b48ae8] shadow-lg shadow-[#b48ae8]/30 font-extrabold'
                  : 'bg-[#1e293b] border-[#334155] text-[#cbd5e1] hover:text-white hover:border-[#b48ae8]'
              }`}
              title="Toggle Flashcard Active Recall Masks (Key: R)"
            >
              <span>RECALL</span>
            </button>

            {/* Fullscreen / Presentation Button */}
            <button
              onClick={toggleFullscreen}
              className="px-2.5 py-1.5 rounded-lg bg-[#0284c7] border border-[#38bdf8] text-white font-extrabold uppercase tracking-wider hover:bg-[#0369a1] transition-all flex items-center justify-center gap-1 text-[11px] sm:text-xs shadow-md shadow-[#0284c7]/30"
              title="Fullscreen Distraction-Free Presentation Mode (Key: F)"
            >
              <svg className="w-3.5 h-3.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isFullscreen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 9L4 4m0 0l5 0m-5 0l0 5m11 5l5 5m0 0l-5 0m5 0l0-5" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                )}
              </svg>
              <span>{isFullscreen ? 'EXIT' : 'PRESENT'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ─── COMPACT MOBILE TIP BANNER ─── */}
      {!isFullscreen && (
        <div className="sm:hidden px-3 py-1 bg-[#0284c7]/15 border-b border-[#0284c7]/30 text-[10px] font-mono text-[#38bdf8] flex items-center justify-between">
          <span className="flex items-center gap-1">
            <Smartphone className="w-3 h-3 text-[#38bdf8] shrink-0" />
            <span>Swipe left/right or tap PRESENT for Fullscreen</span>
          </span>
          <button onClick={toggleFullscreen} className="underline font-bold ml-1 shrink-0">
            Expand ↗
          </button>
        </div>
      )}

      {/* ─── SLIDE STAGE & INDEX DRAWER ─── */}
      <div
        className={`relative w-full flex-1 bg-[#07090b] overflow-hidden ${
          isFullscreen
            ? 'h-screen w-screen'
            : 'w-full aspect-[3/2] max-h-[80vh] min-h-[320px]'
        }`}
      >
        {/* Table of Contents Overlay Backdrop */}
        {showToc && (
          <div
            onClick={() => setShowToc(false)}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm z-30 transition-opacity animate-in fade-in duration-150"
          />
        )}

        {/* High-Contrast Table of Contents Drawer */}
        {showToc && (
          <div className="absolute top-0 left-0 bottom-0 w-72 sm:w-96 bg-[#0f172a] text-[#f8fafc] border-r border-[#334155] z-40 flex flex-col p-3.5 sm:p-4 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-[#334155] mb-3 font-mono text-xs">
              <span className="font-bold text-[#38bdf8] tracking-widest uppercase">// SLIDE INDEX ({sections.length})</span>
              <button
                onClick={() => setShowToc(false)}
                className="text-[#94a3b8] hover:text-white font-bold px-2 py-0.5 rounded border border-[#334155] bg-[#1e293b]"
              >
                ✕ CLOSE
              </button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-1 pr-1 font-mono text-xs">
              {sections.map((sec, idx) => {
                const sIdx = sec.slideIndex || idx + 1;
                const isActive = currentSlideIndex === sIdx;
                return (
                  <button
                    key={idx}
                    onClick={() => jumpToSlide(sIdx)}
                    className={`w-full text-left p-2.5 rounded-lg border transition-all flex items-center justify-between group ${
                      isActive
                        ? 'bg-[#0284c7]/20 border-[#0284c7] text-[#38bdf8] font-bold'
                        : 'border-transparent hover:border-[#334155] hover:bg-[#1e293b] text-[#cbd5e1] hover:text-white'
                    }`}
                  >
                    <span className="truncate pr-2 font-medium">
                      {sec.title}
                    </span>
                    <span className={`text-[10px] shrink-0 font-bold ${isActive ? 'text-[#38bdf8]' : 'text-[#64748b]'}`}>
                      #{String(sIdx).padStart(2, '0')}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 bg-[#07090b] z-10 flex flex-col items-center justify-center gap-3">
            <div className="w-8 h-8 border-2 border-[#38bdf8] border-t-transparent rounded-full animate-spin"></div>
            <span className="font-mono text-xs tracking-widest text-[#94a3b8] uppercase">Loading Slide Deck...</span>
          </div>
        )}

        {/* Embedded Presentation Frame */}
        <iframe
          ref={iframeRef}
          src={deckHtmlPath}
          onLoad={handleIframeLoad}
          className="w-full h-full border-none block"
          style={{ width: '100%', height: '100%', border: '0', display: 'block' }}
          title={title}
          allow="fullscreen"
        />
      </div>

      {/* ─── FOOTER BAR ─── */}
      {!isFullscreen && (
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 bg-[#090b0e] border-t border-[#1e293b] text-[10px] sm:text-[11px] font-mono text-[#94a3b8]">
          <div className="flex items-center gap-3">
            <span>SHORTCUTS: <strong className="text-[#f8fafc]">← / →</strong> Nav</span>
            <span className="hidden md:inline">• <strong className="text-[#f8fafc]">F</strong> Fullscreen</span>
            <span className="hidden md:inline">• <strong className="text-[#f8fafc]">R</strong> Recall</span>
            <span className="hidden md:inline">• <strong className="text-[#f8fafc]">T</strong> Index</span>
          </div>
          <div>
            <span>AUTHORED BY THARUN GAJULA</span>
          </div>
        </div>
      )}
    </div>
  );
}
