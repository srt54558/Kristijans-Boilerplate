import { createRouteHandler } from "uploadthing/server";
import { ourFileRouter } from "$lib/server/uploadthing";
import { UPLOADTHING_TOKEN } from "$env/static/private";

const handler = createRouteHandler({
  router: ourFileRouter,
  config: {
    token: UPLOADTHING_TOKEN,
  },
});

export const GET = ({ request }: { request: Request }) => handler(request);
export const POST = ({ request }: { request: Request }) => handler(request);
