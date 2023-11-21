<script lang=ts>
    import { TextSmall, Tooltip } from "$lib/components/index.ts";

    export let text: string = "default tooltip";
    export let link: string = "";
    export let active: boolean = false;

    let showTooltip: boolean = false;
</script>

<a 
    href={link}
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
        {active && "!bg-light-btn-primary-background !text-light-btn-primary-color"}
    "
    on:mouseenter={() => showTooltip = true}
    on:mouseleave={() => showTooltip = false}
>
    <div class="
            flex 
            justify-center
            items-center
            relative
            w-8

        "
    >
        <slot name="icon"></slot>
        <Tooltip shown={showTooltip} classList={"hidden md:flex"}>
            <TextSmall>{text}</TextSmall>
        </Tooltip>
    </div>
    <div class="
        md:hidden
    ">
        <slot name="text"></slot>
    </div>
</a>