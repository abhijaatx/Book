import { getProductBySlug } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";

export default async function ProductDetailPage({ 
  params 
}: { 
  params: Promise<{ slug: string }> 
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-20 pb-32">
      {/* Product Top */}
      <section className="mx-auto max-w-screen-2xl px-4 pt-12 sm:px-6 lg:px-8 lg:pt-20">
        <ProductDetails product={product} />
      </section>

      {/* Storytelling Section */}
      <section className="bg-muted py-32">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 text-center flex flex-col gap-10">
           <div className="flex flex-col gap-4">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">
                {product.type === 'album' ? 'A Handcrafted Heirloom' : 'A Handcrafted Storybook'}
              </span>
              <h2 className="font-serif text-4xl font-bold text-primary">
                {product.type === 'album' ? 'Preserve your legacy.' : 'Capture your magic journey.'}
              </h2>
           </div>
           <p className="text-lg text-muted-foreground leading-relaxed text-center">
             {product.longDescription}
           </p>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-12 py-10">
              <div className="flex flex-col gap-4 text-center">
                 <div className="text-primary font-serif text-2xl font-bold italic">01. {product.type === 'album' ? 'Choose Material' : 'Choose Theme'}</div>
                 <p className="text-sm text-muted-foreground leading-relaxed">{product.type === 'album' ? 'Leather, Linen or Suede with gold foiling.' : 'Pick from dozens of romantic and premium themes.'}</p>
              </div>
              <div className="flex flex-col gap-4 text-center">
                 <div className="text-primary font-serif text-2xl font-bold italic">02. Add Photos</div>
                 <p className="text-sm text-muted-foreground leading-relaxed">Upload your most cherished photos on high-quality paper.</p>
              </div>
              <div className="flex flex-col gap-4 text-center">
                 <div className="text-primary font-serif text-2xl font-bold italic">03. {product.type === 'album' ? 'Lay-Flat Design' : 'Tell Your Story'}</div>
                 <p className="text-sm text-muted-foreground leading-relaxed">{product.type === 'album' ? 'Archival pages that span across perfectly.' : 'Add dates, milestones, and personal messages.'}</p>
              </div>
           </div>
        </div>
      </section>
    </div>
  );
}
