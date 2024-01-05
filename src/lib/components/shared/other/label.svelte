<script lang=ts>
    export let classList: string = "";
    export let color: string = "#acacac";
</script>

<div 
    class="
        px-8 py-1
        rounded-full
        whitespace-nowrap
        {classList}
    "
    style="
        background-color: {color};
    "
>
    <slot></slot>
</div>