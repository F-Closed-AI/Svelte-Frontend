<script lang=ts>
    export let skeleton: boolean = false;
    export let link: string = ""
    export let classList: string = "";
    export let imgClassList: string = "";
    export let img: string = "";
    export let showType: "grid" | "lines" | "slider" = "slider";
</script>

<a 
    href={link}
    class="
        flex
        gap-10
        flex-shrink-0
        overflow-hidden
        {showType === "grid" && "xs:flex-grow"}
        {showType === "lines" && "w-full sm:flex-col sm:bg-light-dashboard-dark sm:gap-0 sm:rounded-3xl"}
        {classList}
    "
>
    {#if img && !skeleton}
        <img 
            src={img} 
            alt="card"
            class="
                flex-1
                h-[18.75rem] 
                w-[15.625rem] 
                object-cover 
                rounded-xl
                {showType === "grid" && "w-full max-h-[40rem]"}
                {showType === "lines" && "w-full object-scale-down bg-light-dashboard-dark sm:object-cover sm:flex-[0.5] sm:max-h-[10.25rem]"}
                {imgClassList}
        ">
    {:else}
        <div class="
            flex-1
            h-[18.75rem] 
            w-[15.625rem]
            rounded-xl
            skeleton
            {imgClassList}
        "></div>
    {/if}
    {#if showType === "lines"}
        <div class="
            flex-1
            flex
            flex-col
            gap-6
            justify-between
            sm:justify-normal
            sm:p-5
        ">
            <slot></slot>
        </div>
    {/if}
</a>