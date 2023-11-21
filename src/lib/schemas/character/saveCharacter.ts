import { z } from "zod";

export const schemaSaveCharacter = z.object({
    name: z.string(),
    age: z.number(),
    backStory: z.string()
});

export type SchemaSaveCharacter = typeof schemaSaveCharacter;