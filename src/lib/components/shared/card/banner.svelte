<script lang=ts>
    import { TertiaryButton, TextBase, TextDecoration, TextXL } from "$lib/components";
    import Character from "$lib/img/banner_character.png";

    export let classList: string = "";
</script>

<div class="
    flex-shrink-0
    relative
    p-8
    gradient
    rounded-3xl
    w-full
    isolate
    {classList}
">
    <div class="
        flex
        flex-col
        gap-12
    ">
        <div class="
            max-w-sm
            text-light-text-tertiary
        ">
            <TextDecoration>Powered by AI</TextDecoration>
            <TextXL classList="font-medium">Start creating your own characters.</TextXL>
        </div>
        <TertiaryButton>
            <i class="fa-solid fa-play text-light-btn-primary-hover"></i>
            <TextBase classList="!font-semibold">Try Now</TextBase>
        </TertiaryButton>
    </div>
    <img 
        src={Character} 
        alt="Character"
        class="
            absolute
            -top-12
            right-5
            max-w-full
            h-[22rem]
            -z-10
            lg:mix-blend-overlay
            sm:hidden
    ">
</div>
