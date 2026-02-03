import { Webhooks } from "@polar-sh/sveltekit";
import { POLAR_WEBHOOK_SECRET } from "$env/static/private";
import { createConvexHttpClient } from "@mmailaender/convex-better-auth-svelte/sveltekit";
import { api } from "$convex/_generated/api";

export const POST = Webhooks({
  webhookSecret: POLAR_WEBHOOK_SECRET,
  onPayload: async (payload) => {
    console.log("Polar Webhook Payload:", payload.type);

    if (payload.type === 'subscription.created' || payload.type === 'subscription.updated') {
        const subscription = payload.data;
        // Assuming subscription has user email or we can map it via customer_id
        // Polar webhook payload structure needs to be checked, usually it has customer info or we need to fetch it.
        // For simplicity, we assume we can link via email or update by customerId if we stored it initially.
        // However, standard flow is: checkout -> session -> customer created -> subscription created.
        // We might need to handle 'checkout.session.completed' to link customerId to user first.

        // Simplified Logic: Try to find user by email from the payload if available
        // Note: Real implementation depends on exact Polar payload structure.

        // This is a placeholder for the logic to call the internal mutation
        // const client = createConvexHttpClient({ token: process.env.BETTER_AUTH_SECRET }); // Internal admin access?
        // Admin access in Convex is usually done via internal functions or configured admin keys.
        // Since we are in SvelteKit server, we might not have a direct "admin" token unless configured.
        // But Better Auth + Convex setup usually allows internal calls if we use the right client setup.

        // For now, logging the intent. Implementing secure admin updates from SvelteKit to Convex
        // without a user token usually requires an admin key or similar mechanism which isn't fully set up in this boilerplate yet.
        console.log("Should update subscription for:", subscription);
    }
  },
});
