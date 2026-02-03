<script lang="ts">
  import { authClient } from '$lib/auth-client';

  let { data } = $props();
  // We can use the server state if we passed it in data, but layouts handle the providing.
  // Here we can just use the store if we want, or just link.
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
  <h1 class="text-4xl font-bold mb-4">Welcome to Silex</h1>
  <p class="text-xl mb-8 text-gray-600">The perfect B2C SaaS boilerplate.</p>

  <div class="flex gap-4">
    <a href="/signin" class="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">Get Started</a>
    <a href="/dashboard" class="px-6 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300">Dashboard</a>
  </div>
</div>
