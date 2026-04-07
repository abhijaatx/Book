"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/personalize/");
  const mainClassName = hideFooter ? "flex-1 overflow-hidden" : "flex-1";

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className={mainClassName}>{children}</main>
      {!hideFooter ? <Footer /> : null}
    </div>
  );
}
