import { redirect } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import type { Character } from "$lib/types";
import type { PageServerLoad } from "./$types.js";

export const load: PageServerLoad = async (event) => {
    const characterId = event.params.characterId;

    try {
        const character: Character = await sendRequest(`Character/${characterId}`, "GET");

        return {
            character
        }
    } catch (error) {
        throw redirect("/library", { type: "error", message: "Character not found." }, event);
    }
}