import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full overflow-hidden bg-background">
      <div className="flex flex-col lg:flex-row min-h-[700px]">
        {/* Left: Lifestyle Image */}
        <div className="relative w-full lg:w-[55%] h-[400px] lg:h-auto overflow-hidden">
          <Image
            src="https://images.unsplash.com/photo-1516962080544-eac695c93791?q=80&w=2000&auto=format&fit=crop"
            alt="Kahaani Lifestyle"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Right: Content Box */}
        <div className="flex flex-1 items-center justify-center bg-primary p-8 lg:p-20">
          <div className="max-w-[500px] flex flex-col gap-10 items-center text-center lg:items-start lg:text-left">
            <div className="flex flex-col gap-6">
              <h1 className="font-serif text-[56px] lg:text-[72px] leading-[1] tracking-[-0.04em] text-foreground lowercase">
                make every <br />
                moment <br />
                magic
              </h1>
              <p className="text-[14px] lg:text-[16px] font-bold uppercase tracking-[0.2em] text-foreground/60 leading-relaxed max-w-[400px]">
                Personalized planners, notebooks & photobooks designed for your biggest dreams.
              </p>
            </div>
            
            <Link 
              href="/category/planners" 
              className="group inline-flex h-16 items-center justify-center gap-4 rounded-full bg-foreground px-12 text-background font-black text-xs uppercase tracking-[0.2em] transition-premium hover:scale-105 active:scale-95"
            >
              SHOP NOW
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
