import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { getCatalogStats } from "@/lib/products";

export default function Hero() {
  const stats = getCatalogStats();

  return (
    <section className="relative w-full overflow-hidden bg-muted py-20 lg:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Text Content */}
          <div className="flex flex-col gap-8 text-center lg:text-left">
            <div className="flex flex-col gap-4">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">Premium Personalized Gifting</span>
              <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-tight text-primary">
                Your Most Beautiful Stories, <br />
                <span className="text-secondary italic">Handcrafted</span>.
              </h1>
              <p className="text-lg text-muted-foreground max-w-xl leading-relaxed">
                Transform your cherished memories into timeless storybooks and luxury photo albums. Explore {stats.totalProducts}+ customizable designs across {stats.totalCategories} curated gifting collections.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link 
                href="/category/anniversary" 
                className="inline-flex h-14 items-center justify-center gap-2 rounded-xl bg-primary px-8 text-white font-bold transition-all hover:bg-primary/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-primary/20"
              >
                Create Your Book
                <ArrowRight className="h-5 w-5" />
              </Link>
              <Link 
                href="/category/all" 
                className="inline-flex h-14 items-center justify-center rounded-xl border-2 border-primary/20 px-8 text-primary font-bold transition-all hover:bg-primary/5"
              >
                Browse 200+ Designs
              </Link>
            </div>

            <div className="flex items-center gap-6 justify-center lg:justify-start text-sm text-muted-foreground pt-4">
              <div className="flex -space-x-2">
                {[1,2,3,4].map(i => (
                  <div key={i} className="h-8 w-8 rounded-full bg-secondary border-2 border-white flex items-center justify-center text-[10px] text-white">❤️</div>
                ))}
              </div>
              <span>Trusted by 10,000+ happy couples across India</span>
            </div>
          </div>

          {/* Visual Content */}
          <div className="relative aspect-square lg:aspect-[4/5] w-full max-w-lg mx-auto">
            <div className="absolute inset-0 bg-secondary/10 rounded-3xl -rotate-3 transition-transform hover:rotate-0 duration-500"></div>
            <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl shadow-primary/30 rotate-2 transition-transform hover:rotate-0 duration-500 border-8 border-white">
              <Image
                src="/images/anniversary-book.png"
                alt="Personalized Anniversary Storybook"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
              <div className="absolute bottom-8 left-8 text-white">
                <p className="font-serif text-2xl font-bold">"The Anniversary Collection"</p>
                <p className="text-sm font-medium opacity-90">Personalize with your own story & photos</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
