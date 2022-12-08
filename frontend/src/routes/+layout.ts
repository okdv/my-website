import type { PageServerLoad } from './$types';
import { PUBLIC_API } from '$env/static/public';

export const load: PageServerLoad = async () => {
    console.log(PUBLIC_API)
    const res = await fetch(`${PUBLIC_API}/layout`);
    return await res.json();
}