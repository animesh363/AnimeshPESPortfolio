import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Animesh Anand | Full-Stack Developer & Creative Technologist",
  description: "Portfolio of Animesh Anand — Full-Stack Developer, UI/UX Designer, and Creative Technologist. Crafting premium digital experiences with clean code and innovative design.",
  keywords: ["Animesh Anand", "Full-Stack Developer", "Portfolio", "React", "Next.js", "UI/UX Designer", "Creative Technologist"],
  authors: [{ name: "Animesh Anand" }],
  openGraph: {
    title: "Animesh Anand | Full-Stack Developer",
    description: "Crafting premium digital experiences through clean code and innovative design.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
