<script lang=ts>
    export let skeleton: boolean = false;
    export let classList: string = "";
    export let line: boolean = true;
    export let link: string = "";

    let baseClasses: string = `flex items-center gap-3 font-secondary font-normal text-base text-light-background max-w-max uppercase ${link && "link"} ${line && "before:inline-block before:content-[''] before:bg-light-background before:w-14 before:h-line"}`
</script>

{#if link != ""}
    <a 
        href="/"
        class:skeleton={skeleton} 
        class="   
            {baseClasses}
            {classList}
    ">
        <slot></slot>
    </a>
{:else}
    <span 
        class:skeleton={skeleton} 
        class="   
            {baseClasses}
            {classList}
    ">
        <slot></slot>
    </span>
{/if}