import { writable } from "svelte/store";

export const from = writable<number>(0);
export const to = writable<number>(0);

export const dropData = {
  from,
  to,
};