<script lang=ts>
	import { afterNavigate } from "$app/navigation";
	import { ActionBar, ButtonFilter, ButtonPrimary, ButtonSecondary, Label, TextSmall, TextXL } from "$lib/components";
	import { tabs } from "$lib/stores/tabNavigationStore.js";

    export let data;

    const updateTabs = () => {
        tabs.set([
            { icon: "fa-solid fa-toolbox", link: "labels/create" },
            { icon: "fa-solid fa-check", onClick: () => console.log("yo") }
        ]) 
    }

    afterNavigate(() => updateTabs());

    $: tabs.set([
        { icon: "fa-solid fa-toolbox", link: "labels/create" },
        { icon: "fa-solid fa-check", onClick: () => console.log("yo") }
    ])
</script>

<div class="
    flex
    flex-col
    gap-10
">
    <div>
        <TextXL classList="font-semibold">My Labels ({data.labels.length})</TextXL>
        <div class="
            flex
            justify-between
            gap-5
            xs:flex-col
            xs:items-start
        ">
            <ButtonFilter>time created</ButtonFilter>
        </div>
    </div>
    <div class="
        flex
        flex-wrap
        gap-5
        pb-28
        sm:pb-0
    ">
        {#each data.labels as label}
            <a href="/rooms/labels/edit/{label.id}">
                <Label
                    color={label.color}
                >
                    <TextSmall
                        classList="!font-medium text-light-text-tertiary"
                    >
                        {label.name}
                    </TextSmall>
                </Label>
            </a>
        {/each}
    </div>
    <ActionBar>
        <ButtonPrimary classList="sm:!w-full" link="labels/create">
            <TextSmall classList="!font-semibold">Create Label</TextSmall>
        </ButtonPrimary>
        <ButtonSecondary classList="sm:!w-full">
            <TextSmall classList="!font-semibold">Select All</TextSmall>
        </ButtonSecondary>
    </ActionBar>
</div>