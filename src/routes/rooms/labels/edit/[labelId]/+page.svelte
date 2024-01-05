<script lang=ts>
	import { PageCreateLabel } from "$lib/components";
	import type { PageCreateLabel as Type } from "$lib/types";

	export let data: Type;
</script>

<PageCreateLabel 
    {data}
    state="edit"
></PageCreateLabel>