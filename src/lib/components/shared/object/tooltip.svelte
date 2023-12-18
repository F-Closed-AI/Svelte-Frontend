<script lang=ts>
	import { scale } from "svelte/transition";

    export let format: "short" | "default" = "default";
    export let side: "left" | "right" | "up" | "down" = "right";
    export let gap: string = 4.25;
    export let shown: boolean = false;
    export let classList: string = "";

    let defaultClassList = "py-4 px-5 before:content-[''] before:absolute before:flex before:items-center before:bg-inherit before:clip-triangle before:w-4 before:h-4";
    let shortClassList = "py-3 px-4";
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
            rounded-lg
            pointer-events-none
            {format === "default" && defaultClassList}
            {format === "short" && shortClassList}
            {side === "left" && `right-[var(--gap)] before:-right-2 before:rotate-90`}
            {side === "right" && `left-[var(--gap)] before:-left-2 before:-rotate-90`}
            {side === "up" && `-top-[var(--gap)] before:-bottom-2 before:-translate-x-[50%] before:left-[50%] before:rotate-180`}
            {side === "down" && `-bottom-[var(--gap)] before:-top-2 before:-translate-x-[50%] before:left-[50%]`}
            {classList}
        "
        style="--gap: {gap}rem;"
        transition:scale
    >
        <slot/>
    </div>
{/if}