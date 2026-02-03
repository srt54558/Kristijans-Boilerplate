import { Checkout } from "@polar-sh/sveltekit";
import { POLAR_ACCESS_TOKEN, POLAR_SUCCESS_URL, POLAR_MODE } from "$env/static/private";

export const GET = Checkout({
  accessToken: POLAR_ACCESS_TOKEN,
  successUrl: POLAR_SUCCESS_URL ?? "http://localhost:5173/dashboard",
  server: POLAR_MODE === 'production' ? 'production' : 'sandbox',
});
