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
        relative
        flex
        flex-col
        flex-shrink-0
        overflow-hidden
        group
        rounded-3xl
        bg-light-background
        cursor-default
        {showType === "grid" && "xs:flex-grow"}
        {showType === "lines" && "bg-light-dashboard-light !flex-row gap-10 w-full sm:!flex-col sm:gap-0 sm:rounded-3xl sm:bg-light-background"}
        {classList}
    "
    data-sveltekit-preload-data
>
    {#if img && !skeleton}
        <img 
            src={img} 
            alt="card"
            class="
                flex-1
                !h-[10rem]
                !max-h-[10.5rem]
                w-full
                object-cover 
                rounded-t-3xl
                transition-transform
                {showType === "grid" && "w-full"}
                {showType === "lines" && "w-full !h-[18.75rem] !max-h-[18.75rem] rounded-3xl object-scale-down bg-light-dashboard-dark sm:object-cover sm:flex-[0.5] sm:!max-h-[10.25rem]"}
                {imgClassList}
        ">
        <div 
            class="
                flex
                items-center
                px-4
                w-full
                mt-5
                h-[7.5rem]
                {showType === "lines" && "hidden"}
            "    
        >
            <slot></slot>
        </div>
    {:else}
        <div class="
            flex-1
            min-h-[19.5rem]
            w-full
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
            h-full
            justify-between
            sm:justify-normal
            sm:p-5
            {showType === "lines" && "py-1"}
        ">
            <slot></slot>
        </div>
    {/if}
</a>