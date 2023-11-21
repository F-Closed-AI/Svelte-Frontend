<script lang=ts>
    export let classList: string = "";
    export let link: string = "";    
    export let iconPosition: "left" | "right" | "up" | "down" = "right";
    export let disabled: boolean = false;
    export let onClick: (event: Event) => void = () => {};

    let baseClasses: string = `items-center gap-5 text-light-text-primary bg-light-btn-primary-color rounded-lg px-12 py-3 w-max hover:opacity-90 ${iconPosition === "left" && "flex"} ${iconPosition === "right" && "flex flex-row-reverse"} ${iconPosition === "down" && "flex flex-col-reverse"}`
</script>

{#if link != ""}
    <a 
        href={link}
        class="
            {baseClasses}
            {classList}
    ">
        <slot/>
    </a>
{:else}
    <button
        class="
            {baseClasses}
            {classList}
        "
        on:click={onClick}
        disabled={disabled}
    >
        <slot/>     
    </button>
{/if}