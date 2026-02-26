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
    default: "Tharun Learning Lab | Systems. Biology. Code.",
    template: "%s | Tharun Learning Lab",
  },
  description: "Building the Operating Systems for Biology (Biology OS), Family Health (Protocol Family), and Cognitive Performance (Protocol Cognition). A Research Lab by Tharun Kumar Gajula.",
  keywords: ["Systems Biology", "Family Health OS", "Cognitive OS", "Bangalore", "Biology OS", "Tharun Learning Lab", "Indian Healthcare"],
  authors: [{ name: 'Tharun Kumar Gajula', url: 'https://th-lab.vercel.app' }],
  openGraph: {
    title: "Tharun Learning Lab | Systems. Biology. Code.",
    description: "Building the Operating Systems for Biology (Biology OS), Family Health (Protocol Family), and Cognitive Performance (Protocol Cognition). A Research Lab by Tharun Kumar Gajula.",
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
