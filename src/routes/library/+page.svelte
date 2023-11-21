<script lang=ts>
	import { CardCharacter, ButtonFilter, ButtonPrimary, TextBase, TextDetail, TextLarge, TextSmall, TextXL, ButtonSecondary } from "$lib/components";
    import generated_1 from "$lib/img/generated_1.png";
    import generated_2 from "$lib/img/generated_2.png";
    import generated_3 from "$lib/img/generated_3.png";
    import generated_4 from "$lib/img/generated_4.png";

    export let showType: "grid" | "lines" = "grid";

    export let data;

    const images = [generated_1, generated_2, generated_3, generated_4]

    function getRandomImage() {
        const randomIndex = Math.floor(Math.random() * (images.length- 0)) + 0;
        return images[randomIndex];
    }
</script>

<div class="
    flex
    flex-col
    gap-10
    pb-52
">
    <div>
        <TextXL classList="font-semibold">My Characters (5)</TextXL>
        <div class="
            flex
            justify-between
            gap-5
            xs:flex-col
            xs:items-start
        ">
            <ButtonFilter>time created</ButtonFilter>
            <div class="
                flex
                gap-5
            ">
                <button on:click={() => showType = "grid"}>
                    <i class="fa-solid fa-grip-vertical icon"></i>
                </button>
                <button on:click={() => showType = "lines"}>
                    <i class="fa-solid fa-grip-lines icon"></i>
                </button>
            </div>
        </div>
    </div>
    <div class="
        flex 
        flex-wrap 
        gap-10 
    ">
        {#each data.characters as character}
            <CardCharacter 
                classList={
                    (showType === "grid" && data.characters.length > 3) ? "flex-grow" : ""
                } 
                img={getRandomImage()} 
                {showType}
            >
                <div>
                    <TextLarge>{character.name}</TextLarge>
                    <TextBase classList="!font-medium text-light-text-secondary">{character.id}</TextBase>
                </div>
                <div class="flex gap-24">
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
                </div>
            </CardCharacter>  
        {/each}
    </div>
    <div class="
        flex
        gap-5
        fixed 
        bg-light-background 
        bg-opacity-75
        p-5
        rounded-xl
        bottom-10
        sm:bottom-28
        xs:self-center
        xs:flex-col
        xs:w-full
    ">
        <ButtonPrimary classList="xs:!w-full" link="library/create">
            <TextSmall classList="!font-semibold">Create Character</TextSmall>
        </ButtonPrimary>
        <ButtonSecondary classList="xs:!w-full">
            <TextSmall classList="!font-semibold">Select All</TextSmall>
        </ButtonSecondary>
    </div>
</div>