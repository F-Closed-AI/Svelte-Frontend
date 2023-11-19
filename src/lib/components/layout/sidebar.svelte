<script lang=ts>
    import { TextSmall, Line } from "$lib/components";
    import SidebarItem from "./sidebarItem.svelte";
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
">
    <div class="
        flex
        flex-col
        gap-3
    ">
        <SidebarItem text={"Dashboard"}>
            <i slot="icon" class="fa-solid fa-border-all"></i>
            <TextSmall slot="text">Dashboard</TextSmall>
        </SidebarItem>
        <SidebarItem text={"Library"}>
            <i slot="icon" class="fa-solid fa-folder"></i>
            <TextSmall slot="text">Library</TextSmall>
        </SidebarItem>
        <SidebarItem text={"Rooms"}>
            <i slot="icon" class="fa-solid fa-warehouse"></i>
            <TextSmall slot="text">Rooms</TextSmall>
        </SidebarItem>
    </div>  
    <div>
        <Line></Line>
        <SidebarItem text={"Settings"}>
            <i slot="icon" class="fa-solid fa-gear"></i>
            <TextSmall slot="text">Settings</TextSmall>
        </SidebarItem>
    </div>
    <div>
        <SidebarItem text={"Logout"}>
            <i slot="icon" class="fa-solid fa-door-open"></i>
            <TextSmall slot="text">Logout</TextSmall>
        </SidebarItem>
    </div>
</nav>