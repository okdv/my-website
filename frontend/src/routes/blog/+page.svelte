<script lang="ts">
    import PageSection from '$lib/PageSection.svelte';
	import PostCards from '$lib/PostCards.svelte';
    import type { PageData } from "./$types"
    export let data: PageData;
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta name="author" content="{data.meta.author ?? 'Otho DuBoise'}" />
    <meta name="description" content="{data.meta.description ?? ''}" />
    <meta property="og:description" content="{data.meta.description ?? ''}" />
    <meta property="og:title" content="{data.meta.title}" />
    <meta name="twitter:title" content="{data.meta.title}" />
</svelte:head>


<div class="space-y-10">
    {#each data.collections as collection}
        <PageSection data={{
            title: collection.data.title,
            cta: true,
            ctaLink: '/blog/posts'
        }}>
            <PostCards posts={collection.posts} />
        </PageSection>
    {/each}
</div>
