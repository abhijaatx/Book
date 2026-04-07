import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Sparkles, Truck, ShieldCheck, Heart } from "lucide-react";
import { getAllCategories, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts(12);
  const categories = getAllCategories();

  return (
    <div className="flex flex-col bg-[#FFFDF5] selection:bg-primary/10">
      
      {/* Editorial Header Section */}
      <section className="relative overflow-hidden pt-20 pb-16 lg:pt-32 lg:pb-24">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="flex flex-col items-center text-center gap-8 lg:gap-12">
            <div className="flex flex-col items-center gap-6">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">The Personalized Keepsake Studio</span>
              <h1 className="max-w-[900px] font-serif text-[48px] lg:text-[88px] leading-[1.1] tracking-[-0.04em] text-foreground lowercase">
                Personalized <span className="italic">Gifts</span>: Treasures for Your Most Intentional Days.
              </h1>
              <p className="max-w-[800px] text-[15px] lg:text-[18px] font-medium text-foreground/50 leading-relaxed italic">
                From handcrafted photobooks and photo magazines to retro newspapers. Transform your simple moments into a family legacy.
              </p>
            </div>

            {/* Category Navigation Chips */}
            <div className="w-full overflow-hidden">
              <div className="flex w-full items-center justify-start lg:justify-center gap-3 overflow-x-auto pb-8 px-6 lg:px-0 scrollbar-hide">
                <Link 
                  href="/category/all" 
                  className="whitespace-nowrap rounded-full bg-primary px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-white shadow-xl shadow-primary/20 transition-all hover:scale-105"
                >
                  Shop All
                </Link>
                {categories.slice(0, 4).map((cat) => (
                  <Link 
                    key={cat.slug}
                    href={`/category/${cat.slug}`} 
                    className="whitespace-nowrap rounded-full bg-white px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] text-foreground/40 shadow-sm border border-foreground/5 transition-all hover:border-primary hover:text-primary"
                  >
                    {cat.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Product Grid */}
      <section className="pb-32">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Editorial Break Section */}
      <section className="py-32 bg-white/50 border-y border-foreground/5">
        <div className="mx-auto max-w-4xl px-6 text-center flex flex-col gap-8">
           <svg className="w-12 h-12 text-primary/20 mx-auto" viewBox="0 0 24 24" fill="currentColor">
             <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V9C13.017 6.79086 14.8079 5 17.017 5H20.017C22.2261 5 24.017 6.79086 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0 15V9C0 6.79086 1.79086 5 4 5H7C9.20914 5 11 6.79086 11 9V15C11 18.3137 8.31371 21 5 21H1V18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C2.44772 8 2 8.44772 2 9V12C2 12.5523 1.55228 13 1 13H0V15Z" />
           </svg>
           <h2 className="font-serif text-[32px] lg:text-[44px] leading-tight tracking-tight italic text-foreground/80">
             "The most meaningful gift is the one only you can tell. Handcrafted with love, for the moments you never want to forget.",
           </h2>
           <span className="text-[11px] font-black uppercase tracking-[0.4em] text-primary">The Art of Storytelling</span>
        </div>
      </section>

      {/* Need Help / Inspiration Gallery Section */}
      <section className="py-32 bg-white">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
          <div className="rounded-[4rem] bg-[#f9f9f9] p-12 lg:p-24 flex flex-col items-center text-center gap-12">
             <div className="flex flex-col gap-4">
                <h2 className="font-serif text-[40px] lg:text-[64px] tracking-tight text-foreground">Need help telling your story?</h2>
                <p className="text-[15px] lg:text-[18px] text-foreground/40 max-w-2xl mx-auto">
                   Our design team is available to guide you on layout choices, photo selection, and personalized touches to ensure your book is perfect.
                </p>
             </div>
             
             <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link 
                  href="/contact" 
                  className="inline-flex h-16 items-center justify-center px-12 rounded-full bg-[#606c38] text-white font-black text-xs uppercase tracking-[0.2em] shadow-xl shadow-[#606c38]/20 transition-premium hover:scale-105"
                >
                  Chat with a Designer
                </Link>
                <Link 
                  href="/category/photobooks" 
                  className="inline-flex h-16 items-center justify-center px-12 rounded-full bg-white border border-foreground/10 text-foreground font-black text-xs uppercase tracking-[0.2em] transition-premium hover:scale-105"
                >
                  View Inspiration Gallery
                </Link>
             </div>
          </div>
        </div>
      </section>

      {/* Voices from the Studio Section */}
      <section className="py-32 bg-[#FFFDF5]">
        <div className="mx-auto max-w-[1440px] px-6 lg:px-12">
           <div className="flex flex-col gap-24">
              <div className="flex flex-col gap-4 text-center lg:text-left">
                 <span className="text-[10px] font-black uppercase tracking-[0.4em] text-primary/60">The Kahaani Community</span>
                 <h2 className="font-serif text-[48px] lg:text-[72px] tracking-tight text-foreground lowercase">Voices from the Studio</h2>
                 <p className="text-[15px] lg:text-[18px] font-medium text-foreground/30 italic max-w-xl mx-auto lg:mx-0">Stories told, memories preserved, and legacies built by your own hands.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
                 {[
                   {
                     quote: "The linen cover feels like a family heirloom. I created a book for my grandmother's 80th birthday, and seeing her flip through those pages was the highlight of our year.",
                     author: "Ananya M.",
                     location: "Mumbai"
                   },
                   {
                     quote: "Technical excellence meets heart. The photo quality is crisp, and the thick matte pages are exactly what my wedding photos deserved. Truly a treasure.",
                     author: "Rohan S.",
                     location: "Delhi"
                   },
                   {
                     quote: "I was worried about the layout, but the design team was so helpful. They turned 200 of my travel photos into a cohesive, beautiful story. I've already started my next one!",
                     author: "Priya K.",
                     location: "Bangalore"
                   }
                 ].map((review, i) => (
                   <div key={i} className="flex flex-col gap-10 group">
                      <div className="flex flex-col gap-8 relative">
                         <div className="absolute -top-6 -left-4 text-primary/10 transition-transform group-hover:scale-110">
                            <svg className="w-16 h-16" viewBox="0 0 24 24" fill="currentColor">
                               <path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C15.4647 8 15.017 8.44772 15.017 9V12C15.017 12.5523 14.5693 13 14.017 13H13.017V9C13.017 6.79086 14.8079 5 17.017 5H20.017C22.2261 5 24.017 6.79086 24.017 9V15C24.017 18.3137 21.3307 21 18.017 21H14.017ZM0 15V9C0 6.79086 1.79086 5 4 5H7C9.20914 5 11 6.79086 11 9V15C11 18.3137 8.31371 21 5 21H1V18C1 16.8954 1.89543 16 3 16H6C6.55228 16 7 15.5523 7 15V9C7 8.44772 6.55228 8 6 8H3C2.44772 8 2 8.44772 2 9V12C2 12.5523 1.55228 13 1 13H0V15Z" />
                            </svg>
                         </div>
                         <h3 className="font-serif text-[24px] leading-relaxed text-foreground/80 tracking-tight transition-premium hover:text-primary z-10">
                            "{review.quote}"
                         </h3>
                      </div>
                      <div className="flex items-center gap-4 border-t border-foreground/5 pt-8">
                         <div className="flex flex-col gap-1">
                            <span className="text-[12px] font-black uppercase tracking-widest">{review.author}</span>
                            <span className="text-[10px] font-medium text-foreground/30 uppercase tracking-[0.2em]">{review.location}</span>
                         </div>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </section>

      {/* Brand Values / Trust Badges */}
      <section className="py-24 bg-[#FFFDF5] border-t border-foreground/5">
        <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="flex flex-col items-center text-center gap-4">
              <Heart size={24} className="text-primary" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Handcrafted with Love</h3>
                <p className="text-[12px] leading-relaxed text-foreground/40 font-medium">Each piece is individually quality checked by our studio team.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <Truck size={24} className="text-primary" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Ships in 3-5 Days</h3>
                <p className="text-[12px] leading-relaxed text-foreground/40 font-medium">Free standard shipping on orders above ₹2,000.</p>
              </div>
            </div>
            <div className="flex flex-col items-center text-center gap-4">
              <ShieldCheck size={24} className="text-primary" />
              <div className="flex flex-col gap-2">
                <h3 className="text-[11px] font-black uppercase tracking-[0.3em]">Secure Keepsake</h3>
                <p className="text-[12px] leading-relaxed text-foreground/40 font-medium">Encryption ensures your memories and data are always safe.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
