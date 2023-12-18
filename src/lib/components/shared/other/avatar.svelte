<script lang=ts>
    export let classList: string = ""
    export let image: string = "";
    export let alt: string = "";
</script>

<img 
    class="
        h-20 
        w-20 
        object-cover 
        rounded-full
        {classList}
    " 
    src={image} 
    alt={alt}
>