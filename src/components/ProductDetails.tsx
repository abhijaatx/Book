"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, Heart, ShieldCheck, Star, Truck } from "lucide-react";
import ProductReviews from "./ProductReviews";
import {
  getProductImagesForSize,
  getProductPrice,
  getSizePresetById,
  Product,
} from "@/lib/products";

export default function ProductDetails({ product }: { product: Product }) {
  const [selectedSizePresetId, setSelectedSizePresetId] = useState(product.sizePresets[0]?.id ?? "medium");
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    product.variants.forEach((variant) => {
      initial[variant.name] = variant.options[0];
    });
    return initial;
  });

  const selectedSizePreset = getSizePresetById(product, selectedSizePresetId);
  const currentImages = getProductImagesForSize(product, selectedSizePreset.id);

  const calculatePrice = () => {
    let total = getProductPrice(product, selectedSizePreset.id);
    Object.values(selectedVariants).forEach((option) => {
      const match = option.match(/\+₹(\d+)/);
      if (match) {
        total += parseInt(match[1], 10);
      }
    });
    return total;
  };

  const updateVariant = (name: string, option: string) => {
    setSelectedVariants((prev) => ({ ...prev, [name]: option }));
  };

  const totalPrice = calculatePrice();
  const personalizationUrl = `/personalize/${product.slug}?${new URLSearchParams({
    ...selectedVariants,
    sizePresetId: selectedSizePreset.id,
  }).toString()}`;

  return (
    <div className="flex flex-col bg-[#FFFDF5] selection:bg-primary/10">
      
      {/* Top Navigation / Breadcrumbs */}
      <div className="mx-auto w-full max-w-[1440px] px-6 lg:px-12 pt-10">
         <Link href="/" className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40 hover:text-primary transition-colors">
            <ChevronDown className="rotate-90" size={12} />
            Back to Collection
         </Link>
      </div>

      {/* Hero Storytelling Section */}
      <section className="mx-auto grid w-full max-w-[1440px] grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 px-6 lg:px-12 py-12 lg:py-20 lg:items-center">
         <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-6">
               <h1 className="font-serif text-[64px] lg:text-[100px] leading-[0.9] tracking-[-0.04em] text-foreground lowercase">
                 The <span className="text-primary italic font-medium">{product.name}</span> <br/> Story
               </h1>
                <p className="max-w-lg text-[15px] lg:text-[17px] font-medium leading-relaxed text-foreground/50">
                   {product.description} "The most meaningful gift is the one only you can tell. Handcrafted with love, for the moments you never want to forget." 
                   Designed to be passed down through generations, each page tells a unique chapter of your life.
                </p>
             </div>

             <div className="flex flex-col gap-8">
                <div className="flex items-center gap-8">
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Starting From</span>
                      <span className="text-[28px] font-black text-foreground">₹{totalPrice}</span>
                   </div>
                   <div className="h-10 w-[1px] bg-foreground/10" />
                   <div className="flex flex-col">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Dispatch in</span>
                      <span className="text-[18px] font-serif italic text-foreground/80">3-5 work days</span>
                   </div>
                </div>

                <Link
                  href={personalizationUrl}
                  className="inline-flex h-16 w-full max-w-sm items-center justify-center rounded-full bg-primary text-white font-black text-xs uppercase tracking-[0.3em] shadow-2xl shadow-primary/30 transition-premium hover:scale-105 hover:bg-primary-pressed active:scale-95"
                >
                  Start Your Story
                </Link>
             </div>
          </div>

          <div className="relative aspect-square w-full font-serif overflow-hidden rounded-[4rem] bg-white shadow-2xl shadow-primary/5 flex items-center justify-center p-12 text-center italic text-primary/40 text-[24px] lg:text-[32px] leading-tight">
             "{product.name} — permanent legacy in every page."
          </div>
       </section>

      {/* Technical Excellence Section */}
      <section className="bg-white border-y border-foreground/5 py-24 lg:py-32">
         <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col gap-20">
            <div className="flex flex-col gap-4">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">Craftsmanship Details</span>
               <h2 className="font-serif text-[32px] lg:text-[48px] tracking-tight text-foreground">Technical Excellence by Kahaani.</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
               {/* Detail 1 */}
               <div className="flex flex-col gap-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#f9f9f9]">
                     <Image src="https://images.unsplash.com/photo-1594122230689-45899d9e6f69?q=80&w=800&auto=format&fit=crop" alt="Premium LInen" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex flex-col gap-3">
                     <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground">European Linens</h4>
                     <p className="text-[13px] leading-relaxed text-foreground/50 font-medium">Classic linen and silk-blend covers curated for longevity and chosen for their timeless aesthetic appeal.</p>
                  </div>
               </div>
               {/* Detail 2 */}
               <div className="flex flex-col gap-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#f9f9f9]">
                     <Image src="https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=800&auto=format&fit=crop" alt="Archival Paper" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex flex-col gap-3">
                     <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground">Archival Matte</h4>
                     <p className="text-[13px] leading-relaxed text-foreground/50 font-medium">200 GSM acid-free papers that preserve your memories in vivid detail and museum-quality color for decades.</p>
                  </div>
               </div>
               {/* Detail 3 */}
               <div className="flex flex-col gap-6">
                  <div className="relative aspect-video w-full overflow-hidden rounded-3xl bg-[#f9f9f9]">
                     <Image src="https://images.unsplash.com/photo-1589118949245-7d38baf380d6?q=80&w=800&auto=format&fit=crop" alt="Handbound" fill className="object-cover" unoptimized />
                  </div>
                  <div className="flex flex-col gap-3">
                     <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground">Hand-Bound Care</h4>
                     <p className="text-[13px] leading-relaxed text-foreground/50 font-medium">Each book is individually hand-assembled by master binders in our studio with obsessive attention to every stitch.</p>
                  </div>
               </div>
            </div>
         </div>
      </section>

      {/* Editor Snapshot Section */}
      <section className="py-32 overflow-hidden">
         <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
               <div className="lg:col-span-7 relative">
                  <div className="relative aspect-[16/10] w-full rounded-[3rem] overflow-hidden shadow-2xl shadow-primary/10 bg-white p-4">
                     <div className="relative h-full w-full rounded-[2rem] overflow-hidden">
                        <Image src={currentImages[1] || currentImages[0]} alt="Editor Preview" fill className="object-cover" unoptimized />
                     </div>
                  </div>
                  {/* Decorative Elements */}
                  <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-primary/10 blur-3xl" />
                  <div className="absolute -left-8 -bottom-8 h-32 w-32 rounded-full bg-secondary/10 blur-3xl" />
               </div>

               <div className="lg:col-span-5 flex flex-col gap-10">
                  <div className="flex flex-col gap-6 text-center lg:text-left">
                     <h2 className="font-serif text-[40px] lg:text-[56px] leading-[1.1] tracking-tight text-foreground lowercase italic">A journey through your memories.</h2>
                     <p className="text-[15px] font-medium leading-relaxed text-foreground/40 max-w-sm">
                        Experience the easiest way to preserve your magic. Simply upload, drag, and drop to create a legacy piece.
                     </p>
                  </div>

                  <div className="flex flex-col gap-6">
                     <div className="flex items-start gap-5">
                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary">1</div>
                         <div className="flex flex-col gap-1 pt-1">
                            <h5 className="text-[12px] font-black uppercase tracking-widest text-foreground">Upload with Ease</h5>
                            <p className="text-[12px] font-medium text-foreground/40">Bring your moments into the studio in seconds.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-5">
                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary">2</div>
                         <div className="flex flex-col gap-1 pt-1">
                            <h5 className="text-[12px] font-black uppercase tracking-widest text-foreground">Guided Prompts</h5>
                            <p className="text-[12px] font-medium text-foreground/40">Captions help you remember the feelings, not just the dates.</p>
                         </div>
                     </div>
                     <div className="flex items-start gap-5">
                         <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-[11px] font-black text-primary">3</div>
                         <div className="flex flex-col gap-1 pt-1">
                            <h5 className="text-[12px] font-black uppercase tracking-widest text-foreground">Editorial Layouts</h5>
                            <p className="text-[12px] font-medium text-foreground/40">Clean, crisp designs that let your photos truly shine.</p>
                         </div>
                     </div>
                  </div>

                  <Link href={personalizationUrl} className="inline-flex h-14 items-center justify-center border-b-2 border-primary text-[11px] font-black uppercase tracking-[0.3em] text-primary hover:text-primary-pressed transition-colors">
                     Explore Our Studio
                  </Link>
               </div>
            </div>
         </div>
      </section>

      {/* Configuration Footer */}
      <section className="bg-white border-t border-foreground/5 py-12 sticky bottom-0 z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)] filter backdrop-blur-xl bg-white/90">
         <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col sm:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
               <div className="flex flex-col">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/40">Custom Edition</span>
                  <span className="font-serif text-[24px] tracking-tight">{product.name}</span>
               </div>
               <div className="h-8 w-[1px] bg-foreground/10" />
               <span className="text-[20px] font-black">₹{totalPrice}</span>
            </div>

            <div className="flex items-center gap-4">
                <Link
                  href={personalizationUrl}
                  className="inline-flex h-14 px-12 items-center justify-center rounded-full bg-primary text-white font-black text-[10px] uppercase tracking-[0.3em] shadow-xl shadow-primary/20 hover:scale-105 transition-all active:scale-95"
                >
                  Confirm & Personalize
                </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
