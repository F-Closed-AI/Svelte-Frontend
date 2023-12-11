import { z } from "zod";

export const schemaSaveCharacter = z.object({
    charId: z.string().nullable(),
    name: z.string(),
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    age: z.number().default(null!),
    backStory: z.string()
});

export type SchemaSaveCharacter = typeof schemaSaveCharacter;