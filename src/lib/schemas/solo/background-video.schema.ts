import { z } from "zod";

export const backgroundVideoSchema = z.object({
	id: z.number().positive().int(),
	image: z.string().url(),
	youtube_url: z.string(),	
})

export type BackgroundVideoSchema = z.infer<typeof backgroundVideoSchema>;