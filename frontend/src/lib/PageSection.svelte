<script lang="ts">
    import type { SocialData } from "$lib/types";
	import Link from "$lib/Link.svelte";
    
    type PageSectionData = {
        title?: string;
        description?: string;
        socials?: Array<SocialData>;
        cta?: boolean;
        ctaText?: string;
        ctaLink?: string;
    }

    export let data: PageSectionData;
    let { title, description, socials, cta, ctaText, ctaLink } = data;
</script>

<section class="container my-6 mx-auto z-10 space-y-6 title-transition-wrapper">
    {#if title}
        <h2 class="text-4xl title-transition ml-6">{title.toLocaleLowerCase()}</h2>
    {/if}
    {#if description}
        <p class="text-xl mx-4">{description.toLocaleLowerCase()}</p>
    {/if}
    <slot></slot>
    {#if socials && socials.length > 0}
    <center class="text-2xl">
        <span class="space-x-4">see more&nbsp;
            {#each socials as social}
                <Link data={social.data} color={social.name} />
            {/each}
        </span>
    </center>
    {:else if cta}
        <center class="text-xl">
            <Link data={{title: ctaText ?? "see all", link: ctaLink ?? "/"}} />
        </center>
    {/if}
</section>