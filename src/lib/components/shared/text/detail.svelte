<script lang=ts>
    export let classList: string = "";
</script>

<div class="
    flex
    flex-col
    items-center
    w-max
    {classList}
">
    <div class="
        flex
        items-baseline
    ">
        <slot name="amount"></slot>
        <slot name="format"></slot>
    </div>
    <slot></slot>
</div>