<script lang=ts>
	import { onMount } from "svelte";
	import { fade, scale } from "svelte/transition";

    export let classList: string = "";
    export let arrows: boolean = true;

    let slider: HTMLDivElement;
    let arrowVisiblity: {
        left: boolean,
        right: boolean
    } = { left: false, right: true }

    const cardWidth =150; 

    function navigateSlider(direction: number) {
        const walk = slider.scrollLeft + direction * cardWidth;
        const maxScroll = slider.scrollWidth - slider.clientWidth;

        slider.scrollTo({
            left: Math.max(0, Math.min(walk, maxScroll)),
            behavior: 'smooth'
        });
    }

    function updateArrowVisibility() {
        if (!slider) return
        arrowVisiblity.left = slider.scrollLeft > 0;
        arrowVisiblity.right = slider.scrollLeft < slider.scrollWidth - slider.clientWidth;
    }

    onMount(() => updateArrowVisibility());
</script>
 
<div 
    class="
        relative overflow-y-hidden
        scrollbar-hide
        h-full
">
    <div 
        class="
            flex
            gap-10
            overflow-x-auto
            scrollbar-hide
            snap-x snap-mandatory
            h-full
            {classList}
        "
        bind:this={slider}
        on:scroll={updateArrowVisibility}
    >
        {#if arrows}
            {#if arrowVisiblity.left}
                <button 
                    class="
                        absolute 
                        text-light-text-primary
                        bg-light-background
                        px-3.5
                        py-2
                        ml-2
                        rounded-full
                        top-[50%] 
                        -translate-y-[50%]
                        cursor-pointer
                    "
                    transition:scale
                    on:click={() => navigateSlider(-1)}
                >
                    <i class="fa-solid fa-chevron-left"></i>
                </button>
            {/if}
            {#if arrowVisiblity.right}
                <div 
                    class="
                        absolute
                        top-[50%] 
                        right-0
                        h-full
                        isolate
                    "
                >
                    <button 
                        class="
                            text-light-text-primary
                            bg-light-background
                            px-3.5
                            py-2
                            mr-2
                            rounded-full
                            top-[50%] 
                            -translate-y-[50%] 
                            right-0
                            cursor-pointer
                        "
                        transition:scale
                        on:click={() => navigateSlider(1)}
                    >
                        <i class="fa-solid fa-chevron-right"></i>
                    </button>
                    <div 
                        class="
                            absolute
                            -top-[50%]
                            -translate-x-2
                            h-full
                            w-full
                            px-10
                            bg-light-background
                            opacity-50
                            -z-10
                        "
                        transition:fade
                    >
                    </div>
                </div>
            {/if}
        {/if}
        <slot></slot>
    </div>
</div>