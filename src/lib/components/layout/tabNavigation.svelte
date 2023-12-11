<script lang=ts>
	import { afterNavigate, goto } from "$app/navigation";
    import { tabs } from "$lib/stores/tabNavigationStore";
	import { fly, type FlyParams } from "svelte/transition";

    let showContent: boolean = true;

    const positions: string[] = [
        "-translate-x-14 translate-y-4",
        "-translate-y-4",
        "translate-x-14 translate-y-4"
    ];

    const transitions: FlyParams[] = [
        {
            delay: 0, 
            duration: 300, 
            x: 60, 
            y: 30
        },
        {
            delay: 150, 
            duration: 300, 
            x: 0, 
            y: 30
        },
        {
            delay: 300, 
            duration: 300, 
            x: -60, 
            y: 30
        }
    ]

    function handleClick(link: string | undefined, onClick: (() => void) | undefined) {
        if (link) {
            goto(link);
            return;
        } 
        onClick && onClick();
    }

    afterNavigate(() => showContent = true);
</script>

<div class="
    fixed
    hidden
    items-center
    justify-center
    gap-[32%]
    bg-light-background
    text-light-text-secondary
    px-6
    bottom-0
    left-0
    w-full
    h-min
    rounded-t-[1.75rem]
    sm:flex
">
    <div class="
        relative
        flex
        w-full
        justify-between
        py-6
    ">
        <slot name="left"></slot>
    </div>
    <div class="absolute pr-12 top-0">
        <button 
            class="
                grid
                place-content-center
                absolute
                text-light-text-tertiary
                gradient
                rounded-full
                -top-5
                px-[0.85rem]
                py-3
                cursor-pointer
                transition-transform
                {showContent && $tabs.length > 0 && "rotate-45"}
        "
            on:click={() => showContent = !showContent}
        >
            <slot name="icon"></slot>
        </button>
        {#if showContent && $tabs.length > 0}
            {#each $tabs as { icon, link, onClick, disabled }, index}
                <button 
                    class="
                        grid
                        content-center                        
                        absolute 
                        -top-[4rem] 
                        {positions[index]}
                        {disabled && "cursor-not-allowed"}
                        bg-light-btn-primary-background
                        py-3
                        px-3
                        rounded-full
                        transition-colors
                        hover:bg-light-btn-primary-hover
                    " 
                    transition:fly|external={transitions[index]}
                    on:click|preventDefault={() => handleClick(link, onClick)}
                    disabled={disabled}
                >

                    <i class="{icon} text-light-text-tertiary pointer-events-none"></i>
                </button>
            {/each}
        {/if}
    </div>
    <div class="
        flex
        w-full
        justify-between
        py-6
    ">
        <slot name="right"></slot>
    </div>
</div>