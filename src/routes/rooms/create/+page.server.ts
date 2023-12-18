import { fail, redirect } from "@sveltejs/kit";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateRoom } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Room } from "$lib/types";

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateRoom);
        
        console.log(form.data);

        if (!form.valid) {
            return fail(400, { form });
        } 

        const room: Room = {
            name: form.data.name,
            userId: 17,
            charId: form.data.characterIds
        }

        await sendRequest(`Room/Create`, "POST", room);
        
        throw redirect(302, "/rooms");
    }
}