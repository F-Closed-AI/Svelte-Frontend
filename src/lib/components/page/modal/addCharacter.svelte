<script lang=ts>
	import { Avatar, TextBase, ModalBase } from "$lib/components";
	import { getRandomImage } from "$lib/functions";
    import type { Character } from "$lib/types";
	import { fade } from "svelte/transition";

    export let allCharacters: Character[] = [];
    export let currentCharacters: Character[] = []
    export let onAdd: (character: Character) => void = () => {};
    export let onClose: (event: Event) => void = () => {};

    $: currentCharacterIds = currentCharacters.map(c => c.id);

    function addCharacter(character: Character) {
        onAdd(character);
        currentCharacters = currentCharacters;
        allCharacters = allCharacters;
    }
</script>

<ModalBase
    name="Add Character"
    createLink="/library"
    {onClose}
>
    <div slot="content">
        {#if allCharacters.length > 0}
            <div class="grid grid-cols-[repeat(auto-fill,minmax(8rem,1fr))] gap-5 sm:grid-cols-[repeat(auto-fill,minmax(6rem,1fr))] sm:gap-5">
                {#each allCharacters as character}
                    <button 
                        class="relative"
                        on:click={() => addCharacter(character)}
                        title={character.name}
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
</ModalBase>
