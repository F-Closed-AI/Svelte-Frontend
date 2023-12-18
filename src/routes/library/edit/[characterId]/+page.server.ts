import { fail, redirect } from "@sveltejs/kit";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateCharacter, schemaSaveCharacter } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Character } from "$lib/types";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (event) => {
    const charId = event.params.characterId;

    try {
        const character: Character = await sendRequest(`Character/${charId}`, "GET");
        const versions: Character[] = await sendRequest(`Character/Characters/${character.charId}`, "GET");

        return {
            character,
            versions
        }
    } catch {
        // Show error modal: Character not found
        throw redirect(302, "/library");
    }

}

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateCharacter);
        
        if (!form.valid) {
            return fail(400, { form });
        } 

        return { form }
    },
    
    save: async (event) => {
        const form = await superValidate(event, schemaSaveCharacter);

        if (form.data.charId === null) return fail(400, { form });

        const character: Character = {
            charId: form.data.charId,
            userId: 17,
            prompt: form.data.prompt,
            name: form.data.name,
            age: Number(form.data.age),
            backStory: form.data.backStory
        }

        await sendRequest(`Character/Update`, "PUT", character);

        throw redirect(302, "/library");
    }
}