import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateRoom, schemaDeleteRoom } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Room } from "$lib/types";
import type { PageServerLoad } from "./$types.js";
import { areEqual, sendRequests } from "$lib/functions/index.js";

export const load: PageServerLoad = async (event) => {
    const roomId = event.params.roomId;

    try {
        const room: Room = await sendRequest(`Room/${roomId}`, "GET");

        const [currentCharacters, currentLabels] = await sendRequests([
            { url: `Room/Characters/${room.id}`, method: "GET" },
            { url: `Room/Labels/${room.id}`, method: "GET" },
        ])

        const versions = await sendRequest(`Room/Rooms/${(room as Room).roomId}`, "GET");

        return {
            currentCharacters,
            currentLabels,
            room,
            versions
        }
    } catch (error) {
        throw redirect("/rooms", { type: "error", message: "Room not found." }, event);
    }
}

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateRoom);

        let noChanges = false;

        if (!form.valid) return fail(400, { form }); 

        try {
            const response: Room = await sendRequest(`Room/${event.params.roomId}`, "GET");

            if (
                response.name === form.data.name &&
                areEqual(response.charId, form.data.characterIds) &&
                areEqual(response.labelId, form.data.labelIds)
            ) {
                setFlash({ type: 'error', message: 'No changes made.' }, event);
                noChanges = true;
            }
        } catch {
            setFlash({ type: 'error', message: 'Internal error occured whilst saving room.' }, event);
            noChanges = true;
        }

        if (noChanges) return fail(400, { form });
        
        const room: Room = {
            roomId: form.data.roomId as string,
            name: form.data.name,
            userId: 17,
            charId: form.data.characterIds,
            labelId: form.data.labelIds
        }

        await sendRequest("Room/Update", "PUT", room);
        throw redirect("/rooms", { type: "success", message: "Succesfully updated room." }, event);
    },

    delete: async(event) => {
        const form = await superValidate(event, schemaDeleteRoom);

        if (!form.valid) return fail(400, { form });

        await sendRequest("Room/Delete", "DELETE", form.data.roomId);;
        throw redirect("/rooms", { type: "success", message: "Succesfully deleted room." }, event);
    }
}