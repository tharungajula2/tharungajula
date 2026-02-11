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
    default: "Tharun Health Lab",
    template: "%s | Tharun Health Lab",
  },
  description: "Engineering High-Performance Operating Systems for Biology (Protocol N=1), Family Health (Yukti), and Cognition (Mind). A Research Lab by Tharun Kumar Gajula.",
  keywords: ["Systems Biology", "Family Health OS", "Bio-optimization", "Indian Healthcare", "Next.js Engineer", "Bangalore", "Protocol N=1", "Yukti OS"],
  authors: [{ name: 'Tharun Kumar Gajula', url: 'https://th-lab.vercel.app' }],
  openGraph: {
    title: "Tharun Health Lab",
    description: "Engineering High-Performance Operating Systems for Biology, Family Health, and Cognition.",
    url: 'https://th-lab.vercel.app',
    siteName: 'Tharun Health Lab',
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
      <body
        className={cn(
          inter.variable,
          outfit.variable,
          jetbrainsMono.variable,
          "font-body bg-background text-white antialiased"
        )}
      >
        {children}
        <Footer />
      </body>
    </html>
  );
}
