import { schemaCreateCharacter, schemaSaveCharacter } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async (event) => {
    const createCharacterForm = await superValidate(event, schemaCreateCharacter);
    const saveCharacterForm = await superValidate(event, schemaSaveCharacter);
    return {
        createCharacterForm,
        saveCharacterForm
    }
}