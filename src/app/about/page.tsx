import Image from "next/image";
import { Heart, Sparkles, ShieldCheck, Truck, Clock } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-32 pb-32">
      {/* Hero */}
      <section className="bg-muted py-32 text-center overflow-hidden relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-8 relative z-10">
          <div className="flex flex-col gap-4">
             <span className="text-secondary font-bold uppercase tracking-widest text-xs italic">Our Story</span>
             <h1 className="font-serif text-6xl lg:text-8xl font-bold text-primary">Made with Love, <br /> Forever.</h1>
          </div>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed italic">
            At Kahaani Books, we believe every relationship is a unique story that deserves to be printed on the world's most beautiful paper.
          </p>
        </div>
        <div className="absolute top-1/2 left-0 w-full h-1 bg-secondary/10 -translate-y-1/2"></div>
      </section>

      {/* Main Content */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
           <div className="relative aspect-square rounded-3xl overflow-hidden shadow-2xl border-8 border-white">
              <Image src="/images/anniversary-book.png" alt="Our Craftsmanship" fill className="object-cover" />
           </div>
           <div className="flex flex-col gap-8 text-justify leading-relaxed">
             <h2 className="font-serif text-4xl font-bold text-primary italic">Born in New Delhi, 2024.</h2>
             <p className="text-muted-foreground text-lg">
                Kahaani Books was founded on a simple realization: the digital age has made our most precious memories ephemeral. We take thousands of photos, yet we rarely touch them. We wanted to bring back the tactile joy of holding a memory in your hands.
             </p>
             <p className="text-muted-foreground text-lg">
                What started as a small studio for handcrafted wedding albums in Green Park has grown into India's leading platform for personalized storytelling. Every book we produce is more than just paper and ink—it's a celebration of your journey, your love, and your legacy.
             </p>
             <div className="flex items-center gap-4 text-xs font-bold text-primary uppercase tracking-widest italic py-4 border-y border-muted">
                <Heart className="h-5 w-5 text-secondary" fill="currentColor" />
                <span>Handcrafted with precision for you</span>
             </div>
           </div>
        </div>
      </section>

      {/* Quality Pillar Section */}
      <section className="bg-[#322030] py-32 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col gap-20">
           <div className="flex flex-col gap-4 text-center items-center">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">The Kahaani Promise</span>
              <h2 className="font-serif text-4xl lg:text-6xl font-bold">Uncompromising Quality.</h2>
              <p className="text-[#D8B4E2] max-w-xl mx-auto italic">We don't just print books; we build heirlooms.</p>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                 <Sparkles className="h-10 w-10 text-secondary" />
                 <h3 className="font-serif text-2xl font-bold italic">Gold Foiling</h3>
                 <p className="text-sm text-[#D8B4E2] opacity-80 leading-relaxed">Every cover is individually stamped with high-quality gold or silver foil for a truly luxury touch.</p>
              </div>
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                 <ShieldCheck className="h-10 w-10 text-secondary" />
                 <h3 className="font-serif text-2xl font-bold italic">Archival Paper</h3>
                 <p className="text-sm text-[#D8B4E2] opacity-80 leading-relaxed">Our paper is acid-free and museum-grade, ensuring your photos won't fade for a hundred years.</p>
              </div>
              <div className="flex flex-col gap-6 p-8 rounded-3xl bg-white/5 border border-white/10 transition-all hover:bg-white/10">
                 <Truck className="h-10 w-10 text-secondary" />
                 <h3 className="font-serif text-2xl font-bold italic">Pan-India Express</h3>
                 <p className="text-sm text-[#D8B4E2] opacity-80 leading-relaxed">From Srinagar to Kanyakumari, we deliver your stories safely with white-glove shipping partners.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
         <div className="flex justify-center"><Clock className="h-12 w-12 text-secondary opacity-20" /></div>
         <h2 className="font-serif text-4xl font-bold text-primary">Your memories, our canvas.</h2>
         <p className="text-lg text-muted-foreground leading-relaxed italic">
           We take pride in every single book. Our small team in New Delhi reviews every layout, optimizes every photo, and ensures that when you open your Kahaani Book, it feels like opening a piece of your heart.
         </p>
         <div className="pt-10 flex flex-col items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-muted border-4 border-white shadow-lg overflow-hidden relative">
               <span className="absolute inset-0 flex items-center justify-center font-bold text-xs text-primary/40 uppercase">HQ</span>
            </div>
            <span className="text-xs font-bold text-primary uppercase tracking-[0.2em] italic underline decoration-secondary">Proudly Made in India</span>
         </div>
      </section>
    </div>
  );
}
