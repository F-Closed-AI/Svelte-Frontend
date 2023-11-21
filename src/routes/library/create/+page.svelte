<script lang=ts>
    import { sendRequest } from "$lib/functions/api/request.js";
    import { superForm } from "sveltekit-superforms/client";
	import { ButtonPrimary, ButtonSecondary, CardCharacter, Input, LoadingIcon, TextArea, TextBase, TextSmall, TextXL } from "$lib/components";
    import generated_3 from "$lib/img/generated_3.png";
	import convertCharacter from "$lib/functions/character/convert.js";
	import type { CharacterData, Character } from "$lib/types/types.js";

    export let data;

    let saveButton: HTMLButtonElement;
    let generating: boolean = false;
    let canSave: boolean = false;
    
    const { form, errors, enhance, constraints } = superForm(data.createCharacterForm);

    const {
        form: outputForm,
        enhance: outputEnhance,
    } = superForm(data.saveCharacterForm);
    
    const generate = async () => {
        generating = true;
        const response: CharacterData = await sendRequest(`Character/Create?input=${$form.prompt}`, "GET");
        const character: Character = convertCharacter(response);
        generating = false;

        $outputForm.name = character.name;
        $outputForm.age = character.age;
        $outputForm.backStory = character.backStory;

        canSave = true;
    }

    function onSaveButtonClick(e: Event) {
        e.preventDefault();
        saveButton.click();
    }
</script>

<div class="
    flex
    flex-col
    gap-5
    h-max
    xl:pb-52  
">
    <TextXL classList="font-semibold">Create Character</TextXL>
    <div class="
        flex
        gap-10
        h-max
        xl:flex-col
        xl:gap-20
    ">
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
                    flex-1 
                    !bg-light-background
                    h-[30rem]
                    xl:h-[15rem]
                "
                label="Input"
                name="prompt"
                error={$errors.prompt}
                {...$constraints.prompt}
                bind:value={$form.prompt}
            ></TextArea>
            <div class="
                flex
                gap-5
                fixed 
                bg-light-background 
                bg-opacity-75
                p-5
                rounded-xl
                bottom-10
                z-10
                sm:bottom-28
                xs:self-center
                xs:flex-col
                xs:w-full
            ">
                <ButtonPrimary 
                    classList="
                        flex-1
                        sm:w-full
                        {generating && "cursor-not-allowed"}
                    "
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
                        {!canSave && "cursor-not-allowed"}
                    "
                    onClick={onSaveButtonClick}
                    disabled={!canSave}
                >
                    <TextSmall classList="
                        !font-semibold
                    ">
                        Save
                    </TextSmall>
                </ButtonSecondary>
            </div>
        </form>
        <div class="
            flex-[1.5]
            flex
            flex-col
            gap-5
            -mt-16
        ">
            <TextBase classList="!font-medium">Output</TextBase>
            <form 
                class="
                    relative
                    isolate
                    flex
                    flex-col
                    gap-10
                    p-10
                    rounded-3xl
                    bg-light-background
                    xs:bg-light-dashboard-light
                    xs:p-0
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
                            classList="xs:bg-light-background"
                            label="Name"
                            name="name"
                            bind:value={$outputForm.name}
                        >
                        </Input>
                        <Input
                            classList="xs:bg-light-background"
                            label="Age"
                            name="age"
                            bind:value={$outputForm.age}
                        >
                        </Input>
                    </div>
                </div>
                <TextArea 
                    classList="
                        !h-[15rem]
                        xs:bg-light-background
                    "
                    label="Backstory"
                    name="backStory"
                    bind:value={$outputForm.backStory}
                >
                </TextArea>
                <button bind:this={saveButton} class="hidden"></button>
            </form>
        </div>
    </div>
</div>