<script lang="ts">
	import { Tooltip, TextSmall } from "../../";

    export let link: string = "";    
    export let classList: string = "";
    export let disabled: boolean = false;
    export let tooltip: string = "";
    export let onClick: (event: Event) => void = () => {};   

    let showTooltip: boolean = false;
    let baseClasses: string = "relative flex text-light-text-primary bg-light-background px-3 py-2 rounded-full cursor-pointer";

    function onMouseEvent(show: boolean) {
        if (tooltip === "") return;
        showTooltip = show;
    }
</script>

{#if link != ""}
    <a 
        href={link}
        class="
            {baseClasses}
            {classList}
        "
        data-sveltekit-preload-data
    >
        <slot/>
    </a>
{:else}
    <button
        class="
            {baseClasses}
            {classList}
        "
        on:click={onClick}
        on:mouseenter={() => onMouseEvent(true)}
        on:mouseleave={() => onMouseEvent(false)}
        disabled={disabled}
    >
        <slot/> 
        <Tooltip shown={showTooltip} side="up">
            <TextSmall classList="text-light-text-tertiary">{tooltip}</TextSmall>
        </Tooltip>    
    </button>
{/if}