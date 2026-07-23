import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("orders").collect();
  },
});

export const create = mutation({
  args: {
    id: v.string(),
    customerName: v.string(),
    customerEmail: v.optional(v.string()),
    date: v.string(),
    total: v.number(),
    status: v.string(),
    items: v.number(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("orders", args);
  },
});

export const updateStatus = mutation({
  args: { id: v.string(), status: v.string() },
  handler: async (ctx, args) => {
    const order = await ctx.db
      .query("orders")
      .filter((q) => q.eq(q.field("id"), args.id))
      .first();
    if (order) {
      await ctx.db.patch(order._id, { status: args.status });
    }
  },
});
