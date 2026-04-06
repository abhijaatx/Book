"use client";

import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Heart, ShieldCheck } from "lucide-react";
import { useCart } from "@/store/useCart";

import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    // In a real app, you'd send order to server here
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-6 px-4">
        <div className="h-24 w-24 rounded-full bg-muted flex items-center justify-center">
          <ShoppingBag className="h-10 w-10 text-muted-foreground" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-primary">Your cart is empty</h1>
        <p className="text-muted-foreground text-center max-w-md">
          Looks like you haven't started your story yet. Explore our collection to find the perfect keepsake.
        </p>
        <Link 
          href="/"
          className="px-10 py-4 bg-primary text-white font-bold rounded-xl shadow-xl shadow-primary/20 hover:scale-105 transition-all"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-12 lg:pt-20">
        <div className="flex flex-col gap-12">
          
          <div className="flex flex-col gap-2">
            <h1 className="font-serif text-4xl font-bold text-primary">Your Shopping Cart</h1>
            <p className="text-muted-foreground">You have {items.length} items in your bag</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">
            
            {/* Items List */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              {items.map((item) => (
                <div key={item.id} className="bg-white rounded-3xl p-6 shadow-xl shadow-primary/5 flex flex-col sm:flex-row gap-6 border border-white">
                  <div className="relative h-32 w-32 rounded-2xl overflow-hidden flex-shrink-0 bg-white">
                    <Image src={item.image} alt={item.name} fill className="object-contain p-3" unoptimized />
                  </div>
                  
                  <div className="flex flex-grow flex-col justify-between py-1">
                    <div className="flex justify-between items-start">
                      <div className="flex flex-col gap-1">
                        <Link href={`/product/${item.slug}`} className="font-serif text-xl font-bold text-primary hover:text-secondary transition-colors">
                          {item.name}
                        </Link>
                        {item.personalization && (
                          <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-medium text-muted-foreground">
                            {item.personalization.size && <span>Size: {item.personalization.size}</span>}
                            {item.personalization.material && <span>Material: {item.personalization.material}</span>}
                            {item.personalization.pageCount && <span>Pages: {item.personalization.pageCount}</span>}
                            {item.personalization.recipientName && <span>For: {item.personalization.recipientName}</span>}
                            {item.personalization.photoCount > 0 && <span>Photos: {item.personalization.photoCount}</span>}
                          </div>
                        )}
                      </div>
                      <button 
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="flex justify-between items-end mt-4">
                      <div className="flex items-center gap-4 bg-muted/50 rounded-lg px-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Minus className="h-4 w-4" />
                        </button>
                        <span className="font-bold text-primary w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:text-primary transition-colors"
                        >
                          <Plus className="h-4 w-4" />
                        </button>
                      </div>
                      <span className="text-xl font-extrabold text-primary">₹{item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-primary/5 flex flex-col gap-8 border border-white sticky top-24">
              <h2 className="font-serif text-2xl font-bold text-primary border-b border-muted pb-4">Order Summary</h2>
              
              <div className="flex flex-col gap-4">
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="text-primary font-bold">₹{subtotal}</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="text-green-600 font-bold uppercase tracking-tight">Free</span>
                </div>
                <div className="flex justify-between text-sm font-medium">
                  <span className="text-muted-foreground">Taxes</span>
                  <span className="text-primary font-bold">₹0</span>
                </div>
              </div>

              <div className="border-t border-muted pt-6 flex justify-between items-center">
                <span className="font-serif text-xl font-bold text-primary">Total Amount</span>
                <span className="text-3xl font-extrabold text-primary">₹{subtotal}</span>
              </div>

              <div className="flex flex-col gap-4">
                <button 
                  onClick={handleCheckout}
                  className="flex h-16 w-full items-center justify-center gap-3 rounded-2xl bg-secondary text-white font-bold text-lg shadow-xl shadow-secondary/20 hover:bg-secondary/90 transition-all"
                >
                  Complete Purchase
                  <ArrowRight className="h-5 w-5" />
                </button>
                <div className="flex items-center justify-center gap-2 text-xs font-bold text-muted-foreground uppercase tracking-widest italic">
                  <ShieldCheck className="h-4 w-4" />
                  <span>Secure Shopping Guarantee</span>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
