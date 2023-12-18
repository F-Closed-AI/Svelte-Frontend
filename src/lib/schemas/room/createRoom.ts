import { z } from "zod";

export const schemaCreateRoom = z.object({
    roomId: z.string().nullable(),
    name: z.string().min(5).max(20),
    characterIds: z.array(z.string()),
    labels: z.array(
        z.object({
            name: z.string(),
            color: z.string()
        })
    )
});

export type SchemaCreateRoom = typeof schemaCreateRoom;