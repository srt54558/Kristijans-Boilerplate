import { createUploadthing } from "uploadthing/server";
import type { FileRouter } from "uploadthing/server";
import { getToken } from "@mmailaender/convex-better-auth-svelte/sveltekit";
import { createAuth } from "$convex/auth.js";
import { UploadThingError } from "uploadthing/server";

const f = createUploadthing();

export const ourFileRouter = {
  imageUploader: f({ image: { maxFileSize: "4MB" } })
    .middleware(async ({ event }) => {
        // @ts-ignore - SvelteKit adapter adds event to the input
        const token = await getToken(createAuth, event.cookies);
        if (!token) throw new UploadThingError("Unauthorized");
        return { token };
    })
    .onUploadComplete(async ({ file }) => {
      console.log("Upload complete");
      console.log("file url", file.url);
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
