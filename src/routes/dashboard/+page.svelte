<script lang="ts">
  import { useAuth } from "@mmailaender/convex-better-auth-svelte/svelte";
  import { api } from "$convex/_generated/api";
  import { useQuery } from "convex-svelte";
  import { UploadButton } from "@uploadthing/svelte";
  import { authClient } from "$lib/auth-client";
  import { goto } from "$app/navigation";

  const auth = useAuth();
  const isAuthenticated = $derived(auth.isAuthenticated);
  const isLoading = $derived(auth.isLoading);

  const userQuery = useQuery(api.auth.getCurrentUser, () => (isAuthenticated ? {} : "skip"));
  const user = $derived(userQuery.data);

  async function signOut() {
      await authClient.signOut();
      goto('/signin');
  }
</script>

<div class="min-h-screen bg-gray-50 p-8">
  {#if isLoading}
    <p>Loading...</p>
  {:else if !isAuthenticated}
    <div class="text-center">
        <p class="mb-4">You must be logged in to view this page.</p>
        <a href="/signin" class="text-blue-600 underline">Sign In</a>
    </div>
  {:else}
    <div class="max-w-4xl mx-auto bg-white rounded-lg shadow p-6">
        <h1 class="text-2xl font-bold mb-6">Dashboard</h1>

        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">User Profile</h2>
            <pre class="bg-gray-100 p-4 rounded overflow-auto">{JSON.stringify(user, null, 2)}</pre>
        </div>

        <div class="mb-8">
             <h2 class="text-xl font-semibold mb-2">Upload File</h2>
             <UploadButton
                {...{ endpoint: "imageUploader" } as any}
                onClientUploadComplete={(res: any) => {
                    console.log("Files: ", res);
                    alert("Upload Completed");
                }}
                onUploadError={(error: Error) => {
                    alert(`ERROR! ${error.message}`);
                }}
             />
        </div>

        <div class="mb-8">
            <h2 class="text-xl font-semibold mb-2">Subscription</h2>
            <a href="/checkout" class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">Subscribe</a>
            <a href="/portal" class="ml-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">Manage Subscription</a>
        </div>

        <button onclick={signOut} class="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">Sign Out</button>
    </div>
  {/if}
</div>
