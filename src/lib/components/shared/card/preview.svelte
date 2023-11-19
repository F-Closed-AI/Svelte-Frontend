<script lang=ts>
    export let classList: string = "";
    export let img: string = "";
</script>

<div class="
    flex
    flex-col
    gap-8
">
    <div class="
        flex
        flex-col
        gap-2
    ">
        {#if img}
            <img 
                src={img} 
                alt="card"
                class="
                    w-full
                    !h-[10rem]  
                    object-cover
                    rounded-xl
                    {classList}
            ">
        {/if}
        <slot name="name"></slot>
    </div>
    <div class="
        flex
        gap-32
    ">
        <slot></slot>
    </div>
    <slot name="button"></slot>
</div>