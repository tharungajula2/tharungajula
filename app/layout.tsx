import type { Metadata } from "next";
import { Inter, Outfit, JetBrains_Mono } from "next/font/google"; // Import only requested fonts
import "./globals.css";
import { cn } from "@/lib/utils";
import { Footer } from "@/components/layout/footer";

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
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL('https://th-lab.vercel.app'),
  title: {
    default: "Tharun Learning Lab | Learning Systems Builder",
    template: "%s | Tharun Learning Lab",
  },
  description: "A public lab for experiments in learning systems, AI-native workflows, curriculum design, and modern knowledge building.",
  keywords: ["Tharun Learning Lab", "AI Workflows", "Learning Systems", "Cognitive Architecture", "Systems Thinking", "Bangalore"],
  authors: [{ name: 'Tharun Kumar Gajula', url: 'https://th-lab.vercel.app' }],
  openGraph: {
    title: "Tharun Learning Lab",
    description: "Building Better Ways to Learn, Think, and Build.",
    url: 'https://th-lab.vercel.app',
    siteName: 'Tharun Learning Lab',
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
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.8/dist/katex.min.css" />
      </head>
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          jetbrainsMono.variable,
          "font-body text-slate-300 antialiased"
        )}
      >
        <div className="fixed inset-0 z-[-1] bg-slate-950">
          {/* Ambient Glowing Orbs for Glassmorphism Refraction */}
          <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-cyan-600/20 blur-[120px] pointer-events-none" />
          
          {/* The Grid Overlay */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />
        </div>
        
        {children}
        <Footer />
      </body>
    </html>
  );
}
