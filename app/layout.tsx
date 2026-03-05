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
    default: "Tharun OS | Product & Risk Architect",
    template: "%s | Tharun OS",
  },
  description: "A premium portfolio OS for Data Science, Risk Management, and applied AI.",
  keywords: ["Risk Management", "Product Strategy", "Data Science", "AI", "Bangalore", "Tharun OS", "Credit Scoring"],
  authors: [{ name: 'Tharun Kumar Gajula', url: 'https://th-lab.vercel.app' }],
  openGraph: {
    title: "Tharun OS | AI-Native Systems Architect",
    description: "A premium consultancy and personal OS front.",
    url: 'https://th-lab.vercel.app',
    siteName: 'Tharun OS',
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
          "font-body bg-slate-950 text-slate-300 antialiased"
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
