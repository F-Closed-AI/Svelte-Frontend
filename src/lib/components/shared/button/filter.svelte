<script lang=ts>
    import { TextBase } from "$lib/components";

    export let toggle: boolean = false
</script>

<button
    on:click={() => toggle = !toggle}
>
    <TextBase>Sort by</TextBase>
    <TextBase classList="
        font-semibold
        text-light-btn-primary-background
    ">
        <slot></slot>
        <i 
            class="fa-solid fa-chevron-down"
            class:fa-chevron-down={!toggle}
            class:fa-chevron-up={toggle}
        ></i>
    </TextBase>
</button>