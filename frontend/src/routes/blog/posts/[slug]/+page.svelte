<script lang="ts">
    import SvelteMarkdown from 'svelte-markdown';
    import PostCards from '$lib/PostCards.svelte';
    import Link from '$lib/Link.svelte';
    import type { PageData } from "./$types"
    export let data: PageData;
    
</script>

<svelte:head>
    <title>{data.post.title ?? 'Otho DuBoise - Blog Post'}</title>
    <meta name="author" content="{data.meta.author ?? 'Otho DuBoise'}" />
    <meta name="description" content="{data.post.description ?? ''}" />
    <meta property="og:description" content="{data.post.description ?? ''}" />
    <meta property="og:title" content="{data.post.title ?? 'Otho DuBoise - Blog Post'}" />
    <meta name="twitter:title" content="{data.post.title ?? 'Otho DuBoise - Blog Post'}" />
</svelte:head>

<div class="px-6">
    <div class="md indent-4 space-y-4 overflow-x-auto">
        <SvelteMarkdown source={data.post.content} />
    </div>
</div>
{#if data.related.length > 0}
    <div class="container mx-auto mt-20 space-y-2 p-4 rounded-md dark:bg-slate-800">
        <h3 class="text-2xl text-center">related posts</h3>
        <PostCards posts={data.related} />
        <center class="text-lg">
            <Link data={{title: 'see more', link: '/blog/posts'}} />
        </center>
    </div>
{/if}
