import Image from "next/image";
import Link from "next/link";
import { Heart, ShoppingBag } from "lucide-react";
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
    <div className="group relative flex h-full flex-col gap-4 transition-transform duration-300 hover:-translate-y-1">
      <Link
        href={`/product/${product.slug}`}
        className="relative flex min-h-[290px] items-center justify-center overflow-hidden rounded-[2rem] bg-[#fffdf8] p-6 shadow-[0_18px_42px_rgba(31,23,38,0.08)]"
      >
        <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-primary shadow-sm backdrop-blur-sm transition-colors hover:bg-secondary hover:text-white">
          <Heart className="h-4 w-4" />
        </div>
        <div className="absolute left-4 top-4 rounded-full bg-primary/90 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-sm">
          {product.category.name}
        </div>
        <div
          className="relative w-full transition-transform duration-500 group-hover:scale-105"
          style={{ aspectRatio: String(defaultSizePreset.catalogAspectRatio) }}
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-contain"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            unoptimized
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col items-center gap-1 px-2 text-center">
        <Link href={`/product/${product.slug}`} className="font-serif text-[2rem] font-bold leading-tight text-primary hover:underline">
          {product.name}
        </Link>
        <p className="text-sm font-medium text-muted-foreground">{defaultSizePreset.label}</p>
        <p className="max-w-[18rem] text-sm leading-relaxed text-muted-foreground line-clamp-2">{product.description}</p>
        <span className="pt-1 font-sans text-2xl font-extrabold text-secondary">₹{displayPrice}</span>
      </div>

      <Link
        href={`/product/${product.slug}`}
        className="mt-auto inline-flex items-center justify-center gap-2 self-center rounded-full border border-primary/12 px-5 py-3 text-sm font-bold text-primary transition-all hover:border-secondary/40 hover:bg-secondary/5"
      >
        <ShoppingBag className="h-5 w-5" />
        Personalize
      </Link>
    </div>
  );
}
