<script lang=ts>
    import { PageContent, TextXL, TextArea, CardCharacter, Input } from "$lib/components";
	import type { PageViewCharacter } from "$lib/types";
    import generated_3 from "$lib/img/generated_3.png";
	import { afterNavigate } from "$app/navigation";

    export let data: PageViewCharacter;

    let loaded: boolean = false;

    afterNavigate(() => loaded = true);
</script>

<PageContent>
	<TextXL 
        slot="title" 
        classList="
            font-semibold
        "
    >
        Character ({data.character.name})
    </TextXL>
	<svelte:fragment slot="content">
        <div 
            class="
                relative
                flex
                flex-col
                gap-10
                rounded-3xl
            " 
        >
            <div class="
                flex
                gap-10
                sm:flex-col
            ">
                <CardCharacter
                    skeleton={!loaded} 
                    classList="cursor-default" 
                    img={generated_3}
                ></CardCharacter>
                <div class="
                    flex
                    flex-col
                    gap-10
                    w-full
                ">
                    <Input
                        classList="!bg-light-background !outline-none"
                        type="text"
                        label="Name"
                        name="name"
                        bind:value={data.character.name}
                        disabled
                    >
                    </Input>
                    <Input
                        classList="!bg-light-background !outline-none"
                        label="Age"
                        name="age"
                        bind:value={data.character.age}
                        disabled
                    >
                    </Input>
                </div>
            </div>
            <TextArea 
                classList="
                    !h-[18rem]
                "
                inputClassList="
                    !bg-light-background
                    !outline-none
                "
                label="Backstory"
                name="backStory"
                bind:value={data.character.backStory}
                disabled
            >
            </TextArea>
        </div>
    </svelte:fragment>
</PageContent>