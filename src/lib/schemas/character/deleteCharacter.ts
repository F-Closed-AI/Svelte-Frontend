import { z } from "zod";

export const schemaDeleteCharacter = z.object({
    charId: z.string(),
});

export type schemaDeleteCharacter = typeof schemaDeleteCharacter;