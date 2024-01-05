<script lang=ts>
	import { afterNavigate } from "$app/navigation";
    import { PageContent, TextXL, Switcher, Input, TextBase, ButtonPrimary, TextSmall, ActionBar, ModalConfirmation, Modal, ButtonSecondary } from "$lib/components";
	import { tabs, type TabData } from "$lib/stores/tabNavigationStore";
	import type { PageCreateLabel } from "$lib/types";
	import { superForm } from "sveltekit-superforms/client";

    export let data: PageCreateLabel;
    export let state: "create" | "edit" = "create";

    let mobileTabData: TabData[];
    let switches = ["Input"];
    let colorInput: HTMLInputElement;
    let deleteButton: HTMLButtonElement;
    let createButton: HTMLButtonElement;
    let showModal = false;
    let modalProps: {} = {};

    const { form, errors, enhance, constraints } = superForm(data.createLabelForm, {
        dataType: 'json',
    });

    const {
        form: deleteForm,
        enhance: deleteEnhance,
    } = superForm(data.deleteLabelForm);

    function deleteLabel() {
        modalProps = {
            content: ModalConfirmation,
            name: `Delete label (${data.label.name})`,
            type: "Label",
            message: "Are you sure you want to delete this label? This action is irreversible, and the label will be marked as deleted forever.",
            onDelete: () => deleteButton.click()
        }
        showModal = true;
    }

    $: if (data.label) { 
        $form.name = data.label.name;
        $form.color = data.label.color;
        $deleteForm.labelId = data.label.id as string;
    }

    $: mobileTabData = [
        { 
            icon: "fa-solid fa-floppy-disk", 
            onClick: () => {
                createButton.click()
            }, 
        },
        { 
            icon: "fa-solid fa-ban", 
            onClick: deleteLabel, 
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
        {state === "create" ? "Create Label" : `Edit Label (${data.label.name})`}
    </TextXL>
    <svelte:fragment slot="content">
		<Switcher  
            tabs={switches} 
        ></Switcher>
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
                minlength="5"
                bind:value={$form.name}
            ></Input>
            <div class="flex flex-col gap-2">
                <TextBase classList="!font-medium">Color</TextBase>
                <div class="relative w-min">
                    <button
                        class="h-20 w-20 rounded-full border-2 border-light-text-primary"   
                        on:click|preventDefault={() => colorInput.click()}
                        style="background-color: {$form.color}"
                    ></button>
                    <input 
                        class="absolute top-0 left-0 -z-10"
                        type="color"
                        name="color"
                        {...$constraints.color}
                        bind:this={colorInput}
                        bind:value={$form.color}
                    >
                </div>
            </div>
            <button bind:this={createButton} hidden></button>
        </form>
        {#if state === "edit"}
            <form
                method="POST"
                action="?/delete"
                use:deleteEnhance
                hidden
            >
                <input type="text" name="labelId" bind:value={$deleteForm.labelId}>
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
                    createButton.click();
                }}
            >
                <TextSmall classList="
                    whitespace-nowrap
                    !font-semibold
                ">
                    {state !== "edit" ? "Create Label" : "Save"}
                </TextSmall>   
            </ButtonPrimary>
            {#if state === "edit"}
                <ButtonSecondary 
                    classList="
                        flex-1
                        sm:w-full
                    "
                    onClick={deleteLabel}
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