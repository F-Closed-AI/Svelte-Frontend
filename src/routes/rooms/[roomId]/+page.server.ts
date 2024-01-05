import { fail } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import type { Character, Room } from "$lib/types";
import type { PageServerLoad } from "./$types.js";
import { superValidate } from "sveltekit-superforms/client";
import { schemaCreateConversation } from "$lib/schemas/index.js";

export const load: PageServerLoad = async (event) => {
    const roomId = event.params.roomId;
    const createConversationForm = await superValidate(event, schemaCreateConversation);

    try {
        const room: Room = await sendRequest(`Room/${roomId}`, "GET");
        const currentCharacters: Character[] = await sendRequest(`Room/Characters/${room.id}`, "GET");

        return {
            createConversationForm,
            currentCharacters,
            room
        }
    } catch (error) {
        throw redirect("/rooms", { type: "error", message: "Room not found." }, event);
    }
}

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateConversation);

        if (!form.valid) {
            return fail(400, { form });
        } 

        return { form }
    },
}