import { schemaCreateRoom, schemaDeleteRoom } from "$lib/schemas";
import { superValidate } from "sveltekit-superforms/client";
import type { PageServerLoad } from "./$types";
import { sendRequests } from "$lib/functions";

export const load: PageServerLoad = async (event) => {
    const createRoomForm = await superValidate(event, schemaCreateRoom);
    const deleteRoomForm = await superValidate(event, schemaDeleteRoom);
    const [allCharacters, allLabels] = await sendRequests([
        { url: `Character/User/17`, method: "GET" },
        { url: `Label/User/17`, method: "GET" }
    ]);
    return {
        createRoomForm,
        deleteRoomForm,
        allCharacters,
        allLabels
    }
}