import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import AppShell from "@/components/AppShell";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-serif" });

export const metadata: Metadata = {
  title: "Kahaani Books | Premium Personalized Storybooks & Albums In India",
  description: "Handcrafted personalized books and custom albums for anniversaries, birthdays, weddings and more. The perfect gift for your most cherished moments.",
  openGraph: {
    title: "Kahaani Books | Personalized Gifting",
    description: "Premium handcrafted personalized books for your most cherished moments.",
    url: "https://kahaanibooks.com",
    siteName: "Kahaani Books",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="antialiased scroll-smooth">
      <body className={`${inter.variable} ${playfair.variable} min-h-screen flex flex-col font-sans bg-background selection:bg-secondary/30`}>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
