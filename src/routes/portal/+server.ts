import { CustomerPortal } from "@polar-sh/sveltekit";
import { POLAR_ACCESS_TOKEN, POLAR_MODE } from "$env/static/private";

export const GET = CustomerPortal({
  accessToken: POLAR_ACCESS_TOKEN,
  server: POLAR_MODE === 'production' ? 'production' : 'sandbox',
  getCustomerId: async (event) => {
    // TODO: Retrieve the Polar Customer ID from your database based on the authenticated user.
    // Example: const user = await getUser(event); return user.polarCustomerId;
    return "";
  },
});
