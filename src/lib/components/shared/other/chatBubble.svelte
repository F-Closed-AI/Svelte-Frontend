<script lang=ts>
    import { Avatar, TextArea, TextSmall } from "$lib/components";
	import { onDestroy, onMount } from "svelte";

    export let image: string = "";
    export let name: string = "";
    export let text: string = "";
    export let typewriter: boolean = true;
    export let talking: boolean = false;
    export let state: "start" | "continue" | "completed" = "start";
    export let onComplete: (completed: boolean) => void = () => {}

    let displayText: string = "";
    let interval: NodeJS.Timeout;
    let index: number = 0;

    function startTypewriterEffect() {
        if (text !== displayText && !interval || state === "continue") {
            clearInterval(interval);

            if (talking) {
                interval = setInterval(() => {
                displayText = text.slice(0, index + 1);
                index++;

                if (index > text.length || !talking) {
                    clearInterval(interval);
                    onComplete(index > text.length);
                }
                    
                }, 40);
            }
        }
    }

    $: if (typewriter || state !== "completed" || talking) {
        startTypewriterEffect();
    }

    onDestroy(() => clearInterval(interval));
</script>

{#if (state === "completed" || state === "continue") || talking}
    <div class="flex flex-col gap-2 h-full">
        <div class="flex items-center gap-2">
            <Avatar 
                classList="!w-10 !h-10"
                {image} 
                alt={name}
            ></Avatar>
            <TextSmall classList="!font-semibold">{name}</TextSmall>
        </div>
        <div
            class="
                bg-light-background
                p-3
                rounded-xl
            "
        >
            {displayText}
        </div>
    </div>
{/if}