<script lang=ts>
    import { onMount } from "svelte";

    let loaded: boolean = false;

    onMount(() => loaded = true);
</script>

{#if loaded}
    <slot></slot>
{/if}