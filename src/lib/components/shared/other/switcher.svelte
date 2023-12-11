<script lang=ts>
    import { createEventDispatcher } from "svelte";
	import { ButtonSwitch, TextSmall } from "$lib/components";

    export let tabs: string[] = [];
    export let activeTab: number = 0;

    const dispatch = createEventDispatcher();

    function onTabClick(index: number) {
        activeTab = index;
        dispatch("tabChange", { activeTab });
    }
</script>


<div 
    class="
        flex 
        gap-5
">
    {#each tabs as tab, index}
        <ButtonSwitch 
            active={activeTab === index}
            onClick={() => onTabClick(index)}
        >
            <TextSmall
                classList="
                    !font-semibold
                    text-light-text-secondary
                    transition-colors
                    group-hover:text-light-btn-primary-background 
                    {activeTab === index && "!text-light-btn-primary-background"}
            ">
                {tab}
            </TextSmall>
        </ButtonSwitch>
    {/each}
</div>