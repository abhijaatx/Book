"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Heart, ShieldCheck, Sparkles, Star, Truck } from "lucide-react";
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
  const [mainImage, setMainImage] = useState(currentImages[0] ?? product.images[0]);

  useEffect(() => {
    setMainImage(currentImages[0] ?? product.images[0]);
  }, [currentImages, product.images]);

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
    <div className="grid grid-cols-1 gap-8 xl:grid-cols-[minmax(0,1fr)_minmax(360px,512px)] xl:items-start xl:gap-12">
      <div className="mx-auto flex w-full max-w-2xl flex-col gap-5 xl:max-w-none xl:pt-2">
        <div
          className="relative min-h-[360px] overflow-hidden rounded-[2rem] border border-black/5 bg-gradient-to-br from-[#fffdf9] via-[#f7efe5] to-[#efe3d5] shadow-[0_24px_80px_rgba(31,23,38,0.08)] sm:min-h-[460px] lg:min-h-[560px] aspect-square"
        >
          <div className="absolute inset-[6%] rounded-[1.5rem] border border-white/70 bg-white/55 shadow-[0_18px_40px_rgba(31,23,38,0.08)]" />
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-contain p-8 transition-opacity duration-500 sm:p-12"
            style={{ transform: "scale(1.14)" }}
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
            unoptimized
          />
          <div className="absolute left-5 top-5 rounded-full bg-white/92 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.28em] text-primary shadow-lg">
            {selectedSizePreset.label}
          </div>
        </div>
        <div className="grid grid-cols-4 gap-3 sm:grid-cols-5">
          {currentImages.map((image, index) => (
            <button
              key={`${selectedSizePreset.id}-${index}`}
              type="button"
              onClick={() => setMainImage(image)}
              className={`relative overflow-hidden rounded-2xl border-2 transition-all aspect-square ${mainImage === image ? "border-secondary scale-105 shadow-lg" : "border-muted hover:border-secondary/50"}`}
            >
              <Image src={image} alt={`Preview ${index + 1}`} fill className="object-contain bg-white p-3" sizes="96px" unoptimized />
            </button>
          ))}
        </div>

        {/* Reviews Section under image */}
        <div className="hidden xl:block">
           <ProductReviews product={product} />
        </div>
      </div>

      <div className="mx-auto w-full max-w-2xl xl:max-w-none">
        <div className="rounded-[2rem] border border-black/5 bg-white p-5 shadow-[0_24px_80px_rgba(31,23,38,0.08)] sm:p-8">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-sm font-bold text-secondary">
              <Heart className="h-4 w-4" fill="currentColor" />
              <span>Perfect for {product.category.name}</span>
            </div>
            <div className="flex flex-col gap-3">
              <h1 className="font-serif text-4xl font-bold leading-tight text-primary lg:text-5xl">{product.name}</h1>
              <p className="max-w-xl text-base leading-relaxed text-muted-foreground">{product.description}</p>
              <div className="flex items-center gap-3">
                <div className="flex text-accent">
                  <Star className="h-4 w-4" fill="currentColor" />
                  <Star className="h-4 w-4" fill="currentColor" />
                  <Star className="h-4 w-4" fill="currentColor" />
                  <Star className="h-4 w-4" fill="currentColor" />
                  <Star className="h-4 w-4" fill="currentColor" />
                </div>
                <span className="text-sm font-medium text-muted-foreground">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>
            </div>

            <div className="rounded-[1.5rem] bg-muted/60 p-6 border border-primary/5">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">Selected configuration</p>
              <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-extrabold text-primary">₹{totalPrice}</p>
                  <p className="mt-1 text-sm font-medium text-muted-foreground">
                    {selectedSizePreset.label} selected • Inclusive of taxes & shipping
                  </p>
                </div>
                <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-primary shadow-sm">
                  Step 1 of 2: pick size & finish
                </div>
              </div>
            </div>

            <section className="rounded-[1.5rem] border border-black/5 bg-[#fffdfb] p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">Step 1</p>
                  <label className="mt-1 block text-lg font-semibold text-primary">Choose your size</label>
                </div>
                <span className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                  {selectedSizePreset.label}
                </span>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {product.sizePresets.map((sizePreset) => {
                  const isSelected = sizePreset.id === selectedSizePreset.id;
                  return (
                    <button
                      key={sizePreset.id}
                      type="button"
                      onClick={() => setSelectedSizePresetId(sizePreset.id)}
                      className={`rounded-2xl border px-4 py-5 text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                          : "border-black/5 bg-white hover:border-primary/25"
                      }`}
                    >
                      <p className="text-sm font-bold text-primary">{sizePreset.label}</p>
                      <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                        {sizePreset.priceDelta > 0 ? `+₹${sizePreset.priceDelta}` : "Included"}
                      </p>
                    </button>
                  );
                })}
              </div>
            </section>

            <div className="grid gap-5">
              {product.variants.map((variant, index) => (
                <section key={variant.name} className="rounded-[1.5rem] border border-black/5 bg-[#fffdfb] p-5">
                  <div className="mb-4 flex items-center justify-between gap-3">
                    <div>
                      <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">Step {index + 2}</p>
                      <label className="mt-1 block text-lg font-semibold text-primary">
                        Choose {variant.name.toLowerCase()}
                      </label>
                    </div>
                    {selectedVariants[variant.name] ? (
                      <span className="rounded-full bg-primary/5 px-3 py-1.5 text-xs font-semibold text-primary">
                        {selectedVariants[variant.name]}
                      </span>
                    ) : null}
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {variant.options.map((option) => {
                      const isSelected = selectedVariants[variant.name] === option;
                      return (
                        <button
                          key={option}
                          type="button"
                          onClick={() => updateVariant(variant.name, option)}
                          className={`rounded-2xl border px-4 py-5 text-left transition-all ${
                            isSelected
                              ? "border-primary bg-primary/5 shadow-md shadow-primary/5"
                              : "border-black/5 bg-white hover:border-primary/25"
                          }`}
                        >
                          <p className="text-sm font-bold text-primary">{option}</p>
                          <p className="mt-1 text-[10px] leading-tight text-muted-foreground">
                            Handpicked selection for a premium finish.
                          </p>
                        </button>
                      );
                    })}
                  </div>
                </section>
              ))}
            </div>

            <div className="grid gap-4 rounded-[1.5rem] border border-black/5 bg-white p-5 shadow-sm">
              <Link
                href={personalizationUrl}
                className="flex h-15 w-full items-center justify-center gap-3 rounded-full bg-secondary px-6 text-lg font-bold text-white shadow-xl shadow-secondary/20 transition-all hover:scale-[1.01] hover:bg-secondary/90 active:scale-95"
              >
                <Sparkles className="h-5 w-5" />
                Continue to Personalize
              </Link>
              <button className="flex h-14 w-full items-center justify-center gap-2 rounded-full border border-primary/10 font-bold text-primary transition-all hover:bg-primary/5">
                <Heart className="h-5 w-5" />
                Save to Wishlist
              </button>
              <p className="text-center text-xs text-muted-foreground">
                Step 2: Upload photos & select layouts on the next screen.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-muted pt-6">
              <div className="rounded-[1.25rem] bg-muted/40 p-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-primary">
                  <Truck className="h-5 w-5 text-secondary" />
                  <span>Ships in 3-5 days</span>
                </div>
              </div>
              <div className="rounded-[1.25rem] bg-muted/40 p-4">
                <div className="flex items-center gap-3 text-xs font-bold uppercase tracking-wider text-primary">
                  <ShieldCheck className="h-5 w-5 text-secondary" />
                  <span>Razorpay secure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-black/5 bg-white p-4 shadow-[0_24px_80px_rgba(31,23,38,0.08)] lg:hidden">
        <div className="flex flex-col">
          <span className="text-xs font-bold uppercase text-muted-foreground">Selected</span>
          <span className="text-xl font-extrabold text-primary">₹{totalPrice}</span>
        </div>
        <Link
          href={personalizationUrl}
          className="flex h-14 flex-grow items-center justify-center rounded-xl bg-secondary text-sm font-bold text-white transition-all active:scale-95"
        >
          Continue
        </Link>
      </div>

      {/* Mobile Reviews Section */}
      <div className="xl:hidden pb-12">
        <ProductReviews product={product} />
      </div>
    </div>
  );
}
