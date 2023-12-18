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
        group
        rounded-xl
        {showType === "grid" && "xs:flex-grow"}
        {showType === "lines" && "w-full lg:flex-col lg:bg-light-dashboard-dark lg:gap-0 lg:rounded-3xl"}
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
                transition-transform
                {showType === "grid" && "w-full max-h-[40rem]"}
                {showType !== "lines" && "group-hover:scale-110"}
                {showType === "lines" && "w-full object-scale-down bg-light-dashboard-dark lg:object-cover lg:max-h-[10.25rem]"}
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
            lg:justify-normal
            lg:p-5
        ">
            <slot></slot>
        </div>
    {/if}
</a>