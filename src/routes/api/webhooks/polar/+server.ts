import { Webhooks } from "@polar-sh/sveltekit";
import { POLAR_WEBHOOK_SECRET } from "$env/static/private";
import { PUBLIC_CONVEX_URL } from "$env/static/public";
import { ConvexHttpClient } from "convex/browser";
import { api } from "$convex/_generated/api";

export const POST = Webhooks({
  webhookSecret: POLAR_WEBHOOK_SECRET,
  onPayload: async (payload) => {
    console.log("Polar Webhook Payload:", payload.type);

    if (payload.type.startsWith('subscription.')) {
        const subscription = payload.data as any; // Type assertion as payload structure varies
        // Assuming subscription has user email in `customer.email` or we have `customer_id`
        // Polar standard payload often includes full customer object or id.
        // We will try to update based on email if available, or just log if not.
        // In a real app, you might query Polar API to get customer details if not in payload.

        // Note: Polar payload for subscription usually has `customer` object expanded or `customer_id`.
        // Let's assume we can get email. If not, we might need to rely on `customer_id` being stored previously (e.g. from checkout.session.completed).
        // For this boilerplate, we'll try to sync if email is present.

        let email = subscription.user?.email || subscription.customer?.email; // Adjust based on actual payload
        if (!email && subscription.customer_id) {
             // Fallback: we might not have email.
             // If we already have the customerId in DB, we can update by that?
             // But our mutation is by email.
             // Let's stick to email for now, assuming Polar sends it.
        }

        if (email) {
            const client = new ConvexHttpClient(PUBLIC_CONVEX_URL);
            await client.mutation(api.users.syncSubscriptionWebhook, {
                webhookSecret: POLAR_WEBHOOK_SECRET,
                email: email,
                polarCustomerId: subscription.customer_id || "",
                subscriptionStatus: subscription.status,
            });
            console.log(`Synced subscription for ${email}`);
        } else {
            console.log("Could not find email in subscription payload", subscription);
        }
    }
  },
});
