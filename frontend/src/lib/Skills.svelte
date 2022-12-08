<script lang="ts">
    import type { SkillData } from '$lib/types';
    import Button from '$lib/Button.svelte';
    import Graph from '$lib/Graph.svelte';

    interface SkillsetData {
        name: string;
        title: string;
        icon?: string;
        skills: Array<SkillData>;
    }
    export let skillsets: Array<SkillsetData>;
        
    $: selected = skillsets[0];
    const handleSelect = (skillset: SkillsetData) => selected = skillset;
</script>

<figure class="md:space-y-5">     
    <div class="flex justify-start text-lg flex-nowrap overflow-x-auto gap-4 max-w-fit mx-auto py-2">
        {#each skillsets as skillset}
            <Button data={{title: skillset.title.toLocaleLowerCase(), icon: skillset.icon}} selected={selected.name === skillset.name} on:select={() => handleSelect(skillset)} />
        {/each}
    </div>
    <Graph modal={false} skills={selected.skills} />
</figure>
