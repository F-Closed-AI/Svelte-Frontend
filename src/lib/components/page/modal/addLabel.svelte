<script lang=ts>
	import { TextBase, Label, ModalBase, TextSmall } from "$lib/components";
    import type { Label as LabelType } from "$lib/types";
	import { fade } from "svelte/transition";

    export let allLabels: LabelType[] = [];
    export let currentLabels: LabelType[] = [];
    export let onAdd: (label: LabelType) => void = () => {};
    export let onClose: (event: Event) => void = () => {};

    $: currentLabelIds = currentLabels.map(l => l.id);

    function addLabel(label: LabelType) {
        onAdd(label);
        currentLabels = currentLabels;
    }
</script>

<ModalBase
    name="Add Label"
    createLink="/rooms/labels"
    {onClose}
>
    <div slot="content">
        {#if allLabels.length > 0}
            <div class="flex flex-wrap gap-5">
                {#each allLabels as label}
                    <button 
                        class="relative flex-1"
                        on:click={() => addLabel(label)}
                        title={label.name}
                    >
                        <Label classList="flex-1" color={label.color}>
                            <TextSmall 
                                classList="
                                    !font-medium 
                                    text-light-text-tertiary
                            ">
                                {label.name}
                            </TextSmall>
                        </Label>
                        {#if currentLabelIds.includes(label.id)}
                            <div 
                                class="
                                    flex
                                    items-center
                                    justify-center
                                    absolute
                                    w-full
                                    h-full
                                    rounded-full
                                    bg-light-btn-primary-background
                                    bg-opacity-80
                                    top-0
                                "
                                transition:fade|local={{ duration: 250 }}
                            >
                                <i class="fa-solid fa-check text-light-text-tertiary"></i>
                            </div>
                        {/if}
                    </button>
                {/each}
            </div>
        {:else}
            <TextBase>No Labels</TextBase>
        {/if}
    </div>
</ModalBase>