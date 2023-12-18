<script lang=ts>
	import { PageCreateCharacter } from "$lib/components";
    import type { PageCreateCharacter as Type } from "$lib/types";

    export let data: Type;
</script>

<PageCreateCharacter {data}></PageCreateCharacter>