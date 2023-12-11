<script lang=ts>
    export let classList: string = "";
    export let active: boolean = false;
    export let onClick: (event: Event) => void = () => {};
</script>

<button
    class="
        px-3
        py-2
        border-b-2 
        transition-colors
        cursor-pointer
        group
        hover:border-light-btn-primary-background
        {active ? "border-light-btn-primary-background" : "border-light-text-secondary"}
        {classList}
    "
    on:click={onClick}
    disabled={active}
>
    <slot></slot>
</button>