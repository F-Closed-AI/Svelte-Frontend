<script lang=ts>
	import { PageCreateRoom } from "$lib/components";
	import type { PageCreateRoom as Type } from "$lib/types";

	export let data: Type;
</script>

<PageCreateRoom {data}></PageCreateRoom>