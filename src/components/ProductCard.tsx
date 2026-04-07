import Image from "next/image";
import Link from "next/link";
import {
  getDefaultSizePreset,
  getProductImagesForSize,
  getProductPrice,
  Product,
} from "@/lib/products";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const defaultSizePreset = getDefaultSizePreset(product);
  const productImage = getProductImagesForSize(product, defaultSizePreset.id)[0] ?? product.images[0];
  const displayPrice = getProductPrice(product, defaultSizePreset.id);

  return (
    <div className="group relative flex flex-col items-center gap-6 rounded-[2rem] bg-white p-4 shadow-sm transition-all duration-500 hover:shadow-xl hover:shadow-primary/5">
      <div className="relative aspect-[0.76] w-full overflow-hidden rounded-[1.5rem] bg-[#f9f9f9] transition-transform duration-500 group-hover:scale-[1.02]">
        <Image
          src={productImage}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          unoptimized
        />
        {/* Category Badge */}
        <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[9px] font-black uppercase tracking-wider text-primary backdrop-blur-sm">
          {product.category.name}
        </div>
      </div>

      <div className="flex w-full flex-col items-center gap-4 px-2 pb-2">
        <div className="flex flex-col items-center gap-1 text-center">
          <Link 
            href={`/product/${product.slug}`} 
            className="font-serif text-[20px] font-bold leading-tight tracking-tight text-foreground transition-premium hover:opacity-60"
          >
            {product.name}
          </Link>
          <p className="text-[14px] font-medium text-foreground/40 italic">
            From ₹{displayPrice}
          </p>
        </div>

        <Link
          href={`/product/${product.slug}`}
          className="inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-white font-black text-[11px] uppercase tracking-[0.2em] shadow-lg shadow-primary/20 transition-all duration-300 hover:scale-[1.05] hover:bg-primary-pressed active:scale-95"
        >
          Personalize
        </Link>
      </div>
    </div>
  );
}
