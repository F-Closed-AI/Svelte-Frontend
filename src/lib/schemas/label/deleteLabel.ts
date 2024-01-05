import { z } from "zod";

export const schemaDeleteLabel = z.object({
    labelId: z.string(),
});

export type SchemaDeleteLabel = typeof schemaDeleteLabel;