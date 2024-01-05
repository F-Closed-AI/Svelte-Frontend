import { z } from "zod";

export const schemaDeleteRoom = z.object({
    roomId: z.string(),
});

export type SchemaDeleteRoom = typeof schemaDeleteRoom;