import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding Kahaani Books database...");

  // 1. Categories
  const anniversary = await prisma.category.upsert({
    where: { slug: "anniversary" },
    update: {},
    create: {
      name: "Anniversary",
      slug: "anniversary",
      description: "Celebrate your love story with books as unique as your bond.",
    },
  });

  const albums = await prisma.category.upsert({
    where: { slug: "albums" },
    update: {},
    create: {
      name: "Custom Albums",
      slug: "albums",
      description: "Premium handcrafted photo albums for your most cherished moments.",
    },
  });

  const baby = await prisma.category.upsert({
    where: { slug: "baby" },
    update: {},
    create: {
      name: "Baby & Kids",
      slug: "baby",
      description: "Capture the magic of their first years in a timeless keepsake.",
    },
  });

  // 2. Products
  await prisma.product.upsert({
    where: { slug: "our-story-anniversary-book" },
    update: {},
    create: {
      name: "The 'Our Story' Anniversary Book",
      slug: "our-story-anniversary-book",
      description: "A beautifully illustrated storytelling book that tracks your relationship milestones. Premium hardbound with gold foiling.",
      basePrice: 2499,
      images: ["/images/anniversary-book.png"],
      categoryId: anniversary.id,
      variants: {
        sizes: ["8x8 Standard", "12x12 Premium"],
        covers: ["Soft Touch", "Premium Silk"],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "forever-together-album" },
    update: {},
    create: {
      name: "Forever Together Premium Photo Album",
      slug: "forever-together-album",
      description: "A luxury leather-bound album featuring lay-flat thick pages. Perfect for wedding and travel memories.",
      basePrice: 4999,
      images: ["/images/photo-album.png"],
      categoryId: albums.id,
      variants: {
        pages: ["20 Pages", "40 Pages", "60 Pages"],
        covers: ["Genuine Leather", "Vegan Leather", "Premium Linen"],
      },
    },
  });

  await prisma.product.upsert({
    where: { slug: "baby-milestone-book" },
    update: {},
    create: {
      name: "Baby's First Year: A Milestone Book",
      slug: "baby-milestone-book",
      description: "Capture every first smile, step, and word in this elegant ivory-toned memory book.",
      basePrice: 1999,
      images: ["/images/baby-book.png"],
      categoryId: baby.id,
      variants: {
        sections: ["Basic", "Extended with Photo Slots"],
      },
    },
  });

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
