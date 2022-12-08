<script lang="ts">
    interface Card {
        title: string;
        description?: string;
        subText?: string;
        image?: string;
        cta?: boolean;
        ctaText?: string;
    }
    export let data: Card;
</script>

<div class="group drop-shadow-sm w-full rounded-md p-4 bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-800 duration-100 hover:scale-95 space-y-1 cursor-pointer">
    {#if data.image} 
    <div class="container w-full p-2 rounded-sm duration-100 bg-slate-50 dark:bg-slate-600 group-hover:bg-transparent">
        <img src="http://localhost:1337{data.image}" class="object-contain h-44  mx-auto" alt="alt" />
    </div>
    {/if}
    <h3 class="text-lg truncate"><b>{data.title}</b></h3>
    {#if data.description}
        <p class="text-md text-ellipses max-h-24 overflow-hidden">{data.description ?? 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua'}</p>
    {/if}
    {#if data.subText}
    <p class="text-sm truncate"><small>{data.subText}</small></p>
    {/if}
    {#if data.cta !== false}
    <hr />
    <p class="text-md text-blue-500"><b>{data.ctaText ?? "see details"}</b></p>
    {/if}
</div>