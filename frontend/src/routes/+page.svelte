<script lang="ts">
    import type { ActionData, PageData } from "./$types"
    import { modalData, ModalClass } from '$lib/stores';
    import PageSection from '$lib/PageSection.svelte';
	import Skills from '$lib/Skills.svelte';
    import Contact from '$lib/Contact.svelte';
	import Modal from "$lib/Modal.svelte";
	import WorkCards from "$lib/WorkCards.svelte";
	import PostCards from "$lib/PostCards.svelte";

    export let data: PageData;
    export let form: ActionData;

    modalData.set(new ModalClass());

    // TODO: retrieve this from db
        if (form?.incorrect) {
            modalData.set(new ModalClass(
                null,
                'thank you for reaching out',
                "it looks like you've already submitted this form recently, don't worry- i'll be in touch shortly",
                'form'
            ));
        } else if (form?.success)  {
            modalData.set(new ModalClass(
                null,
                'thank you for reaching out, I will be in touch shortly',
                "",
                'form'
            ));
        }
    
</script>

<svelte:head>
    <title>{data.meta.title}</title>
    <meta name="author" content="{data.meta.author ?? 'Otho DuBoise}" />
    <meta name="description" content="{data.meta.description ?? ''}" />
    <meta property="og:description" content="{data.meta.description ?? ''}" />
    <meta property="og:title" content="{data.meta.title}" />
    <meta name="twitter:title" content="{data.meta.title}" />
</svelte:head>

<Modal />

<div class="space-y-24">
    {#each data.sections as section}
        <PageSection data={section.data}>
            {#if section.data.nameId === 'skills'}
                <Skills skillsets={section.skillsets} />
            {:else if section.data.nameId === 'work'}
                <WorkCards works={section.works} />
            {:else if section.data.nameId === 'blog'}
                <PostCards posts={section.posts} />
            {:else if section.data.nameId === 'contact'}
                <center>
                    <Contact />
                </center>
            {/if}
        </PageSection>
    {/each}
</div>
