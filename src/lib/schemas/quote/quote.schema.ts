import { z } from "zod";

export const quoteSchema = z.object({
	id: z.number().positive().int(),
	quote: z.string(),
	author: z.string(),
	created_at: z.coerce.date(),
	updated_at: z.coerce.date(),
})

export type QuoteSchema = z.infer<typeof quoteSchema>;