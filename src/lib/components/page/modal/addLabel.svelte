<script lang=ts>
	import { TextLarge, Line, TextBase } from "$lib/components";
    import type { Label } from "$lib/types";

    export let currentLabels: Label[] = []
    export let onAdd: () => void = () => {};
    export let onClose: (event: Event) => void = () => {};

    function addLabel(label: Label) {
        if (currentLabels.includes(label)) {
            const index = currentLabels.indexOf(label);
            currentLabels.splice(index, 1);
        } else {
            currentLabels.push(label);
        }
        onAdd();
    }
</script>

<div class="flex flex-col gap-10">
    <div class="flex flex-col gap-5">
        <div class="flex justify-between w-[40rem] sm:w-full">
            <TextLarge classList="whitespace-nowrap">Add Label</TextLarge>
            <button class="flex items-center" on:click={onClose}>
                <i class="fa-solid fa-xmark icon"></i>
            </button>
        </div>
        <Line></Line>
    </div>
    <TextBase>No Labels</TextBase>
</div>