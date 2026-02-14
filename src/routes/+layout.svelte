<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { createSvelteAuthClient } from '@mmailaender/convex-better-auth-svelte/svelte';
	import { authClient } from '$lib/auth-client';

	let { children, data } = $props();

	createSvelteAuthClient({
		authClient,
		getServerState: () => data.authState
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="relative min-h-screen flex flex-col">
    <div class="flex-1">
        {@render children()}
    </div>
    
    <footer class="w-full py-6 text-center text-[10px] font-sans uppercase tracking-widest text-foreground/30 relative z-50">
        <div class="inline-flex gap-4">
            <span>&copy; {new Date().getFullYear()} K+</span>
            <span>&bull;</span>
            <a href="/privacy" class="hover:text-primary transition-colors">Privacy</a>
        </div>
    </footer>
</div>
