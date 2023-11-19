<script lang=ts>
    import { Tooltip } from "$lib/components/index.ts";

    export let text: string = "default tooltip";

    let shown: boolean = false;
</script>

<a 
    href="/" 
    class="
        flex
        items-center
        gap-5
        text-light-text-secondary
        bg-light-btn-primary-color
        px-5
        py-3
        rounded-lg
        transition-colors
        duration-300
        group
        hover:bg-light-btn-primary-background
        hover:text-light-btn-primary-color
    "
    on:mouseenter={() => shown = true}
    on:mouseleave={() => shown = false}
>
    <div class="
            flex 
            justify-center
            relative
            w-8

        "
    >
        <slot name="icon"></slot>
        <Tooltip {shown} classList={"hidden md:flex"}>
            {text}
        </Tooltip>
    </div>
    <div class="
        md:hidden
    ">
        <slot name="text"></slot>
    </div>
</a>