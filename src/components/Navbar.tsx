"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Heart } from "lucide-react";
import { useCart } from "@/store/useCart";
import CartDrawer from "./CartDrawer";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useCart();

  const totalItems = items.reduce((acc, item) => acc + item.quantity, 0);

  const navLinks = [
    { name: "Shop All", href: "/category/all" },
    { name: "Anniversary", href: "/category/anniversary" },
    { name: "Birthday", href: "/category/birthday" },
    { name: "Wedding", href: "/category/wedding" },
    { name: "Albums", href: "/category/albums" },
    { name: "Baby", href: "/category/baby-kids" },
  ];

  return (
    <>
      <nav className="z-50 w-full border-b border-secondary/20 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <div className="flex flex-1 items-center">
            <Link href="/" className="group flex items-center gap-2">
              <Heart className="h-6 w-6 text-primary transition-transform group-hover:scale-110" fill="currentColor" />
              <span className="font-serif text-2xl font-bold tracking-tight text-primary">Kahaani</span>
            </Link>
          </div>

          {/* Desktop Links */}
          <div className="hidden xl:flex xl:items-center xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-foreground transition-colors hover:text-secondary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Icons */}
          <div className="flex flex-1 items-center justify-end gap-5">
            <button 
              onClick={() => setIsCartOpen(true)}
              className="relative text-foreground hover:text-secondary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {totalItems > 0 && (
                <span className="absolute -right-2 -top-2 flex h-4 w-4 items-center justify-center rounded-full bg-secondary text-[10px] font-bold text-white">
                  {totalItems}
                </span>
              )}
            </button>
            
            <button 
              className="xl:hidden text-foreground"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="xl:hidden border-t border-secondary/10 bg-background px-4 py-6 shadow-xl">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-lg font-medium text-foreground"
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
