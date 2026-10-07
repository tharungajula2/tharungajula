'use client';

import React, { useState, useEffect, useRef, useCallback, useMemo } from 'react';

interface DiagramFrameProps {
  svgContent?: string;
  svgProps?: React.ComponentPropsWithoutRef<'svg'>;
  className?: string;
}

function parseSvgMetrics(svgString?: string, svgProps?: React.ComponentPropsWithoutRef<'svg'>) {
  let viewBoxWidth = 0;
  let viewBoxHeight = 0;
  let smallestFontSize = 16;

  if (svgProps) {
    if (svgProps.viewBox) {
      const parts = String(svgProps.viewBox).trim().split(/[\s,]+/);
      if (parts.length >= 4) {
        const vbW = parseFloat(parts[2]);
        const vbH = parseFloat(parts[3]);
        if (!isNaN(vbW) && vbW > 0) viewBoxWidth = vbW;
        if (!isNaN(vbH) && vbH > 0) viewBoxHeight = vbH;
      }
    }
    if (viewBoxWidth === 0 && svgProps.width) {
      const w = parseFloat(String(svgProps.width));
      if (!isNaN(w) && w > 0) viewBoxWidth = w;
    }
    if (viewBoxHeight === 0 && svgProps.height) {
      const h = parseFloat(String(svgProps.height));
      if (!isNaN(h) && h > 0) viewBoxHeight = h;
    }
  }

  if (svgString) {
    const viewBoxMatch = svgString.match(/viewBox=["']\s*([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s+([\d.-]+)\s*["']/i);
    if (viewBoxMatch) {
      const vbW = parseFloat(viewBoxMatch[3]);
      const vbH = parseFloat(viewBoxMatch[4]);
      if (!isNaN(vbW) && vbW > 0) viewBoxWidth = vbW;
      if (!isNaN(vbH) && vbH > 0) viewBoxHeight = vbH;
    }

    if (viewBoxWidth === 0) {
      const wMatch = svgString.match(/\bwidth=["']([\d.-]+)(?:px)?["']/i);
      if (wMatch) {
        const w = parseFloat(wMatch[1]);
        if (!isNaN(w) && w > 0) viewBoxWidth = w;
      }
    }

    if (viewBoxHeight === 0) {
      const hMatch = svgString.match(/\bheight=["']([\d.-]+)(?:px)?["']/i);
      if (hMatch) {
        const h = parseFloat(hMatch[1]);
        if (!isNaN(h) && h > 0) viewBoxHeight = h;
      }
    }

    const fontSizes: number[] = [];
    const fontSizeAttrMatches = svgString.matchAll(/\bfont-size=["']\s*([\d.]+)(?:px)?\s*["']/gi);
    for (const match of fontSizeAttrMatches) {
      const val = parseFloat(match[1]);
      if (!isNaN(val) && val > 0) fontSizes.push(val);
    }

    const styleFontSizeMatches = svgString.matchAll(/\bfont-size\s*:\s*([\d.]+)(?:px)?/gi);
    for (const match of styleFontSizeMatches) {
      const val = parseFloat(match[1]);
      if (!isNaN(val) && val > 0) fontSizes.push(val);
    }

    if (fontSizes.length > 0) {
      smallestFontSize = Math.min(...fontSizes);
    }
  }

  return {
    viewBoxWidth: viewBoxWidth || 600,
    viewBoxHeight: viewBoxHeight || 400,
    smallestFontSize: Math.max(smallestFontSize, 6),
  };
}

export function DiagramFrame({ svgContent, svgProps, className = '' }: DiagramFrameProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const surfaceRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);

  const [availableWidth, setAvailableWidth] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  // Expanded View Zoom & Pan State
  const [scale, setScale] = useState<number>(1);
  const [tx, setTx] = useState<number>(0);
  const [ty, setTy] = useState<number>(0);

  const { viewBoxWidth, viewBoxHeight, smallestFontSize } = useMemo(
    () => parseSvgMetrics(svgContent, svgProps),
    [svgContent, svgProps]
  );

  // ResizeObserver to track container available width
  useEffect(() => {
    if (!frameRef.current) return;
    const el = frameRef.current;
    const updateWidth = () => {
      if (el) {
        setAvailableWidth(el.clientWidth);
      }
    };

    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Compute inline scale s = min(1, max(fit, floor))
  const availW = availableWidth > 0 ? availableWidth : 600;
  const fit = availW / viewBoxWidth;
  const floor = 11 / smallestFontSize;
  const s = Math.min(1, Math.max(fit, floor));
  const diagramWidthPx = Math.round(viewBoxWidth * s);
  const isOverflowing = diagramWidthPx > availW + 1;

  // Clean SVG string for inline rendering
  const processedSvg = useMemo(() => {
    if (!svgContent) return '';
    return svgContent.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
      let newAttrs = attrs;
      newAttrs = newAttrs.replace(/\s+(width|height)=["'][^"']*["']/gi, '');
      newAttrs = newAttrs.replace(/\s+style=["'][^"']*["']/gi, '');
      newAttrs = newAttrs.replace(/\s+data-diagram-inner=["'][^"']*["']/gi, '');

      const styleStr = `width: ${diagramWidthPx}px; max-width: none; height: auto !important; display: block; margin: 0;`;
      return `<svg data-diagram-inner="true" width="${diagramWidthPx}" style="${styleStr}"${newAttrs}>`;
    });
  }, [svgContent, diagramWidthPx]);

  // Clean SVG string for full screen modal
  const modalSvg = useMemo(() => {
    if (!svgContent) return '';
    return svgContent.replace(/<svg\b([^>]*)>/i, (match, attrs) => {
      let newAttrs = attrs;
      newAttrs = newAttrs.replace(/\s+(width|height)=["'][^"']*["']/gi, '');
      newAttrs = newAttrs.replace(/\s+style=["'][^"']*["']/gi, '');
      newAttrs = newAttrs.replace(/\s+data-diagram-inner=["'][^"']*["']/gi, '');

      const styleStr = `width: ${viewBoxWidth}px; max-width: none; height: auto !important; display: block; margin: 0;`;
      return `<svg data-diagram-inner="true" width="${viewBoxWidth}" style="${styleStr}"${newAttrs}>`;
    });
  }, [svgContent, viewBoxWidth]);

  // Clean props for React inline SVG element
  const cleanedSvgProps = useMemo(() => {
    if (!svgProps) return {};
    const copy = { ...svgProps };
    delete copy.style;
    delete copy.width;
    delete copy.height;
    delete copy.className;
    return copy;
  }, [svgProps]);

  // Calculate Fit Transform for Expanded View
  const getFitTransform = useCallback(() => {
    const vw = typeof window !== 'undefined' ? window.innerWidth : 1000;
    const vh = typeof window !== 'undefined' ? window.innerHeight : 800;
    const padX = 32;
    const padY = 80;
    const availX = Math.max(vw - padX, 200);
    const availY = Math.max(vh - padY, 200);

    const fitScale = Math.min(availX / viewBoxWidth, availY / viewBoxHeight);
    const fitTx = (vw - viewBoxWidth * fitScale) / 2;
    const fitTy = (vh - 48 - viewBoxHeight * fitScale) / 2;
    return { fitScale, fitTx, fitTy };
  }, [viewBoxWidth, viewBoxHeight]);

  const fitDiagram = useCallback(() => {
    const { fitScale, fitTx, fitTy } = getFitTransform();
    setScale(fitScale);
    setTx(fitTx);
    setTy(fitTy);
  }, [getFitTransform]);

  const handleOpenModal = () => {
    if (typeof window !== 'undefined') {
      scrollYRef.current = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollYRef.current}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    }
    setIsExpanded(true);

    requestAnimationFrame(() => {
      fitDiagram();
    });
  };

  const handleCloseModal = useCallback(() => {
    setIsExpanded(false);
    if (typeof window !== 'undefined') {
      const scrollY = Math.abs(parseInt(document.body.style.top || '0', 10)) || scrollYRef.current;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      window.scrollTo(0, scrollY);
    }
  }, []);

  // Focal Point Zoom Helper
  const zoomAtPoint = useCallback(
    (factor: number, cx: number, cy: number) => {
      const { fitScale } = getFitTransform();
      const minS = 0.5 * fitScale;
      const maxS = 8 * fitScale;

      setScale((prevScale) => {
        const nextScale = Math.min(maxS, Math.max(minS, prevScale * factor));
        const actualFactor = nextScale / prevScale;
        setTx((prevTx) => cx - (cx - prevTx) * actualFactor);
        setTy((prevTy) => cy - (cy - prevTy) * actualFactor);
        return nextScale;
      });
    },
    [getFitTransform]
  );

  // Desktop Mouse Wheel & Trackpad Pinch Handler ({ passive: false })
  useEffect(() => {
    if (!isExpanded || !surfaceRef.current) return;
    const surface = surfaceRef.current;

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const rect = surface.getBoundingClientRect();
      const cx = e.clientX - rect.left;
      const cy = e.clientY - rect.top;

      let factor = 1;
      if (e.ctrlKey) {
        factor = Math.exp(-e.deltaY * 0.01);
      } else {
        factor = e.deltaY < 0 ? 1.15 : 1 / 1.15;
      }

      zoomAtPoint(factor, cx, cy);
    };

    surface.addEventListener('wheel', handleWheel, { passive: false });
    return () => surface.removeEventListener('wheel', handleWheel);
  }, [isExpanded, zoomAtPoint]);

  // Safari iOS Gesture Event Preventer
  useEffect(() => {
    if (!isExpanded || !surfaceRef.current) return;
    const surface = surfaceRef.current;

    const preventDefault = (e: Event) => e.preventDefault();

    surface.addEventListener('gesturestart', preventDefault, { passive: false });
    surface.addEventListener('gesturechange', preventDefault, { passive: false });

    return () => {
      surface.removeEventListener('gesturestart', preventDefault);
      surface.removeEventListener('gesturechange', preventDefault);
    };
  }, [isExpanded]);

  // Keyboard Shortcuts
  useEffect(() => {
    if (!isExpanded) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        handleCloseModal();
      } else if (e.key === '+' || e.key === '=') {
        zoomAtPoint(1.25, window.innerWidth / 2, window.innerHeight / 2);
      } else if (e.key === '-' || e.key === '_') {
        zoomAtPoint(1 / 1.25, window.innerWidth / 2, window.innerHeight / 2);
      } else if (e.key === '0') {
        fitDiagram();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isExpanded, handleCloseModal, fitDiagram, zoomAtPoint]);

  // Pointer/Touch Panning & Pinching
  const pointersRef = useRef<Map<number, { x: number; y: number }>>(new Map());
  const initialPinchDistRef = useRef<number | null>(null);

  const handlePointerDown = (e: React.PointerEvent) => {
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 2) {
      const pts = Array.from(pointersRef.current.values());
      const dist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      initialPinchDistRef.current = dist;
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!pointersRef.current.has(e.pointerId)) return;
    const prevPos = pointersRef.current.get(e.pointerId)!;
    const dx = e.clientX - prevPos.x;
    const dy = e.clientY - prevPos.y;
    pointersRef.current.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (pointersRef.current.size === 1) {
      // 1-finger pan
      setTx((x) => x + dx);
      setTy((y) => y + dy);
    } else if (pointersRef.current.size === 2 && initialPinchDistRef.current) {
      // 2-finger pinch
      const pts = Array.from(pointersRef.current.values());
      const currentDist = Math.hypot(pts[0].x - pts[1].x, pts[0].y - pts[1].y);
      const factor = currentDist / initialPinchDistRef.current;
      const cx = (pts[0].x + pts[1].x) / 2;
      const cy = (pts[0].y + pts[1].y) / 2;
      zoomAtPoint(factor, cx, cy);
      initialPinchDistRef.current = currentDist;
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    pointersRef.current.delete(e.pointerId);
    if (pointersRef.current.size < 2) {
      initialPinchDistRef.current = null;
    }
  };

  const handleDoubleClick = (e: React.MouseEvent) => {
    const rect = surfaceRef.current?.getBoundingClientRect();
    const cx = rect ? e.clientX - rect.left : window.innerWidth / 2;
    const cy = rect ? e.clientY - rect.top : window.innerHeight / 2;

    const { fitScale } = getFitTransform();
    if (Math.abs(scale - fitScale) < 0.1) {
      zoomAtPoint(2 / fitScale, cx, cy);
    } else {
      fitDiagram();
    }
  };

  return (
    <>
      {/* Outer Bordered Frame */}
      <div ref={frameRef} className={`my-6 rounded-lg border border-border/60 bg-background p-4 ${className}`}>
        {/* Scrollable Container (Left-aligned when wide, Centered when narrow) */}
        <div
          ref={scrollContainerRef}
          className="w-full max-w-full overflow-x-auto overflow-y-hidden rounded-sm scrollbar-thin"
        >
          <div
            style={{
              display: 'block',
              width: `${diagramWidthPx}px`,
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            {svgProps ? (
              <svg
                data-diagram-inner="true"
                width={diagramWidthPx}
                style={{
                  width: `${diagramWidthPx}px`,
                  maxWidth: 'none',
                  height: 'auto',
                  display: 'block',
                  margin: '0',
                }}
                {...cleanedSvgProps}
              />
            ) : (
              <div dangerouslySetInnerHTML={{ __html: processedSvg }} />
            )}
          </div>
        </div>

        {/* Controls Bar Below Diagram */}
        <div className="mt-2.5 flex items-center justify-between text-xs text-muted font-sans pt-1 border-t border-border/30">
          <div>
            {isOverflowing && (
              <span className="inline-flex items-center gap-1 text-[11px] font-medium text-foreground/70 bg-foreground/5 px-2 py-0.5 rounded select-none">
                scroll &rarr;
              </span>
            )}
          </div>
          <button
            type="button"
            onClick={handleOpenModal}
            aria-label="Expand diagram"
            title="Expand diagram full screen"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-background hover:bg-foreground/5 border border-border/80 text-foreground/80 hover:text-foreground text-xs font-medium transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-foreground"
          >
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
            <span>Expand</span>
          </button>
        </div>
      </div>

      {/* Expanded View Full Screen Modal */}
      {isExpanded && (
        <div
          className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-sm flex flex-col justify-between select-none h-[100dvh] w-screen"
          style={{ paddingTop: 'env(safe-area-inset-top)', paddingBottom: 'env(safe-area-inset-bottom)' }}
          role="dialog"
          aria-modal="true"
          aria-label="Expanded diagram view"
        >
          {/* Header Controls Bar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-border/60 bg-background/90 z-20">
            <div className="text-xs font-sans font-medium text-foreground/70">
              Diagram Full Screen ({Math.round((scale / (getFitTransform().fitScale || 1)) * 100)}%)
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => zoomAtPoint(1.25, window.innerWidth / 2, window.innerHeight / 2)}
                title="Zoom In (+)"
                aria-label="Zoom in"
                className="p-1.5 rounded-md hover:bg-foreground/5 border border-border/80 text-foreground text-xs font-semibold px-2.5 transition-colors"
              >
                +
              </button>
              <button
                type="button"
                onClick={() => zoomAtPoint(1 / 1.25, window.innerWidth / 2, window.innerHeight / 2)}
                title="Zoom Out (-)"
                aria-label="Zoom out"
                className="p-1.5 rounded-md hover:bg-foreground/5 border border-border/80 text-foreground text-xs font-semibold px-2.5 transition-colors"
              >
                &minus;
              </button>
              <button
                type="button"
                onClick={fitDiagram}
                title="Fit diagram (0)"
                aria-label="Fit diagram"
                className="p-1.5 rounded-md hover:bg-foreground/5 border border-border/80 text-foreground text-xs font-medium px-2.5 transition-colors"
              >
                Fit
              </button>
              <button
                type="button"
                onClick={handleCloseModal}
                title="Close overlay (Esc)"
                aria-label="Close full screen view"
                className="p-1.5 rounded-md hover:bg-foreground/5 border border-border/80 text-foreground text-sm font-bold px-2.5 ml-2 transition-colors"
              >
                &times;
              </button>
            </div>
          </div>

          {/* Zoom & Pan Surface */}
          <div
            ref={surfaceRef}
            tabIndex={0}
            className="flex-1 w-full h-full overflow-hidden relative touch-none cursor-grab active:cursor-grabbing focus:outline-none"
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerCancel={handlePointerUp}
            onDoubleClick={handleDoubleClick}
          >
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                transform: `translate(${tx}px, ${ty}px) scale(${scale})`,
                transformOrigin: '0 0',
                willChange: 'transform',
                width: `${viewBoxWidth}px`,
                height: `${viewBoxHeight}px`,
              }}
              className="pointer-events-auto"
            >
              {svgProps ? (
                <svg
                  data-diagram-inner="true"
                  width={viewBoxWidth}
                  style={{
                    width: `${viewBoxWidth}px`,
                    maxWidth: 'none',
                    height: 'auto',
                    display: 'block',
                    margin: '0',
                  }}
                  {...cleanedSvgProps}
                />
              ) : (
                <div dangerouslySetInnerHTML={{ __html: modalSvg }} />
              )}
            </div>
          </div>

          {/* Footer instruction */}
          <div className="text-center py-2 text-[11px] font-sans text-muted border-t border-border/40 bg-background/80">
            Pinch or scroll to zoom &middot; Drag to pan &middot; Double-click to toggle &middot; Esc to close
          </div>
        </div>
      )}
    </>
  );
}
