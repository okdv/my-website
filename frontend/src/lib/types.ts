export interface TagData {
    name: string;
    title: string;
}

export interface LinkData {
	title?: string;
	link?: string; 
	icon?: string;
}

export interface SocialData {
	name: string;
	data: LinkData;
}

export interface PostPreview {
	name: string;
	title: string;
	description?: string;
	tags: Array<TagData>;
}

export interface SkillData {
    name: string;
    title: string;
    icon: string;
    link: string;
    level: number;
}

export interface WorkData {
    name: string;
    title: string;
    description: string;
    image: {
        url: string;
    }
    skills: Array<SkillData>;
}

export class TagState {
	selected: Array<TagData>;
	notSelected: Array<TagData>;
	constructor(data: {selected: Array<TagData>, notSelected: Array<TagData>}) {
		this.selected = data.selected;
		this.notSelected = data.notSelected;
	}
}

export class PostState {
    show: Array<PostPreview>;
    hide: Array<PostPreview>;
    constructor(show: Array<PostPreview>, hide: Array<PostPreview>) {
        this.show = show;
        this.hide = hide;
    }
}

interface GraphqlOptions {
    method: 'POST';
    headers: {[key:string]:string},
    body: string;
}

export class GraphqlFetch {
    url: string;
    options: GraphqlOptions;
    constructor(url: string, body: string, headers: {[key:string]:string}) {
        this.url = `${url}/graphql`,
        this.options = {
            method: 'POST',
            headers: {
                'Content-Type':'application/json',
                ...headers
            },
            body
        }
    }
}