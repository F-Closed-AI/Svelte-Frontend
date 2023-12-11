<script lang=ts>
    import { sendRequest } from "$lib/functions/api/request.js";
    import { superForm } from "sveltekit-superforms/client";
	import { ButtonCircle, ButtonPrimary, ButtonSecondary, CardCharacter, Input, LoadingIcon, TableRow, TextArea, Table, TextSmall, TextXL, Switcher, ActionBar } from "$lib/components";
    import generated_3 from "$lib/img/generated_3.png";
	import type { CharacterData, Character, PageCreate } from "$lib/types";
	import { tabs, type TabData } from "$lib/stores/tabNavigationStore.js";
	import { afterNavigate } from "$app/navigation";
    import { convertCharacter, calculateRemainingTime, formatRemainingTime, addS } from "$lib/functions";
	import { tick } from "svelte";

    export let data: PageCreate;
    export let state: "create" | "edit" = "create";

    let loaded: boolean = false;
    let activeTab: number = 0;
    let mobileTabData: TabData[];

    let switches: string[] = ["Input", "Output"];
    if (state === "edit") switches.push("Versions");

    let generateButton: HTMLButtonElement;
    let saveButton: HTMLButtonElement;
    let generating: boolean = false;
    let canSave: boolean = false;

    const { form, errors, enhance, constraints } = superForm(data.createCharacterForm);

    const {
        form: outputForm,
        enhance: outputEnhance,
    } = superForm(data.saveCharacterForm);
    
    $: if (data.character) {
        $outputForm.name = data.character.name;
        $outputForm.age = data.character.age;
        $outputForm.backStory = data.character.backStory;
    }

    const generate = async () => {
        generating = true;
        let response: CharacterData;
        try {
            canSave = false;
            response = await sendRequest(`Character/Create?input=${$form.prompt}`, "GET");
            const character: Character = convertCharacter(response);

            $outputForm.name = character.name;
            $outputForm.age = character.age;
            $outputForm.backStory = character.backStory;

            if (state === "edit") {
                $outputForm.charId = data.character.charId!;
            }

            canSave = true;
        } catch (error) {
            console.log((error as Error).message);
        } finally {
            generating = false;
        }
    }

    function onTabChange(e: CustomEvent<{ activeTab: number }>) {
        activeTab = e.detail.activeTab;
    }

    function onEditButtonClick(version: Character) {
        data.character = version;
        history.pushState("", "", `/library/edit/${version.id}`);
    }
    

    $: mobileTabData = [
        { 
            icon: `fa-solid fa-circle-notch ${generating && "fa-spin"}`, 
            onClick: async () => {
                activeTab = 0;
                await tick();
                generateButton.click()
            }, 
            disabled: generating 
        },
        { 
            icon: "fa-solid fa-floppy-disk", 
            onClick: async () => {
                activeTab = 1;
                await tick();
                saveButton.click()
            }, 
            disabled: !canSave 
        },
    ]

    $: tabs.update(() => mobileTabData);

    afterNavigate(() => {
        tabs.set(mobileTabData);
        loaded = true;
    })
</script>

<div class="
    flex
    flex-col
    gap-5
    h-max
    pb-10
">
    <TextXL classList="font-semibold">{state === "create" ? "Create Character" : `Edit Character (${data.character.name})`}</TextXL>
    <div 
        class="
            flex
            flex-col
            gap-10
    ">
        <Switcher activeTab={activeTab} tabs={switches} on:tabChange={onTabChange}></Switcher>
        {#if activeTab === 0}
            <form
                class="
                    flex
                    flex-col
                    gap-10
                    flex-1 
                    h-full
                " 
                method="POST" 
                action="?/create" 
                on:submit|preventDefault={generate}
                use:enhance
            >
                <TextArea 
                    classList="
                        h-[24rem]
                    "
                    inputClassList="
                        !bg-light-background
                    "
                    name="prompt"
                    error={$errors.prompt}
                    {...$constraints.prompt}
                    bind:value={$form.prompt}
                ></TextArea>
                <button bind:this={generateButton} class="hidden"></button>
            </form>
        {:else if activeTab === 1 || state !== "edit"}
            <form 
                class="
                    relative
                    flex
                    flex-col
                    gap-10
                    rounded-3xl
                " 
                method="POST" 
                action="?/save"
                use:outputEnhance
            >
                <div class="
                    flex
                    gap-10
                    sm:flex-col
                ">
                    <CardCharacter
                        skeleton={!loaded} 
                        classList="cursor-default" 
                        img={generated_3}
                    ></CardCharacter>
                    <div class="
                        flex
                        flex-col
                        gap-10
                        w-full
                    ">
                        <Input
                            classList="!bg-light-background"
                            label="Name"
                            name="name"
                            bind:value={$outputForm.name}
                        >
                        </Input>
                        <Input
                            classList="!bg-light-background"
                            label="Age"
                            name="age"
                            bind:value={$outputForm.age}
                        >
                        </Input>
                    </div>
                </div>
                <TextArea 
                    classList="
                        !h-[18rem]
                    "
                    inputClassList="
                        !bg-light-background
                    "
                    label="Backstory"
                    name="backStory"
                    bind:value={$outputForm.backStory}
                >
                </TextArea>
                <input 
                    type="text"
                    name="charId"
                    bind:value={$outputForm.charId}
                    hidden
                >
                <button bind:this={saveButton} class="hidden"></button>
            </form>
        {:else}
            <div class="
                flex
                flex-col
                gap-5
            ">
                <TextSmall classList="!font-semibold">{addS(data.versions.length, "Version")}</TextSmall>
                <Table 
                    classList="
                        border-separate
                        border-spacing-y-[1rem]
                    "
                    columns={["Image", "Name", "Age", "Created"]}
                >
                    {#each data.versions as version}
                        <TableRow 
                            classList="
                                lg:hidden
                                bg-light-background
                                transition-colors
                                {version.id === data.character.id && "bg-light-dashboard-dark"}
                            "
                            onClick={() => onEditButtonClick(version)}
                        >
                            <td class="
                                py-5 
                                pl-5
                                rounded-l-2xl 
                                bg-inherit
                            ">
                                <img 
                                    class="
                                        h-20 
                                        w-20 
                                        object-cover 
                                        rounded-full
                                        {loaded && "skeleton"}
                                    " 
                                    src={generated_3} 
                                    alt="character"
                                >
                            </td>
                            <td class="
                                pr-10
                                bg-inherit
                            ">
                                <TextSmall classList="!font-medium">{version.name}</TextSmall>
                            </td>
                            <td class="
                                pr-10
                                bg-inherit
                            ">
                                <TextSmall classList="!font-medium">{version.age}</TextSmall>
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
                                        !p-5
                                    "
                                >
                                    <i class="fa-solid fa-pen icon !text-sm"></i>
                                </ButtonCircle>
                            </td>
                        </TableRow>
                        <button 
                            class="
                                hidden
                                relative
                                bg-light-background
                                flex-col
                                p-5
                                w-full
                                rounded-2xl
                                mb-5
                                cursor-default
                                {version.id === data.character.id && "bg-light-dashboard-dark"}
                                lg:flex
                            "
                            on:click={() => onEditButtonClick(version)}
                        >
                            <TextSmall classList="!font-medium">{version.name}</TextSmall>
                            <TextSmall classList="!font-medium">{version.age}</TextSmall>
                            <TextSmall classList="!font-medium">
                                {
                                    version.dateTime
                                    ? formatRemainingTime(calculateRemainingTime(new Date(version.dateTime).getTime()), "other")
                                    : "Unknown"
                                }
                                ago
                            </TextSmall>
                            <ButtonCircle
                                classList="
                                    absolute
                                    right-5
                                    top-[50%]
                                    -translate-y-[50%]
                                    bg-light-dashboard-light
                                    ml-auto
                                    w-max
                                    !p-5
                                "
                            >
                                <i class="fa-solid fa-pen icon !text-sm"></i>
                            </ButtonCircle>
                        </button>
                    {/each}
                </Table>
            </div>
        {/if}
        <ActionBar>
            <ButtonPrimary 
                classList="
                    flex-1
                    sm:w-full
                    {generating && "cursor-not-allowed"}
                "
                onClick={async () => {
                    activeTab = 0;
                    await tick(); 
                    generateButton.click();
                }}
                disabled={generating}
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
                        Generate Character
                    {/if}
                </TextSmall>   
            </ButtonPrimary>
            <ButtonSecondary 
                classList="
                    flex-1
                    sm:w-full
                    {!canSave && state !== "edit" && "cursor-not-allowed"}
                "
                onClick={async () => {
                    activeTab = 1;
                    await tick(); 
                    saveButton.click();
                }}
                disabled={!canSave && state !== "edit"}
            >
                <TextSmall classList="
                    !font-semibold
                ">
                    Save
                </TextSmall>
            </ButtonSecondary>
        </ActionBar>
    </div>
</div>