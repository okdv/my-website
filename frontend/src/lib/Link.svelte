<script lang="ts">
    import type { LinkData } from '$lib/types';
    export let data: LinkData;
    export let color: string = 'indigo-700'
</script>

<a href="{data.link}" class="{data.icon ? `duration-100 ease-in-out hover:text-${color}` : "relative before:absolute before:w-full before:h-1 before:rounded-sm before:bg-indigo-700 before:-bottom-1 before:left-0 before:origin-right before:scale-x-0 before:duration-300 before:ease-in-out before:content-[''] hover:before:origin-left hover:before:scale-x-100"}">
    {#if data.icon}
        <i class="{data.icon}"></i>
    {:else if data.title}
        <span>{data.title}</span>
    {/if}
    <slot></slot>
</a>