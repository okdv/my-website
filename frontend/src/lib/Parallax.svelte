<script lang="ts">
    import { PUBLIC_API } from "$env/static/public"; 
    type ParallaxData = {
        name: string;
        image: {
            url: string;
        }
        displacement?: string;
    }
    export let layers: Array<ParallaxData>;
    $: y = 0;
    $: w = 0;
    $: h = 0;

    const fix = (x: number) => {
        return +x?.toFixed(2);
    }

    y = fix(y);
    w = fix(w);
    h = fix(h);

</script>

<svelte:window bind:scrollY={y} bind:innerWidth={w} bind:innerHeight={h}/>

<div class="fixed left-1/2 -translate-x-1/2 bg-gradient-to-b from-indigo-700 via-orange-600 to-red-500" style="width: {w}px; height: {h}px;">
    {#each layers as layer, i}
        {#if i === (layers.length-1)}
            <div class="{w > 420 ? "body-auto-top" : "top-[300px]"} bg-slate-900 w-full h-full left-0 absolute will-change-transform" style="transform: translate3d(0,{-y * (i+1) / (layers.length - 1)}px, 0); z-index: {i+1};"></div>
        {/if}
        <img class="absolute will-change-transform left-0 w-full top-36 sm:top-32 md:top-16 lg:top-0" style="transform: translate3d(0,{-y * (i+1) / (layers.length - 1)}px, 0); z-index: {i+1};" alt={layer.name} id={layer.name} src="{PUBLIC_API + layer.image.url}" />
    {/each}
</div>