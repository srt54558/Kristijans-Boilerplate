import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/better-auth/server";

export default defineSchema({
  users: defineTable({
    name: v.string(),
    email: v.string(),
    image: v.optional(v.string()),
    emailVerified: v.boolean(),
    polarCustomerId: v.optional(v.string()),
    subscriptionStatus: v.optional(v.string()),
  }).index("by_email", ["email"]),
  ...authTables,
});
