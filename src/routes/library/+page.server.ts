import { sendRequest } from "$lib/functions";
import type { PageServerLoad } from "./$types";
import type { Character } from "$lib/types";

export const load: PageServerLoad = async () => {
    let characters: Character[];
    try {
        characters = await sendRequest(`Character/User/17`, "GET");
    } 
    catch {
        characters = [];
    }
    return {
        characters
    }
}