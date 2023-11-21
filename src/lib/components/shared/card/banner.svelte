<script lang=ts>
    import { ButtonTertiary, TextDecoration, TextSmall, TextXL } from "$lib/components";
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
    lg:overflow-hidden
    sm:p-6
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
        <ButtonTertiary classList="xs:w-full xs:justify-center" link="/library/create">
            <i class="fa-solid fa-play text-light-btn-primary-hover"></i>
            <TextSmall classList="!font-semibold">Try Now</TextSmall>
        </ButtonTertiary>
    </div>
    <img 
        src={Character} 
        alt="Character"
        class="
            absolute
            -top-12
            right-5
            max-w-full
            h-[23.5rem]
            -z-10
            lg:mix-blend-overlay
    ">
</div>
