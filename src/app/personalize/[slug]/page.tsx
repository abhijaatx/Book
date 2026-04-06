"use client";

import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Heart } from "lucide-react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useCart } from "@/store/useCart";

import { getProductBySlug, getProductImagesForSize, getSizePresetById } from "@/lib/products";
import { notFound } from "next/navigation";
import PhotoEditor from "@/components/PhotoEditor";

export default function PersonalizationWizard({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = use(params);
  const searchParams = useSearchParams();
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  // Initial values from URL params (from PDP selections)
  const initialVariants = {
    material: searchParams.get("Material") || searchParams.get("Cover") || product.variants.find(v => v.name === "Material" || v.name === "Cover")?.options[0] || "",
    pageCount: searchParams.get("Page Count") || product.variants.find(v => v.name === "Page Count")?.options[0] || "",
    sizePresetId: searchParams.get("sizePresetId") || product.sizePresets[0]?.id || "medium",
  };

  // Dynamic steps based on product type
  const steps = product.type === 'album' 
    ? [
        { id: 1, title: "Material", subtitle: "Choose your premium finish." },
        { id: 2, title: "Our Names", subtitle: "Who is this album for?" },
        { id: 3, title: "Your Photos", subtitle: "Upload high-res moments." },
        { id: 4, title: "Page Count", subtitle: "How many memories to tell?" },
        { id: 5, title: "Review", subtitle: "Ready for production?" }
      ]
    : [
        { id: 1, title: "Occasion", subtitle: "Tell us about the big day." },
        { id: 2, title: "Names", subtitle: "Who is this story about?" },
        { id: 3, title: "Photos", subtitle: "Upload your favorite moments." },
        { id: 4, title: "Notes", subtitle: "Add dates & messages." },
        { id: 5, title: "Review", subtitle: "Ready to make it forever?" }
      ];

  const router = useRouter();
  const addItem = useCart((state) => state.addItem);
  const initialSizePreset = getSizePresetById(product, initialVariants.sizePresetId);

  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    occasion: "",
    recipientName: "",
    senderName: "",
    photos: [] as string[],
    message: "",
    material: initialVariants.material,
    pageCount: initialVariants.pageCount,
    sizePresetId: initialSizePreset.id,
    layout: null as any,
  });

  const selectedSizePreset = getSizePresetById(product, formData.sizePresetId);

  const nextStep = () => setCurrentStep((s) => Math.min(s + 1, steps.length));
  const prevStep = () => setCurrentStep((s) => Math.max(s - 1, 1));

  const updateFormData = (key: string, value: any) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleAddToCart = () => {
    // Calculate final price with surcharges
    let totalPrice = product.basePrice + selectedSizePreset.priceDelta;
    [formData.material, formData.pageCount].forEach(val => {
      const match = val.match(/\+₹(\d+)/);
      if (match) totalPrice += parseInt(match[1]);
    });

    // Prepare data for cart - store photo count instead of raw URLs that break persistence
    const cartData = {
      ...formData,
      size: selectedSizePreset.label,
      photoCount: formData.photos.length,
      photos: [] // Clear URLs as they expire and break serialization
    };

    addItem({
      id: `${product.id}-${Date.now()}`,
      name: product.name,
      slug: product.slug,
      price: totalPrice,
      image: getProductImagesForSize(product, selectedSizePreset.id)[0] ?? product.images[0],
      quantity: 1,
      personalization: cartData,
    });
    router.push("/cart");
  };

  if (currentStep === 3) {
    return (
      <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#f3f1ee]">
        <PhotoEditor
          initialPhotos={formData.photos}
          projectName={product.type === "album" ? selectedSizePreset.label : `${selectedSizePreset.label}`}
          coverTitle={`${formData.senderName || "you"}&${formData.recipientName || "me"}`}
          sizePreset={selectedSizePreset}
          onBack={prevStep}
          onContinue={nextStep}
          onUpdate={(photos, layout) => {
            updateFormData("photos", photos);
            updateFormData("layout", layout);
          }}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted/30 pt-20 pb-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Progress Stepper */}
        <div className="mb-12 flex justify-between gap-2 overflow-x-auto pb-4 sm:overflow-visible sm:pb-0">
          {steps.map((step) => (
            <div key={step.id} className="flex flex-col gap-2 flex-1 min-w-[100px]">
              <div className={`h-2 rounded-full transition-all ${step.id <= currentStep ? "bg-secondary" : "bg-muted"}`} />
              <span className={`text-[10px] font-bold uppercase tracking-widest ${step.id === currentStep ? "text-primary" : "text-muted-foreground"}`}>
                Step 0{step.id}
              </span>
              <span className={`text-xs font-serif font-bold ${step.id === currentStep ? "text-primary" : "text-muted-foreground"}`}>
                {step.title}
              </span>
            </div>
          ))}
        </div>

        {/* Wizard Card */}
        <div className="rounded-3xl bg-white shadow-2xl shadow-primary/5 flex min-h-[500px] flex-col p-8 lg:p-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="flex flex-grow flex-col gap-10"
            >
              <div className="flex flex-col gap-2">
                <h2 className="font-serif text-3xl font-bold text-primary">{steps[currentStep-1].title}</h2>
                <p className="text-muted-foreground">{steps[currentStep-1].subtitle}</p>
              </div>

              {/* Step 1: Occasion (Book) or Material (Album) */}
              {currentStep === 1 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.type === 'album' ? (
                    product.variants.find(v => v.name === "Material")?.options.map(mat => (
                      <button
                        key={mat}
                        onClick={() => { updateFormData("material", mat); nextStep(); }}
                        className={`h-20 rounded-2xl border-2 flex items-center justify-center font-bold transition-all text-lg ${formData.material === mat ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-105" : "border-muted text-muted-foreground hover:border-secondary hover:text-secondary"}`}
                      >
                        {mat}
                      </button>
                    ))
                  ) : (
                    ["Anniversary", "Birthday", "Proposal", "Wedding"].map(occ => (
                      <button
                        key={occ}
                        onClick={() => { updateFormData("occasion", occ); nextStep(); }}
                        className={`h-20 rounded-2xl border-2 flex items-center justify-center font-bold transition-all text-lg ${formData.occasion === occ ? "border-primary bg-primary text-white shadow-xl shadow-primary/20 scale-105" : "border-muted text-muted-foreground hover:border-secondary hover:text-secondary"}`}
                      >
                        {occ}
                      </button>
                    ))
                  )}
                </div>
              )}

              {/* Step 2: Names */}
              {currentStep === 2 && (
                <div className="flex flex-col gap-8">
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-primary uppercase tracking-widest">Recipient's Name (e.g. My Husband)</label>
                    <input 
                      type="text" 
                      placeholder="Enter name..."
                      value={formData.recipientName}
                      onChange={(e) => updateFormData("recipientName", e.target.value)}
                      className="h-16 w-full rounded-xl border-2 border-muted px-6 text-lg font-medium focus:border-secondary transition-all outline-none"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <label className="text-sm font-bold text-primary uppercase tracking-widest">Your Name (Sender)</label>
                    <input 
                      type="text" 
                      placeholder="Your name..."
                      value={formData.senderName}
                      onChange={(e) => updateFormData("senderName", e.target.value)}
                      className="h-16 w-full rounded-xl border-2 border-muted px-6 text-lg font-medium focus:border-secondary transition-all outline-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 4: Story/Message (Book) or Page Count (Album) */}
              {currentStep === 4 && (
                <div className="flex flex-col gap-6">
                  {product.type === 'album' ? (
                    <div className="flex flex-col gap-4">
                      <label className="text-sm font-bold text-primary uppercase tracking-widest">Select Page Count</label>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        {product.variants.find(v => v.name === "Page Count")?.options.map(pc => (
                          <button
                            key={pc}
                            onClick={() => updateFormData("pageCount", pc)}
                            className={`h-16 rounded-xl border-2 flex items-center justify-center font-bold transition-all text-sm ${formData.pageCount === pc ? "border-secondary bg-secondary/5 text-secondary" : "border-muted text-muted-foreground"}`}
                          >
                            {pc}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <>
                      <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-primary uppercase tracking-widest">The "Golden Date" (A special day to mention)</label>
                        <input 
                          type="date"
                          className="h-14 w-full rounded-xl border-2 border-muted px-6 text-lg"
                        />
                      </div>
                      <div className="flex flex-col gap-4">
                        <label className="text-sm font-bold text-primary uppercase tracking-widest">Custom Dedication Page Message</label>
                        <textarea 
                          placeholder="Write a message that will go on the first page..."
                          value={formData.message}
                          onChange={(e) => updateFormData("message", e.target.value)}
                          rows={5}
                          className="w-full rounded-xl border-2 border-muted p-6 text-lg font-medium focus:border-secondary outline-none transition-all"
                        />
                      </div>
                    </>
                  )}
                </div>
              )}

              {/* Step 5: Review */}
              {currentStep === 5 && (
                <div className="flex flex-col gap-8">
                  <div className="rounded-2xl bg-muted/50 p-6 flex flex-col gap-4 border border-secondary/20">
                     <div className="flex justify-between items-center pb-4 border-b border-muted">
                        <span className="font-serif text-xl font-bold text-primary">Summary</span>
                        <CheckCircle2 className="h-6 w-6 text-green-500" />
                     </div>
                     <div className="grid grid-cols-2 gap-y-4 text-sm font-medium">
                        {product.type === 'album' ? (
                          <>
                            <span className="text-muted-foreground">Size</span> <span>{selectedSizePreset.label}</span>
                            <span className="text-muted-foreground">Material</span> <span className="text-primary italic">{formData.material}</span>
                            <span className="text-muted-foreground">Page Count</span> <span>{formData.pageCount}</span>
                          </>
                        ) : (
                          <>
                            <span className="text-muted-foreground">Size</span> <span>{selectedSizePreset.label}</span>
                            <span className="text-muted-foreground">Occasion</span> <span className="text-primary uppercase tracking-widest">{formData.occasion}</span>
                          </>
                        )}
                        <span className="text-muted-foreground">Recipient</span> <span>{formData.recipientName}</span>
                        <span className="text-muted-foreground">Giver</span> <span>{formData.senderName}</span>
                        {product.type === 'book' && (
                          <>
                            <span className="text-muted-foreground">Personal Message</span> <span className="italic">" {formData.message.substring(0, 30)}... "</span>
                          </>
                        )}
                      </div>
                  </div>
                  <div className="relative aspect-video rounded-2xl overflow-hidden shadow-xl">
                      <Image src={getProductImagesForSize(product, selectedSizePreset.id)[0] ?? product.images[0]} alt="Product Preview" fill className="object-contain bg-white p-4" unoptimized />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                         <span className="bg-white/90 px-6 py-2 rounded-full font-bold text-primary text-sm shadow-lg">Final Preview</span>
                      </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="mt-12 flex items-center justify-between border-t border-muted pt-8">
            <button
              onClick={prevStep}
              className={`flex h-12 items-center gap-2 font-bold transition-all ${currentStep === 1 ? "opacity-0 pointer-events-none" : "text-primary hover:text-secondary underline"}`}
            >
              <ArrowLeft className="h-5 w-5" />
              Back
            </button>
            
            {currentStep < 5 ? (
              <button
                onClick={nextStep}
                className="flex h-14 items-center gap-3 rounded-xl bg-primary px-10 text-white font-bold shadow-xl shadow-primary/20 transition-all hover:bg-primary/90"
              >
                Continue
                <ArrowRight className="h-5 w-5" />
              </button>
            ) : (
              <button
                onClick={handleAddToCart}
                className="flex h-14 items-center gap-3 rounded-xl bg-secondary px-10 text-white font-bold shadow-xl shadow-secondary/20 transition-all hover:bg-secondary/90 animate-pulse"
              >
                <Heart className="h-6 w-6" fill="white" />
                Add to Cart
              </button>
            )}
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-8 flex flex-col lg:flex-row items-center justify-between gap-6 px-4">
           <div className="flex items-center gap-4 text-sm font-bold text-primary/60 uppercase tracking-widest italic">
              <Sparkles className="h-4 w-4" />
              <span>We'll handle the design perfection</span>
           </div>
           <p className="text-xs text-muted-foreground max-w-xs text-center lg:text-right">
             Our curators review every personalization to ensure high print quality for your most precious moments.
           </p>
        </div>
      </div>
    </div>
  );
}
