<script lang="ts">
    import type { SocialData } from '$lib/types';
    import Link from '$lib/Link.svelte';
    
    export let slug: string;
    export let socials: Array<SocialData>;
</script>
<navbar class="flex justify-between py-2 px-4 sticky top-0 z-50 bg-slate-900 bg-opacity-50">
    <div class="space-x-2 md:space-x-6 text-3xl font-semibold">
        <Link data={{link: "https://git.otho.dev", title: 'git'}} />
        {#if slug !== "/"}
                <Link data={{link: "/", title: 'home'}} />
        {/if}
        {#if slug !== '/blog'}
                <Link data={{link: "/blog", title: "blog"}} />
        {/if}
        {#if slug !== '/blog/posts'}
                <Link data={{link: "/blog/posts", title: "posts"}} />
        {/if}
    </div>
    <div class="space-x-2 md:space-x-6 text-2xl sm:block hidden">
        {#each socials as social}
            <Link data={social.data} color={social.name} />
        {/each}
    </div>
</navbar>