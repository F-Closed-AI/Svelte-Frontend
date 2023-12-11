<script lang=ts>
    import "../app.css"
    import { page } from "$app/stores";
    import { Header, Wrapper, Sidebar, TabNavigation, TabNavigationItem } from "$lib/components";
	import { tabs } from "$lib/stores/tabNavigationStore";
	import { beforeNavigate } from "$app/navigation";

    beforeNavigate(() => tabs.set([]));
</script>

<svelte:head>
    <title>ACC</title>
</svelte:head>

<Wrapper>
    <Header></Header>
    <div class="
        mt-header
        sm:mt-0
    ">
        <Sidebar page={$page.url.pathname}></Sidebar>
        <div class="
            h-content
            bg-light-dashboard-light
            ml-[15rem]
            rounded-tl-[3rem]
            p-12
            pr-[0.1rem]
            {$page.url.pathname.includes("/library") && "pb-40"}
            z-0
            overflow-y-auto
            scrollbar-hide
            before:content-['']
            before:absolute
            before:w-full
            before:h-full
            before:bg-light-dashboard-light
            before:-z-20
            before:mt-header-dashboard
            md:ml-[4.5rem]
            md:w-content-collapse
            sm:!ml-0
            sm:pl-[0.1rem]
            sm:rounded-none
            sm:before:left-0
            sm:pt-28
            sm:h-screen
            sm:pb-28
        "
        >
            <slot />
        </div>
    </div>
    <TabNavigation>
        <svelte:fragment slot="left">
            <TabNavigationItem 
                link="/"
                active={$page.url.pathname === "/"}
            >
                <i class="fa-solid fa-border-all"></i>
            </TabNavigationItem>
            <TabNavigationItem 
                link="/library"
                active={$page.url.pathname.startsWith("/library")}
            >
                <i class="fa-solid fa-folder"></i>
            </TabNavigationItem>
        </svelte:fragment>
        <i slot="icon" class="fa-solid fa-plus"></i>
        <svelte:fragment slot="right">
            <TabNavigationItem 
                link="/rooms"
                active={$page.url.pathname.startsWith("/rooms")}
            >
                <i class="fa-solid fa-warehouse"></i>
            </TabNavigationItem>
            <TabNavigationItem 
                link="/settings"
                active={$page.url.pathname.startsWith("/settings")}
            >
                <i class="fa-solid fa-gear"></i>
            </TabNavigationItem>
        </svelte:fragment>
    </TabNavigation>
</Wrapper>