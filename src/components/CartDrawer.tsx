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
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 z-[60] h-full w-full max-w-md bg-white p-8 shadow-2xl overflow-y-auto"
          >
            <div className="flex items-center justify-between border-b pb-6">
               <div className="flex items-center gap-2">
                 <ShoppingBag className="h-6 w-6 text-primary" />
                 <h2 className="font-serif text-2xl font-bold text-primary">Your Cart</h2>
               </div>
               <button onClick={onClose} className="rounded-full bg-muted p-2 hover:bg-secondary/10 transition-colors">
                 <X className="h-6 w-6 text-primary" />
               </button>
            </div>

            <div className="mt-8 flex flex-col gap-6">
               {items.length === 0 ? (
                 <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
                    <ShoppingBag className="h-16 w-16 text-muted-foreground opacity-20" />
                    <p className="font-medium text-muted-foreground">Your cart is feeling lonely.</p>
                    <button onClick={onClose} className="font-bold text-secondary underline">Go Shopping</button>
                 </div>
               ) : (
                 items.map((item) => (
                   <div key={item.id} className="flex gap-4 border-b border-muted pb-6 last:border-0">
                      <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-muted">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-grow flex-col justify-between py-1">
                         <div className="flex justify-between items-start">
                            <h3 className="font-bold text-primary text-sm line-clamp-1">{item.name}</h3>
                            <button onClick={() => removeItem(item.id)} className="text-muted-foreground hover:text-red-500">
                               <Trash2 className="h-4 w-4" />
                            </button>
                         </div>
                         <p className="text-xs text-muted-foreground uppercase tracking-widest">{item.slug.replace(/-/g, " ")}</p>
                         <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center gap-3 bg-muted rounded-lg px-2 py-1">
                               <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="hover:text-secondary"><Minus className="h-3 w-3" /></button>
                               <span className="text-sm font-bold w-4 text-center">{item.quantity}</span>
                               <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="hover:text-secondary"><Plus className="h-3 w-3" /></button>
                            </div>
                            <span className="font-bold text-primary">₹{item.price * item.quantity}</span>
                         </div>
                      </div>
                   </div>
                 ))
               )}
            </div>

            {items.length > 0 && (
              <div className="mt-8 flex flex-col gap-6 bg-muted/30 p-6 rounded-2xl">
                 <div className="flex flex-col gap-2">
                    <div className="flex justify-between text-sm text-muted-foreground">
                       <span>Subtotal</span>
                       <span>₹{subtotal}</span>
                    </div>
                    <div className="flex justify-between text-sm text-muted-foreground">
                       <span>Shipping</span>
                       <span className="text-green-600 font-bold tracking-tight uppercase text-[10px]">FREE (Pan India)</span>
                    </div>
                    <div className="flex justify-between border-t pt-4 font-serif text-2xl font-bold text-primary">
                       <span>Total</span>
                       <span>₹{subtotal}</span>
                    </div>
                 </div>
                 <Link 
                   href="/checkout" 
                   onClick={onClose}
                   className="flex h-14 w-full items-center justify-center gap-3 rounded-xl bg-secondary text-white font-bold shadow-lg shadow-secondary/20 hover:bg-secondary/90 hover:scale-[1.02] transition-all"
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
