<script lang=ts>
    export let classList: string = "";
    export let onClick: (event: Event) => void = () => {};    
</script>

<tr 
    class={classList}
    on:click={onClick}
>
    <slot></slot>
</tr>