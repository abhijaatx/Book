import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import Link from "next/link";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const isAllProducts = slug === "all";
  const category = isAllProducts ? null : getCategoryBySlug(slug);
  return {
    title: isAllProducts ? "all products — kahaani" : `${category?.name || slug} — kahaani`,
    description: category?.description,
  };
}

export default async function CategoryPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const isAllProducts = slug === "all";
  const category = isAllProducts ? null : getCategoryBySlug(slug);
  const categoryProducts = getProductsByCategory(slug);

  if (!isAllProducts && !category) {
    notFound();
  }

  const metadata = isAllProducts
    ? {
        name: "all products",
        description: `Everything we've designed to help you manifest your magic.`,
      }
    : {
        name: category?.name ?? slug.replace(/-/g, " "),
        description: category?.description ?? "Browse our collection of handcrafted keepsakes.",
      };

  return (
    <div className="flex flex-col bg-[#FFFDF5] selection:bg-primary/10">
      
      {/* Editorial Category Header */}
      <section className="relative overflow-hidden bg-primary pt-24 pb-20 lg:pt-32 lg:pb-28">
        {/* Decorative Background Elements */}
        <div className="absolute top-0 right-0 w-[40%] h-full opacity-10 pointer-events-none">
           <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
              <path d="M0,0 Q50,50 0,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
           </svg>
        </div>
        <div className="absolute bottom-0 left-0 w-[30%] h-full opacity-5 pointer-events-none">
           <svg className="w-full h-full text-white" viewBox="0 0 100 100" preserveAspectRatio="none">
              <circle cx="0" cy="100" r="80" fill="none" stroke="currentColor" strokeWidth="0.2" />
           </svg>
        </div>

        <div className="mx-auto max-w-[1440px] px-6 lg:px-12 relative">
          <div className="flex flex-col gap-10 max-w-3xl text-center lg:text-left">
             <div className="flex flex-col gap-6">
                <div className="flex items-center justify-center lg:justify-start gap-4">
                   <div className="h-[1px] w-8 bg-white/40" />
                   <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">
                     {categoryProducts.length} Curated Pieces
                   </span>
                </div>
                <h1 className="font-serif text-[48px] lg:text-[88px] leading-[0.9] tracking-[-0.04em] text-white lowercase">
                  The <span className="italic font-medium">{metadata.name}</span> <br/> Collection
                </h1>
                <p className="text-[15px] lg:text-[18px] font-medium text-white/40 max-w-[500px] leading-relaxed italic">
                  {metadata.description} Handcrafted with love by Kahaani, designed to honor your everyday magic.
                </p>
             </div>
          </div>
        </div>
      </section>

      {/* Main Product Grid Section */}
      <section className="mx-auto w-full max-w-[1440px] px-6 py-20 lg:px-12 lg:py-32">
        {/* Category Description Sidebar for Desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
           
           <div className="lg:col-span-12">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
                {categoryProducts.map((product) => (
                  <ProductCard key={product.slug} product={product} />
                ))}
              </div>

              {categoryProducts.length === 0 && (
                <div className="py-40 text-center flex flex-col items-center gap-10 bg-white/40 rounded-[4rem] border-2 border-dashed border-foreground/5">
                   <div className="flex flex-col gap-4">
                      <h3 className="font-serif text-3xl italic text-foreground/20">The story is just beginning...</h3>
                      <p className="text-[12px] font-black uppercase tracking-widest text-foreground/40">New designs arriving in our studio soon.</p>
                   </div>
                   <Link 
                     href="/category/all" 
                     className="inline-flex h-14 items-center justify-center px-10 rounded-full bg-primary text-white text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-premium shadow-xl shadow-primary/20"
                   >
                     Explore All Products
                   </Link>
                </div>
              )}
           </div>
        </div>
      </section>

      {/* Editorial Content / Social Proof Placeholder */}
      <section className="py-32 bg-white">
         <div className="mx-auto max-w-screen-xl px-6 lg:px-12">
            <div className="flex flex-col items-center text-center gap-12">
               <h2 className="font-serif text-[40px] lg:text-[64px] tracking-tight text-foreground lowercase">Our design team is <span className="italic">here</span> to help.</h2>
               <p className="text-[15px] lg:text-[18px] text-foreground/40 max-w-2xl font-medium leading-relaxed italic">
                  Not sure which layout to choose? Our studio designers are available to guide you in creating the perfect keepsake.
               </p>
               <Link href="/contact" className="text-[11px] font-black uppercase tracking-[0.4em] text-primary border-b-2 border-primary/20 pb-2 hover:border-primary transition-all">
                  Connect with a Studio Expert
               </Link>
            </div>
         </div>
      </section>
    </div>
  );
}
