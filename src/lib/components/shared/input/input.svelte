<script lang=ts>
	import { TextBase } from "$lib/components";

    export let skeleton: boolean = false;
    export let classList: string = "";
    export let label: string = "";
    export let value: string | number = "";
    export let error: string[] | undefined = [];
    export let onInput: (event: Event) => void = () => {};
</script>

<div class="
    flex
    flex-col
    gap-2
">
    <label for={$$props.name}>
        <TextBase classList="!font-medium">{label}</TextBase>
    </label>
    <div class="
        relative 
        flex 
        items-center 
        text-light-text-primary
    ">
        <div class="
            flex 
            items-center 
            absolute 
            px-4
        ">
            <slot name="icon"/>
        </div>
        <input
            class:skeleton={skeleton}
            class:error={error && error.length}
            class="
              bg-light-dashboard-light
                px-5
                py-3
                rounded-full
                w-full
                hover:outline 
                hover:outline-2
                focus
                {classList}
            "
            data-error={error?.at(0)}
            data-sveltekit-keepfocus
            bind:value={value}
            on:input={onInput}
            {...$$props}
        >
    </div>
</div>