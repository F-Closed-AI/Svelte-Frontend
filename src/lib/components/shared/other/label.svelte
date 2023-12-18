<script lang=ts>
    export let color: string = "#acacac";
</script>

<div 
    class="
        px-8 py-1
        w-max
        rounded-full
    "
    style="
        background-color: {color};
    "
>
    <slot></slot>
</div>