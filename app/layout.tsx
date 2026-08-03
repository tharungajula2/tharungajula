import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { LayoutProvider } from "./LayoutContext";
import ClientLayout from "./ClientLayout";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const sourceSerif = Source_Serif_4({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://tharungajula.vercel.app'),
  title: {
    default: "Tharun Gajula | Retail Credit Risk & Analytics",
    template: "%s | Tharun Gajula",
  },
  description: "Retail credit risk modelling, PD scorecards, ECL staging and portfolio analytics, with the systems built end to end.",
  keywords: ["Tharun Gajula", "Credit Risk", "Retail Credit Risk", "PD Scorecard", "IFRS 9", "ECL", "Basel III", "Credit Risk Analytics", "Bengaluru"],
  authors: [{ name: 'Tharun Kumar Gajula', url: 'https://tharungajula.vercel.app' }],
  openGraph: {
    title: "Tharun Gajula | Retail Credit Risk & Analytics",
    description: "Retail credit risk modelling, PD scorecards, ECL staging and portfolio analytics, with the systems built end to end.",
    url: 'https://tharungajula.vercel.app',
    siteName: 'Tharun Gajula',
    locale: 'en_US',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='light'){document.documentElement.classList.add('light');document.documentElement.classList.remove('dark');}else{document.documentElement.classList.add('dark');document.documentElement.classList.remove('light');}}catch(e){}})()`,
          }}
        />
      </head>
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          jetbrainsMono.variable,
          sourceSerif.variable,
          "font-sans text-ink-muted antialiased"
        )}
      >
        <div className="fixed inset-0 -z-10 bg-surface">
          {/* Ambient Glowing Orbs for Glassmorphism Refraction */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-accent-glow blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-accent-glow blur-[120px] pointer-events-none" />
          
          {/* The Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--color-grid)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-grid)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        </div>
        
        <LayoutProvider>
          <Suspense fallback={null}>
            <ClientLayout>{children}</ClientLayout>
          </Suspense>
        </LayoutProvider>
      </body>
    </html>
  );
}

