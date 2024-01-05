<script lang=ts>
    import { Line, TextSmall, SidebarItem, SidebarItemNested } from "$lib/components";

    export let page: string = "/";
</script>

<nav class="
    fixed 
    flex 
    flex-col 
    flex-shrink-0
    justify-between
    gap-16
    h-fullscreen
    max-h-[64rem]
    -translate-x-5
    mt-[4rem]
    z-10
    sm:hidden
">
    <div class="
        flex
        flex-col
        gap-3
    ">
        <SidebarItem 
            text={"Dashboard"} 
            link="/"
            active={page === "/"}
        >
            <i slot="icon" class="fa-solid fa-border-all"></i>
            <TextSmall slot="text">Dashboard</TextSmall>
        </SidebarItem>
        <SidebarItem 
            text={"Library"} 
            link="/library"
            active={page.startsWith("/library")}
        >
            <i slot="icon" class="fa-solid fa-folder"></i>
            <TextSmall slot="text">Library</TextSmall>
        </SidebarItem>
        <SidebarItem 
            text={"Rooms"}
            link="/rooms"
            active={page.startsWith("/rooms")}
        >
            <i slot="icon" class="fa-solid fa-warehouse"></i>
            <TextSmall slot="text">Rooms</TextSmall>
            <div class="mt-2" slot="items">
                <SidebarItemNested
                    text="Labels"
                    link="/rooms/labels"
                >
                    <div slot="text">
                        <TextSmall>Labels</TextSmall>
                    </div>
                    <div slot="icon">
                        <i class="fa-solid fa-tags icon"></i>
                    </div>
                </SidebarItemNested>
            </div>
        </SidebarItem>
    </div>  
    <div>
        <Line></Line>
        <SidebarItem 
            text={"Settings"}
            link="/settings"
            active={page.startsWith("/settings")}
        >
            <i slot="icon" class="fa-solid fa-gear"></i>
            <TextSmall slot="text">Settings</TextSmall>
        </SidebarItem>
    </div>
    <div>
        <SidebarItem 
            text={"Logout"}
        >
            <i slot="icon" class="fa-solid fa-door-open"></i>
            <TextSmall slot="text">Logout</TextSmall>
        </SidebarItem>
    </div>
</nav>