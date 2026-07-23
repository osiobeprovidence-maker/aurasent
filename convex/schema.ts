import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  products: defineTable({
    id: v.string(),
    name: v.string(),
    brand: v.string(),
    price: v.number(),
    compareAtPrice: v.optional(v.number()),
    costPrice: v.optional(v.number()),
    rating: v.number(),
    category: v.string(),
    collection: v.optional(v.string()),
    sku: v.optional(v.string()),
    productType: v.optional(v.string()),
    gender: v.optional(v.string()),
    concentration: v.optional(v.string()),
    launchYear: v.optional(v.number()),
    quantity: v.optional(v.number()),
    lowStockAlert: v.optional(v.number()),
    availability: v.optional(v.string()),
    description: v.string(),
    shortDescription: v.optional(v.string()),
    usageInstructions: v.optional(v.string()),
    perfectFor: v.optional(v.string()),
    longevity: v.optional(v.string()),
    projection: v.optional(v.string()),
    season: v.optional(v.string()),
    occasion: v.optional(v.string()),
    images: v.array(v.string()),
    notes: v.object({
      top: v.array(v.string()),
      middle: v.array(v.string()),
      base: v.array(v.string()),
    }),
    ingredients: v.array(v.string()),
    reviews: v.array(
      v.object({
        id: v.string(),
        user: v.string(),
        rating: v.number(),
        comment: v.string(),
        date: v.string(),
      })
    ),
    isNew: v.optional(v.boolean()),
    isBestSeller: v.optional(v.boolean()),
    isGiftReady: v.optional(v.boolean()),
    isLimitedEdition: v.optional(v.boolean()),
    isFeatured: v.optional(v.boolean()),
    isExclusive: v.optional(v.boolean()),
    isNewArrival: v.optional(v.boolean()),
    recommendedPairings: v.optional(v.array(v.string())),
    variants: v.optional(
      v.array(
        v.object({
          size: v.string(),
          price: v.number(),
          inventory: v.number(),
          sku: v.string(),
          barcode: v.string(),
        })
      )
    ),
    seoTitle: v.optional(v.string()),
    metaDescription: v.optional(v.string()),
    urlSlug: v.optional(v.string()),
    keywords: v.optional(v.array(v.string())),
    status: v.optional(v.string()),
  }),

  orders: defineTable({
    id: v.string(),
    customerName: v.string(),
    customerEmail: v.optional(v.string()),
    date: v.string(),
    total: v.number(),
    status: v.string(),
    items: v.number(),
  }),

  customers: defineTable({
    id: v.string(),
    name: v.string(),
    email: v.string(),
    orders: v.number(),
    spent: v.number(),
    lastOrder: v.string(),
  }),

  staff: defineTable({
    id: v.string(),
    name: v.string(),
    role: v.string(),
  }),

  storeConfig: defineTable({
    key: v.string(),
    value: v.any(),
  }),
});
