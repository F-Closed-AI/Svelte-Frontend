<script lang=ts>
	import { afterNavigate } from "$app/navigation";
	import { PageContent, TextXL, Switcher, Input, TextBase, ActionBar, ButtonPrimary, TextSmall, Modal, Avatar, Label, TextDecoration, DraggableList, ModalAddCharacter, ModalAddLabel, DraggableItem, Table, ButtonCircle, ButtonSecondary, ModalConfirmation } from "$lib/components";
	import { tabs, type TabData } from "$lib/stores/tabNavigationStore";
	import type { Character, PageCreateRoom, Label as LabelType, Room } from "$lib/types";
	import { tick } from "svelte";
	import { superForm } from "sveltekit-superforms/client";
	import { addS, calculateRemainingTime, formatRemainingTime, getRandomImage, sendRequests } from "$lib/functions";

	export let data: PageCreateRoom;
	export let state: "create" | "edit" = "create";

    let showModal = false;
    let modalProps: {} = {};
	let activeTab: number = 0;
	let mobileTabData: TabData[];

    let currentCharacters: Character[] = [];
    let currentLabels: LabelType[] = [];

    let previousRoom: Room;

	let switches: string[] = ["Input"]
	if (state === "edit") switches.push("Versions");

    let hover: { from: number, to: number } = { from: -1, to: -1 };
	let createButton: HTMLButtonElement;
    let deleteButton: HTMLButtonElement;

	const { form, errors, enhance, constraints } = superForm(data.createRoomForm, {
        dataType: 'json',
    });

    const {
        form: deleteForm,
        enhance: deleteEnhance,
    } = superForm(data.deleteRoomForm);

    $: if (previousRoom !== data.room) { 
        previousRoom = data.room;
        $form.name = data.room.name;
        currentCharacters = data.currentCharacters;
        currentLabels = data.currentLabels;
    }

    if (data.room && data.room.roomId) {
        $form.roomId = data.room.roomId;
        $deleteForm.roomId = data.room.id as string;
    }

    $: $form.characterIds = currentCharacters.map(c => c.id as string);
    $: $form.labelIds = currentLabels.map(l => l.id as string);

    function onTabChange(e: CustomEvent<{ activeTab: number }>) {
        activeTab = e.detail.activeTab;
    }

    async function onEditButtonClick(version: Room) {
        data.room = version;
        const [characters, labels] = await sendRequests([
            { url: `Room/Characters/${data.room.id}`, method: "GET" },
            { url: `Room/Labels/${data.room.id}`, method: "GET" }
        ]);
        [data.currentCharacters, data.currentLabels] = [characters as Character[], labels as LabelType[]];
        [currentCharacters, currentLabels] = [data.currentCharacters, data.currentLabels];
        history.pushState("", "", `/rooms/edit/${data.room.id}`);
    }

    function onDrop(e: CustomEvent<{ from: number, to: number}>) {
        [data.versions[e.detail.from], data.versions[e.detail.to]] = [data.versions[e.detail.to], data.versions[e.detail.from]];
        hover = { from: -1, to: -1 };
    }

    function onHover(e: CustomEvent<{ from: number, to: number}>) {
        hover = e.detail;
    }

    function removeCharacter(character: Character) {
        const index = currentCharacters.findIndex(c => c.id === character.id);
        if (index !== -1) {
            currentCharacters.splice(index, 1);
        } else {
            currentCharacters.push(character);
        }
        currentCharacters = currentCharacters;
    }

    function removeLabel(label: LabelType) {
        const index = currentLabels.findIndex(l => l.id === label.id);
        if (index !== -1) {
            currentLabels.splice(index, 1);
        } else {
            currentLabels.push(label);
        }
        currentLabels = currentLabels;
    }

    function deleteRoom() {
        modalProps = {
            content: ModalConfirmation,
            name: `Delete room (${data.room.name})`,
            type: "Room",
            message: "Are you sure you want to delete this room? This action is irreversible, and the room will be marked as deleted forever.",
            onDelete: () => deleteButton.click()
        }
        showModal = true;
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
        { 
            icon: "fa-solid fa-ban", 
            onClick: deleteRoom, 
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
                                    onAdd: removeCharacter,
                                }

                                showModal = true;
                            }}
                        >
                            Add character
                        </TextDecoration>
                    </div>
                    <div class="
                        flex
                        flex-wrap
                        gap-5
                    ">
                        {#each currentCharacters as character}
                            <button 
                                class="
                                    relative
                                    group
                                "
                                title={character.name} 
                                on:click={() => removeCharacter(character)}
                            >
                                <div class="
                                    flex
                                    items-center
                                    justify-center
                                    absolute
                                    w-full
                                    h-full
                                    rounded-full
                                    bg-light-btn-primary-background
                                    opacity-0
                                    transition-opacity
                                    group-hover:opacity-80
                                ">
                                    <i class="fa-solid fa-xmark text-light-text-tertiary"></i>
                                </div>
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
                                Labels ({$form.labelIds.length})
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
                                    allLabels: data.allLabels,
                                    currentLabels: currentLabels,
                                    onAdd: removeLabel
                                }

                                showModal = true;
                            }}
                        >
                            Add label
                        </TextDecoration>
                    </div>
                    <div class="
                        flex
                        flex-wrap
                        gap-4
                    ">
                        {#each currentLabels as label}
                            <button class="relative group lg:flex-1" title={label.name} on:click|preventDefault={() => removeLabel(label)}>
                                <div class="
                                    flex
                                    items-center
                                    justify-center
                                    absolute
                                    w-full
                                    h-full
                                    rounded-full
                                    bg-light-btn-primary-background
                                    opacity-0
                                    transition-opacity
                                    group-hover:opacity-80
                                ">
                                    <i class="fa-solid fa-xmark text-light-text-tertiary"></i>
                                </div>
                                <Label classList="lg:w-full" color={label.color}>
                                    <TextSmall 
                                        classList="
                                            !font-medium 
                                            text-light-text-tertiary
                                    ">
                                            {label.name}
                                    </TextSmall>
                                </Label>
                            </button>
                        {/each}
                    </div>
                    <input bind:value={$form.labelIds} name="labelIds" hidden>
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
                        columns={["Name", "Characters", "Labels", "Created"]}
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
                                    pr-10
                                    bg-inherit
                                ">
                                    <TextSmall classList="!font-medium">{version.labelId?.length}</TextSmall>
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
                                        <TextSmall classList="!font-medium">{version.labelId?.length}</TextSmall>
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
        {#if state === "edit"}
            <form
                method="POST"
                action="?/delete"
                use:deleteEnhance
                hidden
            >
                <input type="text" name="roomId" bind:value={$deleteForm.roomId}>
                <button bind:this={deleteButton}></button>
            </form>
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
            {#if state === "edit"}
                <ButtonSecondary 
                    classList="
                        flex-1
                        sm:w-full
                    "
                    onClick={deleteRoom}
                >
                    <TextSmall classList="
                        whitespace-nowrap
                        !font-semibold
                    ">
                        Delete
                    </TextSmall>   
                </ButtonSecondary>
            {/if}
        </ActionBar>
	</svelte:fragment>
</PageContent>