<script lang="ts">
    import Link from '$lib/Link.svelte';
    import type { SocialData } from '$lib/types';

    type Footer = {
        support: string;
        copyright: string;
        socials: Array<SocialData>;
    }
    
    export let data: Footer;
</script>
<footer class="pt-36 space-y-12 shrink-0">
    <div class="flex justify-around sm:flex-nowrap flex-wrap space-y-2 text-xl">
        <ul class="duration-200 ease-in-out py-2 px-14 min-w-min rounded-md dark:bg-slate-800 dark:hover:bg-transparent">
            <li>
                <Link data={{link: "/", title: "home"}} />
            </li>
            <li>
                <Link data={{link: "/blog", title: "blog"}} />
            </li>
            <li>
                <Link data={{link: "/blog/posts", title: "posts"}} />
            </li>
        </ul>
        <div class="space-y-2">
            <div class="duration-200 ease-in-out p-2 space-x-4 my-auto rounded-md dark:bg-slate-800 dark:hover:bg-transparent">
                {#each data.socials as social}
                    <Link data={social.data} color={social.name} />
                {/each}
            </div>
            <center>
                <span>{data.support}</span>
            </center>
        </div>
    </div>
    <center>
        <span>{new Date().getFullYear()} &copy; {data.copyright.toLocaleLowerCase()}</span>
    </center>
</footer>