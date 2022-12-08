import type { Writable } from 'svelte/store';

interface PostInterface {
    slug: string;
    title: string;
    description?: string;
}

export interface LinkInterface {
    title?: string;
    link?: string; 
    icon?: string;
}

export type TagData = {
    name: string;
    title: string;
}

export interface PostPreviewInterface extends PostInterface {
    tags: Array<TagData>;
}

export interface SocialInterface {
    name: string;
    data: LinkInterface;
}

export type SkillData = {
    title: string;
	slug: string;
	link: string;
	icon?: string;
	level: number;
}

export type SkillsetData = {
    title: string;
    name: string;
    icon?: string;
    skills: Array<SkillData>
}

export type ExperienceData = {
    title: string;
    description?: string;
    image: {
        url: string;
    }
    skills: Array<SkillData>;
}

export type WorkData = {
    title: string;
    description: string;
    image: {
        url: string
    }
    skills: Array<SkillData>;
}

export type PageSectionData = {
    title?: string;
    description?: string;
    socials?: Array<SocialInterface>;
    cta?: boolean;
    ctaText?: string;
    ctaLink?: string;
}

export interface ModalInterface {
    title: string,
    description?: string,
    type: "work"|"skill"|null
}

export interface Modal extends ModalInterface {
    skills: Array<SkillData>,
    works: Array<WorkData>,
}

export type ModalData = {
    title: string,
    description: string,
    type: "works"|"skills"|null,
    skills: Array<SkillData>,
    works: Array<WorkData>,
}

export type CardData = {
    title: string;
    description?: string;
    subText?: string;
    image?: string;
    cta?: boolean;
    ctaText?: string;
}

export class ModalStore {
    constructor(public data: Writable<ModalInterface>) { }
}

export class PostState {
    show: Array<PostPreviewInterface>;
    hide: Array<PostPreviewInterface>;
    constructor(show: Array<PostPreviewInterface>, hide: Array<PostPreviewInterface>) {
        this.show = show;
        this.hide = hide;
    }
}

