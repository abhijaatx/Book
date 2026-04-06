export interface ProductCategory {
  name: string;
  slug: string;
  description: string;
}

export type SizePresetId = "mini" | "medium" | "large";

export interface SizePreset {
  id: SizePresetId;
  label: string;
  priceDelta: number;
  pageAspectRatio: number;
  spreadAspectRatio: number;
  catalogAspectRatio: number;
  editorScale: number;
}

interface ProductVariant {
  name: string;
  options: string[];
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  basePrice: number;
  images: string[];
  previewImagesBySize: Record<SizePresetId, string[]>;
  sizePresets: SizePreset[];
  defaultSizePresetId: SizePresetId;
  category: ProductCategory;
  type: "book" | "album";
  variants: ProductVariant[];
  reviews: number;
  rating: number;
  featured: boolean;
}

interface CategorySeed extends ProductCategory {
  hero: string;
  defaultType: "book" | "album";
  basePrice: number;
  palette: [string, string, string, string, string];
}

interface CollectionSeed {
  slug: string;
  title: string;
  vibe: string;
  angle: string;
  priceDelta: number;
  forceType?: "book" | "album";
}

const SIZE_PRESET_META: Record<
  SizePresetId,
  Omit<SizePreset, "priceDelta">
> = {
  mini: {
    id: "mini",
    label: "Mini Photobook",
    pageAspectRatio: 1,
    spreadAspectRatio: 2,
    catalogAspectRatio: 1,
    editorScale: 0.84,
  },
  medium: {
    id: "medium",
    label: "Medium Photobook",
    pageAspectRatio: 1,
    spreadAspectRatio: 2,
    catalogAspectRatio: 1,
    editorScale: 1,
  },
  large: {
    id: "large",
    label: "Large Photobook",
    pageAspectRatio: 14 / 11,
    spreadAspectRatio: 28 / 11,
    catalogAspectRatio: 14 / 11,
    editorScale: 0.92,
  },
};

const categories: CategorySeed[] = [
  { slug: "anniversary", name: "Anniversary", description: "Romantic storytelling books and albums for milestone gifting.", hero: "Built for vows, candlelit timelines, and keepsake-worthy portraits.", defaultType: "book", basePrice: 2499, palette: ["#f9d8df", "#f3b2c0", "#7b284e", "#ffffff", "#fff6f8"] },
  { slug: "birthday", name: "Birthday", description: "High-energy memory books for birthdays of every age.", hero: "Confetti-forward layouts for party highlights, portraits, and guest notes.", defaultType: "book", basePrice: 1899, palette: ["#ffd9a6", "#ff8f70", "#7f1944", "#fff8f3", "#fff4ed"] },
  { slug: "wedding", name: "Wedding", description: "Editorial heirloom albums and elegant storybooks for ceremony-to-reception coverage.", hero: "Premium spreads, tactile covers, and a timeless printed finish.", defaultType: "album", basePrice: 5799, palette: ["#f6efe8", "#d4bda9", "#5f4636", "#fffdfb", "#fdf8f2"] },
  { slug: "albums", name: "Custom Albums", description: "Luxury albums for travel, family, weddings, and premium archival gifting.", hero: "Large-format, lay-flat, print-first products designed for shelf presence.", defaultType: "album", basePrice: 4999, palette: ["#e7f0ef", "#9fc0bb", "#244e52", "#f9fefe", "#f2fbfa"] },
  { slug: "baby-kids", name: "Baby & Kids", description: "Milestone books and gentle keepsakes for first smiles, first steps, and beyond.", hero: "Soft palettes, playful details, and guided prompts for little-big moments.", defaultType: "book", basePrice: 2099, palette: ["#dff5ec", "#b1dfd0", "#2d6a60", "#fbfffe", "#f3fffb"] },
  { slug: "proposal", name: "Proposal", description: "Compact romantic books crafted to build toward the biggest question.", hero: "Small-format storytelling, ring-box reveals, and cinematic emotional pacing.", defaultType: "book", basePrice: 1799, palette: ["#f6e8df", "#e0b9a8", "#6a2f23", "#fffbf8", "#fff7f1"] },
  { slug: "valentines", name: "Valentines", description: "Intimate romantic books and luxe micro-gifts for heartfelt surprises.", hero: "Rich reds, handwritten notes, and emotional stories in small formats.", defaultType: "book", basePrice: 1599, palette: ["#f7c0c7", "#d94f70", "#6f1537", "#fff8fb", "#fff2f5"] },
  { slug: "travel", name: "Travel", description: "Coffee-table albums and destination journals for adventure-filled memories.", hero: "Panoramic spreads, postcard cues, and storytelling tuned for motion.", defaultType: "album", basePrice: 4699, palette: ["#d8ecff", "#89b8e2", "#1d4d78", "#f8fcff", "#eff8ff"] },
  { slug: "family", name: "Family", description: "Multi-generational keepsakes for reunions, traditions, and everyday archives.", hero: "Made for old photos, festival snapshots, and living-room nostalgia.", defaultType: "album", basePrice: 3999, palette: ["#e9e1d4", "#c4a98a", "#5c4533", "#fffdf9", "#fbf6ef"] },
  { slug: "friendship", name: "Friendship", description: "Playful books for road trips, college years, roommates, and chosen family.", hero: "Bold colors, collage energy, and celebration-first storytelling.", defaultType: "book", basePrice: 1749, palette: ["#d4dbff", "#8c9fff", "#293a8f", "#f9fbff", "#eff2ff"] },
];

const collections: CollectionSeed[] = [
  { slug: "moonlit-keepsake", title: "Moonlit Keepsake", vibe: "soft editorial romance", angle: "layered with handwritten notes and cinematic pacing", priceDelta: 0 },
  { slug: "velvet-bloom", title: "Velvet Bloom", vibe: "textural luxury", angle: "ideal for high-contrast portraits and tactile cover finishes", priceDelta: 140 },
  { slug: "golden-chapter", title: "Golden Chapter", vibe: "warm heirloom styling", angle: "made for milestone timelines, speeches, and celebratory sequences", priceDelta: 260 },
  { slug: "starlit-mosaic", title: "Starlit Mosaic", vibe: "collage-first storytelling", angle: "best for layered moments, captions, and playful sequencing", priceDelta: 380 },
  { slug: "rosewood-reverie", title: "Rosewood Reverie", vibe: "rich nostalgia", angle: "gives photo-heavy stories a grounded, classic mood", priceDelta: 520 },
  { slug: "pearl-edition", title: "Pearl Edition", vibe: "clean premium minimalism", angle: "perfect when the photography should carry the emotion", priceDelta: 660, forceType: "album" },
  { slug: "letterbox-luxe", title: "Letterbox Luxe", vibe: "cinematic sequencing", angle: "great for dramatic portraits, travel scenes, and reveal moments", priceDelta: 780 },
  { slug: "petalpress", title: "Petalpress", vibe: "romantic floral detailing", angle: "designed for expressive captions and intimate gifting", priceDelta: 910 },
  { slug: "studio-cut", title: "Studio Cut", vibe: "modern collage polish", angle: "balances clean typography with quick-moving visual stories", priceDelta: 1030 },
  { slug: "cinema-strip", title: "Cinema Strip", vibe: "film-frame nostalgia", angle: "works beautifully for candid sequences and movement-heavy stories", priceDelta: 1160 },
  { slug: "sunset-chronicle", title: "Sunset Chronicle", vibe: "golden-hour warmth", angle: "tuned for glow-heavy imagery, celebrations, and travel frames", priceDelta: 1280 },
  { slug: "midnight-echo", title: "Midnight Echo", vibe: "dark luxe contrast", angle: "adds drama for editorial portraits and moody black-and-white edits", priceDelta: 1410 },
  { slug: "silkbound-secrets", title: "Silkbound Secrets", vibe: "quiet intimacy", angle: "built around personal letters, notes, and keepsake moments", priceDelta: 1530 },
  { slug: "confetti-journal", title: "Confetti Journal", vibe: "celebration-driven energy", angle: "perfect for birthdays, graduation-style joy, and group photos", priceDelta: 1660 },
  { slug: "cedar-heirloom", title: "Cedar Heirloom", vibe: "museum-inspired legacy", angle: "crafted to feel substantial on a shelf and timeless in hand", priceDelta: 1780, forceType: "album" },
  { slug: "postcard-atlas", title: "Postcard Atlas", vibe: "travel-documentary style", angle: "brings maps, ticket-stub energy, and panoramic frames together", priceDelta: 1910, forceType: "album" },
  { slug: "keepsake-capsule", title: "Keepsake Capsule", vibe: "memory-box curation", angle: "great for milestone years, baby books, and family archives", priceDelta: 2040 },
  { slug: "grand-signature", title: "Grand Signature", vibe: "statement-piece craftsmanship", angle: "designed for showcase gifting with premium tactile finishes", priceDelta: 2180, forceType: "album" },
  { slug: "love-note-press", title: "Love Note Press", vibe: "letter-led storytelling", angle: "built for emotionally rich pages and quiet personal details", priceDelta: 2310 },
  { slug: "gallery-archive", title: "Gallery Archive", vibe: "curated exhibition polish", angle: "excellent for premium edits, artful spacing, and shelf-worthy display", priceDelta: 2440, forceType: "album" },
];

const albumVariants: ProductVariant[] = [
  { name: "Material", options: ["Vegan Suede", "Premium Linen (+₹450)", "Italian Leather (+₹1100)"] },
  { name: "Page Count", options: ["20 Pages", "40 Pages (+₹1200)", "60 Pages (+₹2200)"] },
];

const bookVariants: ProductVariant[] = [
  { name: "Cover", options: ["Soft Touch", "Silk Hardcover (+₹350)", "Velvet Edition (+₹750)"] },
];

const BOOK_SIZE_PRICING: Record<SizePresetId, number> = {
  mini: 0,
  medium: 550,
  large: 1100,
};

const ALBUM_SIZE_PRICING: Record<SizePresetId, number> = {
  mini: 0,
  medium: 900,
  large: 1600,
};

const DEFAULT_SIZE_ROTATION: SizePresetId[] = ["medium", "mini", "large"];

function toDataUri(svg: string): string {
  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

function coverLines(title: string): string[] {
  return title
    .replace(/[':]/g, "")
    .split(" ")
    .reduce<string[]>((acc, word) => {
      const current = acc[acc.length - 1];
      if (!current || current.split(" ").length >= 2) {
        acc.push(word);
        return acc;
      }
      acc[acc.length - 1] = `${current} ${word}`;
      return acc;
    }, [])
    .slice(0, 3);
}

function buildSizePresets(type: Product["type"], defaultSizePresetId: SizePresetId): SizePreset[] {
  const priceMap = type === "album" ? ALBUM_SIZE_PRICING : BOOK_SIZE_PRICING;
  const orderedIds = [
    defaultSizePresetId,
    ...(["mini", "medium", "large"] as SizePresetId[]).filter((id) => id !== defaultSizePresetId),
  ];

  return orderedIds.map((id) => ({
    ...SIZE_PRESET_META[id],
    priceDelta: priceMap[id],
  }));
}

function createProductImage(
  title: string,
  category: string,
  type: Product["type"],
  palette: CategorySeed["palette"],
  sizePreset: SizePreset,
  variant: number,
): string {
  const [from, to, accent, text, frame] = palette;
  const lines = coverLines(title);
  const viewHeight = 1200;
  const viewWidth = Math.round(viewHeight * sizePreset.catalogAspectRatio);
  const coverHeight = Math.round(viewHeight * (0.7 + sizePreset.editorScale * 0.18));
  const coverWidth = Math.min(Math.round(coverHeight * sizePreset.pageAspectRatio), Math.round(viewWidth * 0.88));
  const coverX = Math.round((viewWidth - coverWidth) / 2);
  const coverY = Math.round((viewHeight - coverHeight) / 2);
  const frameInset = Math.max(28, Math.round(Math.min(coverWidth, coverHeight) * 0.055));
  const titleSize = sizePreset.id === "large" ? 54 : sizePreset.id === "mini" ? 50 : 58;
  const subtitleY = coverY + coverHeight - frameInset - 48;
  const badgeY = coverY + frameInset + 54;

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${viewHeight}">
      <defs>
        <linearGradient id="bg" x1="0%" x2="100%" y1="0%" y2="100%">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="160%">
          <feDropShadow dx="0" dy="36" stdDeviation="32" flood-color="#000000" flood-opacity="0.15" />
        </filter>
      </defs>
      <rect width="${viewWidth}" height="${viewHeight}" fill="#ffffff" />
      <circle cx="${variant === 0 ? Math.round(viewWidth * 0.86) : Math.round(viewWidth * 0.18)}" cy="${variant === 0 ? 160 : 1040}" r="${Math.round(Math.min(viewWidth, viewHeight) * 0.18)}" fill="${accent}" opacity="${variant === 0 ? "0.18" : "0.14"}" />
      <circle cx="${variant === 0 ? Math.round(viewWidth * 0.14) : Math.round(viewWidth * 0.84)}" cy="${variant === 0 ? 1030 : 220}" r="${Math.round(Math.min(viewWidth, viewHeight) * 0.14)}" fill="${from}" opacity="0.3" />
      <g filter="url(#shadow)">
        <rect x="${coverX}" y="${coverY}" width="${coverWidth}" height="${coverHeight}" rx="20" fill="url(#bg)" />
        <rect x="${coverX + frameInset}" y="${coverY + frameInset}" width="${coverWidth - frameInset * 2}" height="${coverHeight - frameInset * 2}" rx="12" fill="${frame}" opacity="0.92" />
        <rect x="${coverX + frameInset * 1.45}" y="${coverY + frameInset * 2.4}" width="${coverWidth - frameInset * 2.9}" height="${Math.round(coverHeight * 0.38)}" rx="8" fill="url(#bg)" opacity="0.96" stroke="#ffffff" stroke-opacity="0.65" stroke-width="5" />
        <text x="${coverX + coverWidth / 2}" y="${badgeY}" fill="${text}" font-size="22" font-family="Arial, sans-serif" text-anchor="middle" letter-spacing="4">${sizePreset.label.toUpperCase()}</text>
        ${lines
          .map(
            (line, index) =>
              `<text x="${coverX + coverWidth / 2}" y="${coverY + frameInset * 5 + index * (titleSize + 18)}" fill="${text}" font-size="${line.length > 15 ? titleSize - 6 : titleSize}" font-family="Georgia, serif" font-weight="700" text-anchor="middle">${line}</text>`,
          )
          .join("")}
        <text x="${coverX + coverWidth / 2}" y="${subtitleY}" fill="${text}" font-size="24" font-family="Arial, sans-serif" text-anchor="middle" letter-spacing="5">${category.toUpperCase()}</text>
        <text x="${coverX + coverWidth / 2}" y="${subtitleY + 46}" fill="${text}" font-size="20" font-family="Arial, sans-serif" text-anchor="middle" opacity="0.82">${type === "album" ? "LAY-FLAT HEIRLOOM EDITION" : "PERSONALIZED STORYBOOK EDITION"}</text>
      </g>
    </svg>
  `;

  return toDataUri(svg);
}

const products: Product[] = categories.flatMap((category, categoryIndex) =>
  collections.map((collection, collectionIndex) => {
    const type = collection.forceType ?? category.defaultType;
    const label = type === "album" ? "Album" : "Storybook";
    const name = `${collection.title} ${category.name} ${label}`;
    const defaultSizePresetId = DEFAULT_SIZE_ROTATION[(categoryIndex + collectionIndex) % DEFAULT_SIZE_ROTATION.length];
    const sizePresets = buildSizePresets(type, defaultSizePresetId);
    const previewImagesBySize = Object.fromEntries(
      (["mini", "medium", "large"] as SizePresetId[]).map((sizePresetId) => {
        const sizePreset = sizePresets.find((item) => item.id === sizePresetId) ?? sizePresets[0];
        return [
          sizePresetId,
          [
            createProductImage(name, category.name, type, category.palette, sizePreset, 0),
            createProductImage(name, category.name, type, [category.palette[1], category.palette[0], category.palette[2], category.palette[3], category.palette[4]], sizePreset, 1),
          ],
        ];
      }),
    ) as Record<SizePresetId, string[]>;
    const price = category.basePrice + collection.priceDelta + (type === "album" ? 900 : 0);
    const rating = Number((4.6 + ((categoryIndex + collectionIndex) % 5) * 0.1).toFixed(1));
    const reviews = 32 + categoryIndex * 12 + collectionIndex * 8;

    return {
      id: `${category.slug}-${collection.slug}`,
      name,
      slug: `${category.slug}-${collection.slug}`,
      description: `${collection.vibe[0].toUpperCase()}${collection.vibe.slice(1)} ${type === "album" ? "album" : "storybook"} for ${category.name.toLowerCase()} gifting, ${collection.angle}.`,
      longDescription: `${name} is part of our ${collection.title} line, a ${collection.vibe} collection created for ${category.name.toLowerCase()} memories. ${category.hero} Every piece is handcrafted in our studio and finished with premium paper stocks, tactile cover materials, and generous room for photos, notes, and story-led layouts. This edition is ${collection.angle}, making it a strong choice when you want your gift to feel custom, elevated, and unmistakably personal.`,
      basePrice: price,
      images: previewImagesBySize[defaultSizePresetId],
      previewImagesBySize,
      sizePresets,
      defaultSizePresetId,
      category: { name: category.name, slug: category.slug, description: category.description },
      type,
      variants: type === "album" ? albumVariants : bookVariants,
      reviews,
      rating,
      featured: collectionIndex < 2 || collectionIndex % 7 === 0,
    };
  }),
);

export function getSizePresetById(product: Product, sizePresetId?: string | null): SizePreset {
  return product.sizePresets.find((sizePreset) => sizePreset.id === sizePresetId) ?? product.sizePresets[0];
}

export function getDefaultSizePreset(product: Product): SizePreset {
  return getSizePresetById(product, product.defaultSizePresetId);
}

export function getProductImagesForSize(product: Product, sizePresetId?: string | null): string[] {
  const sizePreset = getSizePresetById(product, sizePresetId);
  return product.previewImagesBySize[sizePreset.id] ?? product.images;
}

export function getProductPrice(product: Product, sizePresetId?: string | null): number {
  return product.basePrice + getSizePresetById(product, sizePresetId).priceDelta;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getAllProducts(): Product[] {
  return products;
}

export function getFeaturedProducts(limit = 8): Product[] {
  return [...products]
    .sort((left, right) => {
      if (left.featured !== right.featured) return Number(right.featured) - Number(left.featured);
      if (left.rating !== right.rating) return right.rating - left.rating;
      return right.reviews - left.reviews;
    })
    .slice(0, limit);
}

export function getProductsByCategory(slug: string): Product[] {
  return slug === "all" ? products : products.filter((product) => product.category.slug === slug);
}

export function getCategoryBySlug(slug: string): ProductCategory | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getAllCategories(): ProductCategory[] {
  return categories.map(({ name, slug, description }) => ({ name, slug, description }));
}

export function getCatalogStats() {
  return {
    totalProducts: products.length,
    totalCategories: categories.length,
    totalBooks: products.filter((product) => product.type === "book").length,
    totalAlbums: products.filter((product) => product.type === "album").length,
  };
}
