<script lang="ts">
    import type { PostPreview } from '$lib/types';
    import Card from '$lib/Card.svelte';
    export let posts: Array<PostPreview>;
</script>
<div class="flex justify-start gap-4 no-wrap overflow-x-auto p-4 bg-slate-800 rounded-sm">
    {#each posts as post}
        <a class="card" href="/blog/posts/{post.name}">
            <Card data={{
                title: post.title,
                description: post.description ?? '',
                cta: true,
                ctaText: "see post"
            }} />
        </a> 
    {/each}
</div>