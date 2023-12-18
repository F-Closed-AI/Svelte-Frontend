import { fail, redirect } from "@sveltejs/kit";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateCharacter, schemaSaveCharacter } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Character } from "$lib/types";

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

        const character: Character = {
            userId: 17,
            prompt: form.data.prompt,
            name: form.data.name,
            age: Number(form.data.age),
            backStory: form.data.backStory
        }

        await sendRequest(`Character/Store`, "POST", character);

        throw redirect(302, "/library");
    }
}