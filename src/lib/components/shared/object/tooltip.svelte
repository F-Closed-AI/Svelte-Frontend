<script lang=ts>
	import { scale } from "svelte/transition";

    export let side: "left" | "right" | "up" | "down" = "right";
    export let shown: boolean = false;
    export let classList: string = "";
</script>

{#if shown}
    <div 
        class="
            absolute
            flex
            items-center
            bg-light-btn-primary-background
            w-max
            h-full
            py-4
            px-5
            rounded-lg
            pointer-events-none
            before:content-['']
            before:absolute
            before:flex
            before:items-center
            before:bg-inherit
            before:clip-triangle
            before:w-4
            before:h-4
            {side === "left" && "right-[4.25rem] before:-right-2 before:rotate-90"}
            {side === "right" && "left-[4.25rem] before:-left-2 before:-rotate-90"}
            {side === "up" && "-top-[3.5rem] before:-bottom-2 before:-translate-x-[50%] before:left-[50%] before:rotate-180"}
            {side === "down" && "-bottom-[3.5rem] before:-top-2 before:-translate-x-[50%] before:left-[50%]"}
            {classList}
        "
        transition:scale
    >
        <slot/>
    </div>
{/if}