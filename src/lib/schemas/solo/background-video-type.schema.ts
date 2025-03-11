import { z } from "zod";

export const backgroundVideoTypeSchema = z.object({
	id: z.number().positive().int(),
	name: z.string(),
	description: z.string(),
	created_at: z.string(),
	updated_at: z.string(),
})

export type BackgroundVideoTypeSchema = z.infer<typeof backgroundVideoTypeSchema>;