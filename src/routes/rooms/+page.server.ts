import { sendRequest, sendRequests } from "$lib/functions";
import type { Label, Room } from "$lib/types";
import type { PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
    const rooms: Room[] = await sendRequest(`Room/User/17`, "GET");
    const labelRequests = rooms.map(x => ({ url: `Room/Labels/${x.id}`, method: "GET" }));
    const labels = await sendRequests(labelRequests) as Array<Label[]>;

    return {
        rooms,
        labels
    }
}