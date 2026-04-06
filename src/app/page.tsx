import Hero from "@/components/Hero";
import ProductCard from "@/components/ProductCard";
import Image from "next/image";
import Link from "next/link";
import { Heart, Sparkles, Truck, ShieldCheck } from "lucide-react";
import { getAllCategories, getCatalogStats, getFeaturedProducts } from "@/lib/products";

export default function Home() {
  const featuredProducts = getFeaturedProducts(8);
  const categories = getAllCategories();
  const stats = getCatalogStats();

  const benefits = [
    { icon: Heart, name: "Handcrafted with Love", desc: "Every book is custom designed and produced in our New Delhi studio." },
    { icon: Sparkles, name: "Premium Quality", desc: "Gold foiling, archival paper, and luxury hardbound covers." },
    { icon: Truck, name: "Pan-India Shipping", desc: "Express delivery to 19,000+ pincodes across India." },
    { icon: ShieldCheck, name: "Secure Payments", desc: "100% safe & trusted transactions via Razorpay." },
  ];

  return (
    <div className="flex flex-col gap-20 pb-20">
      <Hero />

      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 sm:px-6 lg:grid-cols-3 lg:px-8">
        <div className="rounded-3xl border border-secondary/15 bg-white px-6 py-7 shadow-lg shadow-primary/5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Catalog Size</p>
          <p className="mt-3 font-serif text-4xl font-bold text-primary">{stats.totalProducts}+</p>
          <p className="mt-2 text-sm text-muted-foreground">Personalized books and albums now live across the storefront.</p>
        </div>
        <div className="rounded-3xl border border-secondary/15 bg-white px-6 py-7 shadow-lg shadow-primary/5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Collections</p>
          <p className="mt-3 font-serif text-4xl font-bold text-primary">{stats.totalCategories}</p>
          <p className="mt-2 text-sm text-muted-foreground">Occasion-led categories spanning romance, family, travel, and milestone gifting.</p>
        </div>
        <div className="rounded-3xl border border-secondary/15 bg-white px-6 py-7 shadow-lg shadow-primary/5">
          <p className="text-xs font-bold uppercase tracking-[0.24em] text-secondary">Formats</p>
          <p className="mt-3 font-serif text-4xl font-bold text-primary">{stats.totalBooks} books / {stats.totalAlbums} albums</p>
          <p className="mt-2 text-sm text-muted-foreground">Built for both guided storybooks and premium lay-flat album personalization flows.</p>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((benefit) => (
            <div key={benefit.name} className="flex flex-col items-center text-center gap-4 group">
              <div className="h-14 w-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary transition-transform group-hover:scale-110">
                <benefit.icon className="h-8 w-8" />
              </div>
              <div className="flex flex-col gap-1">
                <h3 className="font-serif text-lg font-bold text-primary">{benefit.name}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{benefit.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="bg-muted py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-12 items-center text-center">
            <div className="flex flex-col gap-4">
              <span className="text-secondary font-bold uppercase tracking-widest text-xs">The Best Sellers</span>
              <h2 className="font-serif text-4xl lg:text-5xl font-bold text-primary">Crowd Favorites</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">Explore the most-loved picks from a 200+ product catalog of personalized books and premium albums. Each one is ready for custom photos, messages, and layouts.</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 w-full">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <Link
              href="/category/all"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-primary/15 px-6 font-bold text-primary transition-all hover:bg-white"
            >
              Browse the full catalog
            </Link>
          </div>
        </div>
      </section>

      {/* Occasion Section */}
      <section className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#4A154B] rounded-3xl overflow-hidden p-8 lg:p-20 text-white shadow-2xl">
          <div className="flex flex-col gap-8">
            <h2 className="font-serif text-4xl lg:text-6xl font-bold leading-tight">Gifts for every <br /><span className="text-secondary">Milestone</span>.</h2>
            <p className="text-[#D8B4E2] text-lg leading-relaxed max-w-md">
              Whether it's your first anniversary, a best friend's birthday, or a new baby arrival, we have the perfect book to capture the moment.
            </p>
            <div className="flex flex-wrap gap-4">
              {categories.slice(0, 8).map((category) => (
                <Link 
                  key={category.slug} 
                  href={`/category/${category.slug}`}
                  className="px-5 py-2 rounded-full border border-secondary/30 text-sm font-medium hover:bg-secondary/20 hover:border-secondary transition-all cursor-pointer"
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl">
             <Image 
               src="/images/baby-book.png" 
               alt="Baby's First Year" 
               fill 
               className="object-cover" 
               sizes="(max-width: 1024px) 100vw, 50vw"
             />
          </div>
        </div>
      </section>

      {/* SEO Content Block */}
      <section className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 py-10 text-center">
        <h2 className="font-serif text-2xl font-bold text-primary mb-6">Personalized Gifts Online in India</h2>
        <div className="text-sm text-muted-foreground flex flex-col gap-4 text-justify sm:text-center">
          <p>Looking for the perfect personalized anniversary gift for your husband or a unique birthday memory book for your wife? Kahaani Books is India's premium destination for handcrafted personalized storytelling books. We specialize in custom wedding photo albums, baby milestone books, and memory books for every special occasion.</p>
          <p>Our books are designed to be emotional keepsakes that stand the test of time. With high-quality hardbound covers, gold foiling, archival-safe paper, and a much broader catalog of curated styles, you can find a format that feels custom before you even begin personalizing. Experience the magic of personalized gifting with Kahaani Books today.</p>
        </div>
      </section>
    </div>
  );
}
