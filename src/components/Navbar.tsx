"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, User, Heart } from "lucide-react";
import { useCart } from "@/store/useCart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "NEW IN", href: "/category/new" },
    { name: "PLANNERS", href: "/category/planners" },
    { name: "NOTEBOOKS", href: "/category/notebooks" },
    { name: "PHOTOBOOKS", href: "/category/photobooks" },
    { name: "STATIONERY", href: "/category/stationery" },
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
                className="w-full bg-muted/50 rounded-full py-2.5 pl-10 pr-4 text-[11px] font-bold uppercase tracking-widest text-foreground/40 focus:outline-none focus:ring-1 focus:ring-primary transition-premium"
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
              <span className="font-serif text-[32px] leading-none tracking-[-0.04em] lowercase">kahaani</span>
            </Link>
          </div>

          {/* Icons (Right) */}
          <div className="flex flex-1 items-center justify-end gap-6 text-foreground">
            <Link href="/account" className="hidden lg:block hover:text-primary transition-premium">
              <User size={20} strokeWidth={1.5} />
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
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-[10px] font-black text-foreground/80 hover:text-primary transition-premium uppercase tracking-[0.2em]"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="lg:hidden border-t border-foreground/5 bg-white px-6 py-10 animate-in slide-in-from-top duration-300">
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-sm font-black text-foreground uppercase tracking-[0.2em]"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
