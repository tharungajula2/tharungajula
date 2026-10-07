import type { Metadata, Viewport } from "next";
import { Inter, Outfit, JetBrains_Mono, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
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

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
};

export const metadata: Metadata = {
  metadataBase: new URL('https://tharungajula.vercel.app'),
  title: {
    default: "Tharun Gajula",
    template: "%s - Tharun Gajula",
  },
  description: "Notes, builds and a newsletter — learning out loud, making in public.",
  authors: [{ name: 'Tharun Gajula', url: 'https://tharungajula.vercel.app' }],
  icons: {
    icon: [
      { url: '/favicon-16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-48.png', sizes: '48x48', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/manifest.json',
  openGraph: {
    title: "Tharun Gajula",
    description: "Notes, builds and a newsletter — learning out loud, making in public.",
    url: 'https://tharungajula.vercel.app',
    siteName: 'Tharun Gajula',
    locale: 'en_US',
    type: 'website',
    images: [{ url: '/og-image.png', width: 1200, height: 630, alt: 'Tharun Gajula' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: "Tharun Gajula",
    description: "Notes, builds and a newsletter — learning out loud, making in public.",
    images: ['/og-image.png'],
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
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          jetbrainsMono.variable,
          sourceSerif.variable,
          "font-sans text-[#0F172A] bg-[#FAFAF9] antialiased selection:bg-[#93C5FD] selection:text-[#0F172A]"
        )}
      >
        <Suspense fallback={null}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
