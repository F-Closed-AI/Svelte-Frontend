<script lang=ts>
    import "../app.css"
    import { Header, Wrapper, Sidebar } from "$lib/components";
</script>

<svelte:head>
    <title>ACC</title>
</svelte:head>

<Wrapper>
    <Header></Header>
    <div class="
        mt-header
    ">
        <Sidebar></Sidebar>
        <div class="
            h-content
            bg-light-dashboard-light
            ml-[15rem]
            rounded-tl-[3rem]
            p-12
            pr-0
            z-0
            overflow-y-auto
            scrollbar-hide
            before:content-['']
            before:absolute
            before:w-full
            before:h-full
            before:bg-light-dashboard-light
            before:-z-10
            before:pt-header
            md:ml-[4.5rem]
            md:w-content-collapse
        ">
            <slot />
        </div>
    </div>
</Wrapper>