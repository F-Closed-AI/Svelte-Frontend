<script lang=ts>
    export let skeleton: boolean = false;
    export let classList: string = ""
</script>

<span 
    class:skeleton={skeleton} 
    class="
        text-sm 
        font-normal 
        max-w-max
        {classList}
    "
>
    <slot></slot>
</span>