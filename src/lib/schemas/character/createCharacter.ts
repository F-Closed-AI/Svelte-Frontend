import { z } from "zod";

export const schemaCreateCharacter = z.object({
    prompt: z.string().min(20)
});

export type SchemaCreateCharacter = typeof schemaCreateCharacter;