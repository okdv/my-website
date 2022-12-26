import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API } from '$env/static/public';
import { GraphqlFetch } from '$lib/types';

export const GET: RequestHandler = async function GET({ params, setHeaders}) {
    const { workname } = params;
    try {
        const query = `
            query GetSkillsByWork(
                $workname: String!
            ) {
                works(
                    where: {
                        name: $workname
                    }
                ) {
                    skills {
                        title
                        name
                        link
                        icon
                        level
                    }
                }
            }
        `;

        const variables = {
            workname
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

        return new Response(JSON.stringify({ ...data.works[0] }));
    } catch (err: unknown) {
        const message = `Error: ${err as string}`;
        throw error(500, message as string);
    }
    
};