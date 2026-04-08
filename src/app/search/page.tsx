"use client";

import { useSearchParams } from "next/navigation";
import { Suspense } from "react";
import ProductCard from "@/components/ProductCard";
import { getAllProducts } from "@/lib/products";
import { Search } from "lucide-react";

function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") ?? "";
  
  const results = getAllProducts().filter((product) => {
    if (!query) return false;
    const term = query.toLowerCase();
    return (
      product.name.toLowerCase().includes(term) ||
      product.category.name.toLowerCase().includes(term) ||
      product.description.toLowerCase().includes(term)
    );
  });

  return (
    <div className="flex flex-col gap-16">
      <div className="flex flex-col gap-4 text-center lg:text-left">
         <h1 className="font-serif text-[48px] lg:text-[72px] tracking-tight text-foreground lowercase">
           Search Results
         </h1>
         <p className="text-[15px] font-medium text-foreground/40 italic">
           {query ? `${results.length} result${results.length !== 1 ? 's' : ''} for "${query}"` : "Please enter a search term"}
         </p>
      </div>

      {results.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {results.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : query ? (
        <div className="flex flex-col items-center justify-center gap-6 py-20 text-center">
           <div className="h-24 w-24 rounded-full bg-white flex items-center justify-center shadow-xl shadow-primary/5">
             <Search className="h-8 w-8 text-foreground/20" />
           </div>
           <p className="font-serif text-[32px] lowercase tracking-tight">Nothing found for "{query}"</p>
           <p className="text-sm font-medium text-foreground/40">Try searching for something else like "anniversary" or "travel".</p>
        </div>
      ) : null}
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="min-h-screen bg-[#FFFDF5] selection:bg-primary/10 pb-32">
      <div className="mx-auto max-w-[1440px] px-6 lg:px-12 pt-16 lg:pt-24 leading-normal">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[40vh]">
             <div className="animate-spin h-8 w-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        }>
          <SearchResults />
        </Suspense>
      </div>
    </div>
  );
}
