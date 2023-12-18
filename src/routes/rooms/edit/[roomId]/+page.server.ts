import { fail, redirect } from "@sveltejs/kit";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateRoom } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Room } from "$lib/types";
import type { PageServerLoad } from "./$types.js";
import { sendRequests } from "$lib/functions/index.js";

export const load: PageServerLoad = async (event) => {
    const roomId = event.params.roomId;

    try {
        const [currentCharacters, room] = await sendRequests([
            { url: `Room/Characters/${roomId}`, method: "GET" },
            { url: `Room/${roomId}`, method: "GET" },
        ])

        console.log((room as Room).roomId);
        const versions = await sendRequest(`Room/Rooms/${(room as Room).roomId}`, "GET");

        return {
            currentCharacters,
            room,
            versions
        }
    } catch (error) {
        // Show error modal: Room not found
        console.log((error as Error));
        throw redirect(302, "/rooms");
    }

}

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateRoom);
        
        if (!form.valid || form.data.roomId == null) {
            return fail(400, { form });
        } 

        const room: Room = {
            roomId: form.data.roomId,
            name: form.data.name,
            userId: 17,
            charId: form.data.characterIds
        }

        await sendRequest(`Room/Update`, "PUT", room);
        
        throw redirect(302, "/rooms");
    }
}