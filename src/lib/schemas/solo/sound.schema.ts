import { z } from "zod";

export const soundSchema = z.object({
	id: z.number().positive().int(),
	name: z.string(),
	sound_file: z.string(),
	stream_url: z.string(),
	created_at: z.string(),
	update_at: z.string(),
})

export type SoundSchema = z.infer<typeof soundSchema>