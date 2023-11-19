<script lang=ts>
    export let link: string = "";    
    export let classList: string = "";
    export let iconPosition: "left" | "right" | "up" | "down" = "right";

    let baseClasses: string = `items-center gap-5 text-light-text-primary bg-light-btn-primary-color rounded-lg px-14 py-3 w-max ${iconPosition === "left" && "flex"} ${iconPosition === "right" && "flex flex-row-reverse"} ${iconPosition === "down" && "flex flex-col-reverse"}`
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
    ">
        <slot/>     
    </button>
{/if}