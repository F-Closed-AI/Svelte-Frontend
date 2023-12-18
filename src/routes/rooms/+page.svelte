<script lang=ts>
	import { afterNavigate } from "$app/navigation";
	import { ActionBar, ButtonFilter, ButtonPrimary, ButtonSecondary, CardRoom, TextBase, TextDetail, TextLarge, TextSmall, TextXL } from "$lib/components";
	import { tabs } from "$lib/stores/tabNavigationStore.js";
    import { getRandomImage } from "$lib/functions/index.js";

    export let showType: "grid" | "lines" = "grid";
    export let data;

    let loaded: boolean = false;

    const updateTabs = () => {
        tabs.set([
            { icon: "fa-solid fa-toolbox", link: "/rooms/create" },
            { icon: "fa-solid fa-check", onClick: () => console.log("yo") }
        ]) 
    }

    afterNavigate(() => {
        loaded = true;
        updateTabs();
    })

    $: tabs.set([
        { icon: "fa-solid fa-toolbox", link: "/rooms/create" },
        { icon: "fa-solid fa-check", onClick: () => console.log("yo") }
    ])
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
        </div>
    </div>
    <div class="
        grid
        {showType === "grid" && "grid-cols-[repeat(auto-fill,minmax(250px,1fr))]"}
        gap-4
    ">
        {#each data.rooms as room}
            <CardRoom
                skeleton={!loaded} 
                classList={
                    (showType === "grid" && data.rooms.length > 3) ? "flex-grow" : ""
                } 
                link={`/rooms/edit/${room.id}`}
                img={getRandomImage()} 
                {showType}
            >
                <div>
                    <TextLarge>{room.name}</TextLarge>
                    <TextBase classList="!font-medium text-light-text-secondary">{room.id}</TextBase>
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