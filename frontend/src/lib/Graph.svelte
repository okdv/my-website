<script lang="ts">
    import type { SkillData } from '$lib/types';
    import { modalData, ModalClass } from '$lib/stores';

    type Increment = "learning"|"confident"|"advanced"|"expert";
    
    export let skills: Array<SkillData>;
    export let modal: boolean;

    const increments: Array<Increment> = [
        "learning",
        "confident",
        "advanced",
        "expert"
    ];

    let graphW: number = 550;
    let svgW: number = graphW+50;
    let graphSpaceR: number = 20;
    let barHeight = 50;
    $: height = (barHeight+6)*skills.length+55;
    
    const graphIntervals = increments.map((text,i,arr) => {
        let x = ((graphW/arr.length)*(i+1))
        return { 
            text, 
            x, 
            y: x-(arr.length*5)
        }
    });
    
    const handleClick = async (data: SkillData) => {
        modalData.set(new ModalClass(
            data.name,
            data.title,
            '',
            'works'
        ));
    }
</script>

<svg class="mx-auto w-full" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 {svgW} {height}" width="{svgW}" height="{modal ? height/2 : height}" aria-labelledby="title" role="application">
    <g>
        {#each graphIntervals as int}
            <text text-anchor="middle" class="dark:fill-slate-500 font-semibold text-2xl md:text-md" x="{int.x}" y="40">{int.text}</text>
            <line class="dark:stroke-slate-500 stroke-2 md:stroke-1" x1="{int.x}" x2="{int.x}" y1="48" y2="52"></line>
        {/each}
    </g>
    <g>
        {#each skills as skill, i}
            <g class="cursor-pointer dark:fill-blue-600 dark:hover:fill-indigo-700 duration-100 ease-in-out" on:click={() => handleClick(skill)} on:keydown|preventDefault>
                <rect class="drop-shadow-sm" rx="2" height="{barHeight}" width="{graphW*skill.level}" x="{graphSpaceR}" y="{((barHeight+6)*i)+55}"></rect>
                <text text-anchor="start" class="dark:fill-slate-100 font-semibold text-2xl md:text-md" x="{graphSpaceR+5}" y="{((barHeight+6)*i)+90}">{skill.title}</text>
            </g>                   
        {/each}
    </g>
</svg>