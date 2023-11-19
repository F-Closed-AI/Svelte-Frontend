<script lang=ts>
    export let skeleton: boolean = false;
</script>

<h2 
    class:skeleton={skeleton} 
    class="
        text-lg 
        font-semibold 
        max-w-max
">
    <slot></slot>
</h2>