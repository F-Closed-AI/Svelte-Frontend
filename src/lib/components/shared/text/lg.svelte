<script lang=ts>
    export let skeleton: boolean = false;
    export let classList: string = "";
</script>

<h2 
    class:skeleton={skeleton} 
    class="
        text-lg 
        font-semibold 
        max-w-max
        {classList}
">
    <slot></slot>
</h2>