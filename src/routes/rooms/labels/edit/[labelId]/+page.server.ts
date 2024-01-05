import { fail } from "@sveltejs/kit";
import { redirect, setFlash } from "sveltekit-flash-message/server";
import { sendRequest } from "$lib/functions/api/request.js";
import { schemaCreateLabel } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { Label } from "$lib/types";
import type { PageServerLoad } from "./$types.js";
import { schemaDeleteLabel } from "$lib/schemas/label/deleteLabel.js";

export const load: PageServerLoad = async (event) => {
    const labelId = event.params.labelId;

    try {
        const label: Label = await sendRequest(`Label/${labelId}`, "GET");
        
        return {
            label
        }
    } catch (error) {
        throw redirect("/rooms/labels", { type: "error", message: "Label not found." }, event);
    }
}

export const actions = {
    create: async (event) => {
        const form = await superValidate(event, schemaCreateLabel);

        let noChanges = false;

        if (!form.valid) return fail(400, { form }); 

        try {
            const response: Label = await sendRequest(`Label/${event.params.labelId}`, "GET");

            if (
                response.name === form.data.name &&
                response.color === form.data.color
            ) {
                setFlash({ type: 'error', message: 'No changes made.' }, event);
                noChanges = true;
            }
        } catch {
            setFlash({ type: 'error', message: 'Internal error occured whilst saving label.' }, event);
            noChanges = true;
        }

        if (noChanges) return fail(400, { form });
        
        const label: Label = {
            id: event.params.labelId,
            userId: 17,
            name: form.data.name,
            color: form.data.color
        }

        await sendRequest(`Label/Update`, "PUT", label);
        throw redirect("/rooms/labels", { type: "success", message: "Succesfully updated label." }, event);
    },

    delete: async(event) => {
        const form = await superValidate(event, schemaDeleteLabel);

        if (!form.valid) return fail(400, { form });

        await sendRequest("Label/Delete", "DELETE", form.data.labelId);
        throw redirect("/rooms/labels", { type: "success", message: "Succesfully deleted label." }, event);
    }
}