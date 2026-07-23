import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("products").collect();
  },
});

export const getByCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("products")
      .filter((q) => q.eq(q.field("category"), args.category))
      .collect();
  },
});

export const get = query({
  args: { id: v.id("products") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const create = mutation({
  args: {
    id: v.string(),
    name: v.string(),
    brand: v.string(),
    price: v.number(),
    rating: v.number(),
    category: v.string(),
    description: v.string(),
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
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("products", args);
  },
});
