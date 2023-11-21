<script lang=ts>
    export let link: string = ""
    export let active: boolean = false;
</script>

<a 
    href={link}
    class="
        text-light-text-secondary
        transition-colors
        duration-300
        hover:text-light-text-accent
        {active && "text-light-text-accent"}
    "
>
    <slot></slot>
</a>