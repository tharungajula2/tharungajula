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
    default: "Tharun Gajula — Analytics, Product & Agentic AI",
    template: "%s | Tharun Gajula",
  },
  description: "I build decision systems end to end — the model, the guardrails, and the product around them. Work spanning credit risk, healthcare triage, and fraud.",
  keywords: [
    "product management",
    "agentic AI",
    "applied machine learning",
    "decision systems",
    "healthcare AI",
    "credit risk",
    "analytics"
  ],
  authors: [{ name: 'Tharun Gajula', url: 'https://tharungajula.vercel.app' }],
  openGraph: {
    title: "Tharun Gajula — Analytics, Product & Agentic AI",
    description: "I build decision systems end to end — the model, the guardrails, and the product around them. Work spanning credit risk, healthcare triage, and fraud.",
    url: 'https://tharungajula.vercel.app',
    siteName: 'Tharun Gajula',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tharun Gajula — Analytics, Product & Agentic AI",
    description: "I build decision systems end to end — the model, the guardrails, and the product around them. Work spanning credit risk, healthcare triage, and fraud.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Tharun Gajula",
              "url": "https://tharungajula.vercel.app",
              "jobTitle": "Product Manager, AI & Analytics",
              "knowsAbout": [
                "Product Management",
                "Agentic AI",
                "Applied Machine Learning",
                "Healthcare AI",
                "Credit Risk Modelling",
                "Analytics"
              ],
              "sameAs": [
                "https://github.com/tharungajula2",
                "https://www.linkedin.com/in/tharungajula"
              ]
            }),
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

