<script lang="ts">
    import { authClient } from '$lib/auth-client';
    import { goto } from '$app/navigation';

    let showSignIn = $state(true);
    let name = $state('');
    let email = $state('');
    let password = $state('');
    let error = $state('');

    async function handlePasswordSubmit(event: Event) {
        event.preventDefault();
        error = '';

        try {
            if (showSignIn) {
                await authClient.signIn.email(
                    { email, password },
                    {
                        onSuccess: () => goto('/dashboard'),
                        onError: (ctx) => {
                            error = ctx.error.message;
                        }
                    }
                );
            } else {
                await authClient.signUp.email(
                    { name, email, password },
                    {
                        onSuccess: () => goto('/dashboard'),
                        onError: (ctx) => {
                             error = ctx.error.message;
                        }
                    }
                );
            }
        } catch (e: any) {
            console.error('Authentication error:', e);
            error = e.message || 'An error occurred';
        }
    }

    function toggleSignMode() {
        showSignIn = !showSignIn;
        name = '';
        email = '';
        password = '';
        error = '';
    }
</script>

<div class="flex h-screen flex-col items-center justify-center bg-gray-50">
    <div class="flex w-full max-w-md flex-col gap-4 rounded-lg bg-white p-6 shadow-md">
        <h2 class="mb-6 text-center text-2xl font-bold text-gray-800">
            {showSignIn ? 'Sign In' : 'Sign Up'}
        </h2>

        {#if error}
            <div class="p-3 text-sm text-red-600 bg-red-100 rounded-md">
                {error}
            </div>
        {/if}

        <form onsubmit={handlePasswordSubmit} class="flex flex-col gap-4">
            {#if !showSignIn}
                <input
                    bind:value={name}
                    placeholder="Name"
                    required
                    class="rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />
            {/if}
            <input
                type="email"
                bind:value={email}
                placeholder="Email"
                required
                class="rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <input
                type="password"
                bind:value={password}
                placeholder="Password"
                required
                class="rounded-md border border-gray-300 px-4 py-2 focus:border-transparent focus:ring-2 focus:ring-blue-500 focus:outline-none"
            />
            <button
                type="submit"
                class="cursor-pointer rounded-md bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none"
            >
                {showSignIn ? 'Sign in' : 'Sign up'}
            </button>
        </form>

        <p class="mt-4 text-center text-gray-600">
            {showSignIn ? "Don't have an account? " : 'Already have an account? '}
            <button
                type="button"
                onclick={toggleSignMode}
                class="cursor-pointer border-none bg-transparent text-blue-600 underline hover:text-blue-800"
            >
                {showSignIn ? 'Sign up' : 'Sign in'}
            </button>
        </p>
    </div>
</div>
