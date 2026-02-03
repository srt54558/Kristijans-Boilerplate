# Silex - B2C SaaS Boilerplate

Powered by SvelteKit, Convex, Better Auth, Polar, and UploadThing.

## Prerequisites

- [Bun](https://bun.sh) (or Node.js)
- [Convex Account](https://convex.dev)

## Setup

1.  **Install Dependencies**

    ```bash
    bun install
    ```

2.  **Environment Variables**

    Copy `.env.example` to `.env` (create one based on `.env` included in this repo) and fill in the values.

    ```bash
    # Convex
    PUBLIC_CONVEX_URL=...
    PUBLIC_CONVEX_SITE_URL=...
    SITE_URL=http://localhost:5173
    PUBLIC_SITE_URL=http://localhost:5173

    # Better Auth
    BETTER_AUTH_SECRET=...

    # Polar
    POLAR_ACCESS_TOKEN=...
    POLAR_SUCCESS_URL=http://localhost:5173/dashboard
    POLAR_MODE=sandbox
    POLAR_WEBHOOK_SECRET=...

    # UploadThing
    UPLOADTHING_TOKEN=...
    ```

3.  **Convex Dev**

    Start the Convex dev server to generate the backend code and sync functions.

    ```bash
    npx convex dev
    ```

4.  **Run Development Server**

    ```bash
    bun run dev
    ```

## Stack

- **Framework**: SvelteKit
- **Backend/DB**: Convex
- **Auth**: Better Auth (on Convex)
- **Payments**: Polar
- **File Upload**: UploadThing
- **Styling**: Tailwind CSS

## Deployment

Build the application:

```bash
bun run build
```

Deploy to your preferred host (Vercel, Netlify, etc.) and update the environment variables accordingly.
