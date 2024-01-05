import { fail } from "@sveltejs/kit";
import { redirect } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateLabel } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Label } from "$lib/types";

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateLabel);

        if (!form.valid) {
            return fail(400, { form });
        } 

        const label: Label = {
            userId: 17,
            name: form.data.name,
            color: form.data.color
            
        }

        await sendRequest(`Label/Create`, "POST", label);
        throw redirect("/rooms/labels", { type: "success", message: "Succesfully created label." }, event);
    },
}