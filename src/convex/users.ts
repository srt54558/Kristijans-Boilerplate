import { mutation, query, internalMutation } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import { internal } from "./_generated/api";
import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import type { DataModel } from "./_generated/dataModel";

export const createLocalUser = internalMutation({
  args: {
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    emailVerified: v.boolean(),
    authUserId: v.string(),
  },
  handler: async (ctx, args) => {
    const existing = await ctx.db
      .query("users")
      .withIndex("by_auth_user_id", (q) => q.eq("authUserId", args.authUserId))
      .unique();

    if (!existing) {
      await ctx.db.insert("users", {
        name: args.name,
        email: args.email,
        image: args.image,
        emailVerified: args.emailVerified,
        authUserId: args.authUserId,
      });
    }
  },
});

export const deleteUserData = internalMutation({
  args: { authUserId: v.string() },
  handler: async (ctx, args) => {
    const user = await ctx.db
      .query("users")
      .withIndex("by_auth_user_id", (q) => q.eq("authUserId", args.authUserId))
      .unique();

    if (!user) return;
    await ctx.db.delete(user._id);
  },
});

export const syncSubscriptionWebhook = mutation({
  args: {
    webhookSecret: v.string(),
    email: v.string(),
    polarCustomerId: v.string(),
    subscriptionStatus: v.string(),
  },
  handler: async (ctx: GenericMutationCtx<DataModel>, args) => {
    if (args.webhookSecret !== process.env.POLAR_WEBHOOK_SECRET) {
      throw new Error("Invalid webhook secret");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", args.email))
      .unique();

    if (user) {
      await ctx.db.patch(user._id, {
        polarCustomerId: args.polarCustomerId,
        subscriptionStatus: args.subscriptionStatus,
      });
    }
  },
});

export const getMe = query({
  args: {},
  handler: async (ctx: GenericQueryCtx<DataModel>) => {
    const authUser = await authComponent.getAuthUser(ctx);
    if (!authUser) return null;

    return await ctx.db
      .query("users")
      .withIndex("by_auth_user_id", (q) => q.eq("authUserId", authUser._id))
      .unique();
  },
});
