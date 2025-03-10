import { z } from "zod";

export const baseSchema = z.object({
	created_at: z.date(),
	updated_at: z.date(),
	deleted_at: z.date().nullable(),
})

export type BaseSchema = z.infer<typeof baseSchema>;