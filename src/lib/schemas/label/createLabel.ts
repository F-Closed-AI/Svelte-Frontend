import { z } from "zod";

export const schemaCreateLabel = z.object({
    name: z.string().min(5, "Name must contain atleast 5 characters.").max(20).regex(/^(?!\s|.*\s{2,}|.*\s$)[a-zA-Z0-9\s]+$/, "Invalid name format."),
    color: z.string().min(1).default("#ffffff")
});

export type SchemaCreateLabel = typeof schemaCreateLabel;