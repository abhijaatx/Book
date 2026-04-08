"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight, Star } from "lucide-react";
import {
  getProductImagesForSize,
  getProductPrice,
  getSizePresetById,
  Product,
} from "@/lib/products";

function getOptionPriceLabel(option: string): string {
  const match = option.match(/([+-]₹\d+)/);
  return match ? match[1] : "Included";
}

function getOptionDisplayLabel(option: string): string {
  return option.replace(/\s*\(([-+]₹\d+)\)\s*$/, "").trim();
}

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
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % currentImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + currentImages.length) % currentImages.length);
  };

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
         <div className="flex flex-col gap-10 order-2 lg:order-1">
            <div className="flex flex-col gap-6">
               <h1 className="font-serif text-[64px] lg:text-[100px] leading-[0.9] tracking-[-0.04em] text-foreground lowercase">
                 The <span className="text-primary italic font-medium">{product.name}</span> <br/> Story
               </h1>
                <p className="max-w-lg text-[15px] lg:text-[17px] font-medium leading-relaxed text-foreground/50">
                   {product.description} &quot;The most meaningful gift is the one only you can tell. Handcrafted with love, for the moments you never want to forget.&quot;
                   Designed to be passed down through generations, each page tells a unique chapter of your life.
                </p>
             </div>

             <div className="flex flex-col gap-8">
                <div className="flex max-w-2xl flex-col gap-5 rounded-[2.5rem] border border-foreground/5 bg-white p-6 shadow-sm shadow-primary/5 lg:p-8">
                  <div className="flex flex-col gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.35em] text-primary/60">
                      Customize Your Edition
                    </span>
                    <p className="text-[13px] leading-relaxed text-foreground/45">
                      Choose the size and finish that fits your story best before
                      you start personalizing.
                    </p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <label className="flex flex-col gap-2">
                      <span className="text-[10px] font-black uppercase tracking-[0.24em] text-foreground/40">
                        Size
                      </span>
                      <div className="relative">
                        <select
                          value={selectedSizePreset.id}
                          onChange={(event) => setSelectedSizePresetId(event.target.value as any)}
                          className="h-14 w-full appearance-none rounded-2xl border border-foreground/10 bg-[#FFFDF5] px-5 pr-12 text-[13px] font-bold text-foreground outline-none transition-colors focus:border-primary"
                        >
                          {product.sizePresets.map((sizePreset) => (
                            <option key={sizePreset.id} value={sizePreset.id}>
                              {sizePreset.label}
                              {sizePreset.priceDelta > 0 ? ` (+₹${sizePreset.priceDelta})` : ""}
                            </option>
                          ))}
                        </select>
                        <ChevronDown
                          size={16}
                          className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-foreground/35"
                        />
                      </div>
                    </label>

                    {product.variants.map((variant) => (
                      <label key={variant.name} className="flex flex-col gap-2">
                        <span className="text-[10px] font-black uppercase tracking-[0.24em] text-foreground/40">
                          {variant.name}
                        </span>
                        <div className="relative">
                          <select
                            value={selectedVariants[variant.name]}
                            onChange={(event) => updateVariant(variant.name, event.target.value)}
                            className="h-14 w-full appearance-none rounded-2xl border border-foreground/10 bg-[#FFFDF5] px-5 pr-12 text-[13px] font-bold text-foreground outline-none transition-colors focus:border-primary"
                          >
                            {variant.options.map((option) => (
                              <option key={option} value={option}>
                                {getOptionDisplayLabel(option)}
                                {getOptionPriceLabel(option) !== "Included"
                                  ? ` (${getOptionPriceLabel(option)})`
                                  : ""}
                              </option>
                            ))}
                          </select>
                          <ChevronDown
                            size={16}
                            className="pointer-events-none absolute right-5 top-1/2 -translate-y-1/2 text-foreground/35"
                          />
                        </div>
                      </label>
                    ))}
                  </div>

                  <div className="flex flex-wrap gap-3">
                    <div className="rounded-full bg-[#FFFDF5] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50">
                      {selectedSizePreset.label}
                    </div>
                    {Object.entries(selectedVariants).map(([name, value]) => (
                      <div
                        key={name}
                        className="rounded-full bg-[#FFFDF5] px-4 py-2 text-[10px] font-black uppercase tracking-[0.2em] text-foreground/50"
                      >
                        {name}: {getOptionDisplayLabel(value)}
                      </div>
                    ))}
                  </div>
                </div>

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
                   <div className="h-10 w-[1px] bg-foreground/10 hidden sm:block" />
                   <div className="flex-col hidden sm:flex">
                      <span className="text-[10px] font-black uppercase tracking-[0.3em] text-foreground/40">Rating</span>
                      <div className="flex items-center gap-2">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={12}
                              className={i < Math.floor(product.rating) ? "fill-primary text-primary" : "text-foreground/20"}
                            />
                          ))}
                        </div>
                        <span className="text-[14px] font-bold text-foreground">{product.rating}</span>
                        <span className="text-[11px] font-medium text-foreground/40">({product.reviews} reviews)</span>
                      </div>
                   </div>
                </div>


             </div>
          </div>

          <div className="relative aspect-square w-full overflow-hidden rounded-[4rem] bg-white shadow-2xl shadow-primary/5 order-1 lg:order-2">
              {/* Image Display */}
              <div className="relative h-full w-full">
                {currentImages.map((img, index) => (
                  <div
                    key={index}
                    className="absolute inset-0 transition-opacity duration-500 ease-in-out"
                    style={{ opacity: index === currentImageIndex ? 1 : 0 }}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} - Image ${index + 1}`}
                      fill
                      className="object-cover"
                      unoptimized
                      priority={index === 0}
                    />
                  </div>
                ))}
              </div>

              {/* Navigation Arrows */}
              {currentImages.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-foreground/70 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full bg-white/80 backdrop-blur-sm text-foreground/70 shadow-lg transition-all hover:bg-white hover:scale-110 active:scale-95"
                    aria-label="Next image"
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}

              {/* Dot Indicators */}
              {currentImages.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2">
                  {currentImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`h-2 rounded-full transition-all duration-300 ${
                        index === currentImageIndex
                          ? "w-6 bg-primary"
                          : "w-2 bg-foreground/20 hover:bg-foreground/40"
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              )}
           </div>
       </section>

      {/* Narrative Section */}
      <section className="bg-white border-y border-foreground/5 py-24 lg:py-32">
         <div className="mx-auto max-w-[1440px] px-6 lg:px-12 flex flex-col gap-24">
            
            {/* Handcrafted Storybook Title */}
            <div className="flex flex-col gap-6 text-center lg:text-left">
               <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">A HANDCRAFTED STORYBOOK</span>
               <p className="max-w-2xl text-[18px] lg:text-[22px] font-serif italic leading-relaxed text-foreground/80">
                  Handcrafted in India with premium archival-safe materials and finished with the signature Kahaani aesthetic, these are more than just products—they&apos;re keepsakes built for a lifetime of magic.
               </p>
               <h2 className="mt-8 font-serif text-[40px] lg:text-[56px] leading-[1.1] tracking-tight text-foreground lowercase italic">
                  Capture your magic journey.
               </h2>
               <p className="max-w-3xl text-[15px] font-medium leading-relaxed text-foreground/45">
                  {product.longDescription}
               </p>
            </div>

            {/* How It Works Steps */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20 border-t border-foreground/5 pt-20">
               <div className="flex flex-col gap-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[12px] font-black text-primary">01</div>
                  <div className="flex flex-col gap-2">
                     <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground">Choose Theme</h4>
                     <p className="text-[13px] leading-relaxed text-foreground/50 font-medium">Pick from dozens of romantic and premium themes.</p>
                  </div>
               </div>
               <div className="flex flex-col gap-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[12px] font-black text-primary">02</div>
                  <div className="flex flex-col gap-2">
                     <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground">Add Photos</h4>
                     <p className="text-[13px] leading-relaxed text-foreground/50 font-medium">Upload your most cherished photos on high-quality paper.</p>
                  </div>
               </div>
               <div className="flex flex-col gap-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-[12px] font-black text-primary">03</div>
                  <div className="flex flex-col gap-2">
                     <h4 className="text-[14px] font-black uppercase tracking-[0.2em] text-foreground">Tell Your Story</h4>
                     <p className="text-[13px] leading-relaxed text-foreground/50 font-medium">Add dates, milestones, and personal messages.</p>
                  </div>
               </div>
            </div>

            {/* Customer Comments Section */}
            <div className="flex flex-col gap-12 border-t border-foreground/5 pt-24" id="reviews">
               <div className="flex items-center justify-between">
                  <h3 className="font-serif text-[32px] lowercase italic text-foreground/90">Reviews</h3>
                  <div className="flex items-center gap-4">
                     <div className="flex items-center">
                       {[...Array(5)].map((_, i) => (
                         <Star key={i} size={14} className="fill-primary text-primary" />
                       ))}
                     </div>
                     <span className="text-[12px] font-black uppercase tracking-widest text-foreground/40">{product.reviews} reviews</span>
                  </div>
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[
                    { 
                      name: "Ananya S.", 
                      rating: 5, 
                      date: "2 March 2024", 
                      comment: "The quality is simply unmatched. The linen cover feels so premium, and the printing is vivid yet soft. A beautiful way to preserve my wedding photos.",
                      images: ["https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=400&auto=format&fit=crop", "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=400&auto=format&fit=crop"]
                    },
                    { 
                      name: "Rohan M.", 
                      rating: 5, 
                      date: "15 February 2024", 
                      comment: "I've made books with other services, but Kahaani's layouts and aesthetic are just different. It feels like an art piece, not just an album.",
                      images: ["https://images.unsplash.com/photo-1544457070-4cd773b1d9bf?q=80&w=400&auto=format&fit=crop"]
                    },
                    { 
                      name: "Sanya K.", 
                      rating: 5, 
                      date: "24 January 2024", 
                      comment: "The editor was so easy to use, and delivery was prompt. Seeing my baby's first year in such a beautiful book made me cry. Thank you!",
                      images: ["https://images.unsplash.com/photo-1510154221590-ff63e90a136f?q=80&w=400&auto=format&fit=crop", "https://images.unsplash.com/photo-1515488042-27a7006254fe?q=80&w=400&auto=format&fit=crop"]
                    },
                  ].map((review, idx) => (
                     <div key={idx} className="flex flex-col gap-6 rounded-[2.5rem] border border-foreground/5 bg-[#FFFDF5] p-8 transition-all hover:bg-white hover:shadow-xl hover:shadow-primary/5">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-1">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} size={10} className="fill-primary text-primary" />
                              ))}
                           </div>
                           <span className="text-[10px] font-medium text-foreground/30">{review.date}</span>
                        </div>
                        
                        <p className="text-[14px] leading-relaxed text-foreground/70 font-medium italic">&quot;{review.comment}&quot;</p>
                        
                        {/* Review Images */}
                        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                           {review.images.map((img, imgIdx) => (
                              <div key={imgIdx} className="relative h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-foreground/5">
                                 <Image src={img} alt="Customer photo" fill className="object-cover" unoptimized />
                              </div>
                           ))}
                        </div>

                        <div className="mt-auto flex items-center gap-3">
                           <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center text-[11px] font-black text-primary">
                             {review.name[0]}
                           </div>
                           <span className="text-[12px] font-black uppercase tracking-widest text-foreground/90">{review.name}</span>
                        </div>
                     </div>
                  ))}
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
               <div className="flex flex-col">
                 <span className="text-[9px] font-black uppercase tracking-[0.2em] text-foreground/40">
                   Selected Setup
                 </span>
                 <span className="text-[13px] font-bold text-foreground/70">
                   {selectedSizePreset.label}
                   {selectedVariants.Material
                     ? ` • ${getOptionDisplayLabel(selectedVariants.Material)}`
                     : ""}
                 </span>
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
