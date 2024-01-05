<script lang=ts>
	import { Avatar, Logo, Input } from "$lib/components/index.ts";
    import avatar from "$lib/img/avatar.png";
</script>

<header class="
    fixed
    isolate
    flex 
    gap-16 
    justify-between 
    items-center
    w-fullscreen
    max-w-[120rem]
    z-10
    xs:w-fullscreen-sm
    sm:bg-light-dashboard-light
    sm:mt-5
    sm:before:absolute
    sm:before:-translate-y-[0.125rem]
    sm:before:-z-10
    sm:before:left-0
    sm:before:w-full
    sm:before:h-[7rem]
    sm:before:bg-light-dashboard-light
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
            <i slot="icon" class="fa-solid fa-magnifying-glass text-light-btn-primary-background"></i>
            
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
            <Avatar
                classList="w-[4rem] h-[4rem]"
                image={avatar}
                alt="Avatar"
            ></Avatar>
        </a>
    </div>
</header>