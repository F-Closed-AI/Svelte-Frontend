import { fail } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateRoom } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Room } from "$lib/types";

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateRoom);

        if (!form.valid) {
            return fail(400, { form });
        } 

        const room: Room = {
            name: form.data.name,
            userId: 17,
            charId: form.data.characterIds,
            labelId: form.data.labelIds
        }

        await sendRequest(`Room/Create`, "POST", room);
        throw redirect("/rooms", { type: "success", message: "Succesfully created room." }, event);
    },
}