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
    default: "Tharun Gajula",
    template: "%s | Tharun Gajula",
  },
  description: "Ask about Tharun’s verified work or get in touch.",
  authors: [{ name: 'Tharun Gajula', url: 'https://tharungajula.vercel.app' }],
  openGraph: {
    title: "Tharun Gajula",
    description: "Ask about Tharun’s verified work or get in touch.",
    url: 'https://tharungajula.vercel.app',
    siteName: 'Tharun Gajula',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: "Tharun Gajula",
    description: "Ask about Tharun’s verified work or get in touch.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              "name": "Tharun Gajula",
              "url": "https://tharungajula.vercel.app",
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
          "font-sans text-ink bg-surface antialiased selection:bg-accent-dim selection:text-ink"
        )}
      >
        <div className="fixed inset-0 -z-10 bg-surface">
          {/* Subtle Clean Grid Pattern */}
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
