<script lang=ts>
    import { afterNavigate } from "$app/navigation";
	import { tabs } from "$lib/stores/tabNavigationStore.js";
	import { CardCharacter, ButtonFilter, ButtonPrimary, TextBase, TextDetail, TextLarge, TextSmall, TextXL, ButtonSecondary, ActionBar, ButtonCircle } from "$lib/components";
    import { getRandomImage } from "$lib/functions/index.js";
	import { onMount } from "svelte";
	import { fly } from "svelte/transition";

    export let showType: "grid" | "lines" = "grid";
    export let data;

    let loaded: boolean = false;
    let changeFormat: boolean = true;

    const updateTabs = () => {
        tabs.set([
            { icon: "fa-solid fa-toolbox", link: "/library/create" },
            { icon: "fa-solid fa-check", onClick: () => console.log("yo") }
        ]) 
    };

    afterNavigate(() => {
        loaded = true;
        updateTabs();
    });

    $: tabs.set([
        { icon: "fa-solid fa-toolbox", link: "/library/create" },
        { icon: "fa-solid fa-check", onClick: () => console.log("yo") }
    ]) 

    function handleResize() {
        if (window.innerWidth <= 576) {
            showType = "grid";
            changeFormat = false;
            return;
        }
        changeFormat = true;
    }

    onMount(() => {
        handleResize()

        window.addEventListener('resize', handleResize);
        return() => {
            window.removeEventListener('resize', handleResize);
        }
    })
</script>

<div class="
    flex
    flex-col
    gap-10
">
    <div>
        <TextXL classList="font-semibold">My Characters ({data.characters.length})</TextXL>
        <div class="
            flex
            justify-between
            gap-5
            xs:flex-col
            xs:items-start
        ">
            <ButtonFilter>time created</ButtonFilter>
            {#if changeFormat && loaded}
                <div class="
                    flex
                    gap-5
                ">
                    <button on:click={() => showType = "grid"} title="Grid view">
                        <i class="fa-solid fa-grip-vertical icon"></i>
                    </button>
                    <button on:click={() => showType = "lines"} title="Lines view">
                        <i class="fa-solid fa-list"></i>
                    </button>
                </div>
            {/if}
        </div>
    </div>
    <div class="
        grid
        {showType === "grid" && "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"}
        gap-4
    ">
        {#each data.characters as character}
            <CardCharacter
                skeleton={!loaded} 
                classList={
                    (showType === "grid" && data.characters.length > 3) ? "flex-grow" : ""
                } 
                link={`/library/${character.id}`}
                img={getRandomImage()} 
                title={character.name}
                {showType}
            >
                <div>
                    <TextLarge>{character.name}</TextLarge>
                    <TextBase classList="!font-medium text-light-text-secondary">{character.id}</TextBase>
                </div>
                <div class="flex justify-between">
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
                    <ButtonCircle 
                        classList="
                            box-shadow 
                            w-14
                            h-14
                            flex 
                            items-center 
                            justify-center
                            transition-colors
                            text-light-btn-primary-hover
                            hover:bg-light-btn-primary-background 
                            hover:text-light-text-tertiary
                        "
                        link="/library/edit/{character.id}"
                    >
                        <i class="fa-solid fa-pencil"></i>
                    </ButtonCircle>
                </div>
                <div class="absolute right-3 top-3" slot="cta">
                    <ButtonCircle 
                        classList="
                            box-shadow 
                            w-14
                            h-14
                            flex 
                            items-center 
                            justify-center
                            transition-colors
                            text-light-btn-primary-hover
                            hover:bg-light-btn-primary-background 
                            hover:text-light-text-tertiary
                        "
                        link="/library/edit/{character.id}"
                    >
                        <i class="fa-solid fa-pencil"></i>
                    </ButtonCircle>
                </div>
            </CardCharacter>  
        {/each}
    </div>
    <ActionBar>
        <ButtonPrimary classList="sm:!w-full" link="library/create">
            <TextSmall classList="!font-semibold">Create Character</TextSmall>
        </ButtonPrimary>
        <ButtonSecondary classList="sm:!w-full">
            <TextSmall classList="!font-semibold">Select All</TextSmall>
        </ButtonSecondary>
    </ActionBar>
</div>