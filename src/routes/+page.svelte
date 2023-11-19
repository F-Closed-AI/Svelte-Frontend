<script lang=ts>
    import { BannerCard, TextDecoration, TextLarge, Slider, SliderCard, NewCard, TextSmall, PreviewCard, TextDetail, PrimaryButton } from "$lib/components";
    import generated_1 from "$lib/img/generated_1.png";
    import generated_2 from "$lib/img/generated_2.png";
    import generated_3 from "$lib/img/generated_3.png";
    import generated_4 from "$lib/img/generated_4.png";
    import generated_5 from "$lib/img/generated_5.png";
    import generated_6 from "$lib/img/generated_6.png";
    import generated_7 from "$lib/img/generated_7.png";

    const images = [generated_1, generated_2, generated_3, generated_4, generated_5, generated_6, generated_7]
</script>

<div class="
    flex
    gap-20
    isolate
">
    <div class="
        flex 
        flex-col 
        gap-12
        flex-[2.25] 
        max-w-[60rem]
        xxl:max-w-none
    ">
        <BannerCard></BannerCard>
        {#each ["Popular", "New", "Most Liked"] as category}
            <div class="
                flex 
                flex-col
                justify-between
                gap-6
            ">
                <div>
                    <TextLarge>{category} Characters</TextLarge>
                </div>
                <Slider>
                    {#each images as image}
                        <SliderCard img={image}></SliderCard>
                    {/each}
                </Slider>
            </div>
        {/each}
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
        xxl:hidden
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
                <NewCard img={generated_5}>
                    <TextSmall classList="!font-semibold">Azure Rider</TextSmall>
                    <TextSmall classList="!font-medium text-light-text-secondary">Goblin</TextSmall>
                </NewCard>
                <NewCard img={generated_6}>
                    <TextSmall classList="!font-semibold">Sporry</TextSmall>
                    <TextSmall classList="!font-medium text-light-text-secondary">Frog</TextSmall>
                </NewCard>
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
                <PreviewCard classList="mt-8" img={generated_5}>
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
                    <PrimaryButton classList="!w-full" slot="button">View Character</PrimaryButton>
                </PreviewCard>
            </div>
        </div>
    </div>
</div>