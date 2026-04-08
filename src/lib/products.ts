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
  salePrice?: number;
  isNew?: boolean;
  size?: string;
  material?: string;
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
  { slug: "planners", name: "Planners", description: "2024-25 and undated planners to organize your magic.", hero: "Design your days, weeks, and months with our signature planners.", defaultType: "book", basePrice: 1499, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "notebooks", name: "Notebooks", description: "Ruled and dotted notebooks for your biggest ideas.", hero: "High-quality paper and beautiful covers that inspire writing.", defaultType: "book", basePrice: 499, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "photobooks", name: "Photobooks", description: "Softcover and hardcover books for your favorite chapters.", hero: "Turn digital memories into tangible keepsakes.", defaultType: "book", basePrice: 1899, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "magazines", name: "Magazines", description: "Premium photo magazines for your coffee table stories.", hero: "Your life, editorialized. Softcover magazines with a high-fashion feel.", defaultType: "book", basePrice: 1299, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "newspapers", name: "Newspapers", description: "Daily chronicles and special edition personal news.", hero: "The headline is you. Retro-style newspapers for milestones and memories.", defaultType: "book", basePrice: 899, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "new", name: "New In", description: "The latest chapters in our story. Discover our newest designs.", hero: "Freshly arrived treasures for your curated life.", defaultType: "book", basePrice: 499, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "sale", name: "Sale", description: "Last chance to own these magic keepsakes at a special price.", hero: "Curated favorites, now more accessible than ever.", defaultType: "book", basePrice: 299, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
  { slug: "stationery", name: "Stationery", description: "Stickers, notecards, and more to brighten your desk.", hero: "The little things that make everyday life more magic.", defaultType: "book", basePrice: 299, palette: ["#FFFDF5", "#8B0000", "#1A1A1A", "#D4AF37", "#F4C2C2"] },
];

const collections: CollectionSeed[] = [
  { slug: "everything-magic", title: "Everything is Magic", vibe: "optimistic & bright", angle: "centered around colorful typography and cheerful vibes", priceDelta: 0 },
  { slug: "go-getter", title: "Go Getter", vibe: "minimalist & focused", angle: "designed for those who love clean lines and bold statements", priceDelta: 200 },
  { slug: "celestial", title: "Celestial Dreams", vibe: "ethereal & moody", angle: "featuring stars, moons, and magical midnight palettes", priceDelta: 400 },
  { slug: "blooming", title: "In Full Bloom", vibe: "floral & delicate", angle: "soft colors and organic shapes for a gentle touch", priceDelta: 300 },
  { slug: "classic-og", title: "Classic Odd Giraffe", vibe: "iconic & bold", angle: "the signature yellow look that started it all", priceDelta: 100 },
];

const albumVariants: ProductVariant[] = [
  { name: "Material", options: ["Hardcover", "Softcover (-₹400)", "Premium Linen (+₹800)"] },
  { name: "Paper Type", options: ["Matte Finish", "Lustre (+₹200)", "Recycled Eco (+₹150)"] },
];

const bookVariants: ProductVariant[] = [
  { name: "Material", options: ["Softcover", "Hardcover (+₹300)", "Premium Linen (+₹700)"] },
  { name: "Ruling", options: ["Ruled", "Dotted", "Plain", "Grid"] },
];

const BOOK_SIZE_PRICING: Record<SizePresetId, number> = {
  mini: 0,
  medium: 300,
  large: 600,
};

const ALBUM_SIZE_PRICING: Record<SizePresetId, number> = {
  mini: 0,
  medium: 500,
  large: 1000,
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

const REAL_IMAGES: Record<string, string[]> = {
  planners: [
    "https://oddgiraffe.com/cdn/shop/files/371_68c793cc-7bf7-4bf9-903a-ff56f36b367b.webp?v=1763827789&width=1109",
    "https://oddgiraffe.com/cdn/shop/files/376_7123a00c-cb84-4914-bb95-f68303f5815d.webp?v=1763839823&width=1109"
  ],
  notebooks: [
    "https://oddgiraffe.com/cdn/shop/files/364-nb_ac214c64-f0e6-44f2-b88c-9558ec1b78f3.webp?v=1734873083&width=1109",
    "https://oddgiraffe.com/cdn/shop/files/324.webp?v=1725450213&width=1109"
  ],
  photobooks: [
    "https://oddgiraffe.com/cdn/shop/files/27_d651c038-95c6-4c3e-82f3-8c0b745d1f6f.webp?v=1754334026&width=1109",
    "https://oddgiraffe.com/cdn/shop/files/SPB1_933961c6-d735-4c2e-890f-32b4bb25b31e.webp?v=1754333957&width=1109"
  ],
  stationery: [
    "https://oddgiraffe.com/cdn/shop/files/347-NB_1.webp?v=1753570428&width=1109",
    "https://oddgiraffe.com/cdn/shop/files/pnb-26_27b8f0cf-ca41-45a2-993c-92e6e42f1eec.webp?v=1763842598&width=1109"
  ],
  newspapers: [
     "/Users/abhijaat/.gemini/antigravity/brain/a4438eb4-7193-4d06-945b-2dec5d32740e/newspaper_mockup_1_1775595606277.png",
     "/Users/abhijaat/.gemini/antigravity/brain/a4438eb4-7193-4d06-945b-2dec5d32740e/newspaper_mockup_2_1775595625743.png"
  ]
};

function createProductImage(
  title: string,
  category: string,
  type: Product["type"],
  palette: CategorySeed["palette"],
  sizePreset: SizePreset,
  variant: number,
): string {
  const [bg, _, text, accent, detail] = palette;
  const lines = coverLines(title);
  const viewHeight = 1200;
  const viewWidth = Math.round(viewHeight * sizePreset.catalogAspectRatio);
  const titleSize = 72;

  // Kahaani Minimalist Design (Premium Style)
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${viewWidth} ${viewHeight}">
      <rect width="${viewWidth}" height="${viewHeight}" fill="${variant === 0 ? bg : "#1a1a1a"}" />
      
      <!-- Decorative Graphic Element -->
      <circle cx="${viewWidth / 2}" cy="${viewHeight / 2}" r="${viewWidth * 0.4}" fill="${variant === 0 ? "white" : bg}" opacity="0.1" />
      
      <g transform="translate(${viewWidth / 2}, ${viewHeight / 2})">
        ${lines
          .map(
            (line, index) =>
              `<text y="${(index - lines.length / 2 + 0.5) * (titleSize + 20)}" fill="${variant === 0 ? text : bg}" font-size="${titleSize}" font-family="Georgia, serif" font-weight="700" text-anchor="middle" style="font-style: italic; letter-spacing: -0.04em;">${line.toLowerCase()}</text>`,
          )
          .join("")}
      </g>

      <text x="${viewWidth / 2}" y="${viewHeight - 120}" fill="${variant === 0 ? text : bg}" font-size="14" font-family="Arial, sans-serif" font-weight="900" text-anchor="middle" letter-spacing="4" opacity="0.4">DESIGNED FOR MAGIC | KAHAANI</text>
      
      <!-- Small Logo Icon -->
      <circle cx="${viewWidth / 2}" cy="120" r="15" fill="${variant === 0 ? text : bg}" />
    </svg>
  `;

  return toDataUri(svg);
}

const products: Product[] = categories.flatMap((category, categoryIndex) =>
  collections.map((collection, collectionIndex) => {
    const type = collection.forceType ?? category.defaultType;
    const label = type === "album" ? "Album" : "Book";
    const name = `${collection.title}`;
    const defaultSizePresetId = DEFAULT_SIZE_ROTATION[(categoryIndex + collectionIndex) % DEFAULT_SIZE_ROTATION.length];
    const sizePresets = buildSizePresets(type, defaultSizePresetId);
    
    // Mix actual images with generated ones for variety
    const realImages = REAL_IMAGES[category.slug] || [];
    const previewImagesBySize = Object.fromEntries(
      (["mini", "medium", "large"] as SizePresetId[]).map((sizePresetId) => {
        const sizePreset = sizePresets.find((item) => item.id === sizePresetId) ?? sizePresets[0];
        return [
          sizePresetId,
          [
            realImages[0] ?? createProductImage(name, category.name, type, category.palette, sizePreset, 0),
            realImages[1] ?? createProductImage(name, category.name, type, category.palette, sizePreset, 1),
            createProductImage(name, category.name, type, category.palette, sizePreset, 0),
          ],
        ];
      }),
    ) as Record<SizePresetId, string[]>;
    const price = category.basePrice + collection.priceDelta;
    const rating = Number((4.6 + ((categoryIndex + collectionIndex) % 5) * 0.1).toFixed(1));
    const reviews = 32 + categoryIndex * 12 + collectionIndex * 8;

    return {
      id: `${category.slug}-${collection.slug}`,
      name,
      slug: `${category.slug}-${collection.slug}`,
      description: `${collection.vibe}. ${collection.angle}. Crafted with love by Kahaani.`,
      longDescription: `${name} is a part of our ${collection.title} collection by Kahaani. ${collection.angle}. Designed for those who want to make every day magic. High-quality paper, premium finishes, and thoughtful details throughout.`,
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
      featured: collectionIndex < 2 || (categoryIndex === 0 && collectionIndex === 0),
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
