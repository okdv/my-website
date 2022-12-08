import type { PageLoad } from './$types';
import { error } from '@sveltejs/kit';
import { PUBLIC_API } from '$env/static/public';
import { GraphqlFetch, type PostPreview } from '$lib/types';

export const load: PageLoad = async ({ params }) => {
    const { slug } = params;

    try {
        const query = `
            query getPosts(
                $slug: String!
            ) {
                posts(
                    where: {
                        name: $slug
                    }
                ) {
                    id
                    title
                    name
                    description
                    content
                    author {
                        username
                    }
                    updated_at
                    created_at
                    name
                    image {
                        url
                    }
                    tags {
                        name
                        title
                        color
                        posts {
                            title
                            name
                            description
                        }
                    }
                }
            }
        `;

        const variables = {
            slug
        };

        const req = new GraphqlFetch(PUBLIC_API, JSON.stringify({
            query,
            variables
        }), {});
        const res = await fetch(req.url, req.options);

        const { data } = await res.json();
        const post = data.posts[0];
        let related = post.tags.length > 0 ? (post.tags[Math.floor(Math.random()*post.tags.length)].posts) : []
        related = related.filter((relatedPost: PostPreview) => relatedPost.name !== slug);
        return {
            meta: {
                slug
            },
            header: {
                title: post.title,
                description: post.description,
                image: post.image ? PUBLIC_API + post.image.url : null
            },
            post,
            related
        }

    } catch (err: unknown) {
        const message = `Error: ${err as string}`;
        throw error(500, message as string);
    }
}