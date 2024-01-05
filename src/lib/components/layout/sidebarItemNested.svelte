<script lang=ts>
    export let text: string = "";
    export let link: string = "";
</script>

<a 
    href={link} 
    class="
        flex
        gap-2
        px-5
        md:flex-col
    "
    data-sveltekit-preload-data
>
    <i class="fa-solid fa-chevron-down rotate-45 md:hidden"></i>
    <i class="fa-solid fa-minus hidden rotate-90 md:block"></i>
    <div 
        class="
            md:hidden
        "
    >
        <slot name="text"></slot>
    </div>
    <button
        class="
            relative
            hidden
            md:block
        "
        title={text} 
    >
        <slot name="icon"></slot>
    </button>
</a>