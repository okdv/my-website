import type { PageLoad } from './$types';
import { PUBLIC_API } from '$env/static/public';

export const load: PageLoad = async () => {
    const res = await fetch(`${PUBLIC_API}/blog-page`);
    return await res.json()
}