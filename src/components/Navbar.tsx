"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useSession } from "next-auth/react";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";
import { useCart } from "@/store/useCart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();
  const router = useRouter();
  const { items } = useCart();
  const { data: session } = useSession();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);
  const user = session?.user;
  const userInitials =
    user?.name
      ?.split(" ")
      .map((name) => name[0])
      .join("")
      .slice(0, 2)
      .toUpperCase() || "ME";

  const navLinks = [
    { name: "NEW IN", href: "/category/new" },
    { name: "PLANNERS", href: "/category/planners" },
    { name: "NOTEBOOKS", href: "/category/notebooks" },
    { name: "PHOTOBOOKS", href: "/category/photobooks" },
    { name: "STATIONERY", href: "/category/stationery" },
    { name: "NEWSPAPER", href: "/category/newspapers" },
    { name: "SALE", href: "/category/sale" },
  ];

  return (
    <>
      <nav className="z-50 w-full border-b border-foreground/5 bg-white">
        {/* Row 1: Search, Logo, Icons */}
        <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-6 lg:px-12">
          {/* Search (Left) */}
          <div className="hidden lg:flex flex-1 items-center">
            <div className="relative group w-64">
              <input 
                type="text" 
                placeholder="Search..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && searchQuery.trim()) {
                    router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
                    setSearchQuery("");
                  }
                }}
                className="w-full bg-muted/50 rounded-full py-2.5 pl-10 pr-4 border border-foreground/20 text-[11px] font-bold uppercase tracking-widest text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-premium"
              />
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-foreground/20 group-focus-within:text-primary transition-premium" />
            </div>
          </div>

          <button 
            className="lg:hidden h-10 w-10 flex items-center justify-center text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>

          {/* Logo (Center) */}
          <div className="flex shrink-0 items-center justify-center">
            <Link href="/" className="group flex items-center">
              <span className="font-serif text-[36px] leading-none tracking-tight">कहानी</span>
            </Link>
          </div>

          {/* Icons (Right) */}
          <div className="flex flex-1 items-center justify-end gap-6 text-foreground">
            <Link
              href="/account"
              className="hidden lg:flex items-center justify-center hover:text-primary transition-premium"
              aria-label={user ? `${user.name} account` : "Account"}
              title={user ? user.name ?? "My account" : "Account"}
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt={user.name ?? "Account"}
                  width={32}
                  height={32}
                  className="h-8 w-8 rounded-full border border-primary/10 object-cover"
                />
              ) : user ? (
                <span className="flex h-8 w-8 items-center justify-center rounded-full border border-primary/10 bg-primary/5 text-[10px] font-black uppercase tracking-widest text-primary">
                  {userInitials}
                </span>
              ) : (
                <User size={20} strokeWidth={1.5} />
              )}
            </Link>
            <Link href="/wishlist" className="hidden lg:block hover:text-primary transition-premium">
              <Heart size={20} strokeWidth={1.5} />
            </Link>
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative hover:text-primary transition-premium"
            >
              <ShoppingCart size={20} strokeWidth={1.5} />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] font-black text-foreground">
                  {totalItems}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Row 2: Centered Links */}
        <div className="hidden lg:flex h-12 w-full items-center justify-center border-t border-foreground/5 bg-white">
          <div className="flex gap-10">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              const isSale = link.name === "SALE";
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`relative group font-black transition-premium uppercase py-1 ${
                    isSale 
                      ? "text-primary text-[11px] tracking-[0.3em]" 
                      : "text-foreground/80 hover:text-primary text-[10px] tracking-[0.2em]"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary"
                    />
                  )}
                  {!isActive && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-primary origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"
                    />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div 
              key="mobile-nav-menu"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden overflow-hidden border-t border-foreground/5 bg-white px-6"
            >
              <div className="flex flex-col gap-6 py-10">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`text-sm font-black uppercase tracking-[0.2em] ${
                      link.name === "SALE" ? "text-primary" : "text-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </Link>
                ))}
                <Link
                  href="/account"
                  className="text-sm font-black uppercase tracking-[0.2em] text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  My Kahaani
                </Link>
                <Link
                  href="/wishlist"
                  className="text-sm font-black uppercase tracking-[0.2em] text-foreground"
                  onClick={() => setIsOpen(false)}
                >
                  Wishlist
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
