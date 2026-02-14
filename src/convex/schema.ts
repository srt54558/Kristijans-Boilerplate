import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    emailVerified: v.boolean(),
    polarCustomerId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
    authUserId: v.string(),
  })
    .index("by_email", ["email"])
    .index("by_auth_user_id", ["authUserId"]),
});
