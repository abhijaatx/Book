import ProductCard from "@/components/ProductCard";
import { getCategoryBySlug, getProductsByCategory } from "@/lib/products";
import { notFound } from "next/navigation";

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
        name: "All Products",
        description: `Browse our full catalog of ${categoryProducts.length}+ handcrafted personalized gifts and albums.`,
      }
    : {
        name: category?.name ?? slug.replace(/-/g, " "),
        description: category?.description ?? "Browse our collection of handcrafted keepsakes.",
      };

  return (
    <div className="flex flex-col gap-12 bg-white pb-20">
      {/* Category Hero */}
      <section className="bg-muted py-24 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 max-w-2xl mx-auto">
             <h1 className="font-serif text-5xl font-bold text-primary capitalize">{metadata.name}</h1>
             <p className="text-lg text-muted-foreground">{metadata.description}</p>
             <p className="text-xs font-bold uppercase tracking-[0.28em] text-secondary">
               {categoryProducts.length} products ready to personalize
             </p>
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto w-full max-w-7xl bg-white px-4 pb-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-x-8 gap-y-14 md:grid-cols-2 xl:grid-cols-4">
          {categoryProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {categoryProducts.length === 0 && (
          <div className="py-20 text-center text-muted-foreground flex flex-col items-center gap-6">
            <p>No products found in this category yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Category SEO Content */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 pt-20">
         <div className="border-t border-muted-foreground/10 pt-10 text-justify">
           <h2 className="font-serif text-2xl font-bold text-primary mb-4 italic">The perfect {metadata.name} gift for those who matter.</h2>
           <p className="text-sm text-muted-foreground leading-relaxed">
             Our {metadata.name} collection is designed with one goal: to create a premium, long-lasting memory that captures the essence of your connection. Whether you're looking for an anniversary gift for parents, a wedding heirloom album, or a playful milestone book, our personalized gifts in India are handcrafted to feel deeply personal and beautifully finished.
           </p>
         </div>
      </section>
    </div>
  );
}
