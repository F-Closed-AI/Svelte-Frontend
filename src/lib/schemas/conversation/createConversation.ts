import { z } from "zod";

export const schemaCreateConversation = z.object({
    prompt: z.string().min(20)
});

export type SchemaCreateConversation = typeof schemaCreateConversation;