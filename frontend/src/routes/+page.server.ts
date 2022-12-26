import type { PageServerLoad, Actions } from './$types';
import { invalid } from '@sveltejs/kit';
import { error } from '@sveltejs/kit';
import { STRAPI_USER, STRAPI_PW, EMAIL } from '$env/static/private';
import { PUBLIC_API } from '$env/static/public';
import { GraphqlFetch } from '$lib/types';

export const load: PageServerLoad = async () => {
    try {
        const query = `
fragment Socials on Social {
	name
	data {
		title
		link
		icon
	}
}

fragment SkillsData on Skill {
	title
	name
	link
	icon
	level
}

fragment WorksData on Work {
	id
	name
	title
	description
	image {
		url
	}
	skills {
		title
	}
}

fragment SectionsDataWithSocials on ComponentPartialDataSectionData {
	nameId
	title
	description
	socials {
		...Socials
	}
	cta
}

fragment SectionsDataWithoutSocials on ComponentPartialDataSectionData {
	nameId
	title
	description
	cta
	ctaLink
}

query GetHomepage {
	homepage {
		id
		meta {
			title
			description
			author
			slug
		}
		header {
			title
			description
		}
		parallax {
			displacement
			layers {
				name
				image {
					url
				}
				displacement
			}
		}
		sections {
			__typename
			... on ComponentPageSectionsAbout {
				data {
					...SectionsDataWithSocials
				}
			}
			... on ComponentPageSectionsSkills {
				data {
					...SectionsDataWithoutSocials
				}
				skillLevels
				skillsets {
					name
					title
					icon
					skills {
						...SkillsData
					}
				}
			}
			... on ComponentPageSectionsWork {
				data {
					...SectionsDataWithSocials
				}
				works {
					...WorksData
				}
			}
			... on ComponentPageSectionsBlog {
				data {
					...SectionsDataWithoutSocials
				}
				posts {
					title
					description
					name
				}
			}
			... on ComponentPageSectionsContact {
				data {
					...SectionsDataWithoutSocials
				}
				contactApps {
					...Socials
				}
				submissionTitle
				submissionSuccessText
				submissionFailText
			}
		}
	}
}
       `;
        const req = new GraphqlFetch(PUBLIC_API, JSON.stringify({query}), {});
        const res = await fetch(req.url, req.options);
        const {data} = await res.json();
        return data.homepage;
    } catch (err: unknown) {
        const message = `Error: ${err as string}`;
        throw error(500, message as string);
    }
}

export const actions: Actions = {
    default: async ({ request }) => {
        const formData = await request.formData();
        const data = {
            fname: formData.get('fname'),
            lname: formData.get('lname'),
            email: formData.get('email'),
            org: formData.get('org'),
            message: formData.get('message')
        }
        const userRes = await fetch(`${PUBLIC_API}/auth/local`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                "identifier":`${STRAPI_USER}`,
                "password":`${STRAPI_PW}`
            })
        });
        const user = await userRes.json();
        const existsRes = await fetch(`${PUBLIC_API}/graphql`, {
            method: 'POST',
            headers: {
                "Authorization":`Bearer ${user.jwt}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                query: `query getRecentSubmissionByUser(
                        $email: String!
                    ) {
                        submissions(
                            where: {
                                email: $email
                                contacted: false
                            }
                        ) {
                            fname
                            }
                        }`,
                variables: {
                    email: formData.get('email')
                }
              })
        });
        const existsData = await existsRes.json();
        if (existsData.data.submissions.length == 0) {
            await fetch(`${PUBLIC_API}/submissions`, {
                method: 'POST',
                headers: {
                    "Authorization":`Bearer ${user.jwt}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            await fetch(`${PUBLIC_API}/email`, {
                method: 'POST',
                headers: {
                    "Authorization":`Bearer ${user.jwt}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "to": `${EMAIL}`,
                    "replyTo": data.email,
                    "subject": `Contact Req: ${data.fname}${data.lname ? ` ${data.lname}`: ''}${data.org ? ` from ${data.org}` : ''}`,
                    "text": data.message
                  })
            });
            return { success: true }
        } else {
            return invalid(400, { email: data.email, incorrect: true})
        }
    }
}