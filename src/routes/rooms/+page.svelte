<script lang=ts>
	import { afterNavigate } from "$app/navigation";
	import { ActionBar, ButtonCircle, ButtonFilter, ButtonPrimary, ButtonSecondary, CardRoom, TextBase, Avatar, Label, TextSmall, TextXL } from "$lib/components";
	import { tabs } from "$lib/stores/tabNavigationStore.js";
    import { getRandomImage } from "$lib/functions/index.js";
	import { onMount } from "svelte";

    export let showType: "grid" | "lines" = "grid";
    export let data;

    let loaded: boolean = false;
    let changeFormat: boolean = true;

    const updateTabs = () => {
        tabs.set([
            { icon: "fa-solid fa-toolbox", link: "/rooms/create" },
            { icon: "fa-solid fa-check", onClick: () => console.log("yo") },
            { icon: "fa-solid fa-tags", link: "/rooms/labels" }
        ]) 
    }

    afterNavigate(() => {
        loaded = true;
        updateTabs();
    })

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
        <TextXL classList="font-semibold">My Rooms ({data.rooms.length})</TextXL>
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
                    <button on:click={() => showType = "grid"}>
                        <i class="fa-solid fa-grip-vertical icon"></i>
                    </button>
                    <button on:click={() => showType = "lines"}>
                        <i class="fa-solid fa-list"></i>
                    </button>
                </div>
            {/if}
        </div>
    </div>
    <div class="
        grid
        gap-4
        pb-28
        sm:pb-0
        {showType === "grid" && "grid-cols-[repeat(auto-fill,minmax(350px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"}
    ">
        {#each data.rooms as room, index}
            <CardRoom
                skeleton={!loaded} 
                classList={
                    (showType === "grid" && data.rooms.length > 3) ? "flex-grow" : ""
                } 
                link={`/rooms/${room.id}`}
                img={getRandomImage()} 
                {showType}
            >
                <div class="
                    flex 
                    flex-col 
                    gap-2
                    {showType === "lines" && "h-full sm:gap-10"}
                ">
                    <div class="flex flex-col gap-2">
                        <TextBase classList="!font-semibold">{room.name}</TextBase>
                        {#if data.labels[index][0]}
                            <Label classList="w-max" color={data.labels[index][0].color}>
                                <span class="font-medium text-light-text-tertiary">{data.labels[index][0].name}</span>
                            </Label>
                        {/if}
                    </div>
                    <div class="
                        ml-4 
                        absolute 
                        top-[45%] 
                        left-0 
                        flex 
                        w-full
                        {showType === "lines" && "!relative ml-0 !mt-auto !top-0"}
                    ">
                        {#if room.charId !== undefined && room.charId?.length > 0}
                            <div class="flex">
                                {#each Array(room.charId.length).slice(0, 2) as _, indexChar}
                                    <Avatar 
                                        classList="
                                            !w-14 
                                            !h-14 
                                            box-shadow
                                            {indexChar === 1 && "-translate-x-6"}
                                        " 
                                        image={getRandomImage()}
                                    ></Avatar>
                                {/each}
                            </div>
                        {/if}
                        <div class="
                            ml-auto 
                            mr-8 
                            flex 
                            flex-col
                            {showType === "lines" && "mr-0"}
                        ">
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
                                link="/rooms/edit/{room.id}"
                            >
                                <i class="fa-solid fa-pencil"></i>
                            </ButtonCircle>
                        </div>
                    </div>
                </div>
            </CardRoom>  
        {/each}
    </div>
    <ActionBar>
        <ButtonPrimary classList="sm:!w-full" link="rooms/create">
            <TextSmall classList="!font-semibold">Create Room</TextSmall>
        </ButtonPrimary>
        <ButtonSecondary classList="sm:!w-full">
            <TextSmall classList="!font-semibold">Select All</TextSmall>
        </ButtonSecondary>
    </ActionBar>
</div>