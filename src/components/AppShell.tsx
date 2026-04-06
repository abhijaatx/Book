"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideFooter = pathname.startsWith("/personalize/");
  const mainClassName = hideFooter ? "flex-1 overflow-hidden" : "flex-1";

  return (
    <>
      <Navbar />
      <main className={mainClassName}>{children}</main>
      {!hideFooter ? <Footer /> : null}
    </>
  );
}
