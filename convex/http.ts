import { httpRouter } from "convex/server";
import { httpAction } from "./_generated/server";
import { api } from "./_generated/api";

const http = httpRouter();

const seed = httpAction(async (ctx) => {
  const existing = await ctx.runQuery(api.products.list);
  if (existing.length > 0) {
    return new Response(JSON.stringify({ message: "Already seeded" }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  }

  const products = [
    {
      id: "1",
      name: "Midnight Obsidian",
      brand: "AuraScent Privé",
      price: 245,
      rating: 4.9,
      category: "Men",
      isBestSeller: true,
      description:
        "A mysterious and powerful fragrance that captures the essence of a moonlit night in a dense forest. Deep, woody, and intoxicating.",
      images: [
        "https://images.unsplash.com/photo-1594035910387-fea47794261f?q=80&w=1974&auto=format&fit=crop",
      ],
      notes: {
        top: ["Black Pepper", "Bergamot", "Elemi"],
        middle: ["Leather", "Iris", "Tobacco Leaf"],
        base: ["Oud", "Sandalwood", "Patchouli"],
      },
      ingredients: [
        "Alcohol Denat.",
        "Fragrance (Parfum)",
        "Water (Aqua)",
        "Limonene",
        "Linalool",
        "Coumarin",
      ],
      reviews: [
        {
          id: "r1",
          user: "Julian R.",
          rating: 5,
          comment:
            "Absolutely stunning scent. Lasts all day and gets so many compliments.",
          date: "2024-03-12",
        },
        {
          id: "r2",
          user: "Marcus K.",
          rating: 4,
          comment:
            "Very masculine and bold. Not for everyone but perfect for formal events.",
          date: "2024-02-28",
        },
      ],
    },
    {
      id: "2",
      name: "Peony Silk",
      brand: "AuraScent Heritage",
      price: 195,
      rating: 4.8,
      category: "Women",
      isNew: true,
      description:
        "A delicate and romantic floral bouquet that feels like walking through a blooming garden at dawn. Soft, airy, and timeless.",
      images: [
        "https://images.unsplash.com/photo-1583445013765-46c20c4a6772?q=80&w=2069&auto=format&fit=crop",
      ],
      notes: {
        top: ["Lychee", "Mandarin", "Rhubarb"],
        middle: ["Pink Peony", "Damask Rose", "Lily of the Valley"],
        base: ["White Musk", "Cashmere Wood", "Amber"],
      },
      ingredients: [
        "Alcohol Denat.",
        "Fragrance (Parfum)",
        "Water (Aqua)",
        "Benzyl Salicylate",
        "Citronellol",
      ],
      reviews: [
        {
          id: "r3",
          user: "Elena S.",
          rating: 5,
          comment:
            "The most beautiful floral scent I have ever owned. So fresh and elegant.",
          date: "2024-03-05",
        },
      ],
    },
    {
      id: "3",
      name: "Golden Amber",
      brand: "AuraScent Essence",
      price: 210,
      rating: 4.7,
      category: "Unisex",
      description:
        "A warm and inviting embrace of golden resins and rare spices.",
      images: [
        "https://images.unsplash.com/photo-1541643600914-78b084683601?q=80&w=2044&auto=format&fit=crop",
      ],
      notes: {
        top: ["Saffron", "Cinnamon", "Cardamom"],
        middle: ["Amber", "Labdanum", "Benzoin"],
        base: ["Vanilla", "Tonka Bean", "Cedarwood"],
      },
      ingredients: ["Alcohol Denat.", "Fragrance (Parfum)", "Water (Aqua)"],
      reviews: [],
    },
    {
      id: "4",
      name: "Arctic Vetiver",
      brand: "AuraScent Niche",
      price: 280,
      rating: 4.9,
      category: "Niche",
      isNew: true,
      description:
        "A sharp, crisp interpretation of vetiver inspired by the purity of the Arctic landscape.",
      images: [
        "https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?q=80&w=2053&auto=format&fit=crop",
      ],
      notes: {
        top: ["Frozen Mint", "Aldehydes", "Grapefruit"],
        middle: ["Vetiver", "Sage", "Geranium"],
        base: ["Oakmoss", "Ambroxan", "White Birch"],
      },
      ingredients: ["Alcohol Denat.", "Fragrance (Parfum)", "Water (Aqua)"],
      reviews: [],
    },
    {
      id: "5",
      name: "The Discovery Set",
      brand: "AuraScent",
      price: 85,
      rating: 5.0,
      category: "Gift Sets",
      description:
        "Explore our five signature scents in travel-sized vials.",
      images: [
        "https://images.unsplash.com/photo-1590736704728-f4730bb30770?q=80&w=2048&auto=format&fit=crop",
      ],
      notes: { top: ["Various"], middle: ["Various"], base: ["Various"] },
      ingredients: ["Mixed Ingredients"],
      reviews: [],
    },
  ];

  for (const product of products) {
    await ctx.runMutation(api.products.create, product);
  }

  return new Response(
    JSON.stringify({ message: `Seeded ${products.length} products` }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
});

http.route({
  path: "/api/seed",
  method: "POST",
  handler: seed,
});

export default http;
