<script lang="ts">
    import type { PageData } from "./$types";
    import { type PostPreview, TagState, PostState } from "$lib/types";
    import { goto } from "$app/navigation";
    import Button from "$lib/Button.svelte";
    import Card from "$lib/Card.svelte";
    import { PUBLIC_URL } from "$env/static/public";

    type TagData = {
        name: string;
        title: string;
    }
    
    export let data: PageData;

    const { posts, tags, sort, q } = data;
    $: tagState = new TagState(tags);
    $: allPosts = posts;
    $: postState = new PostState(allPosts.filter((post: PostPreview) => {
        let pass = true;
        for (var selectedIdx=0,selectedLen=tagState.selected.length; selectedIdx<selectedLen; selectedIdx++) {
            let hasTag = false;
            for (var postTagIdx=0,postTagLen=post.tags.length; postTagIdx<postTagLen; postTagIdx++) {
                if (post.tags[postTagIdx].name === tagState.selected[selectedIdx].name) {
                    hasTag = true;
                    break;
                }
            }
            pass = hasTag;
            if (hasTag === false) break;
        }
        return pass;
    }), []);
    $: sortSelected = sort.length > 0 ? sort : "created_at:desc";
    $: search = q;

    const sortOptions: {
        [key: string]: string;
    } = {
        "created_at:desc": "newest",
        "created_at:asc": "oldest",
        "name:asc": "a-z",
        "name:desc": "z-a"
    };

    const handleRemoveTag = (i: number, tag: TagData) => {
        let selected = tagState.selected;
        selected.splice(i, 1);
        tagState.selected = selected
        tagState.notSelected = [ tag, ...tagState.notSelected];
    };
    const handleSelectTag = (i: number, tag: TagData) => {
        let notSelected = tagState.notSelected;
        notSelected.splice(i, 1);
        tagState.notSelected = notSelected
        tagState.selected = [ tag, ...tagState.selected];
    };
    const handleSubmit = async (search: string, sort: string) => {
        search = encodeURIComponent(search)
        sort = encodeURIComponent(sort)
        goto(`${PUBLIC_URL}/blog/posts?sort=${sort}&q=${search}`);
        const res = await fetch(`${PUBLIC_URL}/api/blog/posts?sort=${sort}&q=${search}`);
        const data = await res.json();
        allPosts = data.posts;
    }

</script>

<svelte:head>
    <title>{data.meta.title ?? "Otho DuBoise - Posts"}</title>
    <meta name="author" content="{data.meta.author ?? 'Otho DuBoise'}" />
    <meta name="description" content="{data.meta.description ?? 'Search and filter your way through all of my blog posts, there is probably something that will peak your interest'}" />
    <meta property="og:description" content="{data.meta.description ?? 'Search and filter your way through all of my blog posts, there is probably something that will peak your interest'}" />
    <meta property="og:title" content="{data.meta.title ?? 'Otho DuBoise - Posts'}" />
    <meta name="twitter:title" content="{data.meta.title ?? 'Otho DuBoise - Posts'}" />
</svelte:head>

<div class="md:flex gap-2">
    <aside class="w-full md:w-96">
        <form class="rounded-md p-2 space-y-4 dark:bg-slate-700 dark:text-slate-200" on:submit|preventDefault>
            <label class="relative block">
                <span class="sr-only">Search</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-500">
                    <i class="fa-solid fa-magnifying-glass"></i>
                </span>
                <input 
                    type="search"
                    class="block w-full border rounded-md py-2 pl-9 pr-3 shadow-sm text-slate-700 bg-slate-100 border-slate-300 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1 placeholder:italic placeholder:text-slate-500" 
                    placeholder="Search..." 
                    bind:value={search} 
                    on:change={() => handleSubmit(search, sortSelected)}
                />
            </label>
            <label class="relative block">
                <span class="sr-only">Sort</span>
                <span class="absolute inset-y-0 left-0 flex items-center pl-2 text-slate-400">
                    <i class="fa-solid fa-sort"></i>
                </span>            
                <select class="block w-full py-2 pl-9 pr-3 cursor-pointer rounded-md shadow-sm bg-slate-600 focus:outline-none focus:border-indigo-700 focus:ring-indigo-700 focus:ring-1" bind:value={sortSelected} on:change={() => handleSubmit(search, sortSelected)}>
                    {#each Object.keys(sortOptions) as optionKey}
                        <option value={optionKey}>{sortOptions[optionKey]}</option>
                    {/each}
                </select>
            </label>
            <div class="space-y-2">
                <h3 class="text-lg">Tags</h3>
                <hr />
                <div class="flex gap-2 flex-wrap">
                    {#each tagState.selected as tag, i}
                        <Button data={{title: tag.title ? tag.title.toLocaleLowerCase() : '', icon: "fa-solid fa-x text-sm"}} on:select={() => handleRemoveTag(i, tag)} />
                    {/each}
                </div>
                <div class="space-y-2">
                    {#each tagState.notSelected as tag, i}
                        <button type="button" class="mx-2 relative before:absolute before:w-full before:h-1 before:rounded-sm before:bg-indigo-700 before:-bottom-1 before:left-0 before:origin-right before:scale-x-0 before:duration-300 before:ease-in-out before:content-[''] hover:before:origin-left hover:before:scale-x-100" on:click={() => handleSelectTag(i, tag)}>{tag.title.toLocaleLowerCase()}</button>
                    {/each}
                </div>
            </div>
        </form>
    </aside>
    <main class="w-full rounded-md flex flex-wrap justify-around md:gap-2 md:justify-start">
        {#each postState.show as post}
            <a href="/blog/posts/{post.name}" class="card w-2/5 md:w-auto m-2 space-x-0 max-w-xs">
                <Card data={{
                    title: post.title,
                    description: post.description,
                    cta: true,
                    ctaText: "see post"
                }} />
            </a>
        {/each}
    </main>
</div>
