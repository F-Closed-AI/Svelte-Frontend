<script lang="ts">
    export let link: string = "";    
    export let classList: string = "";
    export let disabled: boolean = false;
    export let onClick: (event: Event) => void = () => {};    

    let baseClasses: string = "flex text-light-text-primary bg-light-background px-3 py-2 rounded-full cursor-pointer";
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