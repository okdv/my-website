import type { RequestHandler } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API } from '$env/static/public';
import { GraphqlFetch } from '$lib/types';

export const GET: RequestHandler = async function GET({ params, setHeaders}) {
    const { name } = params;
    try {
        const query = `
            query GetWorksBySkill(
                $name: String!
            ) {
                skills(
                    where: {
                        name: $name
                    }
                ) {
                    works {
                            name
                        title
                        description
                        link
                        image {
                            url
                        }
                        skills {
                            title
                        }
                    }
                }
            }
        `;

        const variables = {
            name
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

        return new Response(JSON.stringify({ ...data.skills[0] }));
    } catch (err: unknown) {
        const message = `Error: ${err as string}`;
        throw error(500, message as string);
    }
    
};