<script lang="ts">
  import { base } from '$app/paths';
  import { Button } from '$lib/components/ui/button';
</script>

<div class="flex flex-col items-center justify-center min-h-screen bg-background p-4">
  <h1 class="text-4xl font-bold mb-4">Welcome to Silex</h1>
  <p class="text-xl mb-8 text-muted-foreground">The perfect B2C SaaS boilerplate.</p>

  <div class="flex gap-4">
    <Button href="{base}/signin" variant="default" size="lg">Get Started</Button>
    <Button href="{base}/dashboard" variant="outline" size="lg">Dashboard</Button>
  </div>
</div>
