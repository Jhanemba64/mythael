import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-heading",
});

export const metadata: Metadata = {
  title: "Mythael — Fantasy Creations of Distinction",
  description:
    "Figurines, fantasy jewelry, and tabletop accessories inspired by fantastical worlds. Each piece tells a story.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="min-h-screen bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
