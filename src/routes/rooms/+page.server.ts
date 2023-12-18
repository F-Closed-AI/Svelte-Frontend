import { sendRequest } from "$lib/functions";
import type { PageServerLoad } from "./$types";
import type { Room } from "$lib/types";

export const load: PageServerLoad = async () => {
    let rooms: Room[];
    try {
        rooms = await sendRequest(`Room/User/17`, "GET");
    } 
    catch {
        rooms = [];
    }
    return {
        rooms
    }
}