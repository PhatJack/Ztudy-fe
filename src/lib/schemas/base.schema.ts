import { z } from "zod";

export const baseSchema = z.object({
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
})

export type BaseSchema = z.infer<typeof baseSchema>;