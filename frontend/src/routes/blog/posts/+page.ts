import type { PageLoad } from './$types';
import type { TagState } from '$lib/types';
import { PUBLIC_URL } from "$env/static/public";

export const load: PageLoad = async ({ url }) => {
    const sort: string = url.searchParams.get('sort') ?? "";
    const q: string = url.searchParams.get('q') ?? "";
    const res = await fetch(`${PUBLIC_URL}/api/blog/posts?sort=${sort}&q=${q}`);
    const data = await res.json();
    let tags: TagState = {
        selected: [],
        notSelected: data.tags
    }


    return {
        meta: {
            slug: "/blog/posts"
        },
        posts: data.posts,
        tags: tags,
        sort,
        q
    }
}