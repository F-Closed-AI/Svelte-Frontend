<script lang=ts>
	import { TextBase, TextSmall } from "$lib/components";
	import { fade, slide } from "svelte/transition";

    export let skeleton: boolean = false;
    export let classList: string = "";
    export let label: string = "";
    export let value: string | number = "";
    export let error: string[] | undefined = [];
    export let onInput: (event: Event) => void = () => {};
</script>

<div class="
    flex
    flex-col
    gap-2
">
    <label for={$$props.name}>
        <TextBase classList="!font-medium">{label}</TextBase>
    </label>
    <div class="
        relative 
        flex 
        items-center 
        text-light-text-primary
    ">
        <div class="
           flex 
            items-center 
            absolute 
            z-10
            px-4
        ">
            <slot name="icon"/>
        </div> 
        <div class="w-full relative flex flex-col gap-2">
            <input
                class:skeleton={skeleton}
                class:outline-error={error && error.length}
                class="
                    bg-light-dashboard-light
                    px-5
                    py-3
                    rounded-full
                    w-full
                    hover:outline 
                    hover:outline-2
                    focus
                    {classList}
                "
                data-sveltekit-keepfocus
                bind:value={value}
                on:input={onInput}
                {...$$props}
            >
            {#if error?.at(0) !== undefined}
                <i class="absolute right-3 translate-y-[50%] fa-solid fa-circle-exclamation text-error" transition:fade></i>
                <div transition:slide>
                    <TextSmall classList="text-error">{error?.at(0) ?? ""}</TextSmall>
                </div>
            {/if}
        </div>
    </div>
</div>