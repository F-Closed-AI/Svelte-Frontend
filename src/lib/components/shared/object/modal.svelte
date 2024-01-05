<script lang=ts>
    export let showModal: boolean = false;

    let dialog: HTMLDialogElement;

    $: if (dialog && showModal) dialog.showModal();
</script>

{#if showModal}
    <div 
        role="dialog"
        class="
            fixed
            flex
            items-center
            justify-center
            w-screen
            h-screen
            bg-black
            bg-opacity-50
            top-0
            left-0
            z-50
        "
        on:click|self={() => showModal = false}
        on:keyup|preventDefault
    >
        <div class="bg-light-dashboard-light w-max h-max p-10 rounded-lg sm:w-full sm:h-full">
            <svelte:component on:click this={$$restProps.content}  {...$$restProps}/>
        </div>
    </div>
{/if}