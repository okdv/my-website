<script lang="ts">
	import type { WorkData } from '$lib/types';
    import { modalData, ModalClass} from '$lib/stores';
	import Card from "$lib/Card.svelte";

    export let works: Array<WorkData>;

    const handleClick = (data: WorkData) => {
        modalData.set(new ModalClass(
            data.name,
            data.title,
            data.description,
            'skills'
        ));
    }


</script>

<div class="flex justify-start max-w-fit mx-auto overflow-x-auto p-4 gap-4 bg-slate-800 rounded-sm">
    {#each works as work}
        <div class="flex-none w-64" on:click={() => handleClick(work)} on:keydown|preventDefault>
            <Card data={{
                title: work.title,
                description: work.description,
                subText: work.skills && work.skills.map(({title}) => title).join(", "),
                image: work.image.url
            }} />
        </div>
    {/each}
</div>