<script lang=ts>
	import { afterNavigate } from "$app/navigation";
	import { PageContent, TextXL, Switcher, Input, TextBase, ActionBar, ButtonPrimary, TextSmall, Modal, Avatar, Label, TextDecoration, DraggableList, ModalAddCharacter, ModalAddLabel, DraggableItem, Table, ButtonCircle } from "$lib/components";
	import { tabs, type TabData } from "$lib/stores/tabNavigationStore";
	import type { Character, PageCreateRoom, Label as LabelType, Room } from "$lib/types";
	import { tick } from "svelte";
	import { superForm } from "sveltekit-superforms/client";
	import { addS, calculateRemainingTime, formatRemainingTime, getRandomImage, sendRequest } from "$lib/functions";

	export let data: PageCreateRoom;
	export let state: "create" | "edit" = "create";

    let showModal = false;
    let modalProps: {} = {};
	let activeTab: number = 0;
	let mobileTabData: TabData[];

    let currentCharacters: Character[] = [];
    let currentLabels: LabelType[] = [];

	let switches: string[] = ["Input"]
	if (state === "edit") switches.push("Versions");

    let hover: { from: number, to: number } = { from: -1, to: -1 };

	let createButton: HTMLButtonElement;

	const { form, errors, enhance, constraints } = superForm(data.createRoomForm, {
        dataType: 'json'
    });
    $: if (data.room) currentCharacters = data.currentCharacters;

    if (data.room) {
        $form.name = data.room.name;
        if (data.room.roomId) {
            $form.roomId = data.room.roomId;
        }
    }

    $: $form.characterIds = currentCharacters.map(c => c.id as string);

    function onTabChange(e: CustomEvent<{ activeTab: number }>) {
        activeTab = e.detail.activeTab;
    }

    async function onEditButtonClick(version: Room) {
        data.room = version;
        data.currentCharacters = await sendRequest(`Room/Characters/${data.room.id}`, "GET");
        history.pushState("", "", `/rooms/edit/${version.id}`);
    }

    function onDrop(e: CustomEvent<{ from: number, to: number}>) {
        [data.versions[e.detail.from], data.versions[e.detail.to]] = [data.versions[e.detail.to], data.versions[e.detail.from]];
        hover = { from: -1, to: -1 };
    }

    function onHover(e: CustomEvent<{ from: number, to: number}>) {
        hover = e.detail;
    }

	$: mobileTabData = [
        { 
            icon: "fa-solid fa-floppy-disk", 
            onClick: async () => {
                activeTab = 0;
                await tick();
                createButton.click()
            }, 
        },
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
        {state === "create" ? "Create Room" : `Edit Room (${data.room.name})`}
    </TextXL>
	<svelte:fragment slot="content">
		<Switcher 
            activeTab={activeTab} 
            tabs={switches} 
            on:tabChange={onTabChange}
        ></Switcher>
		{#if activeTab === 0}
			<form
                class="
                    flex
                    flex-col
                    gap-10
                "
				method="POST"
				action="?/create"
                use:enhance
			>
                <Input
                    classList="!bg-light-background"
                    type="text"
                    label="Name"
                    name="name"
                    error={$errors.name}
                    {...$constraints.name}
                    bind:value={$form.name}
                ></Input>
                <div class="
                    flex
                    flex-col
                    gap-2
                    min-h-[11rem]
                ">
                    <div class="
                        flex
                        justify-between
                        xs:flex-col
                    ">
                        <label for="characterIds">
                            <TextBase 
                                classList="
                                    !font-medium
                                ">
                                    Characters ({currentCharacters.length})
                                </TextBase>
                        </label>
                        <TextDecoration 
                            classList="
                                text-light-text-primary
                            "
                            line={false}
                            onClick={(e) => {
                                e.preventDefault();

                                modalProps = {
                                    content: ModalAddCharacter,
                                    allCharacters: data.allCharacters,
                                    currentCharacters: currentCharacters,
                                    onAdd: () => { 
                                        currentCharacters = currentCharacters
                                    },
                                }

                                showModal = true;
                            }}
                        >
                            Add character
                        </TextDecoration>
                    </div>
                    <div class="
                        flex
                        gap-4
                    ">
                        {#each currentCharacters as character}
                            <Avatar 
                                classList="
                                    h-28
                                    w-28
                                " 
                                image={getRandomImage()} 
                                alt={character.name}
                            ></Avatar>
                        {/each}
                    </div>
                    <input bind:value={$form.characterIds} name="characterIds" hidden>
                </div>
                <div class="
                    flex
                    flex-col
                    gap-2
                    min-h-[22rem]
                ">
                    <div class="
                        flex
                        justify-between
                        xs:flex-col
                    ">
                        <label for="labels">
                            <TextBase 
                                classList="!font-medium"
                            >
                                Labels ({$form.labels.length})
                            </TextBase>
                        </label>
                        <TextDecoration 
                            classList="
                                text-light-text-primary
                            " 
                            line={false} 
                            onClick={(e) => {
                                e.preventDefault();

                                modalProps = {
                                    content: ModalAddLabel,
                                    currentLabels: currentLabels,
                                    onAdd: () => currentLabels = currentLabels,
                                }

                                showModal = true;
                            }}
                        >
                            Add label
                        </TextDecoration>
                    </div>
                    <div class="
                        flex
                        gap-4
                    ">
                        {#each $form.labels as label}
                            <Label color={label.color}>
                                <TextSmall 
                                    classList="
                                        !font-medium 
                                        text-light-text-tertiary
                                    ">
                                        {label.name}
                                    </TextSmall>
                            </Label>
                        {/each}
                    </div>
                    <input bind:value={$form.labels} name="labels" hidden>
                </div>
                <input 
                    type="text"
                    name="roomId"
                    bind:value={$form.roomId}
                    hidden
                >
				<button bind:this={createButton} hidden></button>
			</form>
            {:else}
            <div class="
                flex
                flex-col
                gap-5
            ">
                <TextSmall classList="!font-semibold">{addS(data.versions.length, "Version")}</TextSmall>
                <DraggableList>
                    <Table 
                        classList="
                            border-separate
                            border-spacing-y-[1rem]
                        "
                        columns={["Name", "Characters", "Created"]}
                    >
                        {#each data.versions as version, index}
                            <DraggableItem 
                                classList="
                                    cursor-move
                                    align-middle
                                    lg:hidden
                                    bg-light-background
                                    transition-colors
                                    table-row
                                    {hover.to === index && hover.from !== index && "bg-light-text-accent bg-opacity-10"}
                                    {version.id === data.room.id && "bg-light-dashboard-dark"}
                                "
                                onClick={() => onEditButtonClick(version)}
                                on:drop={onDrop} 
                                on:hover={onHover}
                                {index}
                            >
                                <td class="
                                    py-5 
                                    pl-5
                                    rounded-l-2xl 
                                    bg-inherit
                                ">
                                    <TextSmall classList="!font-medium">{version.name}</TextSmall>
                                </td>
                                <td class="
                                    pr-10
                                    bg-inherit
                                ">
                                    <TextSmall classList="!font-medium">{version.charId?.length}</TextSmall>
                                </td>
                                <td class="
                                    bg-inherit
                                ">
                                    <TextSmall classList="!font-medium">
                                        {
                                            version.dateTime
                                            ? formatRemainingTime(calculateRemainingTime(new Date(version.dateTime).getTime()), "other")
                                            : "Unknown"
                                        }
                                        ago
                                    </TextSmall>
                                </td>
                                <td 
                                    class="
                                        rounded-r-2xl
                                        py-5
                                        pr-5
                                        bg-inherit
                                    "
                                >
                                    <ButtonCircle
                                        classList="
                                            bg-light-dashboard-light
                                            ml-auto
                                            w-max
                                            justify-center
                                            !p-5
                                        "
                                        tooltip="Edit"
                                    >
                                        <i class="fa-solid fa-pen icon !text-sm"></i>
                                    </ButtonCircle>
                                </td>
                            </DraggableItem>
                            <DraggableItem 
                                onClick={() => onEditButtonClick(version)}
                                on:drop={onDrop} 
                                on:hover={onHover}
                                {index}
                            >
                                <button 
                                    class="
                                        hidden
                                        relative
                                        bg-light-background
                                        p-5
                                        w-full
                                        rounded-2xl
                                        mb-5
                                        cursor-move
                                        {hover.to === index && hover.from !== index && "bg-light-text-accent bg-opacity-10"}
                                        {version.id === data.room.id && "bg-light-dashboard-dark"}
                                        lg:flex
                                    "
                                    on:click={() => onEditButtonClick(version)}
                                >
                                    <div 
                                        class="
                                            flex
                                            flex-col
                                        "
                                    >
                                        <TextSmall classList="!font-medium">{version.name}</TextSmall>
                                        <TextSmall classList="!font-medium">{version.charId?.length}</TextSmall>
                                        <TextSmall classList="!font-medium">
                                            {
                                                version.dateTime
                                                ? formatRemainingTime(calculateRemainingTime(new Date(version.dateTime).getTime()), "other")
                                                : "Unknown"
                                            }
                                            ago
                                        </TextSmall>
                                    </div>
                                    <ButtonCircle
                                        classList="
                                            self-center
                                            justify-center
                                            bg-light-dashboard-light
                                            ml-auto
                                            w-max
                                            !p-5
                                        "
                                        tooltip="Edit"
                                    >
                                        <i class="fa-solid fa-pen icon !text-sm"></i>
                                    </ButtonCircle>
                                </button>
                            </DraggableItem>    
                        {/each}
                    </Table>
                </DraggableList>
            </div>
        {/if}
        <ActionBar>
            <ButtonPrimary 
                classList="
                    flex-1
                    sm:w-full
                "
                onClick={async () => {
                    activeTab = 0;
                    await tick(); 
                    createButton.click();
                }}
            >
                <TextSmall classList="
                    whitespace-nowrap
                    !font-semibold
                ">
                    {state !== "edit" ? "Create Room" : "Save"}
                </TextSmall>   
            </ButtonPrimary>
        </ActionBar>
	</svelte:fragment>
</PageContent>