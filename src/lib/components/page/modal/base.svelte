<script lang=ts>
	import { TextLarge, Line } from "$lib/components";

    export let classList: string = "";
    export let name: string = "";
    export let createLink: string = "";
    export let onClose: (event: Event) => void = () => {};
</script>

<div class="flex flex-col gap-10 w-[40rem] sm:w-full {classList}">
    <div class="flex flex-col gap-5">
        <div class="flex justify-between">
            <div class="flex gap-5">
                <TextLarge classList="whitespace-nowrap">{name}</TextLarge>
                {#if createLink !== ""}
                    <a 
                        href={createLink}
                        class="icon flex items-center" 
                    >
                        <i class="fa-solid fa-plus"></i>
                    </a>
                {/if}
            </div>
            <button class="flex items-center" title="Close" on:click={onClose}>
                <i class="fa-solid fa-xmark icon"></i>
            </button>
        </div>
        <Line></Line>
    </div>
    <slot name="content"></slot>
</div>