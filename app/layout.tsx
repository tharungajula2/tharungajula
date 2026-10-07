import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Literata } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";
import { Suspense } from "react";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
  display: "swap",
});

const literata = Literata({
  subsets: ["latin"],
  variable: "--font-literata",
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#FCFCFC",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
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
        className={`${inter.variable} ${jetbrainsMono.variable} ${literata.variable} font-sans text-foreground bg-background antialiased selection:bg-foreground selection:text-background`}
      >
        <Suspense fallback={null}>
          <ClientLayout>{children}</ClientLayout>
        </Suspense>
      </body>
    </html>
  );
}
