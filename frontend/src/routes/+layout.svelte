<script lang="ts">
    import "../app.css";
    import type { LayoutData } from "./$types"
    import { page } from '$app/stores';
    import Parallax from "$lib/Parallax.svelte";
	import Navbar from "$lib/Navbar.svelte";
	import Footer from "$lib/Footer.svelte";
	import Header from "$lib/Header.svelte";

    export let data: LayoutData;
</script>
{#if $page.data.header}
    <Header data={{
        title: $page.data.header.title,
        description: $page.data.header.description,
        image: $page.data.header.image ?? undefined,
        absolute: $page.data.parallax ? true : false,
        createdDate: $page.data.post ? new Date($page.data.post.created_at).toDateString() : undefined,
    }} />
{/if}
{#if $page.data.parallax}
    <Parallax layers={$page.data.parallax.layers} />
{/if}
<div class="relative w-full m-0 p-0">
    <div class="flex flex-col w-full min-h-screen left-0 right-0 bg-slate-900 {$page.data.parallax ? "body-auto-top absolute" : ""}">
        <Navbar slug={$page.data.meta.slug ?? ''} socials={data.socials} />
        <main class="flex-auto px-2">
            <slot />        
        </main>
        <Footer data={{
            support: data.support,
            socials: data.socials,
            copyright: data.copyright
        }} />
    </div>
</div>
