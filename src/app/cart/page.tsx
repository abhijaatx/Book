"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ShoppingBag, ArrowRight, Minus, Plus, Heart, ShieldCheck, Sparkles } from "lucide-react";
import { useCart } from "@/store/useCart";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const router = useRouter();
  const { items, removeItem, updateQuantity, clearCart } = useCart();
  const [giftNote, setGiftNote] = useState("");
  const [giftWrap, setGiftWrap] = useState<"none" | "signature">("none");

  const cartSubtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const giftWrapPrice = giftWrap === "signature" ? 450 : 0;
  const total = cartSubtotal + giftWrapPrice;

  const handleCheckout = () => {
    clearCart();
    router.push("/checkout/success");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 bg-[#FFFDF5] px-6">
        <div className="h-32 w-32 rounded-full bg-white shadow-2xl shadow-primary/5 flex items-center justify-center">
          <ShoppingBag className="h-12 w-12 text-primary/40" />
        </div>
        <div className="flex flex-col gap-4 text-center">
           <h1 className="font-serif text-4xl lg:text-5xl text-foreground lowercase">Your story hasn't started yet.</h1>
           <p className="text-foreground/40 max-w-sm mx-auto font-medium leading-relaxed">
             Go back to the collection to find the perfect keepsake to preserve your magic.
           </p>
        </div>
        <Link 
          href="/"
          className="px-12 py-5 bg-primary text-white font-black text-xs uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
        >
          Explore Collection
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF5] selection:bg-primary/10 pb-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-16 lg:pt-24 leading-normal">
        <div className="flex flex-col gap-16">
          
          <div className="flex flex-col gap-4 text-center lg:text-left">
            <h1 className="font-serif text-[48px] lg:text-[72px] tracking-tight text-foreground lowercase">Your Keepsakes</h1>
            <p className="text-[15px] font-medium text-foreground/40 italic">Review your story before we bring it to life.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
            
            {/* Main Content Area */}
            <div className="lg:col-span-8 flex flex-col gap-16">
              
              {/* Product List */}
              <div className="flex flex-col gap-0 border-t border-foreground/5">
                {items.map((item) => (
                  <div key={item.id} className="flex flex-col sm:flex-row gap-8 py-10 border-b border-foreground/5">
                    <div className="relative aspect-square w-full sm:w-44 overflow-hidden rounded-[2rem] bg-white shadow-xl shadow-primary/5">
                      <Image src={item.image} alt={item.name} fill className="object-cover p-4" unoptimized />
                    </div>
                    
                    <div className="flex flex-grow flex-col justify-between py-2">
                       <div className="flex justify-between items-start">
                          <div className="flex flex-col gap-4">
                             <div className="flex flex-col gap-1">
                                <Link href={`/product/${item.slug}`} className="font-serif text-[24px] lg:text-[28px] tracking-tight text-foreground hover:text-primary transition-colors">
                                   {item.name}
                                </Link>
                                <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Personalized Archive</span>
                             </div>
                             
                             {item.personalization && (
                               <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-[11px] font-bold text-foreground/30 uppercase tracking-widest leading-none">
                                 {item.personalization.size && <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary/20" /> Size: {item.personalization.size}</div>}
                                 {item.personalization.recipientName && <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary/20" /> For: {item.personalization.recipientName}</div>}
                                 {item.personalization.material && <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary/20" /> Material: {item.personalization.material}</div>}
                                 {item.personalization.pageCount && <div className="flex items-center gap-2"><div className="h-1 w-1 rounded-full bg-primary/20" /> Pages: {item.personalization.pageCount}</div>}
                               </div>
                             )}
                          </div>
                          
                          <div className="flex flex-col items-end gap-1">
                             <span className="text-[20px] font-black">₹{item.price * item.quantity}</span>
                             <button onClick={() => removeItem(item.id)} className="text-[10px] font-black uppercase tracking-widest text-foreground/20 hover:text-red-500 transition-colors flex items-center gap-2">
                                <Trash2 size={12} /> Remove
                             </button>
                          </div>
                       </div>

                       <div className="flex items-center gap-4 mt-8">
                          <div className="flex items-center gap-6 rounded-full bg-white border border-foreground/5 p-1 px-2">
                             <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 text-foreground/20 hover:text-primary transition-colors hover:scale-125">
                                <Minus size={14} strokeWidth={3} />
                             </button>
                             <span className="font-black text-[12px] w-4 text-center">{item.quantity}</span>
                             <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 text-foreground/20 hover:text-primary transition-colors hover:scale-125">
                                <Plus size={14} strokeWidth={3} />
                             </button>
                          </div>
                       </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Finishing Touches Section */}
              <div className="rounded-[3rem] bg-white p-8 lg:p-12 shadow-2xl shadow-primary/5 border border-foreground/5">
                 <div className="flex flex-col gap-10">
                    <div className="flex items-center gap-4">
                       <div className="h-10 w-10 rounded-xl bg-primary/5 flex items-center justify-center text-primary">
                          <Heart size={20} strokeWidth={2.5} />
                       </div>
                       <h2 className="font-serif text-[28px] lg:text-[32px] tracking-tight text-foreground">Thoughtful Finishing Touches</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                       {/* Gift Note */}
                       <div className="flex flex-col gap-4">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/40">Handwritten Gift Note</label>
                          <textarea 
                             value={giftNote}
                             onChange={(e) => setGiftNote(e.target.value)}
                             placeholder="Write a message from the heart..."
                             className="w-full h-40 rounded-2xl bg-[#f9f9f9] border border-foreground/5 p-6 text-[13px] font-medium leading-relaxed focus:outline-none focus:border-primary/20 placeholder:text-foreground/20 transition-all resize-none"
                          />
                          <p className="text-[10px] font-bold text-foreground/20 italic">Our artists will hand-write this on a premium textured card.</p>
                       </div>

                       {/* Gift Presentation */}
                       <div className="flex flex-col gap-4">
                          <label className="text-[11px] font-black uppercase tracking-[0.3em] text-foreground/40">Gift Presentation</label>
                          <div className="flex flex-col gap-4">
                             <button 
                                onClick={() => setGiftWrap("signature")}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${giftWrap === 'signature' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-foreground/5 bg-[#f9f9f9]'}`}
                             >
                                <div className="flex items-center gap-4">
                                   <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                                      <Image src="https://images.unsplash.com/photo-1513201099705-a9746e1e201f?q=80&w=200&auto=format&fit=crop" alt="Gift Wrap" fill className="object-cover" unoptimized />
                                   </div>
                                   <div className="flex flex-col items-start gap-1">
                                      <span className="text-[12px] font-black uppercase tracking-widest">Signature Gift Wrap</span>
                                      <span className="text-[10px] font-medium text-foreground/40">Velvet ribbon & wax seal</span>
                                   </div>
                                </div>
                                <span className={`text-[12px] font-black ${giftWrap === 'signature' ? 'text-primary' : 'text-foreground/20'}`}>+ ₹450</span>
                             </button>

                             <button 
                                onClick={() => setGiftWrap("none")}
                                className={`flex items-center justify-between p-4 rounded-2xl border-2 transition-all group ${giftWrap === 'none' ? 'border-primary bg-primary/5 shadow-lg shadow-primary/5' : 'border-foreground/5 bg-[#f9f9f9]'}`}
                             >
                                <div className="flex items-center gap-4">
                                   <div className="h-12 w-12 rounded-lg bg-foreground/5 flex items-center justify-center shrink-0">
                                      <ShoppingBag size={20} className="text-foreground/20" />
                                   </div>
                                   <div className="flex flex-col items-start gap-1">
                                      <span className="text-[12px] font-black uppercase tracking-widest">Eco-Minimal Box</span>
                                      <span className="text-[10px] font-medium text-foreground/40">Recycled aesthetic</span>
                                   </div>
                                </div>
                                <span className={`text-[12px] font-black ${giftWrap === 'none' ? 'text-primary' : 'text-foreground/20'}`}>FREE</span>
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>
              </div>
            </div>

            {/* Sticky Order Summary */}
            <div className="lg:col-span-4 lg:sticky lg:top-32">
               <div className="flex flex-col gap-10 bg-white rounded-[3rem] p-8 lg:p-12 shadow-[0_40px_100px_rgba(0,0,0,0.03)] border border-foreground/5">
                  <h2 className="font-serif text-[28px] lg:text-[32px] tracking-tight text-foreground">Order Summary</h2>
                  
                  <div className="flex flex-col gap-6 border-b border-foreground/5 pb-8 leading-none">
                     <div className="flex justify-between text-[13px] font-medium">
                        <span className="text-foreground/40">Subtotal ({items.length} items)</span>
                        <span className="font-black text-foreground">₹{cartSubtotal}</span>
                     </div>
                     <div className="flex justify-between text-[13px] font-medium">
                        <span className="text-foreground/40">Gift Wrapping</span>
                        <span className="font-black text-foreground">₹{giftWrapPrice}</span>
                     </div>
                     <div className="flex justify-between text-[13px] font-medium">
                        <span className="text-foreground/40">Shipping</span>
                        <span className="font-serif italic text-foreground/80 lowercase">Calculated at next step</span>
                     </div>
                  </div>

                  <div className="flex flex-col gap-6">
                     <div className="flex justify-between items-center">
                        <span className="font-serif text-[24px] lg:text-[28px] tracking-tight">Total</span>
                        <div className="flex flex-col items-end gap-1">
                           <span className="text-[32px] lg:text-[40px] font-black text-primary leading-none">₹{total}</span>
                           <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/30">Inclusive of all taxes</span>
                        </div>
                     </div>

                     <button 
                        onClick={handleCheckout}
                        className="group flex h-20 w-full items-center justify-between rounded-full bg-primary px-10 text-white font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-primary/20 transition-all hover:scale-105 hover:bg-primary-pressed active:scale-95"
                     >
                        <span className="text-white">Proceed to Secure Checkout</span>
                        <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center transition-transform group-hover:translate-x-2">
                           <ArrowRight size={18} strokeWidth={2.5} className="text-white" />
                        </div>
                     </button>
                  </div>

                  <div className="flex flex-col gap-8">
                     <div className="flex items-center justify-between bg-[#f9f9f9] rounded-full p-2 pl-6">
                        <span className="text-[10px] font-black uppercase tracking-widest text-foreground/40">Promo Code or Gift Card</span>
                        <button className="h-12 px-6 rounded-full bg-white text-[10px] font-black uppercase tracking-widest shadow-sm hover:text-primary transition-colors border border-foreground/5">Apply</button>
                     </div>

                     <div className="flex items-center justify-center gap-6 opacity-30 grayscale transition-all hover:opacity-80 hover:grayscale-0">
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" width={40} height={20} unoptimized />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" width={40} height={20} unoptimized />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" width={40} height={20} unoptimized />
                        <Image src="https://upload.wikimedia.org/wikipedia/commons/8/80/Maestro_logo.svg" alt="Maestro" width={40} height={20} unoptimized />
                     </div>
                  </div>
               </div>

               {/* Impact Note */}
               <div className="mt-8 rounded-[2rem] bg-[#f9dcc4]/30 p-8 flex items-start gap-6 border border-[#f9dcc4]/50 leading-normal">
                  <div className="h-10 w-10 shrink-0 rounded-full bg-white flex items-center justify-center text-[#9c6644]">
                     <Sparkles size={20} />
                  </div>
                  <div className="flex flex-col gap-2">
                     <h4 className="text-[12px] font-black uppercase tracking-widest text-[#7f5539]">Every order plants a tree.</h4>
                     <p className="text-[12px] font-medium text-[#7f5539]/60 leading-relaxed">
                        We're committed to making the world as beautiful as your memories.
                     </p>
                  </div>
               </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
