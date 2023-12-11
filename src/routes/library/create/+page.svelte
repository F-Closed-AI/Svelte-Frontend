<script lang=ts>
	import { PageCreate } from "$lib/components";
    import type { PageCreate as Type } from "$lib/types";

    export let data: Type;
</script>

<PageCreate {data}></PageCreate>