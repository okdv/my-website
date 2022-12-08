<script lang="ts">
    import { createEventDispatcher } from 'svelte';
    type Button = {
        title: string;
        type?: string;
        icon?: string;
    }
    export let data: Button;
    export let selected: boolean = false;
    const dispatch = createEventDispatcher();
    const select = () => dispatch('select');
</script>

<button type="{data.type ?? 'button'}" class="rounded-full py-3 px-6 duration-300 ease-in-out bg-gradient-to-br {selected ? "from-blue-400 via-indigo-500 to-indigo-500" : "from-blue-500 via-indigo-700 to-indigo-700"} hover:bg-right-bottom hover:scale-95" style="background-size: 200% auto;" on:click={select}>
    <span class="w-full whitespace-nowrap">
        {#if data.icon}
            <i class="{data.icon} mr-2"></i>
        {/if}
        {#if data.title}
            {data.title}
        {/if}
    </span>
</button>