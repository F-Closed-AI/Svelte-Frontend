<script lang=ts>
    import { TextDecoration, TextLarge, Slider, TextSmall, TextDetail, CardNew, CardBanner, CardCharacter, CardPreview, ButtonPrimary, ButtonCircle } from "$lib/components";
    import { animate, inView } from "motion";
    import generated_1 from "$lib/img/generated_1.png";
    import generated_2 from "$lib/img/generated_2.png";
    import generated_3 from "$lib/img/generated_3.png";
    import generated_4 from "$lib/img/generated_4.png";
    import generated_5 from "$lib/img/generated_5.png";
    import generated_6 from "$lib/img/generated_6.png";
    import generated_7 from "$lib/img/generated_7.png";
	import { onMount } from "svelte";

    let scroll: HTMLDivElement;
    let sliderContainer: HTMLDivElement;
    let banner: HTMLDivElement;
    const images = [generated_1, generated_2, generated_3, generated_4, generated_5, generated_6, generated_7]

    onMount(() => {
        inView(banner, () => {
            animate(scroll, { opacity: [1] });
            return () => animate(scroll, { opacity: [1, 0]});
        });
    })
</script>

<div class="
    flex
    gap-20
    isolate
">
    <div class="relative">
        <div class="
            flex 
            flex-col 
            gap-12
            flex-[2.25] 
            max-w-[60rem]
            -mt-2.5
            xxxl:max-w-none
        ">
            <div bind:this={banner}>
                <CardBanner></CardBanner>
            </div>
            {#each ["Popular", "New", "Most Liked"] as category, index}
                <div class="
                    flex 
                    flex-col
                    justify-between
                    gap-6
                ">
                    <div class="
                        flex 
                        justify-between
                        xs:flex-col
                    ">
                        <TextLarge>{category} Characters</TextLarge>
                        <TextDecoration classList="text-light-text-primary" line={false} link="/">View all</TextDecoration>
                    </div>
                    {#if index === 2}
                        <div bind:this={sliderContainer}>   
                            <Slider>
                                {#each images as image}
                                    <CardCharacter classList="snap-start" img={image}></CardCharacter>
                                {/each}
                            </Slider>
                        </div>
                    {:else}
                        <Slider>
                            {#each images as image}
                                <CardCharacter classList="snap-start" img={image}></CardCharacter>
                            {/each}
                        </Slider>
                    {/if}
                </div>
            {/each}
            <div 
                class="
                    sticky
                    ml-[50%]
                    bottom-0
                    translate-y-5
                    sm:hidden
                "
                bind:this={scroll}
            >
                <ButtonCircle 
                    classList="
                        px-3.5 
                        py-3 
                        bg-light-btn-primary-background 
                        transition-colors
                        hover:bg-opacity-90
                    "
                    onClick={() => sliderContainer.scrollIntoView({ behavior: "smooth", block: "nearest" })}
                >
                    <i class="fa-solid fa-angles-down text-light-text-tertiary"></i>
                </ButtonCircle>
            </div>
        </div>
    </div>
    <div class="
        flex-1
        max-w-[36.75rem]
        before:content-['']
        before:absolute
        before:w-full
        before:h-full
        before:bg-light-dashboard-dark
        before:top-0
        before:-mx-10
        before:mt-header-before
        before:-z-10
        xxxl:hidden
    ">
        <div class="
            fixed
            flex
            flex-col
            gap-4
            w-fill
            max-w-inherit
            mr-10
        ">
            <div class="
                flex
                justify-between
            ">
                <TextLarge>What's New</TextLarge>
                <TextDecoration classList="text-light-text-primary" line={false} link="/">View all</TextDecoration>
            </div>
            <div class="
                flex
                flex-col
                gap-6
            ">
                <CardNew img={generated_5}>
                    <TextSmall classList="!font-semibold">Azure Rider</TextSmall>
                    <TextSmall classList="!font-medium text-light-text-secondary">Goblin</TextSmall>
                </CardNew>
                <CardNew img={generated_6}>
                    <TextSmall classList="!font-semibold">Sporry</TextSmall>
                    <TextSmall classList="!font-medium text-light-text-secondary">Frog</TextSmall>
                </CardNew>
            </div>
            <div class="
                before:content-['']
                before:absolute
                before:w-screen
                before:h-screen
                before:bg-light-background
                before:translate-y-2
                before:left-0
                before:-mx-10
                before:-z-10
            ">
                <CardPreview classList="mt-8" img={generated_5}>
                    <TextLarge slot="name">Azure Rider</TextLarge>
                    <TextDetail>
                        <TextLarge slot="amount">4.6</TextLarge>
                        <TextSmall classList="text-light-text-secondary" slot="format">/5</TextSmall>
                        <TextSmall classList="!font-semibold text-light-text-secondary">Rating</TextSmall>
                    </TextDetail>
                    <TextDetail>
                        <TextLarge slot="amount">78.4</TextLarge>
                        <TextSmall classList="text-light-text-secondary" slot="format">k</TextSmall>
                        <TextSmall classList="!font-semibold text-light-text-secondary">Downloads</TextSmall>
                    </TextDetail>
                    <ButtonPrimary classList="!w-full" slot="button">View Character</ButtonPrimary>
                </CardPreview>
            </div>
        </div>
    </div>
</div>