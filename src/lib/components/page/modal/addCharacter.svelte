<script lang=ts>
	import { TextLarge, Avatar, Line, TextBase } from "$lib/components";
	import { getRandomImage } from "$lib/functions";
    import type { Character } from "$lib/types";
	import { fade } from "svelte/transition";

    export let allCharacters: Character[] = [];
    export let currentCharacters: Character[] = []
    export let onAdd: () => void = () => {};
    export let onClose: (event: Event) => void = () => {};

    $: currentCharacterIds = currentCharacters.map(c => c.id);

    function addCharacter(character: Character) {
        const index = currentCharacters.findIndex(c => c.id === character.id)
        if (index !== -1) {
            currentCharacters.splice(index, 1);
        } else {
            currentCharacters.push(character);
        }
        currentCharacters = currentCharacters;
        allCharacters = allCharacters;
        onAdd();
    }
</script>

<div class="flex flex-col gap-10">
    <div class="flex flex-col gap-5">
        <div class="flex justify-between w-[40rem] sm:w-full">
            <TextLarge classList="whitespace-nowrap">Add Character</TextLarge>
            <button class="flex items-center" on:click={onClose}>
                <i class="fa-solid fa-xmark icon"></i>
            </button>
        </div>
        <Line></Line>
    </div>
    {#if allCharacters.length > 0}
        <div class="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-5 sm:grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] sm:gap-5">
            {#each allCharacters as character}
                <button 
                    class="relative"
                    on:click={() => addCharacter(character)}
                >
                    <Avatar 
                        classList="
                            w-[8rem] 
                            h-[8rem] 
                            sm:w-[6rem]
                            sm:h-[6rem]
                            cursor-pointer
                        " 
                        image={getRandomImage()} 
                        alt={character.name}
                    ></Avatar>
                    {#if currentCharacterIds.includes(character.id)}
                        <div 
                            class="
                                flex
                                items-center
                                justify-center
                                absolute
                                w-[8rem]
                                h-[8rem]
                                rounded-full
                                bg-light-btn-primary-background
                                bg-opacity-80
                                top-0
                                sm:w-[6rem]
                                sm:h-[6rem]
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
        <TextBase>No Characters</TextBase>
    {/if}
</div>