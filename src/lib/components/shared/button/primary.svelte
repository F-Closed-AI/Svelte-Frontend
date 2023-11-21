<script lang=ts>
    export let link: string = "";    
    export let classList: string = "";
    export let disabled: boolean = false;
    export let onClick: (event: Event) => void = () => {};

    let baseClasses: string = "flex items-center justify-center bg-light-btn-primary-background text-light-text-tertiary w-max py-4 px-8 rounded-xl transition-opacity hover:opacity-90"
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