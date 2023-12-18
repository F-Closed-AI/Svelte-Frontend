import { schemaCreateRoom } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { PageServerLoad } from "./$types";
import { sendRequest } from "$lib/functions";

export const load: PageServerLoad = async (event) => {
    const createRoomForm = await superValidate(event, schemaCreateRoom);
    const allCharacters = await sendRequest(`Character/User/17`, "GET");
    return {
        createRoomForm,
        allCharacters
    }
}