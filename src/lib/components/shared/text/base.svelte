<script lang=ts>
    export let skeleton: boolean = false;
    export let classList: string = "";
</script>

<span 
    class:skeleton={skeleton} 
    class="
        font-normal 
        text-base 
        max-w-max
        {classList}
">
    <slot></slot>
</span>