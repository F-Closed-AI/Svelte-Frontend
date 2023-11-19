<script lang=ts>
    export let link: string = "";    
    export let classList: string = "";

    let baseClasses: string = "bg-light-btn-primary-background text-light-text-tertiary w-max py-4 px-8 rounded-xl transition-opacity hover:opacity-90"
</script>

{#if link != ""}
    <a 
        href={link}
        class="
            w-max
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