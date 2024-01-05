<script lang=ts>
    import { PageContent, TextXL, Switcher, Avatar, ActionBar, ButtonPrimary, TextArea, ButtonSecondary, TextSmall, Modal, LoadingIcon, ChatBubble } from "$lib/components";
	import type { Character, Conversation, PageViewRoom } from "$lib/types";
    import { getRandomImage, sendRequest } from "$lib/functions";
	import { fade } from "svelte/transition";
	import { tabs, type TabData } from "$lib/stores/tabNavigationStore";
	import { afterNavigate } from "$app/navigation";
    import avatar from "$lib/img/avatar.png";
	import { superForm } from "sveltekit-superforms/client";
	import { tick } from "svelte";
	import { getFlash } from "sveltekit-flash-message/client";
	import { page } from "$app/stores";

    export let data: PageViewRoom;

    let mobileTabData: TabData[];
    let showModal = false;
    let modalProps: {} = {};

    let activeTab: number = 0;
    let switches: string[] = ["Characters", "Interact"]
    let selectedCharacters: Character[] = [];
    
    let createButton: HTMLButtonElement;
    let conversation: Conversation = {
        subject: "",
        conversationPhrases: [],
    };
    let talking: boolean = false;
    let generating: boolean = false;

    let readyStates: ("continue" | "completed")[] = [];

    const { form, errors, enhance, constraints } = superForm(data.createConversationForm, {
        dataType: 'json',
    });

    const flash = getFlash(page);

    $: selectedCharacterIds = selectedCharacters.map(s => s.id);

    $: if (conversation && readyStates[conversation.conversationPhrases.length - 1]) {
        talking = false;
    }

    function onTabChange(e: CustomEvent<{ activeTab: number }>) {
        activeTab = e.detail.activeTab;
    }

    async function selectCharacter(character: Character) {
        const index = selectedCharacters.findIndex(c => c.id === character.id);
        if (index !== -1) {
            selectedCharacters.splice(index, 1);
        } else {
            selectedCharacters.unshift(character);
            if (selectedCharacters.length > 2) {
                selectedCharacters.pop();
            }
        }
        selectedCharacters = selectedCharacters;
    }

    async function startConversation() {
        if (selectedCharacters.length != 2) {
            activeTab = 0;
            $flash = { type: "error", message: "No characters selected (2)." };
            return;
        }

        activeTab = 1;
        await tick();
        createButton.click();
    }

    async function createConversation() {
        showModal = false
        generating = true;
        if (conversation.conversationPhrases.length > 0) { 
            conversation.conversationPhrases = [];
            readyStates = [];
        }
        try {
            const requestData = {
                subject: $form.prompt,
                charIds: selectedCharacterIds
            };
            conversation = await sendRequest(`Room/CreateConversation/${data.room.id}`, "POST", requestData)
            talking = true;
        } catch (error) {
            $flash = { type: "error", message: "Internal error occured whilst starting conversation." };
        } finally {
            generating = false;
        }
    } 

    $: mobileTabData = [
        { 
            icon: `fa-solid fa-circle-notch ${generating && "fa-spin"}`, 
            onClick: () => startConversation(), 
            disabled: talking 
        },
        { 
            icon: (conversation.conversationPhrases.length > 0 && !talking) ? "fa-solid fa-circle-play" : "fa-solid fa-circle-stop", 
            onClick: () => {
                activeTab = 1;
                talking = !talking
            }, 
            disabled: !(conversation.length > 0) && !talking
        }
    ]

    $: tabs.update(() => mobileTabData);

    afterNavigate(() => {
        tabs.set(mobileTabData);
    })
</script>

<Modal 
    bind:showModal 
    {...modalProps}
    onClose={() => showModal = false} 
></Modal>

<PageContent>
	<TextXL 
        slot="title" 
        classList="
            font-semibold
        "
    >
        Room ({data.room.name})
    </TextXL>
	<svelte:fragment slot="content">
		<Switcher 
            activeTab={activeTab} 
            tabs={switches} 
            on:tabChange={onTabChange}
        ></Switcher>
        {#if activeTab === 0}
            <div class="
                flex
                flex-wrap
                gap-5
            ">
                {#each data.currentCharacters as character}
                    <button 
                        class="
                            relative
                            group
                        "
                        title={character.name} 
                        on:click={() => selectCharacter(character)}
                    >
                        {#if selectedCharacterIds.includes(character.id)}
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
                                    opacity-80
                                "
                                transition:fade|local
                            >
                                <i class="fa-solid fa-check text-light-text-tertiary"></i>
                            </div>
                        {/if}
                        <Avatar 
                            classList="
                                h-28
                                w-28
                            " 
                            image={getRandomImage()} 
                            alt={character.name}
                        ></Avatar>
                    </button>
                {/each}
            </div>
        {:else}
            <div class="
                flex 
                flex-col 
                gap-5                 
                pb-28
                sm:pb-0
                h-full
            ">
                <form
                    class="
                        flex
                        flex-col
                        gap-1
                        flex-1 
                        h-full
                    " 
                    method="POST" 
                    action="?/create" 
                    on:submit={createConversation}
                    use:enhance
                >
                    <div class="flex items-center gap-2">
                        <Avatar 
                            classList="!w-10 !h-10"
                            image={avatar} 
                            alt={"You"}
                        ></Avatar>
                        <TextSmall classList="!font-semibold">You</TextSmall>
                    </div>
                    <TextArea 
                        inputClassList="
                            !bg-light-background
                            !resize-y
                            !p-3
                        "
                        name="prompt"
                        error={$errors.prompt}
                        {...$constraints.prompt}
                        bind:value={$form.prompt}
                    ></TextArea>
                    <button bind:this={createButton} class="hidden"></button>
                </form>
                {#if conversation}
                    {#each conversation.conversationPhrases as phrase, index}
                        {#if readyStates[index - 1] === "completed" || index === 0}
                            <ChatBubble
                                image={getRandomImage()}
                                name={phrase.name}
                                text={phrase.content}
                                bind:talking={talking}
                                state={readyStates[index]}
                                onComplete={(completed) => { 
                                    if (completed) {
                                        readyStates[index] = "completed"
                                    } else {
                                        readyStates[index] = "continue";
                                    }
                                }}
                            >
                            </ChatBubble>  
                        {/if} 
                    {/each}
                {/if}
            </div>
        {/if}
        <ActionBar>
            <ButtonPrimary 
                classList="
                    flex-1
                    sm:w-full
                    {talking && "cursor-not-allowed"}
                "
                onClick={() => startConversation()}
                disabled={talking}
            >
                <TextSmall classList="
                    whitespace-nowrap
                    !font-semibold
                ">
                    {#if generating}
                        <LoadingIcon
                            icon="fa-solid fa-circle-notch pointer-events-none"
                            duration="1s"
                        ></LoadingIcon>
                    {:else}
                        Start Conversation
                    {/if}
                </TextSmall>   
            </ButtonPrimary>
            <ButtonSecondary 
                classList="
                    flex-1
                    sm:w-full
                    {!(conversation.conversationPhrases.length > 0) && !talking && "cursor-not-allowed"}
                "
                onClick={async() => {
                    activeTab = 1;
                    talking = !talking
                }}
                disabled={!conversation && !talking}
            >
                <TextSmall classList="
                    whitespace-nowrap
                    !font-semibold
                ">
                    {#if conversation && talking || !(conversation.conversationPhrases.length > 0)}
                        Stop
                    {:else}
                        Continue
                    {/if}
                </TextSmall>   
            </ButtonSecondary>
        </ActionBar>
    </svelte:fragment>
</PageContent>