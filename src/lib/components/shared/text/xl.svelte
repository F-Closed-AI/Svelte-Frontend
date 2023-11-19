<script lang=ts>
    export let skeleton: boolean = false;
    export let classList: string = "";
</script>

<h1 
    class:skeleton={skeleton} 
    class="
        text-xl 
        font-bold 
        max-w-max
        {classList}
">
    <slot></slot>
</h1>