import { schemaCreateCharacter, schemaSaveCharacter } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { PageServerLoad } from "./$types";
import { schemaDeleteCharacter } from "$lib/schemas/character/deleteCharacter";

export const load: PageServerLoad = async (event) => {
    const createCharacterForm = await superValidate(event, schemaCreateCharacter);
    const saveCharacterForm = await superValidate(event, schemaSaveCharacter);
    const deleteCharacterForm = await superValidate(event, schemaDeleteCharacter);
    return {
        createCharacterForm,
        saveCharacterForm,
        deleteCharacterForm
    }
}