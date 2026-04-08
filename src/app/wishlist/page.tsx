"use client";

import Link from "next/link";
import Image from "next/image";
import { useWishlist } from "@/store/useWishlist";
import { HeartOff, ArrowRight } from "lucide-react";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlist();

  if (items.length === 0) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-8 bg-[#FFFDF5] px-6">
        <div className="h-32 w-32 rounded-full bg-white shadow-2xl shadow-primary/5 flex items-center justify-center">
          <HeartOff className="h-12 w-12 text-primary/40" />
        </div>
        <div className="flex flex-col gap-4 text-center mt-4">
           <h1 className="font-serif text-4xl lg:text-5xl text-foreground lowercase">Your wishlist is empty.</h1>
           <p className="text-foreground/40 max-w-sm mx-auto font-medium leading-relaxed">
             Go explore the collection to find the perfect keepsake to preserve your magic.
           </p>
        </div>
        <Link 
          href="/"
          className="mt-6 px-12 py-5 bg-primary text-white font-black text-[11px] uppercase tracking-[0.3em] rounded-full shadow-2xl shadow-primary/20 hover:scale-105 transition-all"
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
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-4">
               <h1 className="font-serif text-[48px] lg:text-[72px] tracking-tight text-foreground lowercase">Your Wishlist</h1>
               <p className="text-[15px] font-medium text-foreground/40 italic">A collection of your favorite keepsakes.</p>
            </div>
            
            <button 
              onClick={clearWishlist}
              className="text-[11px] font-black tracking-[0.2em] uppercase text-foreground/40 hover:text-red-500 transition-colors bg-white px-6 py-3 rounded-full shadow-sm border border-foreground/5 hover:border-red-500/20"
            >
              Clear Wishlist
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {items.map((item) => (
              <div key={item.id} className="group relative flex flex-col gap-4 rounded-[3rem] bg-white p-6 shadow-xl shadow-primary/5 border border-foreground/5 transition-all hover:shadow-2xl hover:border-primary/20">
                 <button 
                   onClick={() => removeItem(item.id)}
                   className="absolute top-10 right-10 z-10 h-10 w-10 flex items-center justify-center rounded-full bg-white/80 backdrop-blur-md text-foreground/40 hover:text-red-500 hover:bg-white shadow-sm transition-all"
                   aria-label="Remove from wishlist"
                 >
                    <HeartOff size={16} />
                 </button>
                 
                 <div className="relative aspect-[3/4] w-full overflow-hidden rounded-[2rem] bg-secondary/5">
                   <Image src={item.image} alt={item.name} fill className="object-cover transition-transform duration-700 group-hover:scale-105" unoptimized />
                   <div className="absolute top-4 left-4 z-10">
                     <span className="text-[9px] font-black uppercase tracking-[0.2em] bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full text-foreground/60 shadow-sm border border-foreground/5">
                       {item.category}
                     </span>
                   </div>
                 </div>
                 
                 <div className="flex flex-col gap-3 mt-4 px-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-primary/40">Personalized</span>
                    <Link href={`/product/${item.slug}`} className="font-serif text-2xl tracking-tight text-foreground group-hover:text-primary transition-colors line-clamp-1">
                       {item.name}
                    </Link>
                    <div className="flex items-center justify-between mt-2 pt-4 border-t border-foreground/5">
                       <span className="text-lg font-black tracking-tight text-foreground">₹{item.price}</span>
                       <Link 
                         href={`/product/${item.slug}`}
                         className="flex items-center gap-2 px-5 h-10 rounded-full bg-primary/5 text-primary text-[10px] font-black uppercase tracking-widest hover:bg-primary hover:text-white transition-all"
                       >
                         Start <span>→</span>
                       </Link>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
