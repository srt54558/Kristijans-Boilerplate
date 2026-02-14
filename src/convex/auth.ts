import { createClient, type GenericCtx } from "@convex-dev/better-auth";
import { convex } from "@convex-dev/better-auth/plugins";
import { polar } from "@polar-sh/better-auth";
import { Polar } from "@polar-sh/sdk";
import { components, internal } from "./_generated/api";
import { type DataModel } from "./_generated/dataModel";
import { query, internalQuery } from "./_generated/server";
import { betterAuth } from "better-auth";
import authConfig from "./auth.config";
import type { GenericQueryCtx, GenericActionCtx } from "convex/server";

// Polyfill URL.canParse for Convex runtime
if (!URL.canParse) {
  URL.canParse = (url: string, base?: string) => {
    try {
      new URL(url, base);
      return true;
    } catch {
      return false;
    }
  };
}

export const debug = internalQuery({
  handler: async () => null,
});

// The component client has methods needed for integrating Convex with Better Auth
export const authComponent = createClient<DataModel>(components.betterAuth, {
  verbose: true,
  // @ts-ignore
  authFunctions: internal.auth,
  triggers: {},
});

export const createAuth = (ctx: GenericCtx<DataModel>) => {
  const siteUrl = process.env.SITE_URL ?? "http://localhost:5173";
  const polarAccessToken = process.env.POLAR_ACCESS_TOKEN;
  
  const polarClient = polarAccessToken ? new Polar({
    accessToken: polarAccessToken,
    server: process.env.POLAR_SERVER === "sandbox" ? "sandbox" : "production",
  }) : null;

  return betterAuth({
    baseURL: siteUrl,
    trustedOrigins: [siteUrl, "http://localhost:5173"],
    database: authComponent.adapter(ctx),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
    },
    databaseHooks: {
      user: {
        create: {
          after: async (user) => {
            await (ctx as GenericActionCtx<DataModel>).runMutation(internal.users.createLocalUser, {
              name: user.name,
              email: user.email,
              image: user.image ?? undefined,
              emailVerified: user.emailVerified,
              authUserId: user.id,
            });
          },
        },
        delete: {
          after: async (user) => {
            await (ctx as GenericActionCtx<DataModel>).runMutation(internal.users.deleteUserData, {
              authUserId: user.id,
            });
          },
        },
      },
    },
    plugins: [
      convex({ authConfig }),
      ...(polarClient ? [polar({
        client: polarClient,
        createCustomerOnSignUp: true,
      })] : []),
    ],
  });
};

export const getCurrentUser = query({
  args: {},
  handler: async (ctx: GenericQueryCtx<DataModel>) => {
    return authComponent.getAuthUser(ctx);
  },
});
