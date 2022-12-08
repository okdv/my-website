import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API } from '$env/static/public';
import { GraphqlFetch } from '$lib/types';

export const GET: RequestHandler = async function GET({ url, setHeaders}) {
    let sort = url.searchParams.get('sort');
    sort = (sort !== null && sort.length > 0) ? sort : "created_at:desc";
    const q: string = url.searchParams.get('q') ?? "";
    try {
        const query = `
            query GetPosts($search: String, $sort: String) {
                tags {
                    name
                    title
                }
                posts(sort: $sort, where: { name_contains: $search }) {
                    id
                    title
                    description
                    name
                    tags {
                        name
                        title
                    }
                }
            }
        `;

        const variables = {
            search: q,
            sort
        };
        const req = new GraphqlFetch(PUBLIC_API,JSON.stringify({
            query,
            variables
        }),{});
        const res = await fetch(req.url, req.options);

        const { data } = await res.json();

        setHeaders({
            'Content-Type':'application/json'
        });

        return new Response(JSON.stringify({ ...data }));
    } catch (err: unknown) {
        const message = `Error: ${err as string}`;
        throw error(500, message as string);
    }
    
};