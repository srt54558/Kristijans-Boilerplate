import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import { authComponent } from "./auth";
import type { GenericMutationCtx, GenericQueryCtx } from "convex/server";
import type { DataModel } from "./_generated/dataModel";

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
    return await authComponent.getAuthUser(ctx);
  },
});
