<script lang=ts>
	import { Logo, Input } from "$lib/components/index.ts";
    import Avatar from "$lib/img/avatar.png";
</script>

<header class="
    fixed
    flex 
    gap-16 
    justify-between 
    items-center
    w-fullscreen
    max-w-[120rem]
    z-10
    xs:w-fullscreen-sm
    sm:bg-none
    sm:mt-5
">
    <Logo></Logo>
    <div class="
        w-full 
        max-w-4xl 
        sm:hidden
    ">
        <Input
            classList="!px-12"
            placeholder="Search Character..."
        >
            <i slot="icon" class="fa-solid fa-magnifying-glass"></i>
        </Input>
    </div>
    <div class="flex items-center gap-5 flex-shrink-0">
        <button class="relative h-max">
            <i class="fa-solid fa-bell icon"></i>
            <span class="
                bg-light-notification 
                px-[0.4rem] 
                py-[0.125rem] 
                rounded-full 
                text-xs 
                text-light-notification 
                absolute 
                -right-[0.4rem]
                -top-1 
                font-bold 
                select-none
            ">1</span>
        </button>
        <a href="/settings">
            <img 
                class="
                    w-14
                    h-14
                    object-cover
                    rounded-full
                "
                src={Avatar} 
                alt="Avatar"
            >
        </a>
    </div>
</header>