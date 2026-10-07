import type { Viewport } from 'next';
import { Literata } from 'next/font/google';

const literata = Literata({
  variable: '--font-literata',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#FFFFFF',
  colorScheme: 'light',
};

export default function NotesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${literata.variable} min-h-full flex flex-col min-w-0 bg-background text-foreground`}
      style={{ '--background': '#FCFCFC', '--foreground': '#111111' } as React.CSSProperties}
    >
      {/* PWA Splash screen – appears only on first paint, fades out */}
      <div
        id="pwa-splash"
        className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#FFFFFF] text-[#111111] pointer-events-none select-none"
        aria-hidden="true"
      >
        <svg viewBox="0 0 108 88" aria-hidden="true" className="h-9 w-auto text-[#111111]">
          <path
            d="M4 84 L104 84 L104 4 L24 4 L24 64 L84 64 L84 24 L44 24 L44 44"
            fill="none"
            stroke="currentColor"
            strokeWidth="8"
            strokeLinecap="butt"
            strokeLinejoin="miter"
            className="animate-draw-spiral"
          />
          <circle cx="64" cy="44" r="9" fill="currentColor" className="animate-fade-in-circle" />
        </svg>
        <div className="text-xl font-sans font-light tracking-wide text-[#111111] mt-3">
          Tharun Gajula
        </div>
        <div className="text-[11px] font-sans text-[#666666] tracking-widest uppercase mt-1 font-medium">
          Notes
        </div>
      </div>
      {children}
    </div>
  );
}
