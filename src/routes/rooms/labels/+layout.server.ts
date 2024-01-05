import { schemaCreateLabel } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { PageServerLoad } from "./$types";
import { schemaDeleteLabel } from "$lib/schemas/label/deleteLabel";

export const load: PageServerLoad = async (event) => {
    const createLabelForm = await superValidate(event, schemaCreateLabel);
    const deleteLabelForm = await superValidate(event, schemaDeleteLabel);
    return {
        createLabelForm,
        deleteLabelForm
    }
}