<script lang="ts">
    type Header = {
        title: string;
        description: string;
        absolute: boolean;
        image?: string;
        createdDate?: string
    }
    export let data: Header;   
</script>

<section class="text-left text-slate-100 {(data.absolute === true) ? 'absolute left-2 md:left-10 top-10 z-[50]' : 'p-6 bg-slate-800 space-y-28 w-full'}" style="{data.image ? `background-image: url('${data.image}'); background-size: cover; background-position: center center;` : ""}">
    <h1 class="indent-4 text-6xl block"><b>{data.title}</b></h1>
    <p class="text-3xl block}">{data.description}</p>
    {#if data.createdDate}
        <hr class="m-4" />
        <span class="font-semibold">{data.createdDate}</span>
    {/if}
</section>