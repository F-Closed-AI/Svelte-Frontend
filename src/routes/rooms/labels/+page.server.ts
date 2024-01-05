import { sendRequest } from "$lib/functions";
import type { PageServerLoad } from "./$types";
import type { Label } from "$lib/types";

export const load: PageServerLoad = async () => {
    let labels: Label[];
    try {
        labels = await sendRequest(`Label/User/17`, "GET");
    } 
    catch {
        labels = [];
    }
    return {
        labels
    }
}