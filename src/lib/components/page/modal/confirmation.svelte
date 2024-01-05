<script lang=ts>
    import { ButtonPrimary, ButtonSecondary, ModalBase, TextBase } from "$lib/components";

    export let name: string = "";
    export let type: string = "";
    export let message: string = "";
    export let onClose: (event: Event) => void = () => {};
    export let onDelete: () => void = () => {};
</script>

<ModalBase
    classList="sm:relative sm:h-full"
    {name}
    {onClose}
>
    <div slot="content" class="flex flex-col gap-10">
        <TextBase>{message}</TextBase>
        <div class="w-full flex justify-end gap-5 sm:absolute sm:bottom-0">
            <ButtonPrimary onClick={onClose}>
                <TextBase classList="!font-semibold">Cancel</TextBase>
            </ButtonPrimary>
            <ButtonSecondary onClick={onDelete}>
                <TextBase classList="!font-semibold">Delete {type}</TextBase>
            </ButtonSecondary>
        </div>
    </div>
</ModalBase>