<div class="
    fixed
    hidden
    items-center
    justify-center
    gap-[32%]
    bg-light-background
    text-light-text-secondary
    px-6
    bottom-0
    left-0
    w-full
    h-min
    rounded-t-[1.75rem]
    sm:flex
">
    <div class="
        relative
        flex
        w-full
        justify-between
        max-w-[10rem]
        py-6
    ">
        <slot name="left"></slot>
    </div>
    <a 
        href="/" 
        class="
            absolute
            text-light-text-tertiary
            gradient
            rounded-full
            -top-5
            px-4
            py-3
            cursor-pointer
    ">
        <slot name="icon"></slot>
    </a>
    <div class="
        flex
        w-full
        justify-between
        max-w-[10rem]
        py-6
    ">
        <slot name="right"></slot>
    </div>
</div>