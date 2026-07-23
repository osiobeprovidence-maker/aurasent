import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  handler: async (ctx) => {
    return await ctx.db.query("users").collect();
  },
});

export const getByUid = query({
  args: { firebaseUid: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("firebaseUid"), args.firebaseUid))
      .first();
  },
});

export const upsert = mutation({
  args: {
    firebaseUid: v.string(),
    email: v.string(),
    name: v.string(),
    role: v.string(),
    image: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .filter((q) => q.eq(q.field("firebaseUid"), args.firebaseUid))
      .first();
    if (existing) {
      await ctx.db.patch(existing._id, args);
      return existing._id;
    }
    return await ctx.db.insert("users", args);
  },
});
