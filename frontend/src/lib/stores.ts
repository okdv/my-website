import { writable } from 'svelte/store';
import type { PostPreview, WorkData, SkillData, TagData } from '$lib/types';

type ModalType = "works"|"skills"|string|null;

export class ModalClass {
    name: string | null;
    title: string;
    type: ModalType;
    description?: string;
    skills: Array<SkillData>;
    works: Array<WorkData>;
    constructor(name?: string | null, title?: string, description?: string, type?: ModalType) {
        this.name = name ?? null;
        this.title = title ?? '';
        this.type = type ?? null;
        this.description = description ?? undefined;
        this.skills = [];
        this.works = [];
    }
}

export const modalData = writable(new ModalClass());

export class SearchClass {
    sort: string;
    query: string;
    tags: {
        selected: Array<TagData>;
        notSelected: Array<TagData>;
    }
    constructor(sort: string, query: string, selected: Array<TagData>, notSelected: Array<TagData>) {
        this.sort = sort;
        this.query = query;
        this.tags = {
            selected,
            notSelected
        }
    }
}

export const searchData = writable(new SearchClass('', 'created_at:desc', [], []));

class PostStore {
    posts: Array<PostPreview>;
    constructor(posts: Array<PostPreview>) {
        this.posts = posts;
    }
}

export const postsData = writable(new PostStore([]))