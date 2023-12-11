<script lang=ts>
	import { TextSmall } from "$lib/components";

    export let classList: string = "";
    export let columns: string[] = [];
</script>

<table 
    class="
        w-full
        text-left
        {classList}
">
    <thead 
        class="
            lg:hidden
    ">
        <tr>
            {#each columns as column}
                <th>
                    <TextSmall>{column}</TextSmall>
                </th>
            {/each}
        </tr>
    </thead>
    <tbody>
        <slot></slot>
    </tbody>
</table>