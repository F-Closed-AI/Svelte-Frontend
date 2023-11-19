<script lang=ts>
    export let classList: string = "";
    export let img: string = "";
</script>

<button class="
    flex 
    gap-3 
    items-center
">
    <img 
        src={img} 
        alt="card"
        class="
            w-[6.25rem]
            h-[6.25rem]
            object-cover
            rounded-xl
            {classList}
        "
    >
    <div class="
        flex
        flex-col
    ">
        <slot></slot>
    </div>
</button>