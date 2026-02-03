import { CustomerPortal } from "@polar-sh/sveltekit";
import { POLAR_ACCESS_TOKEN, POLAR_MODE } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import { createConvexHttpClient } from "@mmailaender/convex-better-auth-svelte/sveltekit";
import { api } from "$convex/_generated/api";

export const GET = async (event: any) => {
    if (!event.locals.token) {
        throw redirect(302, '/signin');
    }

    return CustomerPortal({
        accessToken: POLAR_ACCESS_TOKEN,
        server: POLAR_MODE === 'production' ? 'production' : 'sandbox',
        getCustomerId: async (_event) => {
            const client = createConvexHttpClient({ token: event.locals.token });
            const user = await client.query(api.users.getMe, {});
            return user?.polarCustomerId || "";
        },
    })(event);
};
