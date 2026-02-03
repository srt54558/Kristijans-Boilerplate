import { Webhooks } from "@polar-sh/sveltekit";
import { POLAR_WEBHOOK_SECRET } from "$env/static/private";

export const POST = Webhooks({
  webhookSecret: POLAR_WEBHOOK_SECRET,
  onPayload: async (payload) => {
    console.log("Polar Webhook Payload:", payload);
    // TODO: Implement webhook handling (e.g., updating user subscription status in Convex)
  },
});
