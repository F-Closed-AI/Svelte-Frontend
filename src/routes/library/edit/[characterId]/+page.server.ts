import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateCharacter, schemaSaveCharacter } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Character } from "$lib/types";
import type { PageServerLoad } from "./$types.js";
import { schemaDeleteCharacter } from "$lib/schemas/character/deleteCharacter.js";

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
        throw redirect("/library", { type: "error", message: "Character not found." }, event);
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

        let noChanges = false;

        if (form.data.charId === null) return fail(400, { form });

        try {
            const response: Character = await sendRequest(`Character/${event.params.characterId}`, "GET");

            if (
                response.prompt === form.data.prompt &&
                response.name === form.data.name &&
                response.age === form.data.age &&
                response.backStory === form.data.backStory
            ) {
                setFlash({ type: 'error', message: 'No changes made.' }, event);
                noChanges = true;
            }
        } catch {
            setFlash({ type: 'error', message: 'Internal error occured whilst saving character.' }, event);
            noChanges = true;
        }

        if (noChanges) return fail(400, { form });

        const character: Character = {
            charId: form.data.charId,
            userId: 17,
            prompt: form.data.prompt,
            name: form.data.name,
            age: Number(form.data.age),
            backStory: form.data.backStory
        }

        await sendRequest(`Character/Update`, "PUT", character);
        throw redirect("/library", { type: "success", message: "Succesfully pdated character." }, event);
    },

    delete: async(event) => {
        const form = await superValidate(event, schemaDeleteCharacter);

        if (!form.valid) return fail(400, { form });

        await sendRequest("Character/Delete", "DELETE", form.data.charId);;
        throw redirect("/library", { type: "success", message: "Succesfully deleted character." }, event);
    }
}