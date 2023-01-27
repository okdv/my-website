<script lang="ts">
    import type { WorkData, SkillData } from '$lib/types';
    import { PUBLIC_URL } from '$env/static/public';
    import { modalData, ModalClass } from '$lib/stores';
	import Button from '$lib/Button.svelte';
    import Graph from '$lib/Graph.svelte';
    import WorkCards from '$lib/WorkCards.svelte';

    let modal: ModalClass;

    const close = () => modalData.set(new ModalClass());

    modalData.subscribe(async (obj) => {
        let works: Array<WorkData> = [];
        let skills: Array<SkillData> = [];
        if (obj.type !== null && obj.name !== null) {
            const res = await fetch(`${PUBLIC_URL}/api/${obj.type}/${obj.name}`);
            const data = await res.json();
            works = data.works ?? works;
            skills = data.skills ?? skills;
        }
        modal = {
            ...obj,
            works,
            skills
        }
    });

</script>

{#if modal.type !== null}
    <div class="fixed top-0 left-0 w-full h-screen flex justify-center align-middle opacity-100 bg-transparent z-50">
        <div class="bg-slate-100 opacity-20 absolute w-full h-full" on:click={close} on:keydown|preventDefault />
        <div class="space-y-4 w-11/12 md:w-3/4 md:h-auto max-h-screen rounded-md overflow-y-auto p-4 bg-slate-900 m-auto z-50">
            {#if modal.title}
                <h1 class="text-2xl">{modal.title}</h1>
            {/if}
            {#if modal.description}
                    <p class="text-xl">{modal.description}</p>
            {/if}
            {#if modal.type === 'skills'}
                <Graph modal={true} skills={modal.skills} />
            {:else if modal.type === 'works'}
                <WorkCards works={modal.works} />
            {/if}
            <Button data={{title: 'close', icon: 'fa-solid fa-x'}} on:select={close} />
        </div>
    </div>
{/if}