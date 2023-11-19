<script lang=ts>
    export let link: string = "/"
    export let classList: string = "";
    export let img: string = "";
</script>

<a 
    href={link}
    class="
        flex-shrink-0
        snap-start
        {classList}
">
    {#if img}
        <img 
            src={img} 
            alt="card"
            class="
                h-[18.75rem] 
                w-[15.625rem] 
                object-cover 
                rounded-xl
        ">
    {/if}
    <slot></slot>
</a>