<script lang="ts">
    import PageSection from '$lib/PageSection.svelte';
	import PostCards from '$lib/PostCards.svelte';
    import type { PageData } from "./$types"
    export let data: PageData;
</script>

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
