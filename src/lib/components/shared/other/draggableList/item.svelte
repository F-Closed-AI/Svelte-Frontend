<script lang=ts>
	import { createEventDispatcher } from "svelte";
    import { from, to } from "$lib/stores/dragStore";

    export let classList: string = "";
    export let onClick: (event: Event) => void = () => {};   
    export let index: number;

    const dispatch = createEventDispatcher();

    function onDragStart(e: DragEvent) {
        from.set(index);
    }

    function onDragOver(e: DragEvent) {
        e.preventDefault();
        const target = e.target as HTMLElement;
        const parent = target.closest(".draggable-item");
        const to = Number(parent?.getAttribute("data-index"));

        dispatch("hover", { from: $from, to: to });
    }

    function onDrop(e: DragEvent) {
        const target = e.target as HTMLElement;
        to.set(Number(target.parentElement?.getAttribute("data-index")));
        dispatch("drop", { from: $from, to: $to})
    }
</script>

<div 
    class="
        draggable-item
        {classList}
    "
    data-index={index}
    draggable="true"
    on:dragstart={onDragStart}
    on:dragover={onDragOver}
    on:drop={onDrop}
    on:click={onClick}
    on:keypress={onClick}
    tabindex="-1"
>
    <slot></slot>
</div>