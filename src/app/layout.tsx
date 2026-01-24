import type { Metadata } from "next";
import { Inter, Fira_Code } from "next/font/google";
import { ScrollRestoration } from "./scroll-restoration";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const firaCode = Fira_Code({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Linux Configs | Curated Dotfiles for Arch Linux",
  description:
    "Minimal, modern configuration files for Fish shell, Ghostty terminal, Starship prompt, and GNOME desktop. Optimized for productivity and aesthetics.",
  keywords: [
    "dotfiles",
    "linux",
    "arch linux",
    "fish shell",
    "ghostty",
    "starship",
    "gnome",
    "configuration",
  ],
  authors: [{ name: "Masum", url: "https://github.com/insaneodyssey26" }],
  openGraph: {
    title: "Linux Configs | Curated Dotfiles for Arch Linux",
    description:
      "Minimal, modern configuration files for a productive Linux workflow.",
    type: "website",
    url: "https://linux-configs.vercel.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "Linux Configs | Curated Dotfiles",
    description: "Minimal, modern configuration files for a productive Linux workflow.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body
        className={`${inter.variable} ${firaCode.variable} font-sans antialiased`}
      >
        <ScrollRestoration />
        {children}
      </body>
    </html>
  );
}
