<script lang=ts>
	import { ButtonCircle } from "$lib/components";
	import LoadAnimationWrapper from "$lib/components/layout/loadAnimationWrapper.svelte";
import { onMount } from "svelte";
	import { fade, scale } from "svelte/transition";

    export let classList: string = "";
    export let arrows: boolean = true;

    let slider: HTMLDivElement;
    let arrowVisiblity: {
        left: boolean,
        right: boolean
    } = { left: false, right: true }

    const cardWidth = 300; 

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
                <div
                    class="
                        absolute
                        top-[50%] 
                        -translate-y-[50%]
                        ml-2
                        z-10
                    "
                    transition:scale|local
                >
                    <ButtonCircle 
                        onClick={() => navigateSlider(-1)}
                    >
                        <i class="fa-solid fa-chevron-left"></i>
                    </ButtonCircle>
                </div>
            {/if}
            {#if arrowVisiblity.right}
                <div 
                    class="
                        absolute
                        top-[50%] 
                        right-0
                        h-full
                        isolate
                        z-10
                    "
                >
                    <div
                        transition:scale|local
                    >
                        <ButtonCircle
                            classList="
                                mr-2
                                top-[50%]
                                -translate-y-[50%]
                                right-0 
                            "
                            onClick={() => navigateSlider(1)}
                        >
                            <i class="fa-solid fa-chevron-right"></i>
                        </ButtonCircle>
                    </div>
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
                        transition:fade|local
                    >
                    </div>
                </div>
            {/if}
        {/if}
        <slot></slot>
    </div>
</div>