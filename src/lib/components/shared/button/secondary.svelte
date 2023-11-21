<script lang=ts>
    export let link: string = "";    
    export let classList: string = "";
    export let disabled: boolean = false;
    export let onClick: (event: Event) => void = () => {};

    let baseClasses: string = "flex items-center justify-center bg-light-btn-secondary-background text-light-text-primary w-max py-4 px-8 rounded-xl border-2 border-light-btn-primary-background transition-opacity hover:opacity-90"
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