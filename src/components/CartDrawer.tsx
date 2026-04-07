"use client";

import { useCart, CartItem } from "@/store/useCart";
import { X, ShoppingBag, Trash2, Plus, Minus, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { items, removeItem, updateQuantity } = useCart();
  
  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm" 
          />
          <motion.div 
            initial={{ x: "100%" }} animate={{ x: 0 }} exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[60] h-full w-full max-w-md bg-white p-10 shadow-2xl overflow-y-auto rounded-l-[3rem] border-l border-border/50"
          >
            <div className="flex items-center justify-between border-b border-border/50 pb-8">
               <div className="flex items-center gap-3">
                 <div className="bg-primary/10 p-2 rounded-2xl">
                    <ShoppingBag className="h-6 w-6 text-primary" />
                 </div>
                 <h2 className="font-sans text-3xl font-black text-foreground tracking-tight uppercase">Your Cart</h2>
               </div>
               <button onClick={onClose} className="rounded-full bg-secondary/30 p-3 hover:bg-primary hover:text-white transition-all active:scale-90">
                 <X className="h-6 w-6" />
               </button>
            </div>

            <div className="mt-10 flex flex-col gap-8">
               {items.length === 0 ? (
                 <div className="flex flex-col items-center justify-center gap-6 py-32 text-center">
                    <div className="h-32 w-32 rounded-full bg-secondary/10 flex items-center justify-center text-primary/20">
                       <ShoppingBag className="h-16 w-16" />
                    </div>
                    <div className="flex flex-col gap-2">
                       <p className="font-black text-foreground/40 uppercase tracking-widest text-xs">Your cart is empty</p>
                       <button onClick={onClose} className="font-black text-primary uppercase tracking-[0.2em] text-[10px] hover:underline">Let's start your story</button>
                    </div>
                 </div>
               ) : (
                 items.map((item) => (
                   <div key={item.id} className="flex gap-6 border-b border-border/50 pb-8 last:border-0 group">
                      <div className="relative h-28 w-28 flex-shrink-0 overflow-hidden rounded-[1.5rem] bg-secondary/10 border border-border/20 transition-transform group-hover:scale-105">
                        <Image src={item.image} alt={item.name} fill className="object-contain p-2" unoptimized />
                      </div>
                      <div className="flex flex-grow flex-col justify-between py-1">
                         <div className="flex justify-between items-start gap-4">
                            <h3 className="font-black text-foreground text-sm uppercase tracking-tight line-clamp-2 leading-tight">{item.name}</h3>
                            <button onClick={() => removeItem(item.id)} className="text-foreground/20 hover:text-primary transition-colors">
                               <Trash2 className="h-4 w-4" />
                            </button>
                         </div>
                         <p className="text-[9px] font-black text-primary uppercase tracking-[0.3em] mt-1">Premium Edition</p>
                         <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4 bg-secondary/10 rounded-full px-4 py-2 border border-border/10">
                               <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-foreground/40 hover:text-primary transition-all"><Minus className="h-3 w-3" strokeWidth={3}/></button>
                               <span className="text-xs font-black w-4 text-center text-foreground">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-foreground/40 hover:text-primary transition-all"><Plus className="h-3 w-3" strokeWidth={3}/></button>
                            </div>
                            <span className="font-black text-foreground">₹{item.price * item.quantity}</span>
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </div>

            {items.length > 0 && (
              <div className="mt-12 flex flex-col gap-8 bg-secondary/20 p-8 rounded-[2.5rem] border border-border/50">
                 <div className="flex flex-col gap-4">
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                       <span>Subtotal</span>
                       <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-foreground/40">
                       <span>Shipping</span>
                       <span className="text-primary tracking-widest">FREE</span>
                    </div>
                    <div className="flex justify-between border-t border-border/50 pt-6 font-sans text-3xl font-black text-foreground tracking-tight uppercase">
                       <span>Total</span>
                       <span>₹{subtotal}</span>
                    </div>
                 </div>
                 <Link 
                   href="/checkout" 
                   onClick={onClose}
                   className="flex h-16 w-full items-center justify-center gap-4 rounded-full bg-primary-pressed text-white font-black uppercase tracking-[0.2em] text-xs shadow-2xl shadow-primary-pressed/40 transition-all hover:scale-105 active:scale-95"
                 >
                   Checkout Now
                   <ArrowRight className="h-5 w-5" />
                 </Link>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
